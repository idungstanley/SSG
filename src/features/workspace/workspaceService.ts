import requestNew from '../../app/requestNew';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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

export const getWorkspaceService = async () => {
  const response = requestNew(
    {
      url: 'workspace',
      method: 'GET',
    },
    true
  );
  return response;
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
export const UseCreateTagService = ({ name }) => {
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
  const queryClient = useQueryClient();

  return useQuery(
    ['tags'],
    async () => {
      const data = await requestNew(
        {
          url: 'tags',
          method: 'GET',
        },
        true
      );
      return data;
    },
    {
      // enabled: !!trigger,
      // onSuccess: (data) => {
      //   // data.data.inboxes.map((inbox) =>
      //   //   queryClient.setQueryData(['inbox', inbox.id], inbox)
      //   // );
      //   return data;
      // },
    }
  );
};
