import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { DEPARTMENT_CONTACTS, EMERGENCY_CONTACT, SOCIAL_MEDIA } from '@/lib/constants/offices';

export const metadata: Metadata = {
  title: 'Contact Us | Yellow Power International',
  description: 'Get in touch with Yellow Power International for service inquiries, partnerships, careers, media requests, and general information.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re here to help. Reach out to our team for inquiries about our services, 
            partnership opportunities, careers, or any questions you may have.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form - 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Information - 1 column */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <Phone className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle className="text-red-900">{EMERGENCY_CONTACT.title}</CardTitle>
                <CardDescription className="text-red-700">
                  {EMERGENCY_CONTACT.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href={`tel:${EMERGENCY_CONTACT.phone.replace(/\s/g, '')}`}
                  className="text-2xl font-bold text-red-600 hover:text-red-700"
                >
                  {EMERGENCY_CONTACT.phone}
                </a>
              </CardContent>
            </Card>

            {/* Main Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Main Office</CardTitle>
                <CardDescription>Madina, Greater Accra, Ghana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <a 
                      href="tel:+233268066942" 
                      className="text-gray-900 hover:text-gold-600"
                    >
                      +233 268 066 942
                    </a>
                    <br />
                    <a 
                      href="tel:+233550099130" 
                      className="text-gray-900 hover:text-gold-600"
                    >
                      +233 550 099 130
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a 
                    href="mailto:info@yellowpowerinternational.com"
                    className="text-gray-900 hover:text-gold-600"
                  >
                    info@yellowpowerinternational.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-600">
                    Madina Estate<br />
                    Greater Accra Region<br />
                    Ghana
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 5:00 PM<br />
                    Saturday: 8:00 AM - 12:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-green-900">WhatsApp Business</CardTitle>
                <CardDescription className="text-green-700">
                  Quick response for urgent inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WhatsAppButton 
                  message="Hello, I have an inquiry about your services."
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Office Locations Link */}
            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-gold-500 mb-2" />
                <CardTitle>Our Locations</CardTitle>
                <CardDescription>
                  Offices across 3 African countries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact/locations">
                    View All Offices
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Department Contacts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Department Contacts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENT_CONTACTS.map((dept) => (
              <Card key={dept.department}>
                <CardHeader>
                  <CardTitle className="text-lg">{dept.department}</CardTitle>
                  <CardDescription className="text-sm">
                    {dept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a 
                    href={`mailto:${dept.email}`}
                    className="text-gold-600 hover:text-gold-700 text-sm block"
                  >
                    {dept.email}
                  </a>
                  {dept.phone && (
                    <a 
                      href={`tel:${dept.phone.replace(/\s/g, '')}`}
                      className="text-gray-600 hover:text-gray-900 text-sm block"
                    >
                      {dept.phone}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Follow Us on Social Media
          </h3>
          <div className="flex items-center justify-center gap-4">
            <a
              href={SOCIAL_MEDIA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-600 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-gray-400">|</span>
            <a
              href={SOCIAL_MEDIA.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-600 transition-colors"
            >
              Facebook
            </a>
            <span className="text-gray-400">|</span>
            <a
              href={SOCIAL_MEDIA.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-600 transition-colors"
            >
              Twitter
            </a>
            <span className="text-gray-400">|</span>
            <a
              href={SOCIAL_MEDIA.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-600 transition-colors"
            >
              Instagram
            </a>
            <span className="text-gray-400">|</span>
            <a
              href={SOCIAL_MEDIA.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-600 transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
