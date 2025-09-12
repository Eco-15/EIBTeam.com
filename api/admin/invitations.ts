import { AuthService } from '../../src/lib/auth';
import { DatabaseService } from '../../src/lib/database';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Verify admin authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: 'Missing authorization' });
    }

    const token = authHeader.replace('Bearer ', '');
    const currentUser = await AuthService.getUserFromToken(token);
    if (!currentUser) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    const isAdmin = await DatabaseService.isAdmin(currentUser.id);
    if (!isAdmin) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    }

    const invitations = await DatabaseService.getUserInvitations();

    return res.status(200).json({ 
      success: true, 
      invitations
    });
  } catch (error) {
    console.error('Get invitations error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch invitations' 
    });
  }
}