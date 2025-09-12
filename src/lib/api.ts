// API service for server-side operations
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export class ApiService {
  private static getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  // Contact form submissions
  static async submitContactForm(formData: {
    formType: 'consultation' | 'team';
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    productInterest?: string;
    hearAbout?: string;
    comments?: string;
    experience?: string;
    description?: string;
    referredBy?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Admin operations
  static async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    role: 'admin' | 'agent';
    temporaryPassword?: string;
  }): Promise<{ success: boolean; user?: any; temporaryPassword?: string; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/create-user`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: 'Network error' };
    }
  }

  static async getUserInvitations(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/invitations`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return result.invitations || [];
    } catch (error) {
      console.error('Error fetching invitations:', error);
      return [];
    }
  }
}