'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const avatars = [
  { id: 1, src: '/avtr1.png' },
  { id: 2, src: '/avtr1f.png' },
  { id: 3, src: '/avtr2.png' },
  { id: 4, src: '/avtr2f.png' },
  { id: 5, src: '/avtr3.png' },
  { id: 6, src: '/avtr3f.png' },
  { id: 7, src: '/avtr4.png' },
  { id: 8, src: '/avtr4f.png' },
  { id: 9, src: '/avtr5.png' },
  { id: 10, src: '/avtr5f.png' },
  { id: 11, src: '/avtr6.png' },
  { id: 12, src: '/avtr6f.png' },
  { id: 13, src: '/avtr7.png' },
  { id: 14, src: '/avtr7f.png' },
];

const ExtendedAvatars = [...avatars, ...avatars, ...avatars, ...avatars, ...avatars];
const ITEM_WIDTH = 120; 

export default function AvatarSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const middleIndex = Math.floor(ExtendedAvatars.length / 2);
      container.scrollLeft = middleIndex * ITEM_WIDTH;
      setActiveIndex(middleIndex);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollPos = container.scrollLeft;
    const rawIndex = Math.round(scrollPos / ITEM_WIDTH);
    
    if (rawIndex !== activeIndex && rawIndex >= 0 && rawIndex < ExtendedAvatars.length) {
      setActiveIndex(rawIndex);
    }

    const singleSetWidth = avatars.length * ITEM_WIDTH;
    if (scrollPos < singleSetWidth) {
      container.scrollLeft += singleSetWidth * 2;
    } else if (scrollPos > singleSetWidth * 4) {
      container.scrollLeft -= singleSetWidth * 2;
    }
  }, [activeIndex]);

  const startDragging = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    scrollLeftStart.current = containerRef.current!.scrollLeft;
  };

  const moveDragging = (clientX: number) => {
    if (!isDragging.current) return;
    const x = clientX;
    const walk = (x - startX.current) * 1.5;
    containerRef.current!.scrollLeft = scrollLeftStart.current - walk;
  };

  const stopDragging = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const container = containerRef.current;
    if (container) {
      const targetScroll = Math.round(container.scrollLeft / ITEM_WIDTH) * ITEM_WIDTH;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden select-none">
      {/* Selection Circle - Centered exactly in the middle of the parent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="size-32 rounded-full border-4 border-bright-purple shadow-[0_0_25px_rgba(114,9,183,0.6)] bg-white/5 backdrop-blur-[2px]" />
      </div>

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={(e) => startDragging(e.pageX)}
        onMouseMove={(e) => moveDragging(e.pageX)}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={(e) => startDragging(e.touches[0].pageX)}
        onTouchMove={(e) => moveDragging(e.touches[0].pageX)}
        onTouchEnd={stopDragging}
        className="w-full h-full overflow-x-auto no-scrollbar flex items-center cursor-grab active:cursor-grabbing px-[calc(50%-60px)]"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex items-center" style={{ minWidth: 'max-content' }}>
          {ExtendedAvatars.map((avatar, i) => {
            const isActive = i === activeIndex;
            return (
              <div 
                key={`${avatar.id}-${i}`}
                className="flex items-center justify-center shrink-0"
                style={{ width: ITEM_WIDTH }}
              >
                <div className={cn(
                  "transition-all duration-300 ease-in-out",
                  isActive ? "scale-150 opacity-100 z-20" : "scale-75 opacity-20 grayscale z-0"
                )}>
                  <img 
                    src={avatar.src} 
                    alt="avatar" 
                    className="w-20 h-auto drop-shadow-xl pointer-events-none"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
