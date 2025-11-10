import { Member, MembershipPlan, CheckIn, Staff, Equipment, Payment, DashboardStats } from '../types';

export const membershipPlans: MembershipPlan[] = [
  {
    id: '1',
    name: 'Basic',
    duration: 1,
    price: 999,
    features: ['Access to gym floor', 'Locker facility', 'Basic equipment'],
  },
  {
    id: '2',
    name: 'Standard',
    duration: 3,
    price: 2499,
    features: ['All Basic features', 'Group classes', 'Nutrition guidance', 'Steam & Sauna'],
    isPopular: true,
  },
  {
    id: '3',
    name: 'Premium',
    duration: 6,
    price: 4499,
    features: ['All Standard features', 'Personal training (4 sessions)', 'Diet plan', 'Priority booking'],
  },
  {
    id: '4',
    name: 'Elite',
    duration: 12,
    price: 7999,
    features: ['All Premium features', 'Unlimited personal training', 'Guest passes', 'Merchandise discount'],
  },
];

export const members: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8900',
    dateOfBirth: '1990-05-15',
    joinDate: '2024-01-10',
    membershipPlan: 'Standard',
    status: 'active',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1 234-567-8901',
    },
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    phone: '+1 234-567-8902',
    dateOfBirth: '1988-08-22',
    joinDate: '2024-02-15',
    membershipPlan: 'Premium',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    phone: '+1 234-567-8903',
    dateOfBirth: '1995-03-10',
    joinDate: '2023-11-20',
    membershipPlan: 'Basic',
    status: 'active',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily.b@example.com',
    phone: '+1 234-567-8904',
    dateOfBirth: '1992-12-05',
    joinDate: '2024-03-01',
    membershipPlan: 'Elite',
    status: 'active',
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.l@example.com',
    phone: '+1 234-567-8905',
    dateOfBirth: '1985-07-18',
    joinDate: '2023-09-15',
    membershipPlan: 'Standard',
    status: 'expired',
  },
];

export const checkIns: CheckIn[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'John Doe',
    checkInTime: new Date().toISOString(),
    duration: 45,
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Sarah Wilson',
    checkInTime: new Date(Date.now() - 3600000).toISOString(),
    checkOutTime: new Date().toISOString(),
    duration: 60,
  },
  {
    id: '3',
    memberId: '3',
    memberName: 'Mike Johnson',
    checkInTime: new Date(Date.now() - 7200000).toISOString(),
    duration: 90,
  },
];

export const staff: Staff[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.t@gymcontrol.com',
    phone: '+1 234-567-8910',
    role: 'trainer',
    hireDate: '2023-06-01',
    salary: 45000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Rachel Green',
    email: 'rachel.g@gymcontrol.com',
    phone: '+1 234-567-8911',
    role: 'receptionist',
    hireDate: '2023-08-15',
    salary: 30000,
    status: 'active',
  },
  {
    id: '3',
    name: 'James Wilson',
    email: 'james.w@gymcontrol.com',
    phone: '+1 234-567-8912',
    role: 'manager',
    hireDate: '2022-03-01',
    salary: 60000,
    status: 'active',
  },
];

export const equipment: Equipment[] = [
  {
    id: '1',
    name: 'Treadmill Pro X1',
    category: 'cardio',
    purchaseDate: '2023-01-15',
    lastMaintenance: '2024-10-01',
    nextMaintenance: '2025-01-01',
    status: 'operational',
  },
  {
    id: '2',
    name: 'Bench Press Station',
    category: 'strength',
    purchaseDate: '2023-02-20',
    lastMaintenance: '2024-09-15',
    nextMaintenance: '2024-12-15',
    status: 'operational',
  },
  {
    id: '3',
    name: 'Dumbbells Set (5-50kg)',
    category: 'free-weights',
    purchaseDate: '2023-01-10',
    status: 'operational',
  },
  {
    id: '4',
    name: 'Rowing Machine',
    category: 'cardio',
    purchaseDate: '2023-03-10',
    lastMaintenance: '2024-08-20',
    status: 'maintenance',
  },
];

export const payments: Payment[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'John Doe',
    amount: 2499,
    date: '2024-11-01',
    method: 'card',
    status: 'completed',
    planName: 'Standard',
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Sarah Wilson',
    amount: 4499,
    date: '2024-11-03',
    method: 'upi',
    status: 'completed',
    planName: 'Premium',
  },
  {
    id: '3',
    memberId: '4',
    memberName: 'Emily Brown',
    amount: 7999,
    date: '2024-11-05',
    method: 'bank-transfer',
    status: 'pending',
    planName: 'Elite',
  },
];

export const dashboardStats: DashboardStats = {
  totalMembers: 5,
  activeMembers: 4,
  todayCheckIns: 3,
  monthlyRevenue: 14997,
  expiringMemberships: 1,
};
