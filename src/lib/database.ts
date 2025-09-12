import { db } from './neon';
import { 
  users, agentProfiles, salesActivities, clients, appointments, 
  trainingProgress, bookProgress, userRoles, announcements, 
  scheduleEvents, userInvitations, consultationRequests, teamApplications 
} from './schema';
import { eq, and, desc, gte, count } from 'drizzle-orm';

// Types for database tables
export interface AgentProfile {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  agentId?: string;
  hireDate?: string;
  commissionRate?: number;
  teamLead?: string;
  status?: 'active' | 'inactive' | 'suspended';
  dateOfBirth?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SalesActivity {
  id: string;
  userId: string;
  clientName: string;
  policyType: string;
  annualPremium: number;
  commissionEarned?: number;
  saleDate?: string;
  notes?: string;
  status?: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  status?: 'active' | 'inactive' | 'prospect';
  source?: 'referral' | 'cold_call' | 'marketing' | 'walk_in' | 'online';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  userId: string;
  clientId?: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  status?: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingProgress {
  id: string;
  userId: string;
  trainingId: number;
  trainingTitle: string;
  progressPercentage?: number;
  completed?: boolean;
  startedAt?: Date;
  completedAt?: Date;
  lastAccessed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookProgress {
  id: string;
  userId: string;
  bookId: number;
  bookTitle: string;
  status?: 'to-read' | 'reading' | 'completed';
  progressPercentage?: number;
  startedAt?: Date;
  completedAt?: Date;
  rating?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRole {
  id: string;
  userId: string;
  role: 'admin' | 'agent' | 'manager';
  assignedBy?: string;
  assignedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  authorId: string;
  authorName: string;
  targetAudience: 'all' | 'agents' | 'managers';
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  eventType: 'meeting' | 'training' | 'call' | 'bom' | 'hierarchy' | 'sales';
  dayOfWeek: string;
  startTime: string;
  endTime?: string;
  timezone: string;
  zoomLink?: string;
  passcode?: string;
  isRecurring: boolean;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInvitation {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'agent' | 'manager';
  temporaryPassword: string;
  invitedBy: string;
  invitedAt: Date;
  acceptedAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  productInterest?: string;
  hearAbout?: string;
  comments?: string;
  status?: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  experience?: string;
  hearAbout?: string;
  description?: string;
  referredBy?: string;
  status?: 'pending' | 'reviewing' | 'interviewed' | 'hired' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Database service functions
export class DatabaseService {
  // Agent Profile functions
  static async getAgentProfile(userId: string): Promise<AgentProfile | null> {
    try {
      const [profile] = await db.select().from(agentProfiles).where(eq(agentProfiles.userId, userId)).limit(1);
      return profile || null;
    } catch (error) {
      console.error('Error fetching agent profile:', error);
      return null;
    }
  }

  static async createAgentProfile(profile: Partial<AgentProfile>): Promise<AgentProfile | null> {
    try {
      const [newProfile] = await db.insert(agentProfiles).values(profile).returning();
      return newProfile;
    } catch (error) {
      console.error('Error creating agent profile:', error);
      return null;
    }
  }

  static async updateAgentProfile(userId: string, updates: Partial<AgentProfile>): Promise<AgentProfile | null> {
    try {
      const [updatedProfile] = await db
        .update(agentProfiles)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(agentProfiles.userId, userId))
        .returning();
      return updatedProfile;
    } catch (error) {
      console.error('Error updating agent profile:', error);
      return null;
    }
  }

  // Sales Activities functions
  static async getSalesActivities(userId: string): Promise<SalesActivity[]> {
    try {
      const activities = await db
        .select()
        .from(salesActivities)
        .where(eq(salesActivities.userId, userId))
        .orderBy(desc(salesActivities.createdAt));
      return activities;
    } catch (error) {
      console.error('Error fetching sales activities:', error);
      return [];
    }
  }

  static async createSalesActivity(activity: Partial<SalesActivity>): Promise<SalesActivity | null> {
    try {
      const [newActivity] = await db.insert(salesActivities).values(activity).returning();
      return newActivity;
    } catch (error) {
      console.error('Error creating sales activity:', error);
      return null;
    }
  }

  static async getMonthlySalesTotal(userId: string): Promise<number> {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const activities = await db
        .select()
        .from(salesActivities)
        .where(and(
          eq(salesActivities.userId, userId),
          gte(salesActivities.saleDate, startOfMonth.toISOString().split('T')[0])
        ));

      return activities.reduce((total, sale) => total + (Number(sale.annualPremium) || 0), 0);
    } catch (error) {
      console.error('Error fetching monthly sales:', error);
      return 0;
    }
  }

  // Clients functions
  static async getClients(userId: string): Promise<Client[]> {
    try {
      const clientList = await db
        .select()
        .from(clients)
        .where(eq(clients.userId, userId))
        .orderBy(desc(clients.createdAt));
      return clientList;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }

  static async createClient(client: Partial<Client>): Promise<Client | null> {
    try {
      const [newClient] = await db.insert(clients).values(client).returning();
      return newClient;
    } catch (error) {
      console.error('Error creating client:', error);
      return null;
    }
  }

  static async getActiveClientsCount(userId: string): Promise<number> {
    try {
      const [result] = await db
        .select({ count: count() })
        .from(clients)
        .where(and(eq(clients.userId, userId), eq(clients.status, 'active')));
      return result.count;
    } catch (error) {
      console.error('Error fetching active clients count:', error);
      return 0;
    }
  }

  // Appointments functions
  static async getAppointments(userId: string): Promise<Appointment[]> {
    try {
      const appointmentList = await db
        .select()
        .from(appointments)
        .where(eq(appointments.userId, userId))
        .orderBy(appointments.appointmentDate);
      return appointmentList;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  }

  static async createAppointment(appointment: Partial<Appointment>): Promise<Appointment | null> {
    try {
      const [newAppointment] = await db.insert(appointments).values(appointment).returning();
      return newAppointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      return null;
    }
  }

  // Training Progress functions
  static async getTrainingProgress(userId: string): Promise<TrainingProgress[]> {
    try {
      const progress = await db
        .select()
        .from(trainingProgress)
        .where(eq(trainingProgress.userId, userId))
        .orderBy(desc(trainingProgress.lastAccessed));
      return progress;
    } catch (error) {
      console.error('Error fetching training progress:', error);
      return [];
    }
  }

  static async updateTrainingProgress(userId: string, trainingId: number, updates: Partial<TrainingProgress>): Promise<TrainingProgress | null> {
    try {
      // Check if record exists
      const [existing] = await db
        .select()
        .from(trainingProgress)
        .where(and(eq(trainingProgress.userId, userId), eq(trainingProgress.trainingId, trainingId)))
        .limit(1);

      if (existing) {
        // Update existing record
        const [updated] = await db
          .update(trainingProgress)
          .set({ ...updates, updatedAt: new Date() })
          .where(and(eq(trainingProgress.userId, userId), eq(trainingProgress.trainingId, trainingId)))
          .returning();
        return updated;
      } else {
        // Create new record
        const [newProgress] = await db
          .insert(trainingProgress)
          .values({ userId, trainingId, ...updates })
          .returning();
        return newProgress;
      }
    } catch (error) {
      console.error('Error updating training progress:', error);
      return null;
    }
  }

  // Book Progress functions
  static async getBookProgress(userId: string): Promise<BookProgress[]> {
    try {
      const progress = await db
        .select()
        .from(bookProgress)
        .where(eq(bookProgress.userId, userId))
        .orderBy(desc(bookProgress.createdAt));
      return progress;
    } catch (error) {
      console.error('Error fetching book progress:', error);
      return [];
    }
  }

  static async updateBookProgress(userId: string, bookId: number, updates: Partial<BookProgress>): Promise<BookProgress | null> {
    try {
      // Check if record exists
      const [existing] = await db
        .select()
        .from(bookProgress)
        .where(and(eq(bookProgress.userId, userId), eq(bookProgress.bookId, bookId)))
        .limit(1);

      if (existing) {
        // Update existing record
        const [updated] = await db
          .update(bookProgress)
          .set({ ...updates, updatedAt: new Date() })
          .where(and(eq(bookProgress.userId, userId), eq(bookProgress.bookId, bookId)))
          .returning();
        return updated;
      } else {
        // Create new record
        const [newProgress] = await db
          .insert(bookProgress)
          .values({ userId, bookId, ...updates })
          .returning();
        return newProgress;
      }
    } catch (error) {
      console.error('Error updating book progress:', error);
      return null;
    }
  }

  // User Role functions
  static async getUserRole(userId: string): Promise<UserRole | null> {
    try {
      const [role] = await db.select().from(userRoles).where(eq(userRoles.userId, userId)).limit(1);
      return role || null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }

  static async isAdmin(userId: string): Promise<boolean> {
    try {
      const [role] = await db
        .select()
        .from(userRoles)
        .where(and(eq(userRoles.userId, userId), eq(userRoles.role, 'admin')))
        .limit(1);
      return !!role;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  // Announcements functions
  static async createAnnouncement(announcement: Partial<Announcement>): Promise<Announcement | null> {
    try {
      const [newAnnouncement] = await db.insert(announcements).values(announcement).returning();
      return newAnnouncement;
    } catch (error) {
      console.error('Error creating announcement:', error);
      return null;
    }
  }

  static async getAnnouncements(): Promise<Announcement[]> {
    try {
      const announcementList = await db
        .select()
        .from(announcements)
        .where(eq(announcements.isActive, true))
        .orderBy(desc(announcements.createdAt));
      return announcementList;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return [];
    }
  }

  static async updateAnnouncement(id: string, updates: Partial<Announcement>): Promise<Announcement | null> {
    try {
      const [updated] = await db
        .update(announcements)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(announcements.id, id))
        .returning();
      return updated;
    } catch (error) {
      console.error('Error updating announcement:', error);
      return null;
    }
  }

  static async deleteAnnouncement(id: string): Promise<boolean> {
    try {
      await db.update(announcements).set({ isActive: false }).where(eq(announcements.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting announcement:', error);
      return false;
    }
  }

  // Schedule Events functions
  static async createScheduleEvent(event: Partial<ScheduleEvent>): Promise<ScheduleEvent | null> {
    try {
      const [newEvent] = await db.insert(scheduleEvents).values(event).returning();
      return newEvent;
    } catch (error) {
      console.error('Error creating schedule event:', error);
      return null;
    }
  }

  static async getScheduleEvents(): Promise<ScheduleEvent[]> {
    try {
      const events = await db
        .select()
        .from(scheduleEvents)
        .where(eq(scheduleEvents.isActive, true))
        .orderBy(scheduleEvents.dayOfWeek);
      return events;
    } catch (error) {
      console.error('Error fetching schedule events:', error);
      return [];
    }
  }

  static async updateScheduleEvent(id: string, updates: Partial<ScheduleEvent>): Promise<ScheduleEvent | null> {
    try {
      const [updated] = await db
        .update(scheduleEvents)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(scheduleEvents.id, id))
        .returning();
      return updated;
    } catch (error) {
      console.error('Error updating schedule event:', error);
      return null;
    }
  }

  static async deleteScheduleEvent(id: string): Promise<boolean> {
    try {
      await db.update(scheduleEvents).set({ isActive: false }).where(eq(scheduleEvents.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting schedule event:', error);
      return false;
    }
  }

  // User Invitations functions
  static async getUserInvitations(): Promise<UserInvitation[]> {
    try {
      const invitations = await db
        .select()
        .from(userInvitations)
        .where(eq(userInvitations.isActive, true))
        .orderBy(desc(userInvitations.createdAt));
      return invitations;
    } catch (error) {
      console.error('Error fetching user invitations:', error);
      return [];
    }
  }

  static async createUserInvitation(invitation: Partial<UserInvitation>): Promise<UserInvitation | null> {
    try {
      const [newInvitation] = await db.insert(userInvitations).values(invitation).returning();
      return newInvitation;
    } catch (error) {
      console.error('Error creating user invitation:', error);
      return null;
    }
  }

  static async updateUserInvitation(id: string, updates: Partial<UserInvitation>): Promise<UserInvitation | null> {
    try {
      const [updated] = await db
        .update(userInvitations)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(userInvitations.id, id))
        .returning();
      return updated;
    } catch (error) {
      console.error('Error updating user invitation:', error);
      return null;
    }
  }

  static async deleteUserInvitation(id: string): Promise<boolean> {
    try {
      await db.update(userInvitations).set({ isActive: false }).where(eq(userInvitations.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting user invitation:', error);
      return false;
    }
  }

  // Consultation Requests functions
  static async createConsultationRequest(consultationData: {
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    productInterest?: string;
    hearAbout?: string;
    comments?: string;
  }): Promise<boolean> {
    try {
      await db.insert(consultationRequests).values({
        name: consultationData.name,
        email: consultationData.email,
        phone: consultationData.phone,
        city: consultationData.city,
        state: consultationData.state,
        productInterest: consultationData.productInterest || null,
        hearAbout: consultationData.hearAbout || null,
        comments: consultationData.comments || null,
        status: 'pending'
      });
      return true;
    } catch (error) {
      console.error('Error creating consultation request:', error);
      throw error;
    }
  }

  static async createTeamApplication(applicationData: {
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    experience?: string;
    hearAbout?: string;
    description?: string;
    referredBy?: string;
  }): Promise<boolean> {
    try {
      await db.insert(teamApplications).values({
        name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        city: applicationData.city,
        state: applicationData.state,
        experience: applicationData.experience || null,
        hearAbout: applicationData.hearAbout || null,
        description: applicationData.description || null,
        referredBy: applicationData.referredBy || null,
        status: 'pending'
      });
      return true;
    } catch (error) {
      console.error('Error creating team application:', error);
      throw error;
    }
  }

  static async getConsultationRequests(): Promise<ConsultationRequest[]> {
    try {
      const requests = await db
        .select()
        .from(consultationRequests)
        .orderBy(desc(consultationRequests.createdAt));
      return requests;
    } catch (error) {
      console.error('Error fetching consultation requests:', error);
      return [];
    }
  }

  static async updateConsultationRequest(id: string, updates: Partial<ConsultationRequest>): Promise<ConsultationRequest | null> {
    try {
      const [updated] = await db
        .update(consultationRequests)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(consultationRequests.id, id))
        .returning();
      return updated;
    } catch (error) {
      console.error('Error updating consultation request:', error);
      return null;
    }
  }

  static async getTeamApplications(): Promise<TeamApplication[]> {
    try {
      const applications = await db
        .select()
        .from(teamApplications)
        .orderBy(desc(teamApplications.createdAt));
      return applications;
    } catch (error) {
      console.error('Error fetching team applications:', error);
      return [];
    }
  }

  static async updateTeamApplication(id: string, updates: Partial<TeamApplication>): Promise<TeamApplication | null> {
    try {
      const [updated] = await db
        .update(teamApplications)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(teamApplications.id, id))
        .returning();
      return updated;
    } catch (error) {
      console.error('Error updating team application:', error);
      return null;
    }
  }
}