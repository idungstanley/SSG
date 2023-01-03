interface IChatData {
  id: string;
  model_id: string;
  model_type: string;
  name: string;
  updated_at: string;
  created_at: string;
  team_members: [
    {
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
  ];
}

export interface IChatFromList extends IChatData {
  new_messages_count: number;
}

export interface IChat extends IChatData {
  messages: string[];
}

export interface IChatRes {
  data: {
    chat: IChat;
    messages: [];
  };
}

export interface IChatsRes {
  data: {
    chats: IChatFromList[];
  };
}
