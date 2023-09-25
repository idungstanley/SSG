import React, { useState } from 'react';
import AlsoitMenuDropdown from '../DropDowns';
import { useGetTeamMembers } from '../../features/settings/teamMembers/teamMemberService';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import AvatarWithImage from '../avatar/AvatarWithImage';
import { Capitalize } from '../../utils/NoCapWords/Capitalize';
import SearchIcon from '../../assets/icons/SearchIcon';
import { ITeamMembersAndGroup } from '../../features/settings/teamMembersAndGroups.interfaces';
interface AasigneeDropdownProps {
  anchor: HTMLElement | null;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleClick: (member: ITeamMembersAndGroup) => void;
}

function AssigneeDropdown({ anchor, setAnchor, handleClick }: AasigneeDropdownProps) {
  // const [anchorEl, setAncholEl] = useState<null | HTMLElement>(null);
  // Get Team Members
  const [members, setMembers] = useState(false);
  const [Groups, setGroups] = useState(false);
  const [searhItem, setSearchItem] = useState<string>('');
  const { data: teamMembers } = useGetTeamMembers({ page: 0, query: '' });
  const filteredMembers = teamMembers?.data.team_members.filter((member) =>
    member.user.name.toLowerCase().includes(searhItem.toLowerCase())
  );

  return (
    <div>
      <AlsoitMenuDropdown anchorEl={anchor} handleClose={() => setAnchor(null)}>
        {/* <h1>Assignees</h1> */}
        <div style={{ width: '178px' }}>
          <div className="flex items-center justify-between max-w-full h-8 bg-white px-4 w-full">
            <SearchIcon />
            <input
              type="text"
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search"
              className="h-4 border-0 ring-0 outline-0 focus:ring-0 focus:outline-0 focus:border-0 w-11/12 text-alsoit-text-md"
            />
          </div>
          <div className="overflow-scroll w-full" style={{ maxHeight: '324px' }}>
            {filteredMembers?.map((member) => {
              return (
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-200 h-12 px-4 group w-full text-ellipsis overflow-hidden"
                  key={member.id}
                  onClick={() => handleClick(member)}
                >
                  <div className="relative flex items-center space-x-2 cursor-pointer">
                    <span>
                      <div>
                        {!member.user.avatar_path && (
                          <AvatarWithInitials
                            initials={member.user.initials}
                            backgroundColour={member.user.color}
                            height="h-8"
                            width="w-8"
                          />
                        )}
                        {member.user.avatar_path && (
                          <AvatarWithImage image_path={member.user.avatar_path} height="h-8" width="w-8" />
                        )}
                      </div>
                    </span>
                    <p className="text-sm text-black truncate hover:text-clip truncate w-full">
                      {Capitalize(member.user.name)}
                    </p>
                  </div>

                  {/* <div className="flex opacity-0 group-hover:opacity-100">
                  {isAssigned ? (
                    <button
                      type="button"
                      className="mx-2"
                      onClick={() =>
                        option === EntityType.task || option === EntityType.subtask
                          ? handleUnAssignTask(item.id)
                          : handleUnAssignChecklistItem(item.id)
                      }
                    >
                      <TrashIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
                    </button>
                  ) : null}

                  <button className="text-black border rounded p-1 bg-white">Profile</button>
                </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}

export default AssigneeDropdown;
