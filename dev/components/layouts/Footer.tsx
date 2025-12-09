import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { COMPANY_INFO } from "@/lib/constants/company";
import { FOOTER_NAV } from "@/lib/constants/navigation";
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t text-white" style={{ backgroundColor: '#003087' }}>
      <div className="container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-gold mb-4">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Powering Africa&apos;s Mining Future Through Excellence in Drilling & Support Services since {COMPANY_INFO.founded}.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Location:</span> {COMPANY_INFO.location}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a href={`tel:${COMPANY_INFO.phone1}`} className="hover:text-gold transition-colors">
                  {COMPANY_INFO.phone1}
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-gold transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-6">
              <a href="https://web.facebook.com/yellowpowerintl/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/yellowpowerinternational" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://gh.linkedin.com/company/yellowpowerinternational" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@yellow-power" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://wa.me/233268066942" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            {FOOTER_NAV.legal.map((link, index) => (
              <span key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  {link.title}
                </Link>
                {index < FOOTER_NAV.legal.length - 1 && (
                  <span className="mx-2 text-gray-600">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <SocialLinks variant="footer" size="md" className="justify-end" />
        </div>
      </div>
    </footer>
  );
}
