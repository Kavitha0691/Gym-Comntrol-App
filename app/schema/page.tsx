'use client';

import Card from '@/components/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { classes } from '@/lib/data/memberData';
import { Class } from '@/lib/types';
import { useState } from 'react';

export default function SchemaPage() {
  const { t } = useLanguage();
  const { isBooked, bookClass, cancelClass } = useBooking();
  const [selectedDate, setSelectedDate] = useState<string>('today');

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const filteredClasses = classes.filter((cls) => {
    if (selectedDate === 'today') return cls.date === today;
    if (selectedDate === 'tomorrow') return cls.date === tomorrow;
    return true; // 'all' shows everything
  });

  const getClassTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      yoga: 'bg-purple-100 text-purple-800',
      spinning: 'bg-orange-100 text-orange-800',
      crossfit: 'bg-red-100 text-red-800',
      zumba: 'bg-pink-100 text-pink-800',
      pilates: 'bg-indigo-100 text-indigo-800',
      boxing: 'bg-gray-800 text-white',
      strength: 'bg-blue-100 text-blue-800',
      cardio: 'bg-green-100 text-green-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
      all: 'bg-blue-100 text-blue-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const getAvailabilityStatus = (cls: Class) => {
    const available = cls.maxParticipants - cls.bookedParticipants;
    if (available === 0) return { text: t.schedule.fullyBooked, color: 'text-red-600' };
    if (available <= 3) return { text: `${available} ${t.schedule.spots}`, color: 'text-orange-600' };
    return { text: `${available} ${t.schedule.spots}`, color: 'text-green-600' };
  };

  const handleBooking = (classId: string) => {
    if (isBooked(classId)) {
      cancelClass(classId);
    } else {
      bookClass(classId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.schedule.title}</h1>
        <p className="text-gray-600 mt-2">{t.schedule.subtitle}</p>
      </div>

      {/* Date Filter */}
      <Card className="mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedDate('today')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDate === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.schedule.today}
          </button>
          <button
            onClick={() => setSelectedDate('tomorrow')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDate === 'tomorrow'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tomorrow
          </button>
          <button
            onClick={() => setSelectedDate('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDate === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.schedule.week}
          </button>
        </div>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => {
          const availability = getAvailabilityStatus(cls);
          const isFullyBooked = cls.bookedParticipants >= cls.maxParticipants;
          const classIsBooked = isBooked(cls.id);

          return (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{cls.description}</p>
                </div>
                {classIsBooked && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Booked
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t.schedule.trainer}:</span>
                  <span className="text-sm font-medium text-gray-900">{cls.trainer.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t.schedule.time}:</span>
                  <span className="text-sm font-medium text-gray-900">{cls.time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t.schedule.duration}:</span>
                  <span className="text-sm font-medium text-gray-900">{cls.duration} min</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${availability.color}`}>
                    {availability.text}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getClassTypeColor(cls.type)}`}>
                  {t.activityTypes[cls.type]}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(cls.level)}`}>
                  {t.levels[cls.level]}
                </span>
              </div>

              {classIsBooked ? (
                <button
                  onClick={() => handleBooking(cls.id)}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  {t.common.cancel}
                </button>
              ) : (
                <button
                  onClick={() => handleBooking(cls.id)}
                  disabled={isFullyBooked}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    isFullyBooked
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isFullyBooked ? t.schedule.fullyBooked : t.schedule.bookNow}
                </button>
              )}
            </Card>
          );
        })}
      </div>

      {filteredClasses.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.common.noResults}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
