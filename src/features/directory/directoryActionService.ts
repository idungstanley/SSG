import { useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { FieldType } from './directory.interfaces';

const createDirectory = (data: { name: string; parentId?: string }) => {
  const { name, parentId } = data;

  const response = requestNew(
    {
      url: 'directories',
      method: 'POST',
      params: {
        name,
        parent_id: parentId
      }
    },
    true
  );
  return response;
};

export const useCreateDirectory = (parentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(createDirectory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['directory', parentId || 'root']);
    }
  });
};

const createDirectoryTemplate = (data: { name: string; directoryId: string }) => {
  const { name, directoryId } = data;

  const response = requestNew(
    {
      url: 'directory-templates',
      method: 'POST',
      data: {
        name,
        directory_id: directoryId
      }
    },
    true
  );
  return response;
};

export const useCreateDirectoryTemplate = (directoryId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(createDirectoryTemplate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['directory', directoryId || 'root']);
    }
  });
};

const updateOrAddTemplateField = (data: {
  templateId: string;
  fields: {
    id: string;
    name: string;
    type: FieldType;
    isRequired: 1 | 0;
    isTitle: 1 | 0;
  }[];
}) => {
  const { templateId, fields } = data;

  const response = requestNew(
    {
      url: `directory-templates/${templateId}/fields`,
      method: 'PUT',
      data: {
        fields: fields.map((field) => ({
          id: field.id,
          name: field.name,
          type: field.type,
          is_title: field.isTitle,
          is_required: field.isRequired
        }))
      }
    },
    true
  );
  return response;
};

export const useUpdateOrAddTemplateField = (templateId: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateOrAddTemplateField, {
    onSuccess: () => {
      queryClient.invalidateQueries(['directory-template', templateId]);
    }
  });
};

const createTemplateItem = (data: { templateId: string; fields: Record<string, string> }) => {
  const { templateId, fields } = data;

  const response = requestNew(
    {
      url: `/directory-templates/${templateId}/item`,
      method: 'POST',
      data: {
        fields
      }
    },
    true
  );
  return response;
};

export const useCreateTemplateItem = (templateId: string) => {
  const queryClient = useQueryClient();

  return useMutation(createTemplateItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['directory-template-items', templateId]);
    }
  });
};
