import { DatabaseService } from '../src/lib/database';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { formType, ...formData } = req.body;

    if (formType === 'consultation') {
      await DatabaseService.createConsultationRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        productInterest: formData.productInterest,
        hearAbout: formData.hearAbout,
        comments: formData.comments,
      });
    } else if (formType === 'team') {
      await DatabaseService.createTeamApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        experience: formData.experience,
        hearAbout: formData.hearAbout,
        description: formData.description,
        referredBy: formData.referredBy,
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid form type' 
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to submit form' 
    });
  }
}