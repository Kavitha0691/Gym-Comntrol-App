'use client';

import Card from '@/components/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { classes } from '@/lib/data/memberData';
import { useState } from 'react';

export default function SearchActivityPage() {
  const { t } = useLanguage();
  const { isBooked, bookClass, cancelClass } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || cls.type === typeFilter;
    const matchesLevel = levelFilter === 'all' || cls.level === levelFilter;
    return matchesSearch && matchesType && matchesLevel;
  });

  const activityTypes = ['all', 'yoga', 'spinning', 'crossfit', 'zumba', 'pilates', 'boxing', 'strength', 'cardio'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

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
        <h1 className="text-3xl font-bold text-gray-900">{t.searchActivity.title}</h1>
        <p className="text-gray-600 mt-2">{t.searchActivity.subtitle}</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder={t.searchActivity.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.searchActivity.type}
            </label>
            <div className="flex gap-2 flex-wrap">
              {activityTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    typeFilter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? t.searchActivity.allTypes : t.activityTypes[type as keyof typeof t.activityTypes]}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.schedule.level}
            </label>
            <div className="flex gap-2 flex-wrap">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    levelFilter === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.levels[level as keyof typeof t.levels]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => {
          const classIsBooked = isBooked(cls.id);
          const isFullyBooked = cls.bookedParticipants >= cls.maxParticipants;

          return (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                {classIsBooked && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Booked
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{cls.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t.schedule.trainer}:</span>
                  <span className="font-medium">{cls.trainer.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t.schedule.duration}:</span>
                  <span className="font-medium">{cls.duration} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t.schedule.time}:</span>
                  <span className="font-medium">{cls.time}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {t.activityTypes[cls.type]}
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
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
                  {isFullyBooked ? t.schedule.fullyBooked : t.common.book}
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
