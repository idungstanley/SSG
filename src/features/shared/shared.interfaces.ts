import {
  IExplorerFile,
  IExplorerFolder,
} from './../explorer/explorer.interfaces';

export interface IExplorerAndSharedData {
  id: string;
  file: IExplorerFile; // ?
  created_at: string;
  updated_at: string;
  folder: IExplorerFolder; // ?

  physical_file_id: string;
  folder_id: string | null;
  // folder: string | null;
  size: number;
  name: string;
  display_name: string;
  file_format: {
    key: string;
    extension: string;
    name: string;
    mime: string;
    icon_name: string;
  };
  also_saved_in_files: never[];

  shared_by: {
    user: {
      id: string;
      email: string;
      name: string;
    };
  };

  parent_id: string | null;
  full_path: string;
  ancestor_path: string | null;
  ancestors:
    | {
        name: string;
        id: string;
      }[]
    | null;
  hex_colour: string;
  tailwind_colour: string;
}

// export interface ISharedFile {
//   id: string;
//   file: IExplorerFile;
//   created_at: string;
//   updated_at: string;
// }

// export interface ISharedFolder {
//   id: string;
//   folder: IExplorerFolder;
//   created_at: string;
//   updated_at: string;
// }

export interface ISharedFiles {
  data: {
    files: IExplorerAndSharedData[];
    current_file: {
      id: string;
    };
  };
}

export interface ISharedFolders {
  data: {
    folders: IExplorerAndSharedData[];
    current_folder: {
      id: string;
    };
  };
}
