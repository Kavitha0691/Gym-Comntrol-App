'use client';

import Card from '@/components/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { myBookings } from '@/lib/data/memberData';
import { useState } from 'react';

export default function BookingsPage() {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  const filteredBookings = myBookings.filter((booking) => booking.status === statusFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.myBookings.title}</h1>
        <p className="text-gray-600 mt-2">{t.myBookings.subtitle}</p>
      </div>

      {/* Status Filter */}
      <Card className="mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.myBookings.upcoming}
          </button>
          <button
            onClick={() => setStatusFilter('past')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'past'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.myBookings.past}
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'cancelled'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.myBookings.cancelled}
          </button>
        </div>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {booking.class.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{booking.class.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">{t.schedule.trainer}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {booking.class.trainer.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.schedule.time}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {booking.class.date} at {booking.class.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.schedule.duration}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {booking.class.duration} min
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.schedule.level}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {t.levels[booking.class.level]}
                    </p>
                  </div>
                </div>
              </div>

              {statusFilter === 'upcoming' && (
                <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  {t.myBookings.cancelBooking}
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.myBookings.noBookings}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
