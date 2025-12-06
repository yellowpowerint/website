'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppButtonProps {
  message?: string;
  variant?: 'default' | 'floating' | 'inline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function WhatsAppButton({
  message = 'Hello, I would like to learn more about your services.',
  variant = 'default',
  size = 'default',
  className = '',
}: WhatsAppButtonProps) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  // Hide button if WhatsApp number not configured
  if (!phoneNumber) {
    return null;
  }

  // Format phone number for WhatsApp API (remove any spaces, dashes, etc.)
  const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Floating variant (fixed position)
  if (variant === 'floating') {
    return (
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  // Inline variant (small icon button)
  if (variant === 'inline') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors ${className}`}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-medium">WhatsApp</span>
      </button>
    );
  }

  // Default variant (full button)
  return (
    <Button
      onClick={handleClick}
      size={size}
      className={`bg-green-500 hover:bg-green-600 text-white ${className}`}
    >
      <MessageCircle className="mr-2 h-5 w-5" />
      Chat on WhatsApp
    </Button>
  );
}
