import requestNew from '../../app/requestNew';
import { useQuery } from '@tanstack/react-query';

interface IData {
  name: string | number;
  companySize: string | number;
  emails: string[] | null;
}

export const createWorkspaceService = (data: IData) => {
  const response = requestNew(
    {
      url: 'workspace',
      method: 'POST',
      data: {
        name: data.name,
        company_size: data.companySize,
        emails: data.emails
      }
    },
    true
  );
  return response;
};

export const getWorkspaceService = () => {
  return useQuery(['workspace'], async () => {
    const data = await requestNew(
      {
        url: 'workspace',
        method: 'GET'
      },
      true
    );
    return data;
  });
};

export const getAllWorkSpaceService = () => {
  return useQuery(['workspaces'], async () => {
    const data = await requestNew(
      {
        url: 'auth/account/workspaces',
        method: 'GET'
      },
      true
    );
    return data;
  });
};

export const checkIfWorkspaceService = async () => {
  const response = requestNew(
    {
      url: 'user/self',
      method: 'GET'
    },
    true
  );
  return response;
};
