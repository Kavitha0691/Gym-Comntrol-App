import Card from '@/components/Card';
import { dashboardStats, checkIns, members, payments } from '@/lib/data/mockData';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Members',
      value: dashboardStats.totalMembers,
      icon: '👥',
      color: 'bg-blue-500',
    },
    {
      title: 'Active Members',
      value: dashboardStats.activeMembers,
      icon: '✓',
      color: 'bg-green-500',
    },
    {
      title: "Today's Check-ins",
      value: dashboardStats.todayCheckIns,
      icon: '📍',
      color: 'bg-purple-500',
    },
    {
      title: 'Monthly Revenue',
      value: `$${dashboardStats.monthlyRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'bg-yellow-500',
    },
    {
      title: 'Expiring Soon',
      value: dashboardStats.expiringMemberships,
      icon: '⚠️',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here&apos;s your gym overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Check-ins */}
        <Card title="Recent Check-ins" subtitle="Latest member activity">
          <div className="space-y-4">
            {checkIns.slice(0, 5).map((checkIn) => (
              <div key={checkIn.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {checkIn.memberName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{checkIn.memberName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(checkIn.checkInTime).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    checkIn.checkOutTime ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {checkIn.checkOutTime ? 'Checked Out' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Payments */}
        <Card title="Recent Payments" subtitle="Latest transactions">
          <div className="space-y-4">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {payment.memberName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payment.memberName}</p>
                    <p className="text-sm text-gray-500">{payment.planName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${payment.amount}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    payment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Members at Risk */}
        <Card title="Members at Risk" subtitle="Memberships expiring soon">
          <div className="space-y-4">
            {members.filter(m => m.status === 'expired' || m.status === 'inactive').map((member) => (
              <div key={member.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-semibold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.membershipPlan}</p>
                  </div>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions" subtitle="Common tasks">
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              + Add New Member
            </button>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              ✓ Quick Check-in
            </button>
            <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              💳 Record Payment
            </button>
            <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
              📊 Generate Report
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
