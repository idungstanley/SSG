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
    directories?: IDirectory[];
    tree_elements?: {
      directories: IDirectory[];
    };
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

export interface IDirectoryTree {
  directories?: IDirectory[];
  directory?: IDirectory;
  tree?: { directories?: IDirectory[]; directory?: IDirectory }[];
}

export interface IDirectoryTmpRes {
  data: IDirectoryTree;
}
