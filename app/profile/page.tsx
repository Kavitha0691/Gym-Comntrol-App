'use client';

import Card from '@/components/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { userProfile } from '@/lib/data/memberData';

export default function ProfilePage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.myInfo.title}</h1>
        <p className="text-gray-600 mt-2">{t.myInfo.subtitle}</p>
      </div>

      {/* Personal Information */}
      <Card title={t.myInfo.personalInfo} className="mb-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.myInfo.name}
              </label>
              <input
                type="text"
                value={userProfile.name}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.myInfo.email}
              </label>
              <input
                type="email"
                value={userProfile.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.myInfo.phone}
              </label>
              <input
                type="tel"
                value={userProfile.phone}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.myInfo.dateOfBirth}
              </label>
              <input
                type="text"
                value={new Date(userProfile.dateOfBirth).toLocaleDateString()}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.myInfo.address}
            </label>
            <input
              type="text"
              value={userProfile.address}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </Card>

      {/* Membership Information */}
      <Card title={t.myInfo.membership} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">{t.myInfo.membershipType}</p>
            <p className="text-lg font-semibold text-gray-900">{userProfile.membershipType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{t.myInfo.status}</p>
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                userProfile.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {userProfile.status.charAt(0).toUpperCase() + userProfile.status.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{t.myInfo.startDate}</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(userProfile.membershipStartDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{t.myInfo.expiryDate}</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(userProfile.membershipExpiryDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card title={t.myInfo.emergencyContact} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.myInfo.name}
            </label>
            <input
              type="text"
              value={userProfile.emergencyContact.name}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.myInfo.phone}
            </label>
            <input
              type="tel"
              value={userProfile.emergencyContact.phone}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </Card>

      <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        {t.myInfo.updateProfile}
      </button>
    </div>
  );
}
