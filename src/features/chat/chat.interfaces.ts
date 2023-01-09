interface ITeamMember {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar_path: null | string;
  };
  role: {
    key: string;
    name: string;
  };
  colour: string;
  initials: string;
  created_at: string;
  updated_at: string;
}

export interface IMentionUser {
  id: string;
  name: string;
  email: string;
}

interface IAttachment {
  id: string;
  physical_file: {
    id: string;
    name: string;
    display_name: string;
    size: number;
    file_format: {
      key: string;
      extension: string;
      name: string;
      mime: string;
      icon_name: string;
    };
    created_at: string;
    updated_at: string;
  };
  path: string;
}

export interface IMessage {
  id: string;
  team_member: ITeamMember;
  message: string;
  updated_at: string;
  created_at: string;
  attachments: IAttachment[];
  mention_users: IMentionUser[];
}

interface IChatData {
  id: string;
  model_id: string;
  model_type: string;
  name: string;
  updated_at: string;
  created_at: string;
  team_members: ITeamMember[];
}

export interface IChatFromList extends IChatData {
  new_messages_count: number;
}

export interface IChat extends IChatData {
  messages: IMessage[];
}

export interface IChatRes {
  data: {
    chat: IChat;
    messages: IMessage[];
  };
}

export interface IChatsRes {
  data: {
    chats: IChatFromList[];
  };
}
