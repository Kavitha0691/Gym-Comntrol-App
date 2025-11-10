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
