import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './neon';
import { users, userRoles } from './schema';
import { eq, and } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = '7d';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  emailConfirmed: boolean;
  createdAt: Date;
}

export interface AuthResult {
  user: User;
  token: string;
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static verifyToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  static async signUp(email: string, password: string, firstName?: string, lastName?: string): Promise<AuthResult> {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Create user
    const [newUser] = await db.insert(users).values({
      email,
      passwordHash,
      firstName,
      lastName,
      emailConfirmed: true, // Auto-confirm for now
    }).returning();

    // Assign default role
    await db.insert(userRoles).values({
      userId: newUser.id,
      role: 'agent',
    });

    // Generate token
    const token = this.generateToken(newUser.id);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName || undefined,
        lastName: newUser.lastName || undefined,
        emailConfirmed: newUser.emailConfirmed || false,
        createdAt: newUser.createdAt || new Date(),
      },
      token,
    };
  }

  static async signIn(email: string, password: string): Promise<AuthResult> {
    // Find user
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        emailConfirmed: user.emailConfirmed || false,
        createdAt: user.createdAt || new Date(),
      },
      token,
    };
  }

  static async getUserFromToken(token: string): Promise<User | null> {
    const decoded = this.verifyToken(token);
    if (!decoded) {
      return null;
    }

    const [user] = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      emailConfirmed: user.emailConfirmed || false,
      createdAt: user.createdAt || new Date(),
    };
  }

  static async isAdmin(userId: string): Promise<boolean> {
    const [role] = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, userId), eq(userRoles.role, 'admin')))
      .limit(1);

    return !!role;
  }

  static async updatePassword(userId: string, newPassword: string): Promise<void> {
    const passwordHash = await this.hashPassword(newPassword);
    await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
  }
}