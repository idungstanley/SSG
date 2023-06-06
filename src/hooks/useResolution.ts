import useWindowSize from './useWindowSize';
import { setUserSettingsData, useGetUserSettingsKeys } from '../features/account/accountService';
import { RESOLUTION_RELATIVE_WIDTH, RESOLUTION_TYPES } from '../app/config/resolution';
import { useAppSelector } from '../app/hooks';

interface UseResolutiontionProps {
  isDrag: boolean;
}

const useResolution = ({ isDrag }: UseResolutiontionProps) => {
  const { width } = useWindowSize();

  const { sidebarWidthRD } = useAppSelector((state) => state.workspace);

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
  console.log(isDrag);

  const resolution = getResolution(width);
  setUserSettingsData(isDrag, { sidebarWidth: sidebarWidthRD }, resolution);
  // useEffect(() => {
  // }, [resolution, sidebarWidthRD]);
  // useSetUserSettingsKeys();

  useGetUserSettingsKeys(true, resolution);

  return resolution;
};

export default useResolution;
