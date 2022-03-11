import { useEffect, useState } from 'react';

import { SIZES } from './constants';

export const useScreenSize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= SIZES.sm;
  const isTablet = width <= SIZES.md;
  const isDesktop = width > SIZES.md;
  return { isMobile, isTablet, isDesktop };
};
