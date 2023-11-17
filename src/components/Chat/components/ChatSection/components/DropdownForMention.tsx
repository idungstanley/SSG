import { useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import ChatEmail from '../../../../../assets/icons/ChatEmail';
import { setShowMembersInChatSideOver } from '../../../../../features/chat/chatSlice';
import { useAppDispatch } from '../../../../../app/hooks';
import Button from '../../../../Button';
import AlsoitMenuDropdown from '../../../../DropDowns';

interface DropdownForMentionProps {
  selectedUsers: { id: string; name: string }[];
  setSelectedUsers: (i: { id: string; name: string }[]) => void;
}

export default function DropdownForMention({ setSelectedUsers, selectedUsers }: DropdownForMentionProps) {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data } = useGetTeamMembers({
    page: 0,
    query: ''
  });
  const selectedUserIds = selectedUsers.map((i) => i.id);
  const usersWithoutSelected = data?.data.team_members.filter((i) => !selectedUserIds.includes(i.user.id));

  return (
    <>
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
        <HeadMenu as="div">
          <HeadMenu.Button>
            <div
              className="flex justify-center bg-white items-center h-6 cursor-pointer rounded-md"
              style={{ minWidth: '24px' }}
            >
              <ChatEmail />
            </div>
          </HeadMenu.Button>
        </HeadMenu>
      </div>

      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
        <div className="pt-4 w-56">
          {selectedUsers?.length ? (
            <div className="flex w-48 gap-2 p-2 overflow-x-scroll">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="relative px-3 py-2 text-sm bg-indigo-100 border border-primary-400 rounded-xl"
                >
                  <XMarkIcon
                    onClick={() => setSelectedUsers([...selectedUsers.filter((i) => i.id !== user.id)])}
                    className="absolute w-6 h-6 p-1 text-black transition-all duration-300 bg-white border rounded-full cursor-pointer -top-2 -right-3"
                  />
                  <p>{user.name}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex justify-center">
            <Button
              buttonStyle="primary"
              onClick={() => {
                dispatch(setShowMembersInChatSideOver(true));
                setAnchorEl(null);
              }}
              label="Invite new"
              padding="py-2 px-2"
              height="h-7"
              width="w-fit"
              labelSize="text-sm"
            />
          </div>

          {usersWithoutSelected?.length ? (
            <div className="w-full py-2 rounded-md max-h-60 focus:outline-none">
              {usersWithoutSelected?.map((user) => (
                <button
                  type="button"
                  key={user.id}
                  onClick={() => setSelectedUsers([...selectedUsers, user.user])}
                  className="w-full px-4 py-2 text-sm text-left text-gray-900 hover:bg-gray-100 hover:text-gray-700"
                >
                  <p>{user.user.name}</p>
                  <p className="text-gray-500">{user.user.email}</p>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
