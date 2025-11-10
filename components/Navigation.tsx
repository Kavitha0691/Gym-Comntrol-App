'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/schema', label: t.nav.schema, icon: '📅' },
    { href: '/search', label: t.nav.searchActivity, icon: '🔍' },
    { href: '/bookings', label: t.nav.myBookings, icon: '📋' },
    { href: '/opentime', label: t.nav.openTime, icon: '🕐' },
    { href: '/history', label: t.nav.visitingHistory, icon: '📊' },
    { href: '/profile', label: t.nav.myInfo, icon: '👤' },
    { href: '/shop', label: t.nav.webShop, icon: '🛒' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  const getCurrentPageLabel = () => {
    const currentItem = navItems.find(item => item.href === pathname);
    return currentItem ? `${currentItem.icon} ${currentItem.label}` : `📋 ${t.common.menu || 'Menu'}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/schema" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">🏋️ GymControl</span>
            </Link>
          </div>

          {/* Desktop Navigation Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700">{getCurrentPageLabel()}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
                          isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-xl mr-3">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <svg className="w-5 h-5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('sv')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  language === 'sv'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                SV
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('sv')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${
                  language === 'sv'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                SV
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <svg className="w-5 h-5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
