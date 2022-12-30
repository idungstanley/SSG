export interface IResponseData {
  success: boolean;
  message: {
    title: string;
    body: string;
  };
}

export interface IExplorerFile {
  id: string;
  physical_file_id: string;
  folder_id: string | null;
  folder: string | null;
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
  created_at: string;
  updated_at: string;
  shared_by: {
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

export interface IExplorerFolder {
  id: string;
  name: string;
  display_name: string;
  size: number;
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
  created_at: string;
  updated_at: string;
  shared_by: {
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

// export interface IExplorerData {
//   id: string;
//   physical_file_id: string;
//   folder_id: string | null;
//   folder: string | null;
//   size: number;
//   display_name: string;
//   file_format: {
//     key: string;
//     extension: string;
//     name: string;
//     mime: string;
//     icon_name: string;
//   };
//   also_saved_in_files: never[];
//   created_at: string;
//   updated_at: string;

//   id: string;
//   name: string;
//   parent_id: string | null;
//   full_path: string;
//   ancestor_path: string | null;
//   ancestors:
//     | {
//         name: string;
//         id: string;
//       }[]
//     | null;
//   hex_colour: string;
//   tailwind_colour: string;
//   created_at: string;
//   updated_at: string;
// }

export interface IExplorerFilesAndFolders extends IResponseData {
  data: {
    files: IExplorerFile[];
    folders: IExplorerFolder[];
    current_folder: {
      id: string;
    } | null;
  };
}
