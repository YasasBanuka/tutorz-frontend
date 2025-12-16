import React from 'react';
import StatCard from '../molecules/StatCard';
import { STATS_DATA } from '../../utils/mockData';

const StatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {STATS_DATA.map((stat, index) => (
      <StatCard key={index} {...stat} />
    ))}
  </div>
);

export default StatsGrid;