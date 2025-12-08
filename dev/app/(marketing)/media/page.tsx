import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, Image as ImageIcon, Video, FileText, Palette, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Media Kit | Yellow Power International',
  description: 'Access YPI media resources including logos, brand guidelines, company fact sheets, leadership photos, and press contact information.',
};

export default function MediaKitPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Media Kit
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access all the resources you need for media coverage, including logos, 
            brand guidelines, company information, and high-resolution images.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <ImageIcon className="h-10 w-10 text-gold-500 mb-4" />
              <CardTitle>Image Gallery</CardTitle>
              <CardDescription>
                High-resolution photos of equipment, projects, and team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/media/gallery">
                  Browse Gallery
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Video className="h-10 w-10 text-gold-500 mb-4" />
              <CardTitle>Video Library</CardTitle>
              <CardDescription>
                Company videos, equipment demos, and project showcases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/media/videos">
                  Watch Videos
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-10 w-10 text-gold-500 mb-4" />
              <CardTitle>Press Releases</CardTitle>
              <CardDescription>
                Official announcements and corporate communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/news/press-releases">
                  View Releases
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Downloadable resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Downloadable Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Logos */}
            <Card>
              <CardHeader>
                <Palette className="h-8 w-8 text-gold-500 mb-2" />
                <CardTitle>Company Logos</CardTitle>
                <CardDescription>
                  Official YPI logos in various formats (PNG, SVG, EPS)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span>YPI Logo - Full Color</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>YPI Logo - Black & White</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>YPI Logo - Icon Only</span>
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Brand Guidelines */}
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-gold-500 mb-2" />
                <CardTitle>Brand Guidelines</CardTitle>
                <CardDescription>
                  Official brand guidelines and usage instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span>Brand Guidelines PDF</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Color Palette Guide</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Typography Guidelines</span>
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Company Documents */}
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-gold-500 mb-2" />
                <CardTitle>Company Documents</CardTitle>
                <CardDescription>
                  Company profile, fact sheets, and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span>Company Profile</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Fact Sheet 2024</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Service Capabilities Overview</span>
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Leadership Photos */}
            <Card>
              <CardHeader>
                <ImageIcon className="h-8 w-8 text-gold-500 mb-2" />
                <CardTitle>Leadership Photos</CardTitle>
                <CardDescription>
                  High-resolution photos of executive team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span>Mr. Emmanuel Kweku Ganu - Founder & CEO</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Leadership Team Photos</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>All Leadership Photos (ZIP)</span>
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Company Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Company Information
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-3">About Yellow Power International</h3>
                  <p className="text-gray-600 mb-4">
                    Founded in 2017 by Mr. Emmanuel Kweku Ganu, Yellow Power International has grown 
                    to become one of Ghana&apos;s leading mining support services providers, with operations 
                    across 5 countries (Ghana, Côte d&apos;Ivoire, Mali, Burkina Faso, Canada) and over 200 employees.
                  </p>
                  <h4 className="font-semibold mb-2">Core Services:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Pre Split Drilling</li>
                    <li>Production Drilling</li>
                    <li>Reverse Circulation Drilling</li>
                    <li>Load & Haul Operations</li>
                    <li>Construction Services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Quick Facts</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Founded</dt>
                      <dd className="text-gray-900 font-medium">2017</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Founder & CEO</dt>
                      <dd className="text-gray-900 font-medium">Mr. Emmanuel Kweku Ganu</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Headquarters</dt>
                      <dd className="text-gray-900 font-medium">Madina, Greater Accra, Ghana</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Employees</dt>
                      <dd className="text-gray-900 font-medium">201-500</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Operating Countries</dt>
                      <dd className="text-gray-900 font-medium">Ghana, Côte d&apos;Ivoire, Mali, Burkina Faso, Canada</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Industry</dt>
                      <dd className="text-gray-900 font-medium">Mining Support Services</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Media Contact */}
        <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-2xl p-12 text-center text-white">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Media Inquiries
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200">
            For press inquiries, interview requests, or additional media resources, 
            please contact our communications team.
          </p>
          <div className="space-y-3">
            <p className="text-lg">
              <strong>Email:</strong> media@yellowpowerinternational.com
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> +233 268 066 942
            </p>
          </div>
          <Button 
            size="lg" 
            variant="secondary"
            className="mt-8 bg-white text-navy-600 hover:bg-gray-100"
            asChild
          >
            <Link href="/contact?category=media">
              Send Media Inquiry
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
