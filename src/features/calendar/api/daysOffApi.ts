import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { AddDayOffProps, DayOff, DaysOffRes, UnapprovedDaysOffRes } from '../types/daysOff';

export const useDaysOff = (hubId: string) =>
  useQuery(
    ['daysOff', hubId],
    () =>
      requestNew<DaysOffRes>({
        url: 'hr/day-off',
        method: 'GET',
        params: {
          hub_id: hubId
        }
      }),
    {
      select: (res) => res.data.list
    }
  );

export const useDisapprovedDaysOff = (hubId: string) =>
  useQuery(
    ['disapprovedDaysOff', hubId],
    () =>
      requestNew<UnapprovedDaysOffRes>({
        url: 'hr/day-off/requests',
        method: 'GET',
        params: {
          hub_id: hubId
        }
      }),
    {
      select: (res) => res.data.requests
    }
  );

const addDayOff = (data: AddDayOffProps) => {
  const response = requestNew({
    url: 'hr/day-off',
    method: 'POST',
    data
  });
  return response;
};

export const useAddDayOff = (hubId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(addDayOff, {
    onSuccess: () => {
      queryClient.invalidateQueries(['daysOff', hubId]);
      queryClient.invalidateQueries(['disapprovedDaysOff', hubId]);
    }
  });
};

const approveDayOff = (id: Pick<DayOff, 'id'>['id']) => {
  const response = requestNew({
    url: 'hr/day-off/' + id + '/approve',
    method: 'POST'
  });
  return response;
};

export const useApproveDayOff = (hubId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(approveDayOff, {
    onSuccess: () => {
      queryClient.invalidateQueries(['daysOff', hubId]);
      queryClient.invalidateQueries(['disapprovedDaysOff', hubId]);
    }
  });
};

const disapproveDayOff = (id: Pick<DayOff, 'id'>['id']) => {
  const response = requestNew({
    url: 'hr/day-off/' + id,
    method: 'DELETE'
  });
  return response;
};

export const useDisapproveDayOff = (hubId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(disapproveDayOff, {
    onSuccess: () => {
      queryClient.invalidateQueries(['daysOff', hubId]);
      queryClient.invalidateQueries(['disapprovedDaysOff', hubId]);
    }
  });
};
