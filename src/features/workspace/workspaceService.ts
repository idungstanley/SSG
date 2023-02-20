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
        emails: data.emails,
      },
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
        method: 'GET',
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
      method: 'GET',
    },
    true
  );
  return response;
};

//tags
export const UseCreateTagService = ({ name }: { name: string }) => {
  const url = 'tags';
  const response = requestNew(
    {
      url,
      method: 'POST',
      data: {
        name: name,
      },
    },
    true
  );
  return response;
};

export const UseGetAllTagsService = () => {
  return useQuery(['tags'], async () => {
    const data = await requestNew(
      {
        url: 'tags',
        method: 'GET',
      },
      true
    );
    return data;
  });
};
