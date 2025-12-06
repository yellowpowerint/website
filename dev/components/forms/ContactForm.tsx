'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Send } from 'lucide-react';

// Inquiry categories
const INQUIRY_CATEGORIES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'quote', label: 'Request for Quote/Consultation' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'supplier', label: 'Supplier Registration' },
  { value: 'career', label: 'Career Inquiry' },
  { value: 'media', label: 'Media Inquiry' },
] as const;

// Base schema for all categories
const baseSchema = z.object({
  category: z.string().min(1, 'Please select an inquiry category'),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  message: z.string().min(20, 'Message should be at least 20 characters'),
});

// Extended schemas for specific categories
const quoteSchema = baseSchema.extend({
  company: z.string().min(2, 'Company name is required'),
  serviceType: z.string().min(1, 'Please select a service type'),
  projectDetails: z.string().min(30, 'Please provide more details about your project'),
  timeline: z.string().optional(),
});

const partnershipSchema = baseSchema.extend({
  company: z.string().min(2, 'Company name is required'),
  partnershipType: z.string().min(1, 'Please describe the type of partnership'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

const supplierSchema = baseSchema.extend({
  company: z.string().min(2, 'Company name is required'),
  productCategory: z.string().min(2, 'Product/service category is required'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

const careerSchema = baseSchema.extend({
  roleInterest: z.string().min(2, 'Please specify the role you\'re interested in'),
  experience: z.string().min(1, 'Please specify your experience level'),
});

const mediaSchema = baseSchema.extend({
  outlet: z.string().min(2, 'Media outlet is required'),
  deadline: z.string().optional(),
  inquiryType: z.string().min(2, 'Please specify the type of media inquiry'),
});

type BaseFormData = z.infer<typeof baseSchema>;
type QuoteFormData = z.infer<typeof quoteSchema>;
type PartnershipFormData = z.infer<typeof partnershipSchema>;
type SupplierFormData = z.infer<typeof supplierSchema>;
type CareerFormData = z.infer<typeof careerSchema>;
type MediaFormData = z.infer<typeof mediaSchema>;
type FormData = BaseFormData | QuoteFormData | PartnershipFormData | SupplierFormData | CareerFormData | MediaFormData;

export function ContactForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Determine schema based on category
  const getSchema = () => {
    switch (selectedCategory) {
      case 'quote':
        return quoteSchema;
      case 'partnership':
        return partnershipSchema;
      case 'supplier':
        return supplierSchema;
      case 'career':
        return careerSchema;
      case 'media':
        return mediaSchema;
      default:
        return baseSchema;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(getSchema()),
    mode: 'onChange',
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setValue('category', value);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        reset();
        setSelectedCategory('');
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit inquiry. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-12 pb-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your inquiry has been received. Our team will get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-gray-500">
            For urgent matters, please call us at +233 268 066 942
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below and our team will respond within 24-48 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Inquiry Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Inquiry Category <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                {INQUIRY_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Basic Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="+233 XXX XXX XXX"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Category-specific fields */}
          {(selectedCategory === 'quote' || selectedCategory === 'partnership' || selectedCategory === 'supplier') && (
            <div className="space-y-2">
              <Label htmlFor="company">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                {...register('company' as keyof FormData)}
                placeholder="Your Company Name"
              />
              {'company' in errors && errors.company && (
                <p className="text-sm text-red-500">{String(errors.company?.message)}</p>
              )}
            </div>
          )}

          {selectedCategory === 'quote' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="serviceType">
                  Service Type <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('serviceType' as keyof FormData, value)}>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-split">Pre Split Drilling</SelectItem>
                    <SelectItem value="production">Production Drilling</SelectItem>
                    <SelectItem value="rc">Reverse Circulation Drilling</SelectItem>
                    <SelectItem value="load-haul">Load & Haul Operations</SelectItem>
                    <SelectItem value="construction">Construction Services</SelectItem>
                  </SelectContent>
                </Select>
                {'serviceType' in errors && errors.serviceType && (
                  <p className="text-sm text-red-500">{String(errors.serviceType?.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDetails">
                  Project Details <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="projectDetails"
                  {...register('projectDetails' as keyof FormData)}
                  placeholder="Describe your project requirements, location, timeline, etc."
                  rows={4}
                />
                {'projectDetails' in errors && errors.projectDetails && (
                  <p className="text-sm text-red-500">{String(errors.projectDetails?.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Input
                  id="timeline"
                  {...register('timeline' as keyof FormData)}
                  placeholder="e.g., Q1 2025"
                />
              </div>
            </>
          )}

          {selectedCategory === 'partnership' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="partnershipType">
                  Partnership Type <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="partnershipType"
                  {...register('partnershipType' as keyof FormData)}
                  placeholder="e.g., Strategic Alliance, Joint Venture, etc."
                />
                {'partnershipType' in errors && errors.partnershipType && (
                  <p className="text-sm text-red-500">{String(errors.partnershipType?.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  {...register('website' as keyof FormData)}
                  placeholder="https://www.example.com"
                />
                {'website' in errors && errors.website && (
                  <p className="text-sm text-red-500">{String(errors.website?.message)}</p>
                )}
              </div>
            </>
          )}

          {selectedCategory === 'supplier' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="productCategory">
                  Product/Service Category <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productCategory"
                  {...register('productCategory' as keyof FormData)}
                  placeholder="e.g., Equipment Parts, Maintenance Services, etc."
                />
                {'productCategory' in errors && errors.productCategory && (
                  <p className="text-sm text-red-500">{String(errors.productCategory?.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  {...register('website' as keyof FormData)}
                  placeholder="https://www.example.com"
                />
                {'website' in errors && errors.website && (
                  <p className="text-sm text-red-500">{String(errors.website?.message)}</p>
                )}
              </div>
            </>
          )}

          {selectedCategory === 'career' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="roleInterest">
                  Role of Interest <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="roleInterest"
                  {...register('roleInterest' as keyof FormData)}
                  placeholder="e.g., Drill Operator, Mining Engineer, etc."
                />
                {'roleInterest' in errors && errors.roleInterest && (
                  <p className="text-sm text-red-500">{String(errors.roleInterest?.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">
                  Years of Experience <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('experience' as keyof FormData, value)}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                {'experience' in errors && errors.experience && (
                  <p className="text-sm text-red-500">{String(errors.experience?.message)}</p>
                )}
              </div>
            </>
          )}

          {selectedCategory === 'media' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="outlet">
                  Media Outlet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="outlet"
                  {...register('outlet' as keyof FormData)}
                  placeholder="e.g., Ghana Broadcasting Corporation"
                />
                {'outlet' in errors && errors.outlet && (
                  <p className="text-sm text-red-500">{String(errors.outlet?.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiryType">
                  Type of Inquiry <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="inquiryType"
                  {...register('inquiryType' as keyof FormData)}
                  placeholder="e.g., Interview Request, Press Release, etc."
                />
                {'inquiryType' in errors && errors.inquiryType && (
                  <p className="text-sm text-red-500">{String(errors.inquiryType?.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline (if applicable)</Label>
                <Input
                  id="deadline"
                  type="date"
                  {...register('deadline' as keyof FormData)}
                />
              </div>
            </>
          )}

          {/* Message field */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Please provide additional details about your inquiry..."
              rows={5}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gold-500 hover:bg-gold-600 text-white"
            disabled={isSubmitting || !selectedCategory}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Submit Inquiry
              </span>
            )}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
