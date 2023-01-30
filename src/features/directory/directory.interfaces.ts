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
