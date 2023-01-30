interface ITemplate {
  id: string;
  name: string;
}

export interface IDirectory {
  id: string;
  name: string;
  parent_id: null | string;
  templates: ITemplate[];
}

export interface IDirectoriesRes {
  data: {
    hubs: IDirectory[];
  };
}

export interface IDirectoryRes {
  data: {
    directory: IDirectory;
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
