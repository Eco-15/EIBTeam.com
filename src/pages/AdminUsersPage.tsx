import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { Users, Plus, Mail, Shield, Calendar, Trash2, Edit, CheckCircle, Clock, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DatabaseService } from '@/lib/database';

interface UserInvitation {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'agent' | 'manager';
  temporary_password: string;
  invited_by: string;
  invited_at: string;
  accepted_at?: string;
  is_active: boolean;
}

const AdminUsersPage = () => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [userForm, setUserForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'agent',
    temporaryPassword: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/agent-login';
          return;
        }

        setCurrentUser(user);

        // Check if user is admin
        const adminStatus = await DatabaseService.isAdmin(user.id);
        setIsAdmin(adminStatus);

        if (!adminStatus) {
          window.location.href = '/dashboard';
          return;
        }

        // Load invitations
        await loadInvitations();
      } catch (error) {
        console.error('Error loading admin users data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const loadInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('user_invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading invitations:', error);
        return;
      }

      setInvitations(data || []);
    } catch (error) {
      console.error('Error loading invitations:', error);
    }
  };

  const generateTemporaryPassword = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !isAdmin) return;

    setIsSubmitting(true);

    try {
      // Generate temporary password if not provided
      const tempPassword = userForm.temporaryPassword || generateTemporaryPassword();

      // Create user in Supabase Auth using Admin API
      const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
        email: userForm.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          first_name: userForm.firstName,
          last_name: userForm.lastName,
          role: userForm.role
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        alert(`Error creating user: ${authError.message}`);
        setIsSubmitting(false);
        return;
      }

      if (!newUser.user) {
        alert('Error: User creation failed');
        setIsSubmitting(false);
        return;
      }

      // Create invitation record
      const { error: inviteError } = await supabase
        .from('user_invitations')
        .insert([{
          email: userForm.email,
          first_name: userForm.firstName,
          last_name: userForm.lastName,
          role: userForm.role,
          temporary_password: tempPassword,
          invited_by: currentUser.id
        }]);

      if (inviteError) {
        console.error('Invitation error:', inviteError);
        alert(`Error creating invitation: ${inviteError.message}`);
        setIsSubmitting(false);
        return;
      }

      // Create user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{
          user_id: newUser.user.id,
          role: userForm.role,
          assigned_by: currentUser.id
        }]);

      if (roleError) {
        console.error('Role error:', roleError);
      }

      // Create agent profile if role is agent
      if (userForm.role === 'agent') {
        const { error: profileError } = await supabase
          .from('agent_profiles')
          .insert([{
            user_id: newUser.user.id,
            first_name: userForm.firstName,
            last_name: userForm.lastName,
            status: 'active'
          }]);

        if (profileError) {
          console.error('Profile error:', profileError);
        }
      }

      // Reload invitations
      await loadInvitations();

      setSubmitSuccess(true);
      setShowAddUserForm(false);
      setUserForm({
        email: '',
        firstName: '',
        lastName: '',
        role: 'agent',
        temporaryPassword: ''
      });

      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleDeleteInvitation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invitation?')) return;

    try {
      const { error } = await supabase
        .from('user_invitations')
        .update({ is_active: false })
        .eq('id', id);

      if (error) {
        console.error('Error deleting invitation:', error);
        alert('Error deleting invitation');
        return;
      }

      await loadInvitations();
    } catch (error) {
      console.error('Error deleting invitation:', error);
      alert('Error deleting invitation');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user management...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const activeInvitations = invitations.filter(inv => inv.is_active);
  const pendingInvitations = activeInvitations.filter(inv => !inv.accepted_at);
  const acceptedInvitations = activeInvitations.filter(inv => inv.accepted_at);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="mt-2 text-gray-600">Manage user accounts and invitations for the EIB Team platform.</p>
                
                {submitSuccess && (
                  <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-green-700 font-medium">User created successfully! They can now log in with their credentials.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-blue-600">{activeInvitations.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-3xl font-bold text-green-600">{acceptedInvitations.length}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-3xl font-bold text-yellow-600">{pendingInvitations.length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Agents</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {activeInvitations.filter(inv => inv.role === 'agent').length}
                      </p>
                    </div>
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Add User Button */}
              <div className="mb-8">
                <button
                  onClick={() => setShowAddUserForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add New User</span>
                </button>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invited</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeInvitations.map((invitation) => (
                        <tr key={invitation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {invitation.first_name?.[0] || invitation.email[0].toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {invitation.first_name && invitation.last_name 
                                    ? `${invitation.first_name} ${invitation.last_name}`
                                    : invitation.email
                                  }
                                </div>
                                <div className="text-sm text-gray-500">{invitation.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              invitation.role === 'admin' ? 'bg-red-100 text-red-800' :
                              invitation.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {invitation.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              invitation.accepted_at ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {invitation.accepted_at ? 'Active' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(invitation.invited_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleDeleteInvitation(invitation.id)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {activeInvitations.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No users found</p>
                      <button
                        onClick={() => setShowAddUserForm(true)}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-colors"
                      >
                        Add First User
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Add User Modal */}
        {showAddUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
                  <button
                    onClick={() => setShowAddUserForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleAddUser} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={userForm.firstName}
                      onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={userForm.lastName}
                      onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <select
                    required
                    value={userForm.role}
                    onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="agent">Agent</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temporary Password 
                    <span className="text-gray-500 text-xs">(leave blank to auto-generate)</span>
                  </label>
                  <input
                    type="text"
                    value={userForm.temporaryPassword}
                    onChange={(e) => setUserForm({...userForm, temporaryPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Auto-generated if empty"
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">User Creation Process</h4>
                      <p className="text-xs text-blue-700">
                        The user will be created with the provided credentials and can immediately log in to their dashboard. 
                        Make sure to share the login credentials securely with the new user.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddUserForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating User...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;