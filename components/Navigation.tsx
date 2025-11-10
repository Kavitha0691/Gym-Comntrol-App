'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: '/schema', label: t.nav.schema, icon: '📅' },
    { href: '/search', label: t.nav.searchActivity, icon: '🔍' },
    { href: '/bookings', label: t.nav.myBookings, icon: '📋' },
    { href: '/opentime', label: t.nav.openTime, icon: '🕐' },
    { href: '/history', label: t.nav.visitingHistory, icon: '📊' },
    { href: '/profile', label: t.nav.myInfo, icon: '👤' },
    { href: '/shop', label: t.nav.webShop, icon: '🛒' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/schema" className="flex items-center">
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
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('sv')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'sv'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                SV
              </button>
            </div>
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
          <div className="px-3 py-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('sv')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  language === 'sv'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Svenska
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
