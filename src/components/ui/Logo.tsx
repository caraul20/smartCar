'use client';

import { useEffect, useRef } from 'react';
import { SVG } from '@svgdotjs/svg.js';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    // Curățăm conținutul anterior
    logoRef.current.innerHTML = '';

    // Creăm un nou canvas SVG
    const canvas = SVG().addTo(logoRef.current).size(220, 50);

    // Definim gradientul principal pentru logo
    const primaryGradient = canvas.gradient('linear', function(add) {
      add.stop(0, '#1E40AF') // albastru închis
      add.stop(0.5, '#3B82F6') // albastru mediu
      add.stop(1, '#2563EB') // albastru strălucitor
    });

    // Gradientul secundar pentru accent
    const accentGradient = canvas.gradient('linear', function(add) {
      add.stop(0, '#374151') // gri închis
      add.stop(1, '#1F2937') // gri mai închis
    });

    // Definim gradientul pentru efectul glossy
    const glossGradient = canvas.gradient('linear', function(add) {
      add.stop(0, 'rgba(255, 255, 255, 0.7)')
      add.stop(0.5, 'rgba(255, 255, 255, 0)')
      add.stop(1, 'rgba(255, 255, 255, 0)')
    }).from(0, 0).to(0, 1);

    // Creăm grupul principal
    const logoGroup = canvas.group();
    
    // Adăugăm un dreptunghi pentru fundal cu colțuri rotunjite
    logoGroup.rect(180, 40)
      .radius(8)
      .move(10, 5)
      .fill('none');

    // Adăugăm simbolul
    const symbolGroup = logoGroup.group();
    
    // Desenăm un simbol de mașină stilizat
    symbolGroup.path('M22,25 C22,18 28,15 35,15 L45,15 C52,15 58,18 58,25 L58,28 C58,30 56,30 55,30 L25,30 C24,30 22,30 22,28 Z')
      .fill(primaryGradient)
      .stroke({ width: 0 });
    
    // Adăugăm efectul glossy
    symbolGroup.rect(36, 15)
      .move(22, 15)
      .fill(glossGradient)
      .opacity(0.3);
    
    // Adăugăm roțile
    symbolGroup.circle(6)
      .move(28, 27)
      .fill(accentGradient);
    
    symbolGroup.circle(6)
      .move(46, 27)
      .fill(accentGradient);
    
    // Adăugăm farurile
    symbolGroup.circle(3)
      .move(24, 20)
      .fill('#FFFFFF');
    
    symbolGroup.circle(3)
      .move(53, 20)
      .fill('#FFFFFF');
    
    // Adăugăm textul "SMART"
    logoGroup.text('SMART')
      .move(70, 15)
      .font({
        family: 'Inter, sans-serif',
        size: 18,
        weight: '700',
        anchor: 'start'
      })
      .fill(primaryGradient);
    
    // Adăugăm textul "CAR" cu stil diferit
    logoGroup.text('CAR')
      .move(70, 34)
      .font({
        family: 'Inter, sans-serif',
        size: 14,
        weight: '600',
        anchor: 'start'
      })
      .fill('currentColor')
      .opacity(0.9);
    
    // Adăugăm linia decorativă sub text
    logoGroup.line(70, 38, 110, 38)
      .stroke({ color: '#3B82F6', width: 2, linecap: 'round' });
    
    // Adăugăm un accent vizual
    logoGroup.rect(3, 20)
      .radius(1.5)
      .move(65, 15)
      .fill(primaryGradient);

    // Animație subtilă la încărcare
    logoGroup.opacity(0);
    logoGroup.animate(800).opacity(1);

  }, []);

  return (
    <div 
      ref={logoRef} 
      className={`inline-block ${className}`}
      style={{ minWidth: '220px', minHeight: '50px' }}
    />
  );
} 