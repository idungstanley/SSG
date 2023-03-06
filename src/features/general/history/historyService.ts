import { useQuery } from '@tanstack/react-query';
import { itemType } from '../../../types/index';
import requestNew from '../../../app/requestNew';
import { IActivityLog, IHistoryRes } from './history.interfaces';

export const useGetItemHistory = (data: { type?: itemType; id?: string | null }) =>
  useQuery<IHistoryRes, unknown, IActivityLog[]>(
    ['history', data.id],
    () =>
      requestNew(
        {
          url: 'history',
          method: 'GET',
          params: {
            type: data.type,
            id: data.id
          }
        },
        true
      ),
    {
      enabled: !!data.type && !!data.id,
      select: (res) => res.data.activity_logs
    }
  );
