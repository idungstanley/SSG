// import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const createWorkspaceService = (data) => {
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
    true,
  );
  return response;
};

export const getWorkspaceService = async () => {
  const response = requestNew({
    url: 'workspace',
    method: 'GET',
  }, true);
  return response;
};

export const checkIfWorkspaceService = async () => {
  const response = requestNew(
    {
      url: 'user/self',
      method: 'GET',
    },
    true,
  );
  return response;
};
