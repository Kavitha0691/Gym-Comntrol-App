'use client';

import Card from '@/components/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { openingHours } from '@/lib/data/memberData';

export default function OpenTimePage() {
  const { t } = useLanguage();

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = new Date().getHours();
  const todayHours = openingHours.find((day) => day.day === currentDay);
  const isOpenNow =
    todayHours &&
    !todayHours.isClosed &&
    currentTime >= parseInt(todayHours.open.split(':')[0]) &&
    currentTime < parseInt(todayHours.close.split(':')[0]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.openTime.title}</h1>
        <p className="text-gray-600 mt-2">{t.openTime.subtitle}</p>
      </div>

      {/* Current Status */}
      <Card className="mb-6">
        <div className="text-center py-6">
          <div
            className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
              isOpenNow
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <span className={`w-3 h-3 rounded-full mr-3 ${isOpenNow ? 'bg-green-600' : 'bg-red-600'}`}></span>
            {isOpenNow ? t.openTime.currentlyOpen : t.openTime.currentlyClosed}
          </div>
          {todayHours && !todayHours.isClosed && (
            <p className="text-gray-600 mt-4">
              {t.openTime.open}: {todayHours.open} - {todayHours.close}
            </p>
          )}
        </div>
      </Card>

      {/* Weekly Hours */}
      <Card title={t.openTime.weekdays} className="mb-6">
        <div className="space-y-4">
          {openingHours.slice(0, 5).map((day) => (
            <div
              key={day.day}
              className={`flex justify-between items-center p-4 rounded-lg ${
                day.day === currentDay ? 'bg-blue-50' : 'bg-gray-50'
              }`}
            >
              <span className="font-medium text-gray-900">{day.day}</span>
              <span className="text-gray-600">
                {day.isClosed ? t.openTime.closed : `${day.open} - ${day.close}`}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekend Hours */}
      <Card title={t.openTime.weekend}>
        <div className="space-y-4">
          {openingHours.slice(5, 7).map((day) => (
            <div
              key={day.day}
              className={`flex justify-between items-center p-4 rounded-lg ${
                day.day === currentDay ? 'bg-blue-50' : 'bg-gray-50'
              }`}
            >
              <span className="font-medium text-gray-900">{day.day}</span>
              <span className="text-gray-600">
                {day.isClosed ? t.openTime.closed : `${day.open} - ${day.close}`}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Important Note */}
      <Card className="mt-6 bg-yellow-50">
        <div className="flex items-start">
          <span className="text-2xl mr-3">ℹ️</span>
          <div>
            <p className="text-sm text-gray-700">
              Note: Opening hours may vary during public holidays. Please check our website or contact us for holiday schedules.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
