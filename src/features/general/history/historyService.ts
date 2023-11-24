import { useMutation } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { IHistoryRes } from './history.interfaces';
import { setActivityArray } from '../../workspace/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { pilotTabs } from '../../../app/constants/pilotTabs';

// ...

type GetItemHistoryData = {
  logType: string | null;
};

export const useGetItemHistory = () => {
  const dispatch = useAppDispatch();
  const { activeItemType, activeItemId } = useAppSelector((state) => state.workspace);

  const getItemHistory = async (data: GetItemHistoryData) => {
    const type = data.logType === pilotTabs.ACTIVITY_LOG ? 'activity' : 'history';
    const response = await requestNew<IHistoryRes>({
      url: 'activity-logs/list',
      method: 'POST',
      data: {
        model: activeItemType,
        model_id: activeItemId,
        type
      }
    });

    return response.data.activity_logs;
  };

  const mutation = useMutation(getItemHistory, {
    onSuccess: (data) => {
      dispatch(setActivityArray(data));
    }
  });

  const { status } = mutation;

  return { status, getItemHistory: mutation.mutate };
};
