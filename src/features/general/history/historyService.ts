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
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const id = pilotSideOver.id;
  const type = pilotSideOver.type;

  const getItemHistory = async (data: GetItemHistoryData) => {
    const response = await requestNew<IHistoryRes>({
      url: 'activity-logs/list',
      method: 'POST',
      data: {
        model: type,
        model_id: id,
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
