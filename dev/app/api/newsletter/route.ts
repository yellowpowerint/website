import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations/newsletter';
import { subscribeToNewsletter, isNewsletterConfigured } from '@/lib/api/newsletter';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate with Zod
    const validatedData = newsletterSchema.parse(body);

    // Check if newsletter service is configured
    if (!isNewsletterConfigured()) {
      console.warn('Newsletter service not configured, but accepting subscription');
    }

    // Subscribe to newsletter (Mailchimp or SendGrid)
    const result = await subscribeToNewsletter({
      email: validatedData.email,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        error: result.message,
      }, { status: 400 });
    }

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      }, { status: 400 });
    }

    console.error('Newsletter API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to subscribe. Please try again later.',
    }, { status: 500 });
  }
}
