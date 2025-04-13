'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  
  // Dummy data for charts
  const revenueData = {
    week: [1200, 980, 1400, 1100, 1700, 1300, 1500],
    month: [5200, 4800, 6100, 5700, 4900, 5300, 5800, 6200, 5500, 4700, 5100, 6000],
    year: [18000, 22000, 24000, 19000, 23000, 25000, 27000, 26000, 24000, 28000, 30000, 29000]
  };
  
  const bookingsData = {
    week: [8, 5, 9, 6, 12, 8, 10],
    month: [32, 28, 35, 30, 27, 33, 38, 40, 36, 31, 29, 37],
    year: [120, 140, 160, 130, 150, 170, 190, 180, 160, 200, 210, 200]
  };
  
  // Get current data based on selected time range
  const currentRevenueData = revenueData[timeRange];
  const currentBookingsData = bookingsData[timeRange];
  
  // Calculate totals and averages
  const totalRevenue = currentRevenueData.reduce((sum, val) => sum + val, 0);
  const totalBookings = currentBookingsData.reduce((sum, val) => sum + val, 0);
  const avgRevenue = Math.round(totalRevenue / currentRevenueData.length);
  const avgBookings = Math.round(totalBookings / currentBookingsData.length);
  
  // Max values for scaling
  const maxRevenue = Math.max(...currentRevenueData);
  const maxBookings = Math.max(...currentBookingsData);
  
  // Labels based on time range
  const getLabels = () => {
    switch (timeRange) {
      case 'week':
        return ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
      case 'month':
        return Array.from({ length: 12 }, (_, i) => `Ziua ${i + 1}`);
      case 'year':
        return ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
  };
  
  const labels = getLabels();
  
  // Performance metrics
  const performanceMetrics = [
    { name: 'Rata de conversie', value: '24%', change: '+2.4%', trend: 'up' },
    { name: 'Durată medie închiriere', value: '4.2 zile', change: '+0.5 zile', trend: 'up' },
    { name: 'Rată anulare', value: '8%', change: '-1.2%', trend: 'down' },
    { name: 'Clienți noi', value: '45', change: '+12%', trend: 'up' }
  ];
  
  // Popular cars data
  const popularCarsData = [
    { model: 'Tesla Model 3', bookings: 22, percentage: 85 },
    { model: 'BMW X5', bookings: 18, percentage: 70 },
    { model: 'Mercedes-Benz E-Class', bookings: 16, percentage: 62 },
    { model: 'Volkswagen Golf', bookings: 12, percentage: 46 },
    { model: 'Dacia Duster', bookings: 10, percentage: 38 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analiză Performanță</h1>
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white dark:bg-blue-700'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            } rounded-l-lg`}
          >
            Săptămână
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white dark:bg-blue-700'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            } border-x border-gray-200 dark:border-gray-700`}
          >
            Lună
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white dark:bg-blue-700'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            } rounded-r-lg`}
          >
            An
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Venit Total</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{totalRevenue} €</p>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400">↑ 12.5%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs. perioada anterioară</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Venit Mediu</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{avgRevenue} €</p>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400">↑ 8.3%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs. perioada anterioară</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rezervări Totale</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{totalBookings}</p>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400">↑ 15.2%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs. perioada anterioară</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rezervări Medii</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{avgBookings}</p>
          <div className="mt-1 flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400">↑ 9.8%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs. perioada anterioară</span>
          </div>
        </motion.div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Venituri</h3>
          <div className="mt-6 h-64">
            <div className="flex h-full items-end gap-1">
              {currentRevenueData.map((value, index) => (
                <div
                  key={index}
                  className="relative flex flex-1 flex-col"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / maxRevenue) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                    className="bg-blue-500 dark:bg-blue-600 rounded-t"
                  />
                  <span className="mt-1 text-center text-xs text-gray-600 dark:text-gray-400">
                    {labels[index]}
                  </span>
                  <div className="absolute bottom-full mb-1 w-full text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                    {value}€
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Bookings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Rezervări</h3>
          <div className="mt-6 h-64">
            <div className="flex h-full items-end gap-1">
              {currentBookingsData.map((value, index) => (
                <div
                  key={index}
                  className="relative flex flex-1 flex-col"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / maxBookings) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                    className="bg-green-500 dark:bg-green-600 rounded-t"
                  />
                  <span className="mt-1 text-center text-xs text-gray-600 dark:text-gray-400">
                    {labels[index]}
                  </span>
                  <div className="absolute bottom-full mb-1 w-full text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Performance Metrics and Popular Cars */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Indicatori de Performanță</h3>
          <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">{metric.name}</span>
                <div className="flex items-center">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    {metric.value}
                  </span>
                  <span className={`ml-2 text-xs font-medium ${
                    metric.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.trend === 'up' ? '↑' : '↓'} {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Popular cars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Mașini Populare</h3>
          <div className="mt-4 space-y-4">
            {popularCarsData.map((car, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{car.model}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {car.bookings} rezervări
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${car.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                    className="h-2 rounded-full bg-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 