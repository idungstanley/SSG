import { useEffect } from 'react';
import useWindowSize from './useWindowSize';
import {
  setUserSettingsKeys,
  useGetUserSettingsKeys,
  useSetUserSettingsKeys
} from '../features/account/accountService';
import { RESOLUTION_RELATIVE_WIDTH, RESOLUTION_TYPES } from '../app/config/resolution';
import { useAppSelector } from '../app/hooks';
import { isEqual } from 'lodash';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const userSettingsData = localStorage.getItem('userSettingsData');

const useResolution = () => {
  const { width } = useWindowSize();
  const queryClient = useQueryClient();

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

  const resolution = getResolution(width);
  const previousData = JSON.parse(JSON.stringify(!!sidebarWidthRD));
  const isAnyItemChanged = !isEqual(sidebarWidthRD, previousData);
  useEffect(() => {
    setUserSettingsKeys({ sidebarWidth: sidebarWidthRD }, resolution);
  }, [resolution, sidebarWidthRD]);
  useSetUserSettingsKeys();

  useGetUserSettingsKeys(!!userSettingsData || isAnyItemChanged, resolution);

  return resolution;
};

export default useResolution;
