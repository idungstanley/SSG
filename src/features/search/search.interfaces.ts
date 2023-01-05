interface IFile {
  id: string;
  created_at: string;
  updated_at: string;
  size: number;
  file_format: {
    extension: string;
  };
  display_name: string;
  ancestor_path: null | string;
}

interface IFolder {
  id: string;
  created_at: string;
  updated_at: string;
  ancestor_path: null | string;
  name: string;
}

interface IInboxFile {
  id: string;
  created_at: string;
  updated_at: string;
  inbox_file_source: {
    size: number;
    file_format: {
      extension: string;
    };
    display_name: string;
  };
}

export interface IExplorerSearchRes {
  data: {
    files: IFile[];
    folders: IFolder[];
  };
}

export interface IInboxSearchRes {
  data: {
    inbox_files: IInboxFile[];
  };
}

export interface ISavedSearch {
  key: string;
  is_json: boolean;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface ISavedSearchesRes {
  data: {
    settings: ISavedSearch[];
  };
}
