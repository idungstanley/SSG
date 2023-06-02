import { useQuery } from '@tanstack/react-query';
import { itemType } from '../../../types/index';
import requestNew from '../../../app/requestNew';
import { IActivityLog, IHistoryRes } from './history.interfaces';

export const useGetItemHistory = (data: { type?: itemType; id?: string | null }) =>
  useQuery<IHistoryRes, unknown, IActivityLog[]>(
    ['history', data.id],
    () =>
      requestNew({
        url: 'activity-logs/list',
        method: 'POST',
        params: {
          model: data.type,
          // type: data.type,
          model_id: data.id
        }
      }),
    {
      enabled: !!data.type && !!data.id,
      select: (res) => res.data.activity_logs
    }
  );
