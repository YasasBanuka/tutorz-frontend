import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import useApi from '../../hooks/useApi';
import * as tutorService from '../../services/api/tutorService';

const UpcomingClasses = () => {
  const [classes, setClasses] = useState([]);
  const { request: fetchClasses, loading } = useApi();

  useEffect(() => {
    const loadData = async () => {
      const { data } = await fetchClasses(tutorService.getClasses);
      if (data) {
        // Filter to show only today's or upcoming classes if you want logic, 
        // for now, let's just show the first 3 active classes.
        const active = data.filter(c => c.isActive).slice(0, 3);
        setClasses(active);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900">Upcoming Classes</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          View Schedule <ArrowRight size={16} />
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {loading ? (
           <p className="text-gray-500 text-sm text-center py-4">Loading schedule...</p>
        ) : classes.length === 0 ? (
           <div className="text-center py-6 text-gray-500">
             <Calendar size={32} className="mx-auto mb-2 text-gray-300" />
             <p>No classes scheduled.</p>
           </div>
        ) : (
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls.classId} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                {/* Time Box */}
                <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-700 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs font-bold uppercase">{cls.dayOfWeek.substring(0, 3)}</span>
                  <span className="text-sm font-bold">{cls.startTime}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">{cls.subject}</h4>
                  <p className="text-xs text-gray-500 truncate">{cls.grade} • {cls.hallName || 'Main Hall'}</p>
                </div>

                {/* Status/Time Remaining */}
                <div className="text-right hidden sm:block">
                  <div className="flex items-center text-xs text-gray-500 mb-1 justify-end">
                    <Clock size={12} className="mr-1" />
                    2h duration
                  </div>
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingClasses;