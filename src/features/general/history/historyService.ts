import { useMutation } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { IHistoryRes } from './history.interfaces';
import { setActivityArray } from '../../workspace/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

// ...

type GetItemHistoryData = {
  logType: 'activity' | 'history';
};

export const useGetItemHistory = () => {
  const dispatch = useAppDispatch();
  const { activeItemType, activeItemId } = useAppSelector((state) => state.workspace);

  const getItemHistory = async (data: GetItemHistoryData) => {
    const response = await requestNew<IHistoryRes>({
      url: 'activity-logs/list',
      method: 'POST',
      data: {
        model: activeItemType,
        model_id: activeItemId,
        type: data.logType !== undefined ? data.logType : null
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
