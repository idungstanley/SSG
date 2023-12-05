import React, { useEffect, useRef, useState } from 'react';
import DropdownForMention from './DropdownForMention';
import { useSendMessageToChat } from '../../../../../features/chat/chatService';
import ChatEmoticons from '../../../../../assets/icons/ChatEmoticons';
import ChatFile from '../../../../../assets/icons/ChatFile';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  setChatAttachmentsFiles,
  setSelectedMessage,
  setShowFileAttachModal
} from '../../../../../features/chat/chatSlice';
import { IMentionUser, IMessage, IReplyOn } from '../../../../../features/chat/chat.interfaces';
import ChatRemoveReply from '../../../../../assets/icons/ChatRemoveReply';
import FileIcons from '../../../../Views/ui/Table/CustomField/Files/FileIcon';
import MicIcon from '../../../../../assets/icons/chatIcons/MicIcon';
import { useVoiceRecorder } from '../../../../Pilot/components/RecordScreen/VoiceRecordHandler';
import VoiceAudio from './VoiceAudio';
import DropdownArrowIcon from '../../../../../assets/icons/chatIcons/DropdownArrowIcon';

interface IParsedMessage {
  value: string;
  user?: IMentionUser;
}

export const generateMessageWithUserNames = (messageData: IMessage | IReplyOn): IParsedMessage[] => {
  if (messageData.mention_users.length) {
    const newMessage = messageData.message;
    const splitedMessage = newMessage.split(' ');
    const parsedMessage: IParsedMessage[] = [];
    splitedMessage.forEach((part) => {
      if (part.includes('@')) {
        const currentId = part.replace('@[', '').replace(']', '');
        const currentUser = messageData.mention_users.find((user) => user.id === currentId);
        parsedMessage.push({ value: `@${currentUser?.name} `, user: currentUser });
      } else {
        parsedMessage.push({ value: `${part} ` });
      }
    });
    return parsedMessage;
  }
  return [{ value: messageData.message }];
};

interface CreateMessageProps {
  chatId: string | null;
}

export default function CreateMessage({ chatId }: CreateMessageProps) {
  const dispatch = useAppDispatch();

  const { selectedMessage, chatAttachmentsFiles } = useAppSelector((state) => state.chat);

  const [message, setMessage] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<{ id: string; name: string }[]>([]);

  const { mutate: onSendMessage } = useSendMessageToChat();

  const {
    startRecording: Record,
    stopRecording: StopRecord,
    isRecording,
    recordedBlob,
    recordedData
  } = useVoiceRecorder();

  const startRecording = async () => {
    Record();
  };

  const stopRecording = () => {
    StopRecord();
    recordedData.recorder?.stop();
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let messageWithUserIds = '';
    if (message) {
      messageWithUserIds = `${message} ${selectedMembers.map((user) => `@[${user.id}] `)}`.trim();
    }
    const files = [];
    if (chatAttachmentsFiles.length) {
      files.push(...chatAttachmentsFiles.map((file) => file.data));
    }
    if (recordedBlob) {
      files.push(recordedBlob);
    }
    onSendMessage({
      message: messageWithUserIds,
      chatId,
      selectedMessage: selectedMessage as IMessage | null,
      files
    });

    if (message) setMessage('');
    handleClearAdditionalItems();
    handleClearVoice();
  };

  const handleClearAdditionalItems = () => {
    setSelectedMembers([]);
    dispatch(setSelectedMessage(null));
    dispatch(setChatAttachmentsFiles([]));
  };

  const [voiceRecordUrl, setVoiceRecordUrl] = useState('');
  useEffect(() => {
    if (!isRecording && recordedBlob) {
      setVoiceRecordUrl(URL.createObjectURL(recordedBlob));
    } else {
      handleClearVoice();
    }
  }, [isRecording, recordedBlob]);

  const handleClearVoice = () => {
    setVoiceRecordUrl('');
  };

  return (
    <>
      {selectedMessage || chatAttachmentsFiles.length ? (
        <div
          className={`flex justify-between pl-4 pr-[22px] pt-2 ${
            isRecording || voiceRecordUrl ? '' : 'pb-2'
          } bg-[#D9D9D9]`}
        >
          <div className="w-full">
            {chatAttachmentsFiles.length ? (
              <div className="">
                <div className="flex flex-wrap ">
                  {chatAttachmentsFiles.map((file) => (
                    <div key={file.id} className="flex flex-col justify-center items-center w-[16.6%] mb-1">
                      <FileIcons
                        fileExtension={file.extension}
                        filePath={file.preview}
                        fileName={file.name}
                        height="h-8"
                        width="w-8"
                      />
                      <p className="text-center text-[10px]">{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {selectedMessage ? (
              <div
                className="relative flex flex-col p-1 overflow-hidden bg-white border-gray-300 rounded-md shadow-sm text-[13px]"
                style={{ minWidth: '217px', maxWidth: '90%' }}
              >
                <div className="absolute top-0 left-0 h-full bg-alsoit-purple-300" style={{ width: '2px' }} />
                <div className="ml-2 text-alsoit-purple-300">{selectedMessage.team_member.user.name}</div>
                <div className="ml-2 text-alsoit-gray-75">
                  {generateMessageWithUserNames(selectedMessage).map((item, index) => (
                    <span key={index}>{item.value}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="cursor-pointer" onClick={handleClearAdditionalItems}>
            <ChatRemoveReply />
          </div>
        </div>
      ) : null}
      {isRecording || voiceRecordUrl ? (
        <VoiceAudio isRecording={isRecording} url={voiceRecordUrl} clearVoice={handleClearVoice} />
      ) : null}
      <form
        className="relative flex items-center gap-1 py-[2px] px-1 rounded-bl-md rounded-br-md"
        onSubmit={(e) => sendMessage(e)}
        style={{ background: '#919191' }}
      >
        <div
          className="flex items-center justify-center h-6 bg-white rounded-[3px] cursor-pointer"
          style={{ minWidth: '24px' }}
        >
          <ChatEmoticons />
        </div>

        <DropdownForMention selectedUsers={selectedMembers} setSelectedUsers={setSelectedMembers} />

        <div
          className="flex items-center justify-center h-6 bg-white rounded-[3px] cursor-pointer"
          style={{ minWidth: '24px' }}
          onClick={() => dispatch(setShowFileAttachModal(true))}
        >
          <ChatFile />
        </div>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block w-full border-gray-300 rounded-[5px] shadow-sm ring-0 focus:ring-0 sm:text-sm"
          />
        </div>
        <div className="flex">
          <div
            className={`flex justify-between mr-1 items-center hover:bg-alsoit-purple-50 text-[10px] py-0.5 items-center rounded-md cursor-pointer ${
              isRecording ? 'bg-alsoit-purple-50' : 'bg-white'
            }`}
            style={{ minHeight: '24px' }}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <MicIcon color={isRecording ? '#BF01FE' : '#424242'} />
            <div className="w-5 flex justify-center">
              <DropdownArrowIcon color="#424242" />
            </div>
          </div>
          <button
            type="submit"
            disabled={!selectedMessage && !chatAttachmentsFiles.length && !voiceRecordUrl && !message}
            className="w-[34px] h-6 font-semibold text-white rounded-[5px] bg-alsoit-purple-300 text-[10px] disabled:bg-alsoit-gray-75"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
}
