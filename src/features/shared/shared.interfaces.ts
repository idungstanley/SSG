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

export interface IShareLink {
  id: string;
  temporary_url: null | string;
  created_by: {
    id: string;
    name: string;
    email: string;
    avatar_path: null | string;
  };
  created_at: string;
  shared_files?: {
    id: string;
    file: {
      id: string;
      display_name: string;
    };
  }[];
  shared_folders?: {
    id: string;
    folder: {
      id: string;
      name: string;
    };
  }[];
}

export interface IShareLinkRes {
  data: {
    share_documents_link: IShareLink;
  };
}

export type expiresIn = '1-hour' | '3-hours' | '24-hours' | '3-days' | '7-days';

export interface IPublishRes {
  data: {
    temporary_url: string;
  }[];
}
