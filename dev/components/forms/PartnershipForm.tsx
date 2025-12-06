"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";

const partnershipSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  partnershipType: z.enum(["joint-venture", "strategic-alliance", "subcontracting", "other"], {
    required_error: "Please select partnership type",
  }),
  proposal: z.string().min(50, "Please provide at least 50 characters describing your proposal"),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

export function PartnershipForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<PartnershipFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
  });

  const onSubmit = async (data: PartnershipFormData) => {
    try {
      // Map form data to API schema
      const apiPayload = {
        companyName: data.companyName,
        contactName: data.contactPerson,
        email: data.email,
        phone: data.phone,
        website: '', // Optional field not in current form
        partnershipType: data.partnershipType,
        industry: 'Mining', // Default since not in form
        proposalSummary: data.proposal,
        expectedOutcomes: data.proposal, // Use proposal as outcomes
        timeline: undefined,
      };

      const response = await fetch('/api/partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit partnership application');
      }

      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Partnership application error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    }
  };

  const resetForm = () => {
    reset();
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  if (isSubmitted && submittedData) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          <CardDescription>
            Thank you for your interest in partnering with Yellow Power International. 
            We&apos;ll review your application and contact you within 5 business days.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg space-y-2">
            <h3 className="font-semibold text-navy mb-3">Application Summary:</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{submittedData.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium">{submittedData.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{submittedData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Partnership Type:</span>
                <span className="font-medium capitalize">
                  {submittedData.partnershipType.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={resetForm} variant="outline" className="flex-1">
              Submit Another Application
            </Button>
            <Button asChild className="flex-1 bg-gold hover:bg-gold-600 text-navy">
              <a href="/partnerships">Back to Partnerships</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Partnership Application</CardTitle>
        <CardDescription>
          Fill out this form to express your interest in partnering with us
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                {...register("companyName")}
                placeholder="Your Company Ltd."
                className="mt-1.5"
                aria-describedby={errors.companyName ? "companyName-error" : undefined}
              />
              {errors.companyName && (
                <p id="companyName-error" className="text-sm text-red-600 mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="contactPerson">
                Contact Person <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                {...register("contactPerson")}
                placeholder="John Doe"
                className="mt-1.5"
                aria-describedby={errors.contactPerson ? "contactPerson-error" : undefined}
              />
              {errors.contactPerson && (
                <p id="contactPerson-error" className="text-sm text-red-600 mt-1">
                  {errors.contactPerson.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@company.com"
                className="mt-1.5"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+233 XX XXX XXXX"
                className="mt-1.5"
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-red-600 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="partnershipType">
              Type of Partnership <span className="text-red-500">*</span>
            </Label>
            <select
              id="partnershipType"
              {...register("partnershipType")}
              className="w-full mt-1.5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              aria-describedby={errors.partnershipType ? "partnershipType-error" : undefined}
            >
              <option value="">Select partnership type...</option>
              <option value="joint-venture">Joint Venture</option>
              <option value="strategic-alliance">Strategic Alliance</option>
              <option value="subcontracting">Subcontracting Opportunity</option>
              <option value="other">Other</option>
            </select>
            {errors.partnershipType && (
              <p id="partnershipType-error" className="text-sm text-red-600 mt-1">
                {errors.partnershipType.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="proposal">
              Partnership Proposal <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="proposal"
              {...register("proposal")}
              placeholder="Describe your partnership proposal, capabilities, and how we can work together..."
              className="mt-1.5 min-h-[120px]"
              aria-describedby={errors.proposal ? "proposal-error" : undefined}
            />
            {errors.proposal && (
              <p id="proposal-error" className="text-sm text-red-600 mt-1">
                {errors.proposal.message}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Minimum 50 characters required
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold hover:bg-gold-600 text-navy font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
