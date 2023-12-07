import { useEffect, useState } from 'react';
import { useGetTeamMembers } from '../../features/settings/teamMembers/teamMemberService';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import AvatarWithImage from '../avatar/AvatarWithImage';
import { Capitalize } from '../../utils/NoCapWords/Capitalize';
import SearchIcon from '../../assets/icons/SearchIcon';
import { ITeamMembersAndGroup } from '../../features/settings/teamMembersAndGroups.interfaces';
import { useGetTeamMemberGroups } from '../../features/settings/teamMemberGroups/teamMemberGroupService';
import RoundedCheckbox from '../Checkbox/RoundedCheckbox';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTaskColumnIndex, setTaskRowFocus } from '../../features/task/taskSlice';
import { Task } from '../../features/task/interface.tasks';
interface AasigneeDropdownProps {
  allowGroups: boolean;
  handleClick: (member: ITeamMembersAndGroup, type: string) => void;
  task: Task;
}

function AssigneeDropdown({ handleClick, allowGroups = true, task }: AasigneeDropdownProps) {
  const dispatch = useAppDispatch();

  const { KeyBoardSelectedTaskData, taskRowFocus } = useAppSelector((state) => state.task);

  const [optionsArr] = useState<string[]>(['members', 'groups']);
  const [members, setMembers] = useState(false);
  const [groups, setGroups] = useState(false);
  const [searhItem, setSearchItem] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const { data: teamMembers } = useGetTeamMembers({ page: 0, query: '' });
  const { data: teamMembersGroup } = useGetTeamMemberGroups(0);

  const filteredMembers = teamMembers?.data.team_members.filter((member) =>
    member.user.name.toLowerCase().includes(searhItem.toLowerCase())
  );

  const filteredGroups = teamMembersGroup?.data.team_member_groups.filter((group) =>
    group.name?.toLowerCase().includes(searhItem.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' && focusedIndex && focusedIndex > 0) {
        setFocusedIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : null));
      } else if (event.key === 'ArrowDown') {
        setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, optionsArr.length - 1)));
      }

      if (event.key === 'Enter' && focusedIndex !== null) {
        if (optionsArr[focusedIndex] === 'members') {
          groups && !members && setGroups(false);
          setMembers(!members);
        } else {
          members && !groups && setMembers(false);
          setGroups(!groups);
        }
        dispatch(setTaskColumnIndex(null));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex]);

  useEffect(() => {
    if (task.id === KeyBoardSelectedTaskData?.id) dispatch(setTaskRowFocus(!taskRowFocus));
  }, [task, KeyBoardSelectedTaskData]);

  return (
    <div>
      {/* <h1>Assignees</h1> */}
      <div style={{ width: '178px' }}>
        <div className="flex items-center justify-between max-w-full h-8 bg-white px-4 w-full">
          <SearchIcon className="w-4 h-4" />
          <input
            type="text"
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search"
            className="h-4 border-0 ring-0 outline-0 focus:ring-0 focus:outline-0 focus:border-0 w-11/12 text-alsoit-text-md"
          />
        </div>
        <div className="overflow-scroll w-full" style={{ maxHeight: '324px' }}>
          <div
            className={`flex items-center gap-2 my-2 ml-2 p-1.5 ${
              focusedIndex && optionsArr[focusedIndex] === 'members' ? 'bg-alsoit-gray-50' : ''
            }`}
          >
            <RoundedCheckbox
              onChange={() => {
                groups && !members && setGroups(false);
                setMembers(!members);
              }}
              isChecked={members}
              styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
            />
            <h2>Members</h2>
          </div>
          {members &&
            filteredMembers?.map((member) => {
              return (
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-200 h-12 px-4 group w-full text-ellipsis overflow-hidden"
                  key={member.id}
                  onClick={() => {
                    dispatch(setTaskRowFocus(true));
                    handleClick(member, 'team_member');
                  }}
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
                    <p className="text-sm text-black truncate hover:text-clip w-full">{Capitalize(member.user.name)}</p>
                  </div>
                </div>
              );
            })}
          {allowGroups && (
            <div>
              <div
                className={`flex items-center gap-2 my-2 ml-2 p-1.5 ${
                  focusedIndex && optionsArr[focusedIndex] !== 'members' ? 'bg-alsoit-gray-50' : ''
                }`}
              >
                <RoundedCheckbox
                  onChange={() => {
                    members && !groups && setMembers(false);
                    setGroups(!groups);
                  }}
                  isChecked={groups}
                  styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
                />
                <h2>Teams</h2>
              </div>
              {groups &&
                filteredGroups?.map((group) => {
                  return (
                    <div
                      className="flex items-center justify-between cursor-pointer hover:bg-gray-200 h-12 px-4 group w-full text-ellipsis overflow-hidden"
                      key={group.id}
                      onClick={() => handleClick(group, 'team_member_group')}
                    >
                      <div className="relative flex items-center space-x-2 cursor-pointer">
                        <span>
                          <div>
                            <AvatarWithInitials
                              initials={group.initials}
                              backgroundColour={group.color}
                              height="h-8"
                              width="w-8"
                            />
                          </div>
                        </span>
                        <p className="text-sm text-black truncate hover:text-clip w-full">
                          {Capitalize(group.name as string)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssigneeDropdown;
