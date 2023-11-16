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
      <div className="p-2 bg-white border rounded-xl">
        <VerticalScroll>
          <div ref={ref} className="flex flex-col w-full" style={{ height: '60vh' }}>
            {sortedByTimeMessages.map((message) => (
              <div
                className={cl(
                  'flex items-start gap-3 px-2 py-1',
                  isCurrentUser(message.team_member.user.id) ? 'justify-end' : 'justify-start'
                )}
                key={message.id}
              >
                {/* avatar */}
                <AvatarWithInitials
                  initials={message.team_member.user.initials}
                  backgroundColour={message.team_member.user.color}
                />

                <div className="w-3/4" style={{ background: '#F4F4F4' }}>
                  <div className="flex group flex-col justify-start gap-1 p-2 rounded-xl border">
                    {/* top */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      {!isCurrentUser(message.team_member.user.id) ? (
                        <>
                          <p>{message.team_member.user.name}</p>
                          <DropdownMenuForMessage message={message} />
                        </>
                      ) : null}
                    </div>

                    {message?.reply_on ? (
                      <div className="relative w-full p-1 bg-alsoit-purple-50 shadow-sm sm:text-sm overflow-hidden">
                        <div className="absolute h-full bg-alsoit-purple-300 left-0 top-0" style={{ width: '2px' }} />
                        <div className="ml-2 text-alsoit-purple-300 text-sm">
                          {message.reply_on.team_member.user.name}
                        </div>
                        <div className="ml-2 text-alsoit-gray-75">
                          {generateMessageWithUserNames(message.reply_on).map((item, index) => (
                            <span key={index}>{item.value}</span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="flex justify-between">
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
                      <div className="flex items-end pl-3">
                        <p className="text-xs text-gray-500">{moment(message.created_at).format('HH:mm')}</p>
                      </div>
                    </div>
                  </div>
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
                  textSize="30px"
                />
              </div>
            </div>

            <div className="top-4 right-0">
              <span className="text-sm text-black border rounded bg-gray-200 flex justify-end p-1">Online</span>
            </div>
          </section>

          <div className="flex space-y-1.5 flex-col items-start">
            <span className="text-3xl subpixel-antialiased text-black text-decoration-thickness:1px;">
              {activeUserPopup?.name}
            </span>
            <div className="space-x-2 flex items-center">
              <CiMail className="w-4 h-4 mx-0.5 text-black" />
              <span className="text-black text-sm subpixel-antialiased">{activeUserPopup?.email}</span>
            </div>
            <div className="space-x-2 flex items-center">
              <ClockIcon className="w-4 h-4 mx-0.5 text-black" />
              <span className="text-black text-sm subpixel-antialiased">
                {moment.utc(new Date()).format('MMMM Do YYYY, h:mm:ss a')}
              </span>
            </div>
            <div className="w-full flex justify-center">
              <button className="w-full text-black hover:bg-gray-200 border rounded py-2">View profile</button>
            </div>
          </div>
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
