'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { CartProvider } from '@/contexts/CartContext';
import { ReactNode } from 'react';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <BookingProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </BookingProvider>
    </LanguageProvider>
  );
}
