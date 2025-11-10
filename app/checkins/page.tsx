'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import { checkIns, members } from '@/lib/data/mockData';

export default function CheckInsPage() {
  const [selectedMember, setSelectedMember] = useState('');

  const activeCheckIns = checkIns.filter(c => !c.checkOutTime);
  const completedCheckIns = checkIns.filter(c => c.checkOutTime);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Check-in Management</h1>
        <p className="text-gray-600 mt-2">Track member attendance and activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Check-in */}
        <Card title="Quick Check-in" subtitle="Check in a member" className="lg:col-span-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Member
              </label>
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a member...</option>
                {members
                  .filter(m => m.status === 'active')
                  .map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.membershipPlan}
                    </option>
                  ))}
              </select>
            </div>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              ✓ Check In
            </button>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Or scan member card:</p>
              <input
                type="text"
                placeholder="Scan card ID..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </Card>

        {/* Today's Stats */}
        <Card title="Today's Statistics" className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{checkIns.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total Check-ins</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{activeCheckIns.length}</div>
              <div className="text-sm text-gray-600 mt-1">Currently Active</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {completedCheckIns.length > 0
                  ? Math.round(
                      completedCheckIns.reduce((acc, c) => acc + (c.duration || 0), 0) /
                        completedCheckIns.length
                    )
                  : 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">Avg. Duration (min)</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Check-ins */}
        <Card title="Active Members" subtitle={`${activeCheckIns.length} members currently in gym`}>
          <div className="space-y-3">
            {activeCheckIns.length > 0 ? (
              activeCheckIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                      <span className="text-green-700 font-semibold">
                        {checkIn.memberName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{checkIn.memberName}</p>
                      <p className="text-sm text-gray-500">
                        Checked in at {new Date(checkIn.checkInTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Check Out
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No active check-ins at the moment
              </div>
            )}
          </div>
        </Card>

        {/* Recent Check-outs */}
        <Card title="Recent Check-outs" subtitle="Completed sessions">
          <div className="space-y-3">
            {completedCheckIns.length > 0 ? (
              completedCheckIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-700 font-semibold">
                        {checkIn.memberName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{checkIn.memberName}</p>
                      <p className="text-sm text-gray-500">
                        Duration: {checkIn.duration} minutes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {checkIn.checkOutTime &&
                        new Date(checkIn.checkOutTime).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No completed check-ins today
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Check-in History Table */}
      <Card className="mt-6" title="Check-in History" subtitle="All member check-ins">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Member</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-in Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-out Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {checkIns.map((checkIn) => (
                <tr key={checkIn.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {checkIn.memberName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{checkIn.memberName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(checkIn.checkInTime).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {checkIn.checkOutTime
                      ? new Date(checkIn.checkOutTime).toLocaleString()
                      : '-'}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {checkIn.duration ? `${checkIn.duration} min` : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        checkIn.checkOutTime
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {checkIn.checkOutTime ? 'Completed' : 'Active'}
                    </span>
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
