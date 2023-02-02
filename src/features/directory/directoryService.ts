import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import {
  IDirectoriesRes,
  IDirectory,
  IDirectoryTemplate,
  IDirectoryTemplateItem,
  IDirectoryTemplateItemsRes,
  IDirectoryTemplateRes,
  IDirectoryTemplatesRes,
  IDirectoryTemplateWithFields,
} from './directory.interfaces';

// request includes both fetch with and within tree
export const useGetDirectories = (parentId?: string, includeTree?: boolean) =>
  useQuery<IDirectoriesRes, unknown, IDirectory[]>(
    ['directory', includeTree ? 'tree-' + parentId : parentId || 'root'],
    () =>
      requestNew(
        {
          url: `directories${includeTree ? '/' + parentId : ''}`,
          method: 'GET',
          params: {
            parent_id: !includeTree ? parentId : undefined,
            include_tree: includeTree ? 1 : undefined,
          },
        },
        true
      ),
    {
      select: (res) =>
        res.data.directories || res.data.tree_elements?.directories || [],
    }
  );

const createDirectory = (data: { name: string; parentId?: string }) => {
  const { name, parentId } = data;

  const response = requestNew(
    {
      url: 'directories',
      method: 'POST',
      params: {
        name,
        parent_id: parentId,
      },
    },
    true
  );
  return response;
};

export const useCreateDirectory = (parentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(createDirectory, {
    onSuccess: () => {
      if (!parentId) {
        queryClient.invalidateQueries(['directory', 'root']);
      } else {
        // ...
      }
    },
  });
};

const createDirectoryTemplate = (data: {
  name: string;
  directoryId: string;
}) => {
  const { name, directoryId } = data;

  const response = requestNew(
    {
      url: `directories/${directoryId}/template`,
      method: 'POST',
      data: {
        name,
      },
    },
    true
  );
  return response;
};

export const useCreateDirectoryTemplate = (directoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation(createDirectoryTemplate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['directory', directoryId]);
    },
  });
};

export const useGetDirectoryTemplates = (directoryId?: string) =>
  useQuery<IDirectoryTemplatesRes, unknown, IDirectoryTemplate[]>(
    ['directory-templates', directoryId || 'root'],
    () =>
      requestNew(
        {
          url: 'directory-templates',
          method: 'GET',
          params: !directoryId
            ? undefined
            : {
                directory_id: directoryId,
              },
        },
        true
      ),
    {
      select: (res) => res.data.templates,
    }
  );

export const useGetDirectoryTemplate = (templateId?: string) =>
  useQuery<IDirectoryTemplateRes, unknown, IDirectoryTemplateWithFields[]>(
    ['directory-templates', templateId],
    () =>
      requestNew(
        {
          url: `directory-templates/${templateId}`,
          method: 'GET',
        },
        true
      ),
    {
      enabled: !!templateId,
      select: (res) => res.data.template,
    }
  );

export const useGetDirectoryTemplateItems = (templateId: string) =>
  useQuery<IDirectoryTemplateItemsRes, unknown, IDirectoryTemplateItem[]>(
    ['directory-template-items', templateId],
    () =>
      requestNew(
        {
          url: `directory-templates/${templateId}/items`,
          method: 'GET',
        },
        true
      ),
    {
      enabled: !!templateId,
      select: (res) => res.data.items,
    }
  );
