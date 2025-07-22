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

// Database service functions
export class DatabaseService {
  // Agent Profile functions
  static async getAgentProfile(userId: string): Promise<AgentProfile | null> {
    const { data, error } = await supabase
      .from('agent_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
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
      .upsert([{
        user_id: userId,
        training_id: trainingId,
        ...updates
      }])
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

    return data;
  }
}