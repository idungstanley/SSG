import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import {
  IDirectoriesRes,
  IDirectory,
  IDirectoryRes,
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
    ['directory-p', includeTree ? 'tree-' + parentId : parentId || 'root'],
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

export const useGetDirectory = (directoryId?: string, isDirectory?: boolean) =>
  useQuery<IDirectoryRes, unknown, IDirectory>(
    ['directory', directoryId || 'root'],
    () =>
      requestNew(
        {
          url: `directories/${directoryId}`,
          method: 'GET',
        },
        true
      ),
    {
      enabled: isDirectory ? !!directoryId : !!directoryId && isDirectory,
      select: (res) => res.data.directory,
    }
  );

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

export const useGetDirectoryTemplate = (templateId?: string | null, isTemplate?: boolean) =>
  useQuery<IDirectoryTemplateRes, unknown, IDirectoryTemplateWithFields>(
    ['directory-template', templateId],
    () =>
      requestNew(
        {
          url: `directory-templates/${templateId}`,
          method: 'GET',
        },
        true
      ),
    {
      enabled: isTemplate ? !!templateId : !!templateId && isTemplate,
      select: (res) => res.data.template,
    }
  );

export const useGetDirectoryTemplateItems = (templateId: string | null) =>
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
