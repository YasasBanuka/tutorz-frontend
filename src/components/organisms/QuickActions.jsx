import React from 'react';
import { Award, FileText, Users, LogOut } from 'lucide-react';
import QuickActionCard from '../molecules/QuickActionCard';

const QuickActions = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
    <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
    <div className="grid grid-cols-2 gap-3">
      <QuickActionCard icon={Award} label="Give Medals" colorClass="text-purple-500" />
      <QuickActionCard icon={FileText} label="Generate Invoice" colorClass="text-orange-500" />
      <QuickActionCard icon={Users} label="Student Request" colorClass="text-green-500" />
      <QuickActionCard icon={LogOut} label="Withdraw Funds" colorClass="text-red-500" />
    </div>

    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">Active Coupons</span>
        <button className="text-xs text-blue-600 hover:underline">Manage</button>
      </div>
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex justify-between items-center">
        <span className="font-mono font-bold text-orange-700">NEWYEAR25</span>
        <span className="text-xs bg-white px-2 py-1 rounded border border-orange-200 text-orange-600">10% OFF</span>
      </div>
    </div>
  </div>
);

export default QuickActions;