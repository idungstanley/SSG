/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IHrHubsRes } from './hubs.interfaces';

export const useGetAllHubsOnly = () => {
  return useQuery(
    ['retrieve'],
    () =>
      requestNew<IHrHubsRes>({
        url: 'all-hubs',
        method: 'GET'
      }),
    {
      select: (res) => res.data
    }
  );
};
