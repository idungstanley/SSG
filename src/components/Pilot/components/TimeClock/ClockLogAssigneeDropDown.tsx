// import { Dispatch, SetStateAction, useState } from 'react';
// import SearchIcon from '../../../../assets/icons/SearchIcon';
// import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
// import AvatarWithImage from '../../../avatar/AvatarWithImage';
// import { GetTimeEntriesService } from '../../../../features/task/taskService';
// import { useAppSelector } from '../../../../app/hooks';
// import { IUser } from '../../../../features/auth/authSlice';

// interface AssigneeProps {
//   teamMembers: IUser[];
//   handleFilters: (filterBy: string, searchStr: string) => void;
//   closeModal: Dispatch<SetStateAction<boolean>>;
// }

// export function TimeLogAssigneeDropDown({ teamMembers, handleFilters, closeModal }: AssigneeProps) {
//   const assigneeData = [
//     { id: 1, title: 'Teams', data: [] },
//     { id: 2, title: 'Users', data: teamMembers }
//   ];

//   const [activeFiltertab, setActiveFilter] = useState<string>('Teams');
//   const [team, setTeam] = useState<User[]>([...new Set(teamMembers)]);

//   const handleSearch = (searchStr: string) => {
//     const filteredUsers = [...new Set(teamMembers)].filter((teamMember) =>
//       teamMember.name.toLowerCase().includes(searchStr.toLowerCase())
//     );
//     if (searchStr.length > 0) {
//       setTeam(filteredUsers);
//     } else {
//       setTeam([...new Set(teamMembers)]);
//     }
//   };

//   return (
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="absolute z-30 w-56 px-2 bg-white rounded-md shadow-xl h-96 top-8 -right-8"
//     >
//       <div className="flex flex-col space-y-2.5 w-full">
//         {/* search input header */}
//         <div className="w-full p-1 border-b-2">
//           <input
//             type="text"
//             className="relative border-none rounded-md px-6 py-0.5 text-alsoit-text-md"
//             onChange={(e) => handleSearch(e.target.value)}
//             placeholder="search..."
//           />
//           <div className="absolute top-3 left-5">
//             <SearchIcon />
//           </div>
//         </div>
//         {/* filter section with user data */}
//         <div className="flex flex-col justify-evenly">
//           <div className="flex justify-evenly w-full py-1.5 border-b-2">
//             {assigneeData.map((data) => {
//               return (
//                 <div
//                   key={data.id}
//                   className={
//                     data.title === activeFiltertab
//                       ? 'bg-alsoit-purple-400 text-alsoit-gray-50 px-2.5 rounded-xl border-none'
//                       : 'bg-alsoit-gray-50 text-alsoit-gray-200 px-2.5 rounded-xl border-none'
//                   }
//                   onClick={() => setActiveFilter(data.title)}
//                 >
//                   {data.title}
//                 </div>
//               );
//             })}
//           </div>
//           {activeFiltertab === 'Users' ? (
//             <div className="flex flex-col w-full space-y-2">
//               {teamMembers.length > 0 &&
//                 team.map((user) => (
//                   <LogAssigneeDropDown
//                     key={user.id}
//                     handleFilters={handleFilters}
//                     user={user}
//                     closeModal={closeModal}
//                   />
//                 ))}
//             </div>
//           ) : (
//             <LogTeamsDropDown />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface LogAssigneeDropDownProps {
//   user: User;
//   handleFilters: (filterBy: string, searchStr: string) => void;
//   closeModal: Dispatch<SetStateAction<boolean>>;
// }

// function LogAssigneeDropDown({ user, handleFilters, closeModal }: LogAssigneeDropDownProps) {
//   const handleClick = () => {
//     handleFilters('user', user.id);
//     closeModal(false);
//   };

//   return (
//     <div key={user?.id} className="flex items-center w-full py-1 space-x-2 border-b-2" onClick={handleClick}>
//       {user.avatar_path ? (
//         <AvatarWithImage image_path={user.avatar_path} roundedStyle="circular" />
//       ) : (
//         <AvatarWithInitials height="h-10" width="w-10" initials={user?.initials ?? 'UN'} />
//       )}
//       <span>{user?.name}</span>
//     </div>
//   );
// }

// function LogTeamsDropDown() {
//   const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

//   const [groupIds, setGroupIds] = useState<string[]>([]);

//   const { data: getTaskEntries } = GetTimeEntriesService({
//     itemId: activeItemId,
//     trigger: activeItemType,
//     include_filters: true,
//     team_member_group_ids: groupIds
//   });

//   return (
//     <div className="flex flex-col w-full space-y-2">
//       {getTaskEntries?.data.filters.team_member_groups.map((group) => (
//         <div
//           key={group.id}
//           className="flex items-center w-full py-1 space-x-2 border-b-2"
//           onClick={() => setGroupIds((prev) => [...prev, group.id])}
//         >
//           <AvatarWithInitials
//             height="h-10"
//             width="w-10"
//             initials={group?.initials ?? 'UN'}
//             backgroundColour={group.color}
//           />
//           <span>{group.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// }
