import { ScreenSizesState } from 'types/common';
import { LIMITS } from './constants';

export const getLimit = (screenSizes: ScreenSizesState) => {
  if (screenSizes.isMobile) {
    return LIMITS.mobile;
  }

  if (screenSizes.isTablet) {
    return LIMITS.tablet;
  }

  return LIMITS.desktop;
};
