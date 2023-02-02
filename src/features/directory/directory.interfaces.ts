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

export interface IDirectoryTemplateRes {
  data: {
    templates: IDirectoryTemplate[];
  };
}
