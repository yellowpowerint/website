'use client';

import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'default' | 'compact' | 'floating';
  className?: string;
}

export function ShareButtons({
  url,
  title,
  description = '',
  variant = 'default',
  className = '',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setShowDropdown(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Compact variant - icon buttons only
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-full hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-full hover:bg-sky-50 text-gray-600 hover:text-sky-600 transition-colors"
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <Twitter className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-full hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition-colors"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleShare('email')}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Share via Email"
          title="Share via Email"
        >
          <Mail className="h-5 w-5" />
        </button>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Copy Link"
          title="Copy Link"
        >
          {copied ? <Check className="h-5 w-5 text-green-600" /> : <LinkIcon className="h-5 w-5" />}
        </button>
      </div>
    );
  }

  // Floating variant - dropdown button
  if (variant === 'floating') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Share"
        >
          <Share2 className="h-5 w-5" />
          <span className="text-sm font-medium">Share</span>
        </button>
        
        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Facebook</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
              >
                <Twitter className="h-4 w-4 text-sky-600" />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
                <span className="text-sm">LinkedIn</span>
              </button>
              <button
                onClick={() => handleShare('email')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
              >
                <Mail className="h-4 w-4 text-gray-600" />
                <span className="text-sm">Email</span>
              </button>
              <div className="border-t border-gray-200" />
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Default variant - button row with labels
  return (
    <div className={`flex items-center flex-wrap gap-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700">Share:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="gap-2"
      >
        <Facebook className="h-4 w-4" />
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="gap-2"
      >
        <Twitter className="h-4 w-4" />
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="gap-2"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  );
}
