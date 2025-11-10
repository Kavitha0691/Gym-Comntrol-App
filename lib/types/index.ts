export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  joinDate: string;
  membershipPlan: string;
  status: 'active' | 'inactive' | 'expired';
  photoUrl?: string;
  emergencyContact?: {
    name: string;
    phone: string;
  };
}

export interface MembershipPlan {
  id: string;
  name: string;
  duration: number; // in months
  price: number;
  features: string[];
  isPopular?: boolean;
}

export interface CheckIn {
  id: string;
  memberId: string;
  memberName: string;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number; // in minutes
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'trainer' | 'receptionist' | 'manager' | 'cleaner';
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive';
}

export interface Equipment {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'free-weights' | 'other';
  purchaseDate: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  status: 'operational' | 'maintenance' | 'broken';
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  method: 'cash' | 'card' | 'upi' | 'bank-transfer';
  status: 'completed' | 'pending' | 'failed';
  planName: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  todayCheckIns: number;
  monthlyRevenue: number;
  expiringMemberships: number;
}

// New types for member-facing app
export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl?: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  trainer: Trainer;
  type: 'yoga' | 'spinning' | 'crossfit' | 'zumba' | 'pilates' | 'boxing' | 'strength' | 'cardio';
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  duration: number; // in minutes
  maxParticipants: number;
  bookedParticipants: number;
  date: string;
  time: string;
}

export interface Booking {
  id: string;
  classId: string;
  class: Class;
  userId: string;
  bookingDate: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Visit {
  id: string;
  userId: string;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number; // in minutes
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  membershipType: string;
  membershipStartDate: string;
  membershipExpiryDate: string;
  status: 'active' | 'inactive' | 'expired';
  emergencyContact: {
    name: string;
    phone: string;
  };
}

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'apparel' | 'equipment' | 'supplements' | 'accessories';
  imageUrl?: string;
  inStock: boolean;
  stock: number;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}
