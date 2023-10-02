import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { getStatusTemplateRes } from './statusManager.interface';
import { useAppDispatch } from '../../app/hooks';
import { setTemplateNames } from './statusManagerSlice';

export const useGetStatusTemplates = () => {
  const dispatch = useAppDispatch();
  return useQuery(
    ['status-template'],
    async () => {
      const data = await requestNew<getStatusTemplateRes>({
        url: '/task-status-templates',
        method: 'GET'
      });
      return data;
    },
    {
      onSuccess: (data) => {
        dispatch(setTemplateNames(data.data.task_status_templates));
      }
    }
  );
};
