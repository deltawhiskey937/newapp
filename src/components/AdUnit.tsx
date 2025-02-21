import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdUnit({ slot }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (adRef.current && !initialized.current) {
      try {
        // Remove any existing ad
        const existingAd = adRef.current.querySelector('.adsbygoogle');
        if (existingAd) {
          existingAd.remove();
        }

        // Create new ad
        const ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.dataset.adClient = 'ca-pub-4193081293383926';
        ins.dataset.adSlot = slot;
        ins.dataset.adFormat = 'auto';
        ins.dataset.fullWidthResponsive = 'true';

        adRef.current.appendChild(ins);
        
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }

    return () => {
      initialized.current = false;
    };
  }, [slot]);

  return (
    <div ref={adRef} className="w-full overflow-hidden bg-gray-100 min-h-[250px]" />
  );
}