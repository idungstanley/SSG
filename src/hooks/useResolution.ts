import useWindowSize from './useWindowSize';
import { RESOLUTION_RELATIVE_WIDTH, RESOLUTION_TYPES } from '../app/config/resolution';

const useResolution = () => {
  const { width } = useWindowSize();

  const getResolution = (windowWidth: number): string | null => {
    if (windowWidth <= RESOLUTION_RELATIVE_WIDTH.MOBILE) {
      return RESOLUTION_TYPES.MOBILE;
    } else if (windowWidth <= RESOLUTION_RELATIVE_WIDTH.TABLET) {
      return RESOLUTION_TYPES.TABLET;
    } else if (windowWidth <= RESOLUTION_RELATIVE_WIDTH.LAPTOP) {
      return RESOLUTION_TYPES.LAPTOP;
    } else {
      return RESOLUTION_TYPES.DEFAULT;
    }
  };

  const resolution = getResolution(width);

  return resolution;
};

export default useResolution;
