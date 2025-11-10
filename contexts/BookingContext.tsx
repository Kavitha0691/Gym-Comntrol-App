'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
  bookedClasses: string[];
  bookClass: (classId: string) => void;
  cancelClass: (classId: string) => void;
  isBooked: (classId: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookedClasses, setBookedClasses] = useState<string[]>(['1', '4', '7']); // Pre-booked classes from mockData

  const bookClass = (classId: string) => {
    setBookedClasses((prev) => [...prev, classId]);
  };

  const cancelClass = (classId: string) => {
    setBookedClasses((prev) => prev.filter((id) => id !== classId));
  };

  const isBooked = (classId: string) => {
    return bookedClasses.includes(classId);
  };

  return (
    <BookingContext.Provider value={{ bookedClasses, bookClass, cancelClass, isBooked }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
