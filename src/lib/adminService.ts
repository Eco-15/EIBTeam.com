import { ApiService } from './api';

class AdminService {
  static async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    role: 'admin' | 'agent';
    temporaryPassword?: string;
  }) {
    return ApiService.createUser(userData);
  }

  static async createUserInvitation(invitationData: {
    email: string;
    first_name?: string;
    last_name?: string;
    role: 'admin' | 'agent';
    temporary_password: string;
    invited_by: string;
  }) {
    // This would need to be implemented in the new API
    throw new Error('Not implemented in new API yet');
  }

  static async getUserInvitations() {
    return ApiService.getUserInvitations();
  }
}

export { AdminService };