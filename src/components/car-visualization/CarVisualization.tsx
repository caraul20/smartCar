'use client';

import { useEffect, useRef, useState } from 'react';
import { SVG, Svg } from '@svgdotjs/svg.js';

export type CarViewAngle = 'top' | 'side' | 'front';

export interface CarVisualizationProps {
  width?: number;
  height?: number;
  viewAngle?: CarViewAngle;
  color?: string;
  isMoving?: boolean;
  batteryLevel?: number; // 0-100 percent
  temperature?: number; // in degrees Celsius
  doorStatus?: {
    frontLeft: boolean;
    frontRight: boolean;
    rearLeft: boolean;
    rearRight: boolean;
    trunk: boolean;
  };
  lightsOn?: boolean;
  className?: string;
}

export default function CarVisualization({
  width = 600,
  height = 400,
  viewAngle = 'top',
  color = '#3B82F6', // blue-500
  isMoving = false,
  batteryLevel = 75,
  temperature = 22,
  doorStatus = {
    frontLeft: false,
    frontRight: false,
    rearLeft: false,
    rearRight: false,
    trunk: false
  },
  lightsOn = false,
  className = '',
}: CarVisualizationProps) {
  const svgRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<Svg | null>(null);
  
  // Initialize SVG canvas
  useEffect(() => {
    if (svgRef.current && !canvas) {
      const svg = SVG().addTo(svgRef.current).size(width, height);
      setCanvas(svg);
      return () => {
        svg.clear();
        svg.remove();
      };
    }
  }, [svgRef, width, height, canvas]);

  // Draw car based on viewAngle
  useEffect(() => {
    if (!canvas) return;
    
    canvas.clear();
    
    switch (viewAngle) {
      case 'top':
        drawTopView(canvas, { color, doorStatus, lightsOn, batteryLevel, isMoving });
        break;
      case 'side':
        drawSideView(canvas, { color, doorStatus, lightsOn, batteryLevel, isMoving });
        break;
      case 'front':
        drawFrontView(canvas, { color, doorStatus, lightsOn, batteryLevel, isMoving });
        break;
    }
    
    // Add temperature indicator
    drawTemperatureIndicator(canvas, temperature);
    
    // Add battery indicator
    drawBatteryIndicator(canvas, batteryLevel);
    
  }, [canvas, viewAngle, color, isMoving, batteryLevel, temperature, doorStatus, lightsOn]);

  return (
    <div 
      className={`relative bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`} 
      ref={svgRef}
    />
  );
}

interface DrawOptions {
  color: string;
  doorStatus: {
    frontLeft: boolean;
    frontRight: boolean;
    rearLeft: boolean;
    rearRight: boolean;
    trunk: boolean;
  };
  lightsOn: boolean;
  batteryLevel: number;
  isMoving: boolean;
}

// Helper function to draw the top view of the car
function drawTopView(canvas: Svg, options: DrawOptions) {
  const { color, doorStatus, lightsOn, isMoving } = options;
  const canvasWidth = canvas.width() as number;
  const canvasHeight = canvas.height() as number;
  const carWidth = canvasWidth * 0.4;
  const carLength = canvasHeight * 0.7;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  // Car body (top view)
  canvas.rect(carWidth, carLength).fill(color).radius(20)
    .move(centerX - carWidth/2, centerY - carLength/2);
  
  // Windows (windshield and rear window)
  const windshieldWidth = carWidth * 0.8;
  const windshieldHeight = carLength * 0.15;
  canvas.rect(windshieldWidth, windshieldHeight).fill('#9CA3AF')
    .move(centerX - windshieldWidth/2, centerY - carLength/2 + carLength * 0.1);
  
  canvas.rect(windshieldWidth, windshieldHeight).fill('#9CA3AF')
    .move(centerX - windshieldWidth/2, centerY + carLength/2 - carLength * 0.25);
  
  // Doors (with visual indicator for open doors)
  const doorWidth = carWidth * 0.05;
  const frontDoorLength = carLength * 0.3;
  const rearDoorLength = carLength * 0.3;
  
  // Front left door
  canvas.rect(doorWidth, frontDoorLength)
    .fill(doorStatus.frontLeft ? '#EF4444' : color)
    .move(centerX - carWidth/2, centerY - carLength/4);
  
  // Front right door
  canvas.rect(doorWidth, frontDoorLength)
    .fill(doorStatus.frontRight ? '#EF4444' : color)
    .move(centerX + carWidth/2 - doorWidth, centerY - carLength/4);
  
  // Rear left door
  canvas.rect(doorWidth, rearDoorLength)
    .fill(doorStatus.rearLeft ? '#EF4444' : color)
    .move(centerX - carWidth/2, centerY + carLength * 0.05);
  
  // Rear right door
  canvas.rect(doorWidth, rearDoorLength)
    .fill(doorStatus.rearRight ? '#EF4444' : color)
    .move(centerX + carWidth/2 - doorWidth, centerY + carLength * 0.05);
  
  // Trunk
  const trunkWidth = carWidth * 0.8;
  const trunkHeight = carLength * 0.05;
  canvas.rect(trunkWidth, trunkHeight)
    .fill(doorStatus.trunk ? '#EF4444' : color)
    .move(centerX - trunkWidth/2, centerY + carLength/2 - trunkHeight);
  
  // Wheels
  const wheelRadius = carWidth * 0.1;
  const wheelColor = '#1F2937';
  
  // Front left wheel
  canvas.circle(wheelRadius * 2).fill(wheelColor)
    .move(centerX - carWidth/2 - wheelRadius/2, centerY - carLength/3);
  
  // Front right wheel
  canvas.circle(wheelRadius * 2).fill(wheelColor)
    .move(centerX + carWidth/2 - wheelRadius * 1.5, centerY - carLength/3);
  
  // Rear left wheel
  canvas.circle(wheelRadius * 2).fill(wheelColor)
    .move(centerX - carWidth/2 - wheelRadius/2, centerY + carLength/4);
  
  // Rear right wheel
  canvas.circle(wheelRadius * 2).fill(wheelColor)
    .move(centerX + carWidth/2 - wheelRadius * 1.5, centerY + carLength/4);
  
  // Headlights
  if (lightsOn) {
    const lightRadius = carWidth * 0.06;
    const lightColor = '#FBBF24';
    
    // Front headlights
    canvas.circle(lightRadius).fill(lightColor)
      .move(centerX - carWidth/4, centerY - carLength/2 + lightRadius/2);
    
    canvas.circle(lightRadius).fill(lightColor)
      .move(centerX + carWidth/4 - lightRadius, centerY - carLength/2 + lightRadius/2);
    
    // Rear lights
    canvas.circle(lightRadius).fill('#EF4444')
      .move(centerX - carWidth/4, centerY + carLength/2 - lightRadius * 1.5);
    
    canvas.circle(lightRadius).fill('#EF4444')
      .move(centerX + carWidth/4 - lightRadius, centerY + carLength/2 - lightRadius * 1.5);
  }
  
  // Animation for moving car
  if (isMoving) {
    const wheels = canvas.find('circle');
    wheels.forEach(wheel => {
      // @ts-expect-error - SVG.js types don't handle animation methods correctly
      wheel.animate(2000, '<>', 0).rotate(360).loop();
    });
  }
}

// Helper function to draw the side view of the car
function drawSideView(canvas: Svg, options: DrawOptions) {
  const { color, doorStatus, lightsOn, isMoving } = options;
  const _canvasWidth = canvas.width() as number;
  const _canvasHeight = canvas.height() as number;
  const carWidth = _canvasWidth * 0.7;
  const carHeight = _canvasHeight * 0.3;
  const wheelRadius = carHeight * 0.4;
  const centerX = _canvasWidth / 2;
  const centerY = _canvasHeight / 2;
  
  // Car body (side view)
  const carBodyPoints = [
    [centerX - carWidth/2, centerY],
    [centerX - carWidth/2 + carWidth * 0.1, centerY - carHeight],
    [centerX + carWidth/2 - carWidth * 0.2, centerY - carHeight],
    [centerX + carWidth/2, centerY - carHeight/2],
    [centerX + carWidth/2, centerY],
  ];
  
  // Convert 2D array to flat array of numbers for polygon
  const flatCarBodyPoints: number[] = [];
  carBodyPoints.forEach(point => {
    flatCarBodyPoints.push(Number(point[0]), Number(point[1]));
  });
  
  canvas.polygon(flatCarBodyPoints).fill(color);
  
  // Windows
  const windowPoints = [
    [centerX - carWidth/2 + carWidth * 0.15, centerY - carHeight/2],
    [centerX - carWidth/2 + carWidth * 0.15, centerY - carHeight + carHeight * 0.1],
    [centerX + carWidth/2 - carWidth * 0.25, centerY - carHeight + carHeight * 0.1],
    [centerX + carWidth/2 - carWidth * 0.05, centerY - carHeight/2],
  ];
  
  // Convert 2D array to flat array of numbers for polygon
  const flatWindowPoints: number[] = [];
  windowPoints.forEach(point => {
    flatWindowPoints.push(Number(point[0]), Number(point[1]));
  });
  
  canvas.polygon(flatWindowPoints).fill('#9CA3AF');
  
  // Doors
  // Front door
  const frontDoorX = centerX - carWidth/3;
  const frontDoorColor = doorStatus.frontLeft ? '#EF4444' : color;
  
  canvas.line(frontDoorX, centerY, frontDoorX, centerY - carHeight * 0.8)
    .stroke({ color: frontDoorColor, width: 3 });
  
  // Rear door
  const rearDoorX = centerX + carWidth * 0.05;
  const rearDoorColor = doorStatus.rearLeft ? '#EF4444' : color;
  
  canvas.line(rearDoorX, centerY, rearDoorX, centerY - carHeight * 0.8)
    .stroke({ color: rearDoorColor, width: 3 });
  
  // Trunk
  const trunkColor = doorStatus.trunk ? '#EF4444' : color;
  canvas.line(
    centerX + carWidth/2 - carWidth * 0.05, centerY - carHeight * 0.6,
    centerX + carWidth/2, centerY - carHeight * 0.4
  ).stroke({ color: trunkColor, width: 3 });
  
  // Wheels
  canvas.circle(wheelRadius * 2).fill('#1F2937')
    .move(centerX - carWidth/3 - wheelRadius, centerY - wheelRadius);
    
  canvas.circle(wheelRadius * 2).fill('#1F2937')
    .move(centerX + carWidth/4 - wheelRadius, centerY - wheelRadius);
  
  // Headlights
  if (lightsOn) {
    const headlightHeight = carHeight * 0.15;
    const headlightWidth = carWidth * 0.05;
    
    // Front headlight
    canvas.rect(headlightWidth, headlightHeight).fill('#FBBF24')
      .move(centerX - carWidth/2 + headlightWidth/2, centerY - headlightHeight * 1.5);
    
    // Rear light
    canvas.rect(headlightWidth, headlightHeight).fill('#EF4444')
      .move(centerX + carWidth/2 - headlightWidth * 1.5, centerY - headlightHeight * 1.5);
  }
  
  // Animation for moving car
  if (isMoving) {
    const wheels = canvas.find('circle');
    wheels.forEach(wheel => {
      // @ts-expect-error - SVG.js types don't handle animation methods correctly
      wheel.animate(2000, '<>', 0).rotate(360).loop();
    });
  }
}

