import React from 'react';
import { BookOpen, Calendar, Users } from 'lucide-react';
import StatusBadge from '../atoms/StatusBadge';

const ClassCard = ({ subject, time, students, hall, status }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
        <BookOpen size={24} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{subject}</h3>
        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Calendar size={14} /> {time}</span>
          <span className="flex items-center gap-1"><Users size={14} /> {students} Students</span>
        </div>
      </div>
    </div>
    <div className="mt-4 sm:mt-0 flex items-center gap-3">
      <StatusBadge status={status} />
      <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
        Start Class
      </button>
    </div>
  </div>
);

export default ClassCard;