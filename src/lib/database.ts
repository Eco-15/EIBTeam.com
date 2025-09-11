import { supabase } from './supabase';

// Types for database tables
export interface AgentProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  agent_id?: string;
  hire_date?: string;
  date_of_birth?: string;
  commission_rate?: number;
  team_lead?: string;
  status?: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface SalesActivity {
  id: string;
  user_id: string;
  client_name: string;
  policy_type: string;
  annual_premium: number;
  commission_earned?: number;
  sale_date?: string;
  notes?: string;
  status?: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  date_of_birth?: string;
  status?: 'active' | 'inactive' | 'prospect';
  source?: 'referral' | 'cold_call' | 'marketing' | 'walk_in' | 'online';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  client_id?: string;
  client_name: string;
  client_phone?: string;
  client_email?: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  status?: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TrainingProgress {
  id: string;
  user_id: string;
  training_id: number;
  training_title: string;
  progress_percentage?: number;
  completed?: boolean;
  started_at?: string;
  completed_at?: string;
  last_accessed?: string;
  created_at: string;
  updated_at: string;
}

export interface BookProgress {
  id: string;
  user_id: string;
  book_id: number;
  book_title: string;
  status?: 'to-read' | 'reading' | 'completed';
  progress_percentage?: number;
  started_at?: string;
  completed_at?: string;
  rating?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'agent';
  assigned_by?: string;
  assigned_at: string;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  author_id: string;
  author_name: string;
  target_audience: 'all' | 'agents' ;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  event_type: 'Meeting' | 'Training' | 'Call' | 'BOM' | 'Hierarchy' | 'Sales';
  day_of_week: string;
  start_time: string;
  end_time?: string;
  timezone: string;
  zoom_link?: string;
  passcode?: string;
  is_recurring: boolean;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface UserInvitation {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'agent';
  temporary_password: string;
  invited_by: string;
  invited_at: string;
  accepted_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  product_interest?: string;
  hear_about?: string;
  comments?: string;
  status?: 'pending' | 'contacted' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface TeamApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  experience?: string;
  hear_about?: string;
  description?: string;
  referred_by?: string;
  status?: 'pending' | 'reviewing' | 'interviewed' | 'hired' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Database service functions
export class DatabaseService {
  // Agent Profile functions
  static async getAgentProfile(userId: string): Promise<AgentProfile | null> {
    const { data, error } = await supabase
      .from('agent_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching agent profile:', error);
      return null;
    }

    return data;
  }

  static async createAgentProfile(profile: Partial<AgentProfile>): Promise<AgentProfile | null> {
    const { data, error } = await supabase
      .from('agent_profiles')
      .insert([profile])
      .select()
      .single();

    if (error) {
      console.error('Error creating agent profile:', error);
      return null;
    }

    return data;
  }

  static async updateAgentProfile(userId: string, updates: Partial<AgentProfile>): Promise<AgentProfile | null> {
    const { data, error } = await supabase
      .from('agent_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating agent profile:', error);
      return null;
    }

    return data;
  }

  // Sales Activities functions
  static async getSalesActivities(userId: string): Promise<SalesActivity[]> {
    const { data, error } = await supabase
      .from('sales_activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sales activities:', error);
      return [];
    }

    return data || [];
  }

  static async createSalesActivity(activity: Partial<SalesActivity>): Promise<SalesActivity | null> {
    const { data, error } = await supabase
      .from('sales_activities')
      .insert([activity])
      .select()
      .single();

    if (error) {
      console.error('Error creating sales activity:', error);
      return null;
    }

    return data;
  }

  static async getMonthlySalesTotal(userId: string): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('sales_activities')
      .select('annual_premium')
      .eq('user_id', userId)
      .gte('sale_date', startOfMonth.toISOString().split('T')[0]);

    if (error) {
      console.error('Error fetching monthly sales:', error);
      return 0;
    }

    return data?.reduce((total, sale) => total + (sale.annual_premium || 0), 0) || 0;
  }

  // Clients functions
  static async getClients(userId: string): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clients:', error);
      return [];
    }

    return data || [];
  }

  static async createClient(client: Partial<Client>): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select()
      .single();

    if (error) {
      console.error('Error creating client:', error);
      return null;
    }

    return data;
  }

  static async getActiveClientsCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching active clients count:', error);
      return 0;
    }

    return count || 0;
  }

  // Appointments functions
  static async getAppointments(userId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', userId)
      .order('appointment_date', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }

    return data || [];
  }

  static async createAppointment(appointment: Partial<Appointment>): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select()
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      return null;
    }

    return data;
  }

  // Training Progress functions
  static async getTrainingProgress(userId: string): Promise<TrainingProgress[]> {
    const { data, error } = await supabase
      .from('training_progress')
      .select('*')
      .eq('user_id', userId)
      .order('last_accessed', { ascending: false });

    if (error) {
      console.error('Error fetching training progress:', error);
      return [];
    }

    return data || [];
  }

  static async updateTrainingProgress(userId: string, trainingId: number, updates: Partial<TrainingProgress>): Promise<TrainingProgress | null> {
    const { data, error } = await supabase
      .from('training_progress')
      .upsert({
        user_id: userId,
        training_id: trainingId,
        ...updates
      }, {
        onConflict: 'user_id,training_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating training progress:', error);
      return null;
    }

    return data;
  }

  // Book Progress functions
  static async getBookProgress(userId: string): Promise<BookProgress[]> {
    const { data, error } = await supabase
      .from('book_progress')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching book progress:', error);
      return [];
    }

    return data || [];
  }

  static async updateBookProgress(userId: string, bookId: number, updates: Partial<BookProgress>): Promise<BookProgress | null> {
    const { data, error } = await supabase
      .from('book_progress')
      .upsert([{
        user_id: userId,
        book_id: bookId,
        ...updates
      }])
      .select()
      .single();

    if (error) {
      console.error('Error updating book progress:', error);
      return null;
    }
  }

  // User Role functions
  static async getUserRole(userId: string): Promise<UserRole | null> {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error getting user role:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }

  static async isAdmin(userId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      // Also check user_roles table
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }
      
      console.log('Admin role check result:', data);
      return data?.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  // Announcements functions
  static async createAnnouncement(announcement: Partial<Announcement>): Promise<Announcement | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const announcementData = {
        ...announcement,
        author_id: user.id,
        author_name: announcement.author_name || 'Admin'
      };

      const { data, error } = await supabase
        .from('announcements')
        .insert([announcementData])
        .select()
        .single();

      if (error) {
        console.error('Error creating announcement:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating announcement:', error);
      return null;
    }
  }

  static async getAnnouncements(): Promise<Announcement[]> {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching announcements:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return [];
    }
  }

  static async updateAnnouncement(id: string, updates: Partial<Announcement>): Promise<Announcement | null> {
    const { data, error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating announcement:', error);
      return null;
    }

    return data;
  }

  static async deleteAnnouncement(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('announcements')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      return false;
    }

    return true;
  }

  // Schedule Events functions
  static async createScheduleEvent(event: Partial<ScheduleEvent>): Promise<ScheduleEvent | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const eventData = {
        ...event,
        created_by: user.id
      };

      const { data, error } = await supabase
        .from('schedule_events')
        .insert([eventData])
        .select()
        .single();

      if (error) {
        console.error('Error creating schedule event:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating schedule event:', error);
      return null;
    }
  }

  static async getScheduleEvents(): Promise<ScheduleEvent[]> {
    try {
      const { data, error } = await supabase
        .from('schedule_events')
        .select('*')
        .eq('is_active', true)
        .order('day_of_week', { ascending: true });

      if (error) {
        console.error('Error fetching schedule events:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching schedule events:', error);
      return [];
    }
  }

  static async updateScheduleEvent(id: string, updates: Partial<ScheduleEvent>): Promise<ScheduleEvent | null> {
    const { data, error } = await supabase
      .from('schedule_events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating schedule event:', error);
      return null;
    }

    return data;
  }

  static async deleteScheduleEvent(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('schedule_events')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting schedule event:', error);
      return false;
    }

    return true;
  }

  // User Invitations functions
  static async getUserInvitations(): Promise<UserInvitation[]> {
    const { data, error } = await supabase
      .from('user_invitations')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user invitations:', error);
      return [];
    }

    return data || [];
  }

  static async createUserInvitation(invitation: Partial<UserInvitation>): Promise<UserInvitation | null> {
    const { data, error } = await supabase
      .from('user_invitations')
      .insert([invitation])
      .select()
      .single();

    if (error) {
      console.error('Error creating user invitation:', error);
      return null;
    }

    return data;
  }

  static async updateUserInvitation(id: string, updates: Partial<UserInvitation>): Promise<UserInvitation | null> {
    const { data, error } = await supabase
      .from('user_invitations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user invitation:', error);
      return null;
    }

    return data;
  }

  static async deleteUserInvitation(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('user_invitations')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting user invitation:', error);
      return false;
    }

    return true;
  }

  // Consultation Requests functions
  static async createConsultationRequest(request: Partial<ConsultationRequest>): Promise<ConsultationRequest | null> {
    try {
      // Use anon key for public consultation requests
      const { data, error } = await supabase
        .from('consultation_requests')
        .insert([request])
        .select()
        .single();

      if (error) {
        console.error('Error creating consultation request:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating consultation request:', error);
      return null;
    }
  }

  static async createTeamApplication(application: Partial<TeamApplication>): Promise<TeamApplication | null> {
    try {
      // Use anon key for public team applications
      const { data, error } = await supabase
        .from('team_applications')
        .insert([application])
        .select()
        .single();

      if (error) {
        console.error('Error creating team application:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating team application:', error);
      return null;
    }
  }

  static async getConsultationRequests(): Promise<ConsultationRequest[]> {
    try {
      const { data, error } = await supabase
        .from('consultation_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching consultation requests:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching consultation requests:', error);
      return [];
    }
  }

  static async updateConsultationRequest(id: string, updates: Partial<ConsultationRequest>): Promise<ConsultationRequest | null> {
    try {
      const { data, error } = await supabase
        .from('consultation_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating consultation request:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating consultation request:', error);
      return null;
    }
  }

  // Team Applications functions
  static async createTeamApplication(application: Partial<TeamApplication>): Promise<TeamApplication | null> {
    try {
      const { data, error } = await supabase
        .from('team_applications')
        .insert([application])
        .select()
        .single();

      if (error) {
        console.error('Error creating team application:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating team application:', error);
      return null;
    }
  }

  static async getTeamApplications(): Promise<TeamApplication[]> {
    try {
      const { data, error } = await supabase
        .from('team_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching team applications:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching team applications:', error);
      return [];
    }
  }

  static async updateTeamApplication(id: string, updates: Partial<TeamApplication>): Promise<TeamApplication | null> {
    try {
      const { data, error } = await supabase
        .from('team_applications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating team application:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating team application:', error);
      return null;
    }
  }

}