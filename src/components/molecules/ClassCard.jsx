import React from 'react';
import { Clock, Users, MoreVertical, BookOpen } from 'lucide-react';

const ClassCard = ({ subject, grade, time, students, status, fee }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden">
      {/* Status Stripe */}
      <div className={`absolute top-0 left-0 w-1 h-full ${status === 'active' ? 'bg-blue-500' : 'bg-gray-300'}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-md mb-1">
              {grade}
            </span>
            <h3 className="font-bold text-lg text-gray-900 leading-tight">{subject}</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
            <BookOpen size={16} />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2 text-gray-400" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-2 text-gray-400" />
            <span>{students} Students Enrolled</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
            <div className="text-sm font-medium text-gray-900">
                LKR {fee} <span className="text-gray-400 font-normal">/ month</span>
            </div>
            {/* Status Badge */}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
                {status === 'active' ? 'Active' : 'Inactive'}
            </span>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;