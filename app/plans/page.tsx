import Card from '@/components/Card';
import { membershipPlans } from '@/lib/data/mockData';

export default function PlansPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Membership Plans</h1>
          <p className="text-gray-600 mt-2">Choose the perfect plan for your fitness journey</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {membershipPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`hover:shadow-xl transition-all ${
              plan.isPopular ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-blue-600">${plan.price}</span>
              </div>
              <p className="text-sm text-gray-500">
                {plan.duration} {plan.duration === 1 ? 'month' : 'months'}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                plan.isPopular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Select Plan
            </button>
          </Card>
        ))}
      </div>

      {/* Plan Comparison */}
      <Card className="mt-8" title="Plan Comparison" subtitle="Compare features across all plans">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                {membershipPlans.map((plan) => (
                  <th key={plan.id} className="text-center py-3 px-4 font-semibold text-gray-900">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Duration</td>
                {membershipPlans.map((plan) => (
                  <td key={plan.id} className="text-center py-3 px-4 text-gray-600">
                    {plan.duration} {plan.duration === 1 ? 'month' : 'months'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Price</td>
                {membershipPlans.map((plan) => (
                  <td key={plan.id} className="text-center py-3 px-4 font-semibold text-blue-600">
                    ${plan.price}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Gym Access</td>
                {membershipPlans.map((plan) => (
                  <td key={plan.id} className="text-center py-3 px-4">
                    <span className="text-green-500">✓</span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Group Classes</td>
                {membershipPlans.map((plan, index) => (
                  <td key={plan.id} className="text-center py-3 px-4">
                    {index >= 1 ? <span className="text-green-500">✓</span> : <span className="text-gray-300">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Personal Training</td>
                {membershipPlans.map((plan, index) => (
                  <td key={plan.id} className="text-center py-3 px-4">
                    {index >= 2 ? <span className="text-green-500">✓</span> : <span className="text-gray-300">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Diet Plan</td>
                {membershipPlans.map((plan, index) => (
                  <td key={plan.id} className="text-center py-3 px-4">
                    {index >= 2 ? <span className="text-green-500">✓</span> : <span className="text-gray-300">-</span>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
