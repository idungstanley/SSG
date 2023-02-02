import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import {
  IDirectoriesRes,
  IDirectory,
  // IDirectoryRes,
  IDirectoryTemplate,
  IDirectoryTemplateRes,
  // IDirectoryTmpRes,
  // IDirectoryTree,
} from './directory.interfaces';

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

// export const useGetDirectoryTmp = (id?: string | null) =>
//   useQuery<IDirectoryTmpRes, unknown, IDirectoryTree>(
//     ['directory', id || 'root'],
//     () =>
//       requestNew(
//         {
//           url: `directories${id ? '/' + id : ''}`,
//           method: 'GET',
//           params: {
//             include_tree: 1,
//           },
//         },
//         true
//       ),
//     {
//       select: (res) => res.data,
//     }
//   );

// export const useGetDirectory = (id?: string) =>
//   useQuery<IDirectoryRes, unknown, IDirectory>(
//     ['directory', id],
//     () =>
//       requestNew(
//         {
//           url: `directories/${id} `,
//           method: 'GET',
//         },
//         true
//       ),
//     {
//       select: (res) => res.data.directory,
//       enabled: !!id,
//     }
//   );

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

export const useGetDirectoryTemplate = (
  directoryId: string,
  templateId: string
) =>
  useQuery<IDirectoryTemplateRes, unknown, IDirectoryTemplate>(
    ['directory-template', templateId],
    () =>
      requestNew(
        {
          url: `directories/${directoryId}/template${templateId}`,
          method: 'GET',
        },
        true
      ),
    {
      select: (res) => res.data.template,
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
