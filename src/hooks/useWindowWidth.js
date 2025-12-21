import { useState, useEffect } from 'react';

export function useWindowWidth() {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: window.matchMedia('(max-width: 767px)').matches,
    isTablet: window.matchMedia('(min-width: 768px) and (max-width: 1439px)').matches,
    isDesktop: window.matchMedia('(min-width: 1440px)').matches,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1439px)');
    const desktopQuery = window.matchMedia('(min-width: 1440px)');

    const handler = () => {
      setBreakpoints({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
      });
    };

    // Modern browsers support addEventListener on MediaQueryList
    mobileQuery.addEventListener('change', handler);
    tabletQuery.addEventListener('change', handler);
    desktopQuery.addEventListener('change', handler);

    return () => {
      mobileQuery.removeEventListener('change', handler);
      tabletQuery.removeEventListener('change', handler);
      desktopQuery.removeEventListener('change', handler);
    };
  }, []);

  return breakpoints;
}
