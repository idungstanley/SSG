import { Tag } from '../../task/interface.tasks';

export interface ITags {
  id: string;
  name: string;
  color: string;
}

export interface IPagination {
  page: number;
  per_page: number;
  has_more_pages: boolean;
}

export interface ITagRes {
  data: {
    tags: ITags[];
    pagination: IPagination;
  };
}

export interface TagsRes {
  data: {
    tags: Tag[];
    pagination: IPagination;
  };
}

export interface AddTagRes {
  data: {
    tag: Tag;
  };
}
