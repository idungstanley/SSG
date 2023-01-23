import requestNew from '../../app/requestNew';

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
  console.log(response);
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
