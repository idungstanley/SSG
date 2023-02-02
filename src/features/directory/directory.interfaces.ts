export type FieldType = 'number' | 'text' | 'date' | 'bool' | 'directory';

export interface IDirectory {
  id: string;
  name: string;
  parent_id: null | string;
}

export interface IDirWithChildren {
  name: string;
  id: string;
  parent_id: string | null;
  children: IDirWithChildren[];
}

export interface IDirectoriesRes {
  data: {
    directories?: IDirectory[];
    tree_elements?: {
      directories: IDirectory[];
    };
  };
}

export interface IDirectoryTemplate {
  id: string;
  name: string;
  directory_id: string;
}

export interface IDirectoryTemplatesRes {
  data: {
    templates: IDirectoryTemplate[];
  };
}

interface ITemplateField {
  id: string;
  name: string;
  type: string;
  is_title: 1 | 0;
  is_required: 1 | 0;
}

export interface IDirectoryTemplateWithFields {
  id: string;
  name: string;
  fields: ITemplateField[];
}

export interface IDirectoryTemplateRes {
  data: {
    template: IDirectoryTemplateWithFields[];
  };
}

export interface IDirectoryTemplateItem {
  id: string;
  name: string;
}

export interface IDirectoryTemplateItemsRes {
  data: {
    items: IDirectoryTemplateItem[];
  };
}
