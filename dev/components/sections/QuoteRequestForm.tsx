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
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { SERVICES } from "@/lib/constants/services";

// Step 1 Schema - Service Selection
const quoteStep1Schema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  serviceType: z.string().optional(),
  urgency: z.enum(["immediate", "3-6-months", "planning"], {
    required_error: "Please select urgency",
  }),
});

// Step 2 Schema - Project Details
const quoteStep2Schema = z.object({
  projectLocation: z.string().min(3, "Project location is required"),
  mineType: z.enum(["open-pit", "underground", "exploration", "other"], {
    required_error: "Please select mine type",
  }),
  estimatedStartDate: z.string().optional(),
  projectDurationMonths: z.coerce
    .number()
    .positive("Duration must be positive")
    .optional()
    .or(z.literal("")),
  drillingMeters: z.coerce
    .number()
    .positive("Meters must be positive")
    .optional()
    .or(z.literal("")),
  additionalDetails: z.string().max(500, "Maximum 500 characters").optional(),
});

// Step 3 Schema - Contact & Timeline
const quoteStep3Schema = z.object({
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  preferredContactMethod: z.enum(["email", "phone", "whatsapp"], {
    required_error: "Please select contact method",
  }),
  preferredContactTime: z.string().optional(),
});

// Combined Schema
const quoteFormSchema = z.object({
  ...quoteStep1Schema.shape,
  ...quoteStep2Schema.shape,
  ...quoteStep3Schema.shape,
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const steps = [
  { id: 1, name: "Service Selection", description: "Choose your service" },
  { id: 2, name: "Project Details", description: "Tell us about your project" },
  { id: 3, name: "Contact & Timeline", description: "How can we reach you?" },
];

export function QuoteRequestForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<QuoteFormData | null>(null);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      serviceId: "",
      serviceType: "",
      urgency: undefined,
      projectLocation: "",
      mineType: undefined,
      estimatedStartDate: "",
      projectDurationMonths: "",
      drillingMeters: "",
      additionalDetails: "",
      contactName: "",
      companyName: "",
      email: "",
      phone: "",
      preferredContactMethod: undefined,
      preferredContactTime: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = form;

  // Get current step fields for validation
  const getStepFields = (step: number): (keyof QuoteFormData)[] => {
    switch (step) {
      case 0:
        return ["serviceId", "urgency"];
      case 1:
        return ["projectLocation", "mineType"];
      case 2:
        return ["contactName", "companyName", "email", "phone", "preferredContactMethod"];
      default:
        return [];
    }
  };

  const goToNextStep = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await trigger(fields);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: QuoteFormData) => {
    try {
      // Map form data to API schema
      const serviceName = SERVICES.find(s => s.id === data.serviceId)?.name || data.serviceId;
      const serviceTypeText = data.serviceType ? `${serviceName} - ${data.serviceType}` : serviceName;
      
      // Build project details from multiple fields
      const projectDetailsArray = [
        `Location: ${data.projectLocation}`,
        `Mine Type: ${data.mineType}`,
        data.estimatedStartDate && `Start Date: ${data.estimatedStartDate}`,
        data.projectDurationMonths && `Duration: ${data.projectDurationMonths} months`,
        data.drillingMeters && `Drilling Meters: ${data.drillingMeters}m`,
        data.additionalDetails,
      ].filter(Boolean);
      
      const projectDetails = projectDetailsArray.join('\n');
      
      // Build timeline
      const timeline = [
        data.urgency && `Urgency: ${data.urgency}`,
        data.estimatedStartDate && `Start: ${data.estimatedStartDate}`,
        data.projectDurationMonths && `Duration: ${data.projectDurationMonths} months`,
      ].filter(Boolean).join(', ');
      
      // Build message
      const message = [
        `Preferred Contact Method: ${data.preferredContactMethod}`,
        data.preferredContactTime && `Best Time to Contact: ${data.preferredContactTime}`,
        data.additionalDetails && `Additional Notes: ${data.additionalDetails}`,
      ].filter(Boolean).join('\n');
      
      const apiPayload = {
        fullName: data.contactName,
        email: data.email,
        phone: data.phone,
        company: data.companyName,
        serviceType: serviceTypeText,
        projectDetails,
        timeline: timeline || undefined,
        message,
      };

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Quote submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit quote request. Please try again.');
    }
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(0);
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const selectedServiceId = watch("serviceId");
  const selectedService = SERVICES.find((s) => s.id === selectedServiceId);

  if (isSubmitted && submittedData) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Quote Request Submitted!</CardTitle>
          <CardDescription>
            Thank you for your interest. We&apos;ll review your request and get back to you within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <h3 className="font-semibold text-navy mb-3">Request Summary:</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">
                  {SERVICES.find((s) => s.id === submittedData.serviceId)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Project Location:</span>
                <span className="font-medium">{submittedData.projectLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{submittedData.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium">{submittedData.contactName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{submittedData.email}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={resetForm} variant="outline" className="flex-1">
              Submit Another Request
            </Button>
            <Button asChild className="flex-1 bg-gold hover:bg-gold-600 text-navy">
              <a href="/services">Back to Services</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Request a Custom Quote</CardTitle>
        <CardDescription className="text-center">
          Fill out this form and our team will contact you within 24 hours
        </CardDescription>

        {/* Step Indicator */}
        <div className="flex justify-between mt-8 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-gold transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors ${
                  index <= currentStep
                    ? "bg-gold text-navy"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-navy">{step.name}</p>
                <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Service Selection */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="serviceId">
                  Service Required <span className="text-red-500">*</span>
                </Label>
                <select
                  id="serviceId"
                  {...register("serviceId")}
                  className="w-full mt-1.5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  aria-describedby={errors.serviceId ? "serviceId-error" : undefined}
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {errors.serviceId && (
                  <p id="serviceId-error" className="text-sm text-red-600 mt-1">
                    {errors.serviceId.message}
                  </p>
                )}
                {selectedService && (
                  <p className="text-sm text-gray-600 mt-2">{selectedService.shortDescription}</p>
                )}
              </div>

              <div>
                <Label htmlFor="serviceType">Additional Service Details (Optional)</Label>
                <Input
                  id="serviceType"
                  {...register("serviceType")}
                  placeholder="e.g., Specific equipment needs, special requirements"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="urgency">
                  Project Urgency <span className="text-red-500">*</span>
                </Label>
                <select
                  id="urgency"
                  {...register("urgency")}
                  className="w-full mt-1.5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  aria-describedby={errors.urgency ? "urgency-error" : undefined}
                >
                  <option value="">Select urgency...</option>
                  <option value="immediate">Immediate (Within 1 month)</option>
                  <option value="3-6-months">3-6 Months</option>
                  <option value="planning">Planning Phase (&gt;6 months)</option>
                </select>
                {errors.urgency && (
                  <p id="urgency-error" className="text-sm text-red-600 mt-1">
                    {errors.urgency.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="projectLocation">
                  Project Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="projectLocation"
                  {...register("projectLocation")}
                  placeholder="e.g., Ashanti Region, Ghana"
                  className="mt-1.5"
                  aria-describedby={errors.projectLocation ? "projectLocation-error" : undefined}
                />
                {errors.projectLocation && (
                  <p id="projectLocation-error" className="text-sm text-red-600 mt-1">
                    {errors.projectLocation.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="mineType">
                  Mine Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="mineType"
                  {...register("mineType")}
                  className="w-full mt-1.5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  aria-describedby={errors.mineType ? "mineType-error" : undefined}
                >
                  <option value="">Select mine type...</option>
                  <option value="open-pit">Open Pit</option>
                  <option value="underground">Underground</option>
                  <option value="exploration">Exploration</option>
                  <option value="other">Other</option>
                </select>
                {errors.mineType && (
                  <p id="mineType-error" className="text-sm text-red-600 mt-1">
                    {errors.mineType.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="estimatedStartDate">Estimated Start Date (Optional)</Label>
                  <Input
                    id="estimatedStartDate"
                    type="date"
                    {...register("estimatedStartDate")}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="projectDurationMonths">Project Duration (Months)</Label>
                  <Input
                    id="projectDurationMonths"
                    type="number"
                    {...register("projectDurationMonths")}
                    placeholder="e.g., 12"
                    className="mt-1.5"
                    aria-describedby={errors.projectDurationMonths ? "duration-error" : undefined}
                  />
                  {errors.projectDurationMonths && (
                    <p id="duration-error" className="text-sm text-red-600 mt-1">
                      {errors.projectDurationMonths.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="drillingMeters">Estimated Drilling Meters (Optional)</Label>
                <Input
                  id="drillingMeters"
                  type="number"
                  {...register("drillingMeters")}
                  placeholder="e.g., 10000"
                  className="mt-1.5"
                  aria-describedby={errors.drillingMeters ? "drilling-error" : undefined}
                />
                {errors.drillingMeters && (
                  <p id="drilling-error" className="text-sm text-red-600 mt-1">
                    {errors.drillingMeters.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Approximate meters per month if applicable
                </p>
              </div>

              <div>
                <Label htmlFor="additionalDetails">Additional Project Details</Label>
                <Textarea
                  id="additionalDetails"
                  {...register("additionalDetails")}
                  placeholder="Any additional information about your project requirements..."
                  className="mt-1.5 min-h-[100px]"
                  maxLength={500}
                  aria-describedby={errors.additionalDetails ? "details-error" : undefined}
                />
                {errors.additionalDetails && (
                  <p id="details-error" className="text-sm text-red-600 mt-1">
                    {errors.additionalDetails.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {watch("additionalDetails")?.length || 0}/500 characters
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Contact & Timeline */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactName">
                    Contact Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    {...register("contactName")}
                    placeholder="John Doe"
                    className="mt-1.5"
                    aria-describedby={errors.contactName ? "contactName-error" : undefined}
                  />
                  {errors.contactName && (
                    <p id="contactName-error" className="text-sm text-red-600 mt-1">
                      {errors.contactName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="companyName">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    {...register("companyName")}
                    placeholder="Mining Company Ltd."
                    className="mt-1.5"
                    aria-describedby={errors.companyName ? "companyName-error" : undefined}
                  />
                  {errors.companyName && (
                    <p id="companyName-error" className="text-sm text-red-600 mt-1">
                      {errors.companyName.message}
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
                <Label htmlFor="preferredContactMethod">
                  Preferred Contact Method <span className="text-red-500">*</span>
                </Label>
                <select
                  id="preferredContactMethod"
                  {...register("preferredContactMethod")}
                  className="w-full mt-1.5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  aria-describedby={errors.preferredContactMethod ? "contact-method-error" : undefined}
                >
                  <option value="">Select preferred method...</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
                {errors.preferredContactMethod && (
                  <p id="contact-method-error" className="text-sm text-red-600 mt-1">
                    {errors.preferredContactMethod.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="preferredContactTime">Preferred Contact Time (Optional)</Label>
                <Input
                  id="preferredContactTime"
                  {...register("preferredContactTime")}
                  placeholder="e.g., Weekday mornings, After 2pm"
                  className="mt-1.5"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Let us know the best time to reach you
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={isSubmitting}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={goToNextStep}
                disabled={isSubmitting}
                className="flex-1 bg-gold hover:bg-gold-600 text-navy"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gold hover:bg-gold-600 text-navy"
              >
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
