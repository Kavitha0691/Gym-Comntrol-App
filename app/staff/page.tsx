import Card from '@/components/Card';
import { staff } from '@/lib/data/mockData';

export default function StaffPage() {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-purple-100 text-purple-800';
      case 'trainer':
        return 'bg-blue-100 text-blue-800';
      case 'receptionist':
        return 'bg-green-100 text-green-800';
      case 'cleaner':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'manager':
        return '👨‍💼';
      case 'trainer':
        return '💪';
      case 'receptionist':
        return '📋';
      case 'cleaner':
        return '🧹';
      default:
        return '👤';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage your gym staff and team</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Add Staff Member
        </button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">{staff.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total Staff</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {staff.filter((s) => s.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Active</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {staff.filter((s) => s.role === 'trainer').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Trainers</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-yellow-600">
            ${staff.reduce((acc, s) => acc + s.salary, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 mt-1">Monthly Payroll</div>
        </Card>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-3xl">
                {getRoleIcon(member.role)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{member.name}</h3>
                <p className="text-sm text-gray-500 truncate">{member.email}</p>
                <p className="text-sm text-gray-500">{member.phone}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                      member.role
                    )}`}
                  >
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hire Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(member.hireDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${member.salary.toLocaleString()}/mo
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Details
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Staff Performance Table */}
      <Card className="mt-8" title="Staff Details" subtitle="Complete staff information">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Hire Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Salary</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getRoleIcon(member.role)}</span>
                      <span className="font-medium text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                        member.role
                      )}`}
                    >
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{member.email}</td>
                  <td className="py-3 px-4 text-gray-600">{member.phone}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(member.hireDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-semibold">
                    ${member.salary.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {member.status}
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
