'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/members', label: 'Members', icon: '👥' },
  { href: '/plans', label: 'Plans', icon: '💳' },
  { href: '/checkins', label: 'Check-ins', icon: '✓' },
  { href: '/staff', label: 'Staff', icon: '👨‍💼' },
  { href: '/equipment', label: 'Equipment', icon: '🏋️' },
  { href: '/payments', label: 'Payments', icon: '💰' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">🏋️ GymControl</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Admin ▾
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
