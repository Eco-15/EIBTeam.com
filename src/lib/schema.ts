import { pgTable, uuid, text, timestamp, boolean, integer, numeric, date, time, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'agent', 'manager']);
export const statusEnum = pgEnum('status', ['active', 'inactive', 'suspended']);
export const salesStatusEnum = pgEnum('sales_status', ['pending', 'completed', 'cancelled']);
export const clientStatusEnum = pgEnum('client_status', ['active', 'inactive', 'prospect']);
export const clientSourceEnum = pgEnum('client_source', ['referral', 'cold_call', 'marketing', 'walk_in', 'online']);
export const appointmentStatusEnum = pgEnum('appointment_status', ['scheduled', 'completed', 'cancelled', 'no_show']);
export const bookStatusEnum = pgEnum('book_status', ['to-read', 'reading', 'completed']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high', 'urgent']);
export const targetAudienceEnum = pgEnum('target_audience', ['all', 'agents', 'managers']);
export const eventTypeEnum = pgEnum('event_type', ['meeting', 'training', 'call', 'bom', 'hierarchy', 'sales']);
export const dayOfWeekEnum = pgEnum('day_of_week', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
export const consultationStatusEnum = pgEnum('consultation_status', ['pending', 'contacted', 'completed', 'cancelled']);
export const applicationStatusEnum = pgEnum('application_status', ['pending', 'reviewing', 'interviewed', 'hired', 'rejected']);

// Users table (replaces Supabase auth.users)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  emailConfirmed: boolean('email_confirmed').default(false),
  firstName: text('first_name'),
  lastName: text('last_name'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Agent Profiles
export const agentProfiles = pgTable('agent_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  agentId: text('agent_id').unique(),
  hireDate: date('hire_date').defaultNow(),
  commissionRate: numeric('commission_rate').default('0.50'),
  teamLead: uuid('team_lead').references(() => users.id),
  status: statusEnum('status').default('active'),
  dateOfBirth: date('date_of_birth'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sales Activities
export const salesActivities = pgTable('sales_activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  clientName: text('client_name').notNull(),
  policyType: text('policy_type').notNull(),
  annualPremium: numeric('annual_premium').default('0'),
  commissionEarned: numeric('commission_earned').default('0'),
  saleDate: date('sale_date').defaultNow(),
  notes: text('notes'),
  status: salesStatusEnum('status').default('completed'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Clients
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zip_code'),
  dateOfBirth: date('date_of_birth'),
  status: clientStatusEnum('status').default('active'),
  source: clientSourceEnum('source').default('referral'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Appointments
export const appointments = pgTable('appointments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'set null' }),
  clientName: text('client_name').notNull(),
  clientPhone: text('client_phone'),
  clientEmail: text('client_email'),
  appointmentDate: date('appointment_date').notNull(),
  appointmentTime: time('appointment_time').notNull(),
  appointmentType: text('appointment_type').notNull(),
  status: appointmentStatusEnum('status').default('scheduled'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Training Progress
export const trainingProgress = pgTable('training_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  trainingId: integer('training_id').notNull(),
  trainingTitle: text('training_title').notNull(),
  progressPercentage: integer('progress_percentage').default(0),
  completed: boolean('completed').default(false),
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  lastAccessed: timestamp('last_accessed').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Book Progress
export const bookProgress = pgTable('book_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  bookId: integer('book_id').notNull(),
  bookTitle: text('book_title').notNull(),
  status: bookStatusEnum('status').default('to-read'),
  progressPercentage: integer('progress_percentage').default(0),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  rating: integer('rating'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// User Roles
export const userRoles = pgTable('user_roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  role: userRoleEnum('role').default('agent'),
  assignedBy: uuid('assigned_by').references(() => users.id),
  assignedAt: timestamp('assigned_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Announcements
export const announcements = pgTable('announcements', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  priority: priorityEnum('priority').default('medium'),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }),
  authorName: text('author_name').notNull(),
  targetAudience: targetAudienceEnum('target_audience').default('all'),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Schedule Events
export const scheduleEvents = pgTable('schedule_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  eventType: eventTypeEnum('event_type').notNull(),
  dayOfWeek: dayOfWeekEnum('day_of_week').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time'),
  timezone: text('timezone').default('CST'),
  zoomLink: text('zoom_link'),
  passcode: text('passcode'),
  isRecurring: boolean('is_recurring').default(true),
  isActive: boolean('is_active').default(true),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Consultation Requests
export const consultationRequests = pgTable('consultation_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  productInterest: text('product_interest'),
  hearAbout: text('hear_about'),
  comments: text('comments'),
  status: consultationStatusEnum('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Team Applications
export const teamApplications = pgTable('team_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  experience: text('experience'),
  hearAbout: text('hear_about'),
  description: text('description'),
  referredBy: text('referred_by'),
  status: applicationStatusEnum('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// User Invitations
export const userInvitations = pgTable('user_invitations', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  role: userRoleEnum('role').default('agent'),
  temporaryPassword: text('temporary_password').notNull(),
  invitedBy: uuid('invited_by').references(() => users.id),
  invitedAt: timestamp('invited_at').defaultNow(),
  acceptedAt: timestamp('accepted_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  agentProfile: one(agentProfiles),
  salesActivities: many(salesActivities),
  clients: many(clients),
  appointments: many(appointments),
  trainingProgress: many(trainingProgress),
  bookProgress: many(bookProgress),
  userRoles: many(userRoles),
  announcements: many(announcements),
  scheduleEvents: many(scheduleEvents),
  invitations: many(userInvitations),
}));

export const agentProfilesRelations = relations(agentProfiles, ({ one }) => ({
  user: one(users, {
    fields: [agentProfiles.userId],
    references: [users.id],
  }),
  teamLead: one(users, {
    fields: [agentProfiles.teamLead],
    references: [users.id],
  }),
}));

export const salesActivitiesRelations = relations(salesActivities, ({ one }) => ({
  user: one(users, {
    fields: [salesActivities.userId],
    references: [users.id],
  }),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
  appointments: many(appointments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [appointments.clientId],
    references: [clients.id],
  }),
}));

export const trainingProgressRelations = relations(trainingProgress, ({ one }) => ({
  user: one(users, {
    fields: [trainingProgress.userId],
    references: [users.id],
  }),
}));

export const bookProgressRelations = relations(bookProgress, ({ one }) => ({
  user: one(users, {
    fields: [bookProgress.userId],
    references: [users.id],
  }),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  assignedBy: one(users, {
    fields: [userRoles.assignedBy],
    references: [users.id],
  }),
}));

export const announcementsRelations = relations(announcements, ({ one }) => ({
  author: one(users, {
    fields: [announcements.authorId],
    references: [users.id],
  }),
}));

export const scheduleEventsRelations = relations(scheduleEvents, ({ one }) => ({
  createdBy: one(users, {
    fields: [scheduleEvents.createdBy],
    references: [users.id],
  }),
}));

export const userInvitationsRelations = relations(userInvitations, ({ one }) => ({
  invitedBy: one(users, {
    fields: [userInvitations.invitedBy],
    references: [users.id],
  }),
}));