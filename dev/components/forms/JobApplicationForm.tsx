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
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

// Validation schemas for each step
const step1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
});

const step2Schema = z.object({
  yearsExperience: z.string().min(1, "Please specify years of experience"),
  currentRole: z.string().min(2, "Current role is required"),
  relevantSkills: z.string().min(10, "Please describe your relevant skills (min 10 characters)"),
});

const step3Schema = z.object({
  cvFile: z.any().optional(),
  coverLetter: z.string().min(50, "Cover letter should be at least 50 characters"),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type FormData = z.infer<typeof fullSchema>;

interface JobApplicationFormProps {
  jobTitle: string;
  jobId: string;
}

export function JobApplicationForm({ jobTitle, jobId }: JobApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
  });

  const totalSteps = 3;

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["fullName", "email", "phone", "location"];
    } else if (step === 2) {
      fieldsToValidate = ["yearsExperience", "currentRole", "relevantSkills"];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Split fullName into firstName and lastName
      const nameParts = data.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0];

      // Prepare API payload
      const apiPayload: Record<string, unknown> = {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        address: data.location,
        jobId,
        positionApplying: jobTitle,
        yearsOfExperience: data.yearsExperience,
        currentEmployer: data.currentRole,
        education: data.relevantSkills, // Using skills as education placeholder
        coverLetter: data.coverLetter,
      };

      // Handle CV file upload if present
      if (data.cvFile && data.cvFile[0]) {
        const file = data.cvFile[0] as File;
        
        // Convert file to base64
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const base64Data = await base64Promise;
        
        apiPayload.cvFileName = file.name;
        apiPayload.cvFileSize = file.size;
        apiPayload.cvFileType = file.type;
        apiPayload.cvFileData = base64Data;
      }

      const response = await fetch('/api/careers/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        reset();
        setStep(1);
        setIsSubmitted(false);
        setSelectedFileName("");
      }, 5000);
    } catch (error) {
      console.error('Job application submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-500">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-green-900">Application Submitted!</CardTitle>
              <CardDescription>Your application has been received</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-700">
              Thank you for applying for the <strong>{jobTitle}</strong> position. Our HR team will review
              your application and contact you within 5-7 business days if your profile matches our
              requirements.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy mb-2">Application Summary:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Name: {getValues("fullName")}</li>
                <li>• Email: {getValues("email")}</li>
                <li>• Position: {jobTitle}</li>
                <li>• Status: Under Review</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for {jobTitle}</CardTitle>
        <CardDescription>
          Complete all steps to submit your application. Step {step} of {totalSteps}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full mx-1 ${
                  s <= step ? "bg-gold" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span className={step === 1 ? "font-semibold text-gold" : ""}>Personal Info</span>
            <span className={step === 2 ? "font-semibold text-gold" : ""}>Experience</span>
            <span className={step === 3 ? "font-semibold text-gold" : ""}>Documents</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="John Doe"
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john.doe@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+233 24 123 4567"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Current Location *</Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="Accra, Ghana"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Experience & Skills */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="yearsExperience">Years of Relevant Experience *</Label>
                <Input
                  id="yearsExperience"
                  {...register("yearsExperience")}
                  placeholder="e.g., 5 years"
                  className={errors.yearsExperience ? "border-red-500" : ""}
                />
                {errors.yearsExperience && (
                  <p className="text-sm text-red-600 mt-1">{errors.yearsExperience.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="currentRole">Current/Most Recent Role *</Label>
                <Input
                  id="currentRole"
                  {...register("currentRole")}
                  placeholder="e.g., Drill Operator at XYZ Mining"
                  className={errors.currentRole ? "border-red-500" : ""}
                />
                {errors.currentRole && (
                  <p className="text-sm text-red-600 mt-1">{errors.currentRole.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="relevantSkills">Relevant Skills & Qualifications *</Label>
                <Textarea
                  id="relevantSkills"
                  {...register("relevantSkills")}
                  placeholder="Describe your relevant skills, certifications, and experience..."
                  rows={5}
                  className={errors.relevantSkills ? "border-red-500" : ""}
                />
                {errors.relevantSkills && (
                  <p className="text-sm text-red-600 mt-1">{errors.relevantSkills.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: CV/Resume & Cover Letter */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cvFile">CV/Resume (PDF or Word)</Label>
                <Input
                  id="cvFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFileName(file.name);
                    }
                  }}
                  className="cursor-pointer"
                />
                {selectedFileName && (
                  <p className="text-sm text-green-600 mt-1">Selected: {selectedFileName}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Note: File upload is simulated in this demo. No files are actually uploaded.
                </p>
              </div>

              <div>
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  {...register("coverLetter")}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  rows={8}
                  className={errors.coverLetter ? "border-red-500" : ""}
                />
                {errors.coverLetter && (
                  <p className="text-sm text-red-600 mt-1">{errors.coverLetter.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <Button type="button" className="bg-gold hover:bg-gold-600 text-navy" onClick={nextStep}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" className="bg-gold hover:bg-gold-600 text-navy">
                Submit Application
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
