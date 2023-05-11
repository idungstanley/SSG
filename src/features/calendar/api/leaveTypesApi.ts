import { LeaveType } from './../types/leaveTypes.d';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { AddLeaveTypeProps, LeaveTypesRes } from '../types/leaveTypes';

export const useLeaveTypes = () => {
  const queryClient = useQueryClient();
  return useQuery(
    ['leaveTypes'],
    () =>
      requestNew<LeaveTypesRes>({
        url: 'hr/leave-types',
        method: 'GET'
      }),
    {
      select: (res) => res.data.leave_types,
      onSuccess: (res) => res.map((i) => queryClient.setQueryData(['leaveTypes', i.id], i))
    }
  );
};

const addLeaveType = (data: AddLeaveTypeProps) => {
  const response = requestNew({
    url: 'hr/leave-types',
    method: 'POST',
    data
  });
  return response;
};

export const useAddLeaveType = () => {
  const queryClient = useQueryClient();

  return useMutation(addLeaveType, {
    onSuccess: () => {
      queryClient.invalidateQueries(['leaveTypes']);
    }
  });
};

const deleteLeaveType = (id: Pick<LeaveType, 'id'>['id']) => {
  const response = requestNew({
    url: 'hr/leave-types/' + id,
    method: 'DELETE'
  });
  return response;
};

export const useDeleteLeaveType = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteLeaveType, {
    onSuccess: () => {
      queryClient.invalidateQueries(['leaveTypes']);
    }
  });
};

const updateLeaveType = ({ id, data }: { id: Pick<LeaveType, 'id'>['id']; data: Partial<LeaveType> }) => {
  const response = requestNew({
    url: 'hr/leave-types/' + id,
    method: 'POST',
    data
  });
  return response;
};

export const useUpdateLeaveType = (id: Pick<LeaveType, 'id'>['id']) => {
  const queryClient = useQueryClient();

  return useMutation(updateLeaveType, {
    onSuccess: () => {
      queryClient.invalidateQueries(['leaveTypes', id]);
    }
  });
};
