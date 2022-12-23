import {
  IExplorerFile,
  IExplorerFolder,
} from './../explorer/explorer.interfaces';

interface ISharedFile {
  id: string;
  file: IExplorerFile;
  created_at: string;
  updated_at: string;
}

interface ISharedFolder {
  id: string;
  folder: IExplorerFolder;
  created_at: string;
  updated_at: string;
}

export interface ISharedFiles extends IExplorerFile {
  data: {
    files: ISharedFile[];
    current_file: {
      id: string;
    };
  };
}

export interface ISharedFolders {
  data: {
    folders: ISharedFolder[];
    current_folder: {
      id: string;
    };
  };
}
