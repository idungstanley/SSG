import { useState, useMemo } from 'react';
import moment from 'moment';
import { IMentionUser, IMessage } from '../../../../../features/chat/chat.interfaces';
import { useChatScroll } from '../../../../../hooks';
import AvatarWithInitials from '../../../../avatar/AvatarWithInitials';
import DropdownMenuForMessage from './DropdownMenuForMessage';
import { useAppSelector } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';
import { generateMessageWithUserNames } from './CreateMessage';
import { VerticalScroll } from '../../../../ScrollableContainer/VerticalScroll';
import AlsoitMenuDropdown from '../../../../DropDowns';
import { CiMail } from 'react-icons/ci';
import { ClockIcon } from '@heroicons/react/24/outline';
import { getInitials } from '../../../../../app/helpers';
import MessageSuccess from '../../../../../assets/icons/chatIcons/MessageSuccess';
import FileIcons from '../../../../Views/ui/Table/CustomField/Files/FileIcon';
import DownloadIcon from '../../../../../assets/icons/DownloadIcon';

interface MessagesListProps {
  messages: IMessage[];
}

export default function MessagesList({ messages }: MessagesListProps) {
  const ref = useChatScroll(messages);
  const { currentUserId } = useAppSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeUserPopup, setActiveUserPopup] = useState<IMentionUser | null>(null);

  const sortedByTimeMessages = useMemo(
    () => [...messages.sort((a, b) => a.created_at.localeCompare(b.created_at))],
    [messages]
  );

  const isCurrentUser = (id: string) => id === currentUserId;

  const handleShowUserPopup = (e: React.MouseEvent<HTMLSpanElement>, user: IMentionUser) => {
    setAnchorEl(e.currentTarget);
    setActiveUserPopup(user);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
    setActiveUserPopup(null);
  };

  return (
    <>
      <div className="py-2 bg-white rounded-[5px]">
        <VerticalScroll>
          <div ref={ref} className="flex flex-col w-full" style={{ height: '50vh' }}>
            {sortedByTimeMessages.map((message) => (
              <div
                className={cl(
                  'relative flex items-start gap-1 pl-4 pr-5 py-1 group hover:bg-[#D9D9D9]',
                  isCurrentUser(message.team_member.user.id) ? 'justify-end' : 'justify-start'
                )}
                key={message.id}
              >
                {/* avatar */}
                <AvatarWithInitials
                  initials={message.team_member.user.initials}
                  backgroundColour={message.team_member.user.color}
                />

                <div
                  className={`max-w-[75%] min-w-[150px] rounded-[5px] ${
                    isCurrentUser(message.team_member.user.id) ? 'bg-[#E6FAE9]' : 'bg-[#F4F4F4]'
                  }`}
                >
                  <div className="flex flex-col justify-start gap-1 p-2">
                    {/* top */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      {!isCurrentUser(message.team_member.user.id) ? (
                        <p style={{ color: message.team_member.user.color }}>{message.team_member.user.name}</p>
                      ) : null}
                    </div>

                    {message?.attachments.length ? (
                      <>
                        {message.attachments.map((file) => (
                          <div
                            key={file.id}
                            className="w-full p-1 pr-[7px] shadow-sm bg-alsoit-purple-50 sm:text-sm rounded-[5px]"
                          >
                            <div className="flex justify-between items-center max-h-[100px] text-sm text-alsoit-gray-300">
                              <div className="flex items-center">
                                <FileIcons
                                  fileExtension={file.physical_file.file_format.extension}
                                  filePath={file.path}
                                  fileName={file.physical_file.name}
                                  height="h-8"
                                  width="w-8"
                                />
                                <p className="ml-2">{file.physical_file.display_name}</p>
                              </div>
                              <div
                                className={`ml-2 p-[3px] ${
                                  isCurrentUser(message.team_member.user.id) ? 'bg-[#E6FAE9]' : 'bg-[#F4F4F4]'
                                } rounded-[5px]`}
                              >
                                <DownloadIcon width={16} height={16} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : null}

                    {message?.reply_on ? (
                      <div className="relative w-full p-1 overflow-hidden shadow-sm bg-alsoit-purple-50 sm:text-sm">
                        <div className="absolute top-0 left-0 h-full bg-alsoit-purple-300" style={{ width: '2px' }} />
                        <div className="ml-2 text-sm text-alsoit-purple-300">
                          {message.reply_on.team_member.user.name}
                        </div>
                        <div className="ml-2 text-alsoit-gray-75">
                          {generateMessageWithUserNames(message.reply_on).map((item, index) => (
                            <span key={index}>{item.value}</span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="flex justify-between items-end">
                      {/* message */}
                      <div className="flex items-center">
                        <p className="text-alsoit-purple-300">
                          {generateMessageWithUserNames(message).map((item, index) => (
                            <span
                              key={index}
                              onMouseOver={(e) => (item?.user ? handleShowUserPopup(e, item.user) : null)}
                            >
                              {item.value}
                            </span>
                          ))}
                        </p>
                      </div>

                      {/* bottom */}
                      <div className="flex items-center pl-3">
                        <span className="pl-[2px] text-[10px] text-gray-500">
                          {moment(message.created_at).format('HH:mm')}
                        </span>
                        <span>
                          <MessageSuccess />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute right-0 top-0">
                  <DropdownMenuForMessage message={message} />
                </div>
              </div>
            ))}
          </div>
        </VerticalScroll>
      </div>

      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={handleClosePopup}>
        <div className="p-4">
          <section className="flex justify-between">
            <div>
              <div>
                <AvatarWithInitials
                  initials={getInitials((activeUserPopup?.name as string) || '')}
                  height="h-24"
                  width="w-24"
                  textSize="15px"
                />
              </div>
            </div>

            <div className="right-0 top-4">
              <span className="flex justify-end p-1 text-sm text-black bg-gray-200 border rounded">Online</span>
            </div>
          </section>

          <div className="flex space-y-1.5 flex-col items-start">
            <span className="text-3xl subpixel-antialiased text-black text-decoration-thickness:1px;">
              {activeUserPopup?.name}
            </span>
            <div className="flex items-center space-x-2">
              <CiMail className="w-4 h-4 mx-0.5 text-black" />
              <span className="text-sm subpixel-antialiased text-black">{activeUserPopup?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4 mx-0.5 text-black" />
              <span className="text-sm subpixel-antialiased text-black">
                {moment.utc(new Date()).format('MMMM Do YYYY, h:mm:ss a')}
              </span>
            </div>
            <div className="flex justify-center w-full">
              <button className="w-full py-2 text-black border rounded hover:bg-gray-200">View profile</button>
            </div>
          </div>
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
