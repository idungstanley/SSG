import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import {
  IDirectoriesRes,
  IDirectory,
  IDirectoryTemplate,
  IDirectoryTemplateRes,
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
  useQuery<IDirectoryTemplateRes, unknown, IDirectoryTemplate[]>(
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
      // enabled: !!directoryId,
      select: (res) => res.data.templates,
    }
  );

export const useGetDirectoryTemplateItems = (
  directoryId: string,
  templateId: string
) =>
  // ! add types
  useQuery(
    ['directory-template-items', templateId],
    () =>
      requestNew(
        {
          url: `directories/${directoryId}/template${templateId}/items`,
          method: 'GET',
        },
        true
      ),
    {
      // select: (res) => res.data.template,
    }
  );
