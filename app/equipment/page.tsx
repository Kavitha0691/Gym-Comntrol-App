'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import { equipment } from '@/lib/data/mockData';

export default function EquipmentPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = ['all', 'cardio', 'strength', 'free-weights', 'other'];
  const statuses = ['all', 'operational', 'maintenance', 'broken'];

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cardio':
        return '🏃';
      case 'strength':
        return '💪';
      case 'free-weights':
        return '🏋️';
      default:
        return '🔧';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'broken':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
          <p className="text-gray-600 mt-2">Track and maintain your gym equipment</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Add Equipment
        </button>
      </div>

      {/* Equipment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">{equipment.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total Equipment</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {equipment.filter((e) => e.status === 'operational').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Operational</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {equipment.filter((e) => e.status === 'maintenance').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">In Maintenance</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-red-600">
            {equipment.filter((e) => e.status === 'broken').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Broken</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    categoryFilter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex gap-2 flex-wrap">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredEquipment.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center flex-shrink-0 text-3xl">
                {getCategoryIcon(item.category)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium text-gray-900">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Purchase Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              {item.lastMaintenance && (
                <div>
                  <p className="text-xs text-gray-500">Last Maintenance</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(item.lastMaintenance).toLocaleDateString()}
                  </p>
                </div>
              )}
              {item.nextMaintenance && (
                <div>
                  <p className="text-xs text-gray-500">Next Maintenance</p>
                  <p className="text-sm font-medium text-blue-600">
                    {new Date(item.nextMaintenance).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Maintain
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No equipment found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        </Card>
      )}

      {/* Maintenance Schedule */}
      <Card title="Maintenance Schedule" subtitle="Upcoming maintenance tasks">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Equipment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Maintenance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Next Maintenance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {equipment
                .filter((e) => e.nextMaintenance)
                .map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.lastMaintenance
                        ? new Date(item.lastMaintenance).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="py-3 px-4 text-blue-600 font-medium">
                      {item.nextMaintenance
                        ? new Date(item.nextMaintenance).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Schedule
                      </button>
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
