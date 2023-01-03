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

export interface IMessage {
  id: string;
  team_member: ITeamMember;
  message: string;
  updated_at: string;
  created_at: string;
  // attachments: [
  //   {
  //     id: '8d7b6ab9-8afc-461d-8efa-e24770e28e96';
  //     physical_file: {
  //       id: '0402a748-30e0-4454-94f6-06443a60b517';
  //       name: 'xbq3OEEH9QQdj80VEOS9xOpqlAfvorNHVBKQ3R5s.txt';
  //       display_name: 'SAMPLE1.OUT';
  //       size: 16886;
  //       file_format: {
  //         key: 'other';
  //         extension: 'bin';
  //         name: 'Other';
  //         mime: 'other';
  //         icon_name: 'other.svg';
  //       };
  //       created_at: '2023-01-03T17:17:41.000000Z';
  //       updated_at: '2023-01-03T17:17:42.000000Z';
  //     };
  //     path: 'https://f432bb60e50840a18fa61a4360541eb7.s3.eu-west-2.amazonaws.com/files/2023/01/03/xbq3OEEH9QQdj80VEOS9xOpqlAfvorNHVBKQ3R5s.txt?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQHTWSD4P6YDJCCFB%2F20230103%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230103T193801Z&X-Amz-SignedHeaders=host&X-Amz-Expires=14400&X-Amz-Signature=4819969782c3b91928ed187893062962c3734ddef6327ce0dfc5e33129a7e07c';
  //   }
  // ];
  mention_users: string[];
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
