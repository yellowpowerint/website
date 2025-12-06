// Newsletter service integrations for Mailchimp and SendGrid

interface NewsletterSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

interface NewsletterResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Subscribe to Mailchimp list
 */
async function subscribeMailchimp(subscriber: NewsletterSubscriber): Promise<NewsletterResponse> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    throw new Error('Mailchimp configuration missing');
  }

  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const data = {
    email_address: subscriber.email,
    status: 'subscribed',
    merge_fields: {
      FNAME: subscriber.firstName || '',
      LNAME: subscriber.lastName || '',
    },
    tags: subscriber.tags || [],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
      };
    }

    // Check if already subscribed
    if (result.title === 'Member Exists') {
      return {
        success: true,
        message: 'You are already subscribed to our newsletter!',
      };
    }

    console.error('Mailchimp error:', result);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again.',
      error: result.detail || 'Unknown error',
    };
  } catch (error) {
    console.error('Mailchimp API error:', error);
    throw error;
  }
}

/**
 * Subscribe to SendGrid Marketing list
 */
async function subscribeSendGrid(subscriber: NewsletterSubscriber): Promise<NewsletterResponse> {
  const apiKey = process.env.SENDGRID_MARKETING_API_KEY;
  const listId = process.env.SENDGRID_LIST_ID;

  if (!apiKey || !listId) {
    throw new Error('SendGrid configuration missing');
  }

  const url = 'https://api.sendgrid.com/v3/marketing/contacts';

  const data = {
    list_ids: [listId],
    contacts: [
      {
        email: subscriber.email,
        first_name: subscriber.firstName || '',
        last_name: subscriber.lastName || '',
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
      };
    }

    const result = await response.json();
    console.error('SendGrid error:', result);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again.',
      error: result.errors?.[0]?.message || 'Unknown error',
    };
  } catch (error) {
    console.error('SendGrid API error:', error);
    throw error;
  }
}

/**
 * Subscribe to newsletter (auto-detects provider)
 */
export async function subscribeToNewsletter(subscriber: NewsletterSubscriber): Promise<NewsletterResponse> {
  const provider = process.env.NEWSLETTER_PROVIDER?.toLowerCase() || 'mailchimp';

  try {
    if (provider === 'sendgrid') {
      return await subscribeSendGrid(subscriber);
    } else if (provider === 'mailchimp') {
      return await subscribeMailchimp(subscriber);
    } else {
      // Fallback: just return success (for development/testing)
      console.warn(`Unknown newsletter provider: ${provider}. Subscription not processed.`);
      return {
        success: true,
        message: 'Newsletter subscription received (provider not configured).',
      };
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Check if it's a configuration error
    if (error instanceof Error && error.message.includes('configuration missing')) {
      return {
        success: false,
        message: 'Newsletter service is not configured. Please contact support.',
        error: error.message,
      };
    }

    throw error;
  }
}

/**
 * Check if newsletter is configured
 */
export function isNewsletterConfigured(): boolean {
  const provider = process.env.NEWSLETTER_PROVIDER?.toLowerCase();

  if (provider === 'mailchimp') {
    return !!(
      process.env.MAILCHIMP_API_KEY &&
      process.env.MAILCHIMP_SERVER_PREFIX &&
      process.env.MAILCHIMP_AUDIENCE_ID
    );
  }

  if (provider === 'sendgrid') {
    return !!(
      process.env.SENDGRID_MARKETING_API_KEY &&
      process.env.SENDGRID_LIST_ID
    );
  }

  return false;
}
