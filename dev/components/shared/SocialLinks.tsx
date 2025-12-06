'use client';

import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

interface SocialLinksProps {
  variant?: 'default' | 'footer' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ElementType;
  color: string;
}

export function SocialLinks({
  variant = 'default',
  size = 'md',
  showLabels = false,
  className = '',
}: SocialLinksProps) {
  const socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
      icon: Linkedin,
      color: 'hover:text-[#0077B5]',
    },
    {
      name: 'Facebook',
      url: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
      icon: Facebook,
      color: 'hover:text-[#1877F2]',
    },
    {
      name: 'Twitter',
      url: process.env.NEXT_PUBLIC_TWITTER_URL || '',
      icon: Twitter,
      color: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'Instagram',
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
      icon: Instagram,
      color: 'hover:text-[#E4405F]',
    },
    {
      name: 'YouTube',
      url: process.env.NEXT_PUBLIC_YOUTUBE_URL || '',
      icon: Youtube,
      color: 'hover:text-[#FF0000]',
    },
  ];

  // Filter out links that aren't configured
  const availableLinks = socialLinks.filter((link) => link.url);

  if (availableLinks.length === 0) {
    return null;
  }

  const iconSizeClass = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size];

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {availableLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 transition-colors ${link.color}`}
              aria-label={`Follow us on ${link.name}`}
              title={link.name}
            >
              <Icon className={iconSizeClass} />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {availableLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-600 transition-colors ${link.color}`}
              aria-label={`Follow us on ${link.name}`}
              title={link.name}
            >
              <Icon className={iconSizeClass} />
            </a>
          );
        })}
      </div>
    );
  }

  // Default variant with optional labels
  return (
    <div className={`flex items-center flex-wrap gap-4 ${className}`}>
      {availableLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-gray-700 transition-colors ${link.color}`}
            aria-label={`Follow us on ${link.name}`}
          >
            <Icon className={iconSizeClass} />
            {showLabels && <span className="text-sm font-medium">{link.name}</span>}
          </a>
        );
      })}
    </div>
  );
}
