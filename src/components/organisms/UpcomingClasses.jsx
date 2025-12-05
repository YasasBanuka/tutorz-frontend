import React from 'react';
import ClassCard from '../molecules/ClassCard';
import { UPCOMING_CLASSES_DATA } from '../../utils/mockData';

const UpcomingClasses = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-bold text-gray-900">Today's Schedule</h2>
      <button className="text-blue-600 text-sm font-medium hover:underline">View Timetable</button>
    </div>
    
    <div className="space-y-4">
      {UPCOMING_CLASSES_DATA.map((cls) => (
        <ClassCard key={cls.id} {...cls} />
      ))}
    </div>
  </div>
);

export default UpcomingClasses;