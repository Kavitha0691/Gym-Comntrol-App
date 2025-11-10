'use client';

import Card from '@/components/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { visits } from '@/lib/data/memberData';

export default function HistoryPage() {
  const { t } = useLanguage();

  const thisMonth = visits.filter((visit) => {
    const visitDate = new Date(visit.checkInTime);
    const now = new Date();
    return (
      visitDate.getMonth() === now.getMonth() && visitDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const thisYear = visits.filter((visit) => {
    const visitDate = new Date(visit.checkInTime);
    const now = new Date();
    return visitDate.getFullYear() === now.getFullYear();
  }).length;

  const averageDuration =
    visits.length > 0
      ? Math.round(visits.reduce((acc, visit) => acc + (visit.duration || 0), 0) / visits.length)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.visitingHistory.title}</h1>
        <p className="text-gray-600 mt-2">{t.visitingHistory.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">{visits.length}</div>
          <div className="text-sm text-gray-600 mt-1">{t.visitingHistory.totalVisits}</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">{thisMonth}</div>
          <div className="text-sm text-gray-600 mt-1">{t.visitingHistory.thisMonth}</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600">{thisYear}</div>
          <div className="text-sm text-gray-600 mt-1">{t.visitingHistory.thisYear}</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-orange-600">{averageDuration}</div>
          <div className="text-sm text-gray-600 mt-1">Avg. Duration (min)</div>
        </Card>
      </div>

      {/* Visit History Table */}
      <Card title={t.visitingHistory.title}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  {t.visitingHistory.date}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  {t.visitingHistory.checkIn}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  {t.visitingHistory.checkOut}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <tr key={visit.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">
                    {new Date(visit.checkInTime).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(visit.checkInTime).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {visit.checkOutTime
                      ? new Date(visit.checkOutTime).toLocaleTimeString()
                      : '-'}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {visit.duration ? `${visit.duration} min` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
