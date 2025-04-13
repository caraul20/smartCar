'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { availableCars } from '@/lib/data';

// Statistics Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'pink';
  delay?: number;
}

function StatCard({ title, value, icon, change, trend, color, delay = 0 }: StatCardProps) {
  // Define colors based on the color prop
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      text: 'text-blue-700 dark:text-blue-300',
      icon: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      text: 'text-green-700 dark:text-green-300',
      icon: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300',
    },
    yellow: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      text: 'text-amber-700 dark:text-amber-300',
      icon: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      text: 'text-purple-700 dark:text-purple-300',
      icon: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300',
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-950/30',
      text: 'text-pink-700 dark:text-pink-300',
      icon: 'bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-300',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`${colorStyles[color].bg} rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className={`text-2xl font-semibold ${colorStyles[color].text}`}>{value}</p>
            {change && (
              <p className={`ml-2 text-xs font-medium ${
                trend === 'up' 
                  ? 'text-green-600 dark:text-green-400' 
                  : trend === 'down' 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-600 dark:text-gray-400'
              }`}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''}
                {change}
              </p>
            )}
          </div>
        </div>
        <div className={`rounded-lg p-3 ${colorStyles[color].icon}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// Chart Component (Simple visualization)
function SimpleBarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map(item => item.value));
  
  return (
    <div className="mt-3 space-y-3">
      {data.map((item, index) => (
        <div key={item.label} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{item.label}</span>
            <span className="text-gray-500 dark:text-gray-400">{item.value}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div 
              className="h-2 rounded-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / max) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Donut Chart Component
function SimpleDonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  
  // Calculate the circumference
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate accumulated percentage for stroke offset
  let accumulatedPercentage = 0;
  
  return (
    <div className="flex justify-center">
      <div className="relative h-[200px] w-[200px]">
        <svg className="h-full w-full transform -rotate-90" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference - (percentage / 100) * circumference;
            
            const startOffset = accumulatedPercentage;
            accumulatedPercentage += percentage;
            
            return (
              <motion.circle
                key={item.label}
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth="30"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{ 
                  transform: `rotate(${startOffset * 3.6}deg)`,
                  transformOrigin: 'center',
                  strokeLinecap: 'round'
                }}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, delay: 0.2 * index }}
              />
            );
          })}
          <circle 
            cx="100" 
            cy="100" 
            r="40" 
            fill="white" 
            className="dark:fill-gray-900" 
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-xl font-bold">{total}</span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">Total</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons
function CarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function BookingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MoneyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export default function AdminDashboard() {
  // Sample data - would be fetched from an API in a real application
  const [dashboardData, setDashboardData] = useState({
    cars: {
      total: availableCars.length, // Using the available cars from data.ts
      change: '+12%',
      trend: 'up' as const,
    },
    bookings: {
      total: 124,
      change: '+5%',
      trend: 'up' as const,
    },
    revenue: {
      total: '€12,450',
      change: '+18%',
      trend: 'up' as const,
    },
    users: {
      total: 87,
      change: '+24%',
      trend: 'up' as const,
    },
    carCategories: [
      { label: 'SUV', value: availableCars.filter(car => car.category === 'suv').length },
      { label: 'Luxury', value: availableCars.filter(car => car.category === 'luxury').length },
      { label: 'Compact', value: availableCars.filter(car => car.category === 'compact').length },
      { label: 'Economy', value: availableCars.filter(car => car.category === 'economy').length },
    ],
    bookingStatus: [
      { label: 'Confirmed', value: 78, color: '#10B981' }, // green
      { label: 'Pending', value: 23, color: '#F59E0B' },   // amber
      { label: 'Canceled', value: 12, color: '#EF4444' },  // red
      { label: 'Completed', value: 56, color: '#3B82F6' }, // blue
    ],
    recentActivity: [
      { type: 'booking', user: 'Maria Popescu', car: 'Tesla Model 3', action: 'made a reservation', time: '5 min ago' },
      { type: 'return', user: 'Ion Ionescu', car: 'BMW X5', action: 'returned a car', time: '1 hour ago' },
      { type: 'payment', user: 'Alexandru Popa', car: 'Mercedes-Benz E-Class', action: 'made a payment', time: '2 hours ago' },
      { type: 'booking', user: 'Elena Dragomir', car: 'Volkswagen Golf', action: 'made a reservation', time: '3 hours ago' },
    ]
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Ultimele 7 zile
          </button>
          <button className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            Export Date
          </button>
        </div>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Mașini"
          value={dashboardData.cars.total}
          icon={<CarIcon />}
          change={dashboardData.cars.change}
          trend={dashboardData.cars.trend}
          color="blue"
          delay={0}
        />
        <StatCard
          title="Rezervări"
          value={dashboardData.bookings.total}
          icon={<BookingIcon />}
          change={dashboardData.bookings.change}
          trend={dashboardData.bookings.trend}
          color="green"
          delay={1}
        />
        <StatCard
          title="Venit Total"
          value={dashboardData.revenue.total}
          icon={<MoneyIcon />}
          change={dashboardData.revenue.change}
          trend={dashboardData.revenue.trend}
          color="purple"
          delay={2}
        />
        <StatCard
          title="Utilizatori"
          value={dashboardData.users.total}
          icon={<UserIcon />}
          change={dashboardData.users.change}
          trend={dashboardData.users.trend}
          color="pink"
          delay={3}
        />
      </div>

      {/* Charts and detailed stats */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Car categories distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h2 className="text-lg font-semibold">Distribuția Mașinilor după Categorie</h2>
          <SimpleBarChart data={dashboardData.carCategories} />
        </motion.div>

        {/* Booking status distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h2 className="text-lg font-semibold">Status Rezervări</h2>
          <SimpleDonutChart data={dashboardData.bookingStatus} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {dashboardData.bookingStatus.map((status) => (
              <div key={status.label} className="flex items-center gap-2">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-sm">{status.label}: {status.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Activitate Recentă</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Vezi toate
          </button>
        </div>
        <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
          {dashboardData.recentActivity.map((activity, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-4 py-3"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                activity.type === 'booking' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' 
                  : activity.type === 'return' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300'
                    : 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300'
              }`}>
                {activity.type === 'booking' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
                {activity.type === 'return' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 7v10c0 3-2.5 5-5.5 5S8 20 8 17" />
                    <path d="M13 16H8l3.5-3.5L15 16" />
                    <path d="M16 3H5C3.9 3 3 3.9 3 5v10" />
                  </svg>
                )}
                {activity.type === 'payment' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  <span className="text-gray-900 dark:text-white">{activity.user}</span>
                  <span className="text-gray-600 dark:text-gray-400"> {activity.action} </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{activity.car}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
              <div>
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 