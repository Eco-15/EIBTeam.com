import { supabase } from './supabase';

export class AdminService {
  private static async callAdminFunction(operation: string, data: any) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-operations/${operation}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Admin operation failed');
    }

    return result;
  }

  static async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'agent' | 'manager';
    temporaryPassword?: string;
  }) {
    return this.callAdminFunction('create-user', userData);
  }

  static async createUserInvitation(invitationData: {
    email: string;
    first_name?: string;
    last_name?: string;
    role: 'admin' | 'agent' | 'manager';
    temporary_password: string;
    invited_by: string;
  }) {
    return this.callAdminFunction('create-invitation', invitationData);
  }

  static async getUserInvitations() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-operations/get-invitations`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to get invitations');
    }

    return result.invitations || [];
  }
}