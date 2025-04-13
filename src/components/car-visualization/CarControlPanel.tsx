'use client';

import { useState } from 'react';
import { CarViewAngle } from './CarVisualization';

interface CarControlPanelProps {
  onViewAngleChange: (angle: CarViewAngle) => void;
  onColorChange: (color: string) => void;
  onMovingChange: (isMoving: boolean) => void;
  onBatteryLevelChange: (level: number) => void;
  onTemperatureChange: (temp: number) => void;
  onLightsChange: (isOn: boolean) => void;
  onDoorStatusChange: (door: string, isOpen: boolean) => void;
  className?: string;
}

export default function CarControlPanel({
  onViewAngleChange,
  onColorChange,
  onMovingChange,
  onBatteryLevelChange,
  onTemperatureChange,
  onLightsChange,
  onDoorStatusChange,
  className = '',
}: CarControlPanelProps) {
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [temperature, setTemperature] = useState(22);
  
  const carColors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Green', value: '#10B981' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Black', value: '#1F2937' },
    { name: 'White', value: '#F9FAFB' },
  ];

  return (
    <div className={`p-4 bg-white dark:bg-gray-900 rounded-lg shadow ${className}`}>
      <h3 className="text-lg font-medium mb-4">Car Controls</h3>
      
      {/* View Angle Controls */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">View Angle</label>
        <div className="flex space-x-2">
          <button 
            onClick={() => onViewAngleChange('top')}
            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded"
          >
            Top
          </button>
          <button 
            onClick={() => onViewAngleChange('side')}
            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded"
          >
            Side
          </button>
          <button 
            onClick={() => onViewAngleChange('front')}
            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded"
          >
            Front
          </button>
        </div>
      </div>
      
      {/* Car Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Car Color</label>
        <div className="flex flex-wrap gap-2">
          {carColors.map((color) => (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className="w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
      
      {/* Movement Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Movement</label>
        <div className="relative inline-block w-12 align-middle select-none">
          <input 
            type="checkbox" 
            className="sr-only"
            id="toggle-movement"
            onChange={(e) => onMovingChange(e.target.checked)} 
          />
          <label 
            htmlFor="toggle-movement"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
          >
            <span className="block w-6 h-6 rounded-full bg-white transform translate-x-0 transition-transform duration-200 ease-in"></span>
          </label>
        </div>
        <style jsx>{`
          #toggle-movement:checked + .toggle-label {
            background-color: #3B82F6;
          }
          #toggle-movement:checked + .toggle-label span {
            transform: translateX(100%);
          }
        `}</style>
      </div>
      
      {/* Battery Level Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Battery Level: {batteryLevel}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={batteryLevel}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setBatteryLevel(value);
            onBatteryLevelChange(value);
          }}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      {/* Temperature Control */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Temperature: {temperature}°C
        </label>
        <input
          type="range"
          min="-10"
          max="40"
          value={temperature}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setTemperature(value);
            onTemperatureChange(value);
          }}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      {/* Lights Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Lights</label>
        <div className="relative inline-block w-12 align-middle select-none">
          <input 
            type="checkbox" 
            className="sr-only"
            id="toggle-lights"
            onChange={(e) => onLightsChange(e.target.checked)} 
          />
          <label 
            htmlFor="toggle-lights"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
          >
            <span className="block w-6 h-6 rounded-full bg-white transform translate-x-0 transition-transform duration-200 ease-in"></span>
          </label>
        </div>
        <style jsx>{`
          #toggle-lights:checked + .toggle-label {
            background-color: #3B82F6;
          }
          #toggle-lights:checked + .toggle-label span {
            transform: translateX(100%);
          }
        `}</style>
      </div>
      
      {/* Door Controls */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Doors</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onDoorStatusChange('frontLeft', true)}
            className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 rounded"
          >
            Open Front Left
          </button>
          <button
            onClick={() => onDoorStatusChange('frontLeft', false)}
            className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded"
          >
            Close Front Left
          </button>
          
          <button
            onClick={() => onDoorStatusChange('frontRight', true)}
            className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 rounded"
          >
            Open Front Right
          </button>
          <button
            onClick={() => onDoorStatusChange('frontRight', false)}
            className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded"
          >
            Close Front Right
          </button>
          
          <button
            onClick={() => onDoorStatusChange('rearLeft', true)}
            className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 rounded"
          >
            Open Rear Left
          </button>
          <button
            onClick={() => onDoorStatusChange('rearLeft', false)}
            className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded"
          >
            Close Rear Left
          </button>
          
          <button
            onClick={() => onDoorStatusChange('rearRight', true)}
            className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 rounded"
          >
            Open Rear Right
          </button>
          <button
            onClick={() => onDoorStatusChange('rearRight', false)}
            className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded"
          >
            Close Rear Right
          </button>
          
          <button
            onClick={() => onDoorStatusChange('trunk', true)}
            className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 rounded"
          >
            Open Trunk
          </button>
          <button
            onClick={() => onDoorStatusChange('trunk', false)}
            className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded"
          >
            Close Trunk
          </button>
        </div>
      </div>
    </div>
  );
}
