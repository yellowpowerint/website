const ERP_API = process.env.NEXT_PUBLIC_ERP_API_URL || 'https://erp.yellowpowerinternational.com/api';

export async function getJobs(filters = {}) {
  try {
    const params = new URLSearchParams(filters);
    const res = await fetch(ERP_API + '/public/careers/jobs?' + params, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export async function getJobById(jobId) {
  try {
    const res = await fetch(ERP_API + '/public/careers/jobs/' + jobId, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function submitApplication(data) {
  const res = await fetch(ERP_API + '/public/careers/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