// Helper function to draw the front view of the car
function drawFrontView(canvas: Svg, options: DrawOptions) {
  const { color, lightsOn, isMoving } = options;
  const canvasWidth = canvas.width() as number;
  const canvasHeight = canvas.height() as number;
  const carWidth = canvasWidth * 0.6;
  const carHeight = canvasHeight * 0.4;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  // Car body (front view)
  canvas.rect(carWidth, carHeight).fill(color).radius(15)
    .move(centerX - carWidth/2, centerY - carHeight/2);
  
  // Windshield
  const windshieldWidth = carWidth * 0.8;
  const windshieldHeight = carHeight * 0.4;
  canvas.rect(windshieldWidth, windshieldHeight).fill('#9CA3AF').radius(10)
    .move(centerX - windshieldWidth/2, centerY - carHeight/2 + carHeight * 0.1);
  
  // Headlights
  const headlightWidth = carWidth * 0.15;
  const headlightHeight = carHeight * 0.2;
  
  // Left headlight
  canvas.rect(headlightWidth, headlightHeight).fill(lightsOn ? '#FBBF24' : '#D1D5DB').radius(5)
    .move(centerX - carWidth/2 + carWidth * 0.1, centerY + carHeight * 0.05);
  
  // Right headlight
  canvas.rect(headlightWidth, headlightHeight).fill(lightsOn ? '#FBBF24' : '#D1D5DB').radius(5)
    .move(centerX + carWidth/2 - carWidth * 0.1 - headlightWidth, centerY + carHeight * 0.05);
  
  // Grill
  const grillWidth = carWidth * 0.3;
  const grillHeight = carHeight * 0.1;
  canvas.rect(grillWidth, grillHeight).fill('#1F2937')
    .move(centerX - grillWidth/2, centerY + carHeight * 0.1);
  
  // Wheels (partially visible from front)
  const wheelWidth = carWidth * 0.1;
  const wheelHeight = carHeight * 0.15;
  
  // Left wheel
  canvas.ellipse(wheelWidth, wheelHeight).fill('#1F2937')
    .move(centerX - carWidth/2 - wheelWidth/4, centerY + carHeight/4);
  
  // Right wheel
  canvas.ellipse(wheelWidth, wheelHeight).fill('#1F2937')
    .move(centerX + carWidth/2 - wheelWidth * 0.75, centerY + carHeight/4);
  
  // Animation if car is moving (subtle pulsing of headlights)
  if (isMoving && lightsOn) {
    const headlights = canvas.find('rect').filter((rect) => {
      const fillColor = rect.attr('fill');
      return fillColor === '#FBBF24';
    });
    
    headlights.forEach(light => {
      // @ts-expect-error - SVG.js types don't handle animation methods correctly
      light.animate(1000, '<>', 0)
        .attr({ fill: '#F59E0B' })
        // @ts-expect-error - SVG.js types don't correctly type the loop method
        .loop(true, true);
    });
  }
}

// Helper function to draw the temperature indicator
function drawTemperatureIndicator(canvas: Svg, temperature: number): void {
  const width = 60;
  const height = 30;
  const x = 20;
  const y = 20;
  
  const tempColor = temperature > 30 ? '#EF4444' : 
                    temperature < 5 ? '#3B82F6' : 
                    '#10B981';
  
  // Background
  canvas.rect(width, height).fill('#F3F4F6').radius(5)
    .move(x, y);
  
  // Temperature text
  canvas.text(`${temperature}°C`).font({
    family: 'Arial',
    size: 14,
    weight: 'bold'
  }).fill(tempColor).move(x + 10, y + 7);
}

// Helper function to draw the battery indicator
function drawBatteryIndicator(canvas: Svg, batteryLevel: number): void {
  const canvasWidth = canvas.width() as number;
  const width = 80;
  const height = 30;
  const x = canvasWidth - width - 20;
  const y = 20;
  
  // Battery background
  canvas.rect(width, height).fill('#F3F4F6').radius(5)
    .move(x, y);
  
  // Battery level
  const levelWidth = (width - 10) * (batteryLevel / 100);
  const levelColor = batteryLevel > 50 ? '#10B981' : 
                     batteryLevel > 20 ? '#F59E0B' : 
                     '#EF4444';
  
  canvas.rect(levelWidth, height - 10).fill(levelColor).radius(3)
    .move(x + 5, y + 5);
  
  // Battery text
  canvas.text(`${batteryLevel}%`).font({
    family: 'Arial',
    size: 14,
    weight: 'bold'
  }).fill('#1F2937').move(x + 30, y + 7);
}
