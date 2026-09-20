'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, BoxProps } from '@mui/material';

interface SlideUpInViewProps extends BoxProps {
  children: React.ReactNode;
  initialY?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  /** Render visible immediately (use for above-the-fold / LCP text). */
  immediate?: boolean;
}

const SlideUpInView: React.FC<SlideUpInViewProps> = ({
  children,
  initialY = 30,
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  immediate = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(immediate);
  const [isMounted, setIsMounted] = useState(immediate);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) return;
    setIsMounted(true);
  }, [immediate]);

  useEffect(() => {
    if (immediate || !isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold, isMounted, immediate]);

  return (
    <Box
      ref={elementRef}
      sx={{
        transform: isVisible ? 'translateY(0)' : `translateY(${initialY}px)`,
        opacity: isVisible ? 1 : 0,
        transition: isMounted && !immediate ? `all ${duration}s ease-out` : 'none',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SlideUpInView;
