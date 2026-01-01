'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { submitApplication } from '@/lib/api/erp-careers';

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  onClose: () => void;
}

export function ApplicationForm({ jobId, jobTitle, onClose }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resumeText: '',
    coverLetter: '',
    linkedinUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitApplication({ ...formData, jobPostingId: jobId });
      setSuccess(true);
      setTimeout(() => onClose(), 3000);
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-navy mb-2">Application Submitted!</h3>
          <p className="text-gray-600">Thank you for applying. We will review your application and get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-navy text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Apply for Position</h2>
            <p className="text-sm text-gray-300">{jobTitle}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
            <input type="url" value={formData.linkedinUrl} onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })} className="w-full border rounded px-3 py-2" placeholder="https://linkedin.com/in/yourprofile" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cover Letter *</label>
            <textarea required value={formData.coverLetter} onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })} className="w-full border rounded px-3 py-2" rows={4} placeholder="Tell us why you are interested in this position..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resume/CV Text *</label>
            <textarea required value={formData.resumeText} onChange={(e) => setFormData({ ...formData, resumeText: e.target.value })} className="w-full border rounded px-3 py-2" rows={6} placeholder="Paste your resume or CV text here..." />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" onClick={onClose} variant="outline">Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold-600 text-navy">
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
