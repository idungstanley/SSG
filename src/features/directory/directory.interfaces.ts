interface ITemplate {
  id: string;
  name: string;
}

export interface IDirWithTemplates {
  id: string;
  name: string;
  parent_id: null | string;
  templates: ITemplate[];
}

export interface IDirWithChildren {
  name: string;
  id: string;
  parent_id: string | null;
  children: IDirWithChildren[];
}

export interface IDirectoriesRes {
  data: {
    directories?: IDirWithTemplates[];
    tree_elements?: {
      directories: IDirWithTemplates[];
    };
  };
}

export interface IDirectoryTemplate {
  id: string;
  name: string;
  fields: string[];
}

export interface IDirectoryTemplateRes {
  data: {
    template: IDirectoryTemplate;
  };
}
