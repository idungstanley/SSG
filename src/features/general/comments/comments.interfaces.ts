import { IMentionUser } from '../../chat/chat.interfaces';

export interface ICommentsRes {
  data: {
    comments: IComment[];
  };
}

export interface IComment {
  id: string;
  message: string;
  can_modify: boolean;
  mention_users: IMentionUser[];
}
