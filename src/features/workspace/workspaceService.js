// import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const createWorkspaceService = async (data) => {
  const response = requestNew(
    {
      url: 'workspace',
      method: 'POST',
      params: {
        name: data.name,
        company_size: data.companySize,
        emails: data.emails,
      },
    },
    true,
  );
  return response;
};
