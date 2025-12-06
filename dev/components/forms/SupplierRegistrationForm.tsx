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

const supplierSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  registrationNumber: z.string().min(3, "Registration number is required"),
  country: z.string().min(2, "Country is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  categories: z.string().min(1, "Please select at least one category"),
  capabilities: z.string().min(50, "Please describe your capabilities (minimum 50 characters)"),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

export function SupplierRegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<SupplierFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit = async (data: SupplierFormData) => {
    try {
      // Map form data to API schema
      const apiPayload = {
        companyName: data.companyName,
        registrationNumber: data.registrationNumber,
        contactName: data.contactPerson,
        email: data.email,
        phone: data.phone,
        address: data.country, // Use country as address for now
        website: '',
        productCategories: [data.categories], // Convert single category to array
        yearsInBusiness: '5', // Default value
        capabilities: data.capabilities,
        certifications: undefined,
        references: undefined,
      };

      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit supplier registration');
      }

      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Supplier registration error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit registration. Please try again.');
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
          <CardTitle className="text-2xl">Registration Submitted!</CardTitle>
          <CardDescription>
            Thank you for registering as a supplier. We&apos;ll review your information and contact you within 5 business days.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-navy mb-3">Registration Summary:</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{submittedData.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Country:</span>
                <span className="font-medium">{submittedData.country}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={resetForm} variant="outline" className="flex-1">
              Register Another Supplier
            </Button>
            <Button asChild className="flex-1 bg-gold hover:bg-gold-600 text-navy">
              <a href="/suppliers">Back to Supplier Portal</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Supplier Registration</CardTitle>
        <CardDescription>
          Register your company to become an approved supplier
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
              <Input id="companyName" {...register("companyName")} className="mt-1.5" />
              {errors.companyName && <p className="text-sm text-red-600 mt-1">{errors.companyName.message}</p>}
            </div>
            <div>
              <Label htmlFor="registrationNumber">Registration Number <span className="text-red-500">*</span></Label>
              <Input id="registrationNumber" {...register("registrationNumber")} className="mt-1.5" />
              {errors.registrationNumber && <p className="text-sm text-red-600 mt-1">{errors.registrationNumber.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
            <Input id="country" {...register("country")} className="mt-1.5" />
            {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="contactPerson">Contact Person <span className="text-red-500">*</span></Label>
              <Input id="contactPerson" {...register("contactPerson")} className="mt-1.5" />
              {errors.contactPerson && <p className="text-sm text-red-600 mt-1">{errors.contactPerson.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input id="email" type="email" {...register("email")} className="mt-1.5" />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
            <Input id="phone" {...register("phone")} className="mt-1.5" />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="categories">Supplier Categories <span className="text-red-500">*</span></Label>
            <select id="categories" {...register("categories")} className="w-full mt-1.5 px-4 py-2 border rounded-lg">
              <option value="">Select category...</option>
              <option value="equipment">Equipment & Machinery</option>
              <option value="parts">Parts & Components</option>
              <option value="fuel">Fuel & Lubricants</option>
              <option value="safety">Safety Equipment</option>
              <option value="services">Professional Services</option>
            </select>
            {errors.categories && <p className="text-sm text-red-600 mt-1">{errors.categories.message}</p>}
          </div>
          <div>
            <Label htmlFor="capabilities">Capabilities Description <span className="text-red-500">*</span></Label>
            <Textarea id="capabilities" {...register("capabilities")} className="mt-1.5 min-h-[100px]" />
            {errors.capabilities && <p className="text-sm text-red-600 mt-1">{errors.capabilities.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-gold hover:bg-gold-600 text-navy font-semibold">
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
