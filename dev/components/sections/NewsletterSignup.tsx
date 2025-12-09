'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, type NewsletterInput } from '@/lib/validations/newsletter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Mail } from 'lucide-react';

export function NewsletterSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="py-12 px-6 rounded-xl" style={{ backgroundColor: '#003087' }}>
      <div className="max-w-4xl mx-auto text-center">
        <Mail className="h-12 w-12 text-gold mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Stay Updated with YPI News
        </h3>
        <p className="text-gray-300 mb-6">
          Subscribe to our newsletter for the latest updates on projects, equipment, and industry insights.
        </p>

        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Thank you for subscribing.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white text-navy"
                  aria-label="Email address"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-300 mt-1 text-left">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold hover:bg-gold-600 text-navy font-semibold px-6"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              We respect your privacy. Unsubscribe at any time.{' '}
              <Link href="/news/newsletter-archive" className="text-gold-200 hover:text-gold-100 underline">
                View past newsletters
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
