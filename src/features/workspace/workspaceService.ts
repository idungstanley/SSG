import requestNew from '../../app/requestNew';
import { useQuery } from '@tanstack/react-query';
import { IAllWorkspacesRes, IWorkspaceRes } from './workspace.interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFetchAllWorkspace } from './workspaceSlice';

interface IData {
  name: string | number;
  companySize: string | number;
  emails: string[] | null;
  color: string | null;
}

export const createWorkspaceService = (data: IData) => {
  const response = requestNew<IWorkspaceRes>({
    url: 'workspace',
    method: 'POST',
    data: {
      name: data.name,
      company_size: data.companySize,
      emails: data.emails,
      color: data.color
    }
  });
  return response;
};

export const getWorkspaceService = () => {
  return useQuery(['workspace'], async () => {
    const data = await requestNew<IWorkspaceRes | undefined>({
      url: 'workspace',
      method: 'GET'
    });
    return data;
  });
};

export const getAllWorkSpaceService = () => {
  const { fetchAllWorkspace } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  return useQuery(
    ['workspaces'],
    async () => {
      const data = await requestNew<IAllWorkspacesRes | undefined>({
        url: 'auth/account/workspaces',
        method: 'GET'
      });
      return data;
    },
    {
      enabled: !!fetchAllWorkspace,
      onSuccess: () => {
        dispatch(setFetchAllWorkspace(false));
      }
    }
  );
};

export const checkIfWorkspaceService = async () => {
  const response = requestNew({
    url: 'user/self',
    method: 'GET'
  });
  return response;
};
