import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setTimeArr, setTimeLogColumnData, setTimeSortArr } from '../../../../features/task/taskSlice';
import { IEntries, ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { useEffect, useRef, useState } from 'react';
import { useGetUserSettingsData } from '../../../../features/task/taskService';
import { toast } from 'react-hot-toast';
import SaveFilterToast from '../../../TasksHeader/ui/Filter/ui/Toast';
import { isArray } from '../../../../utils/typeGuards';
import { RenderItemEntries } from './RenderClockLogEntry';

export type Header = {
  title: string;
  id: string;
  hidden: boolean;
  value: string;
  sorted: boolean;
};

export interface User {
  id: string;
  initials: string;
  name: string;
  avatar_path: string;
  color: string;
}

interface LogProps {
  getTaskEntries: ITimeEntriesRes | undefined;
}

export default function ClockLog({ getTaskEntries }: LogProps) {
  const { timeLogColumnData } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const [headers, setHeaders] = useState<Header[]>([
    { title: 'user', id: '1', hidden: false, value: 'team_member_id', sorted: false },
    { title: 'duration', id: '2', hidden: false, value: 'duration', sorted: false },
    { title: 'start date', id: '3', hidden: false, value: 'start_date', sorted: false },
    { title: 'end date', id: '4', hidden: false, value: 'end_date', sorted: false },
    { title: 'description', id: '5', hidden: true, value: '', sorted: false }
  ]);
  const [teamMember, setTeamMember] = useState<User[]>([]);
  const [teamMemberId, setTeamMemberId] = useState<string[]>([]);
  const [viewChanges, setViewChanges] = useState<{ logColumns: boolean }>({
    logColumns: false
  });
  const [logData, setLogData] = useState<IEntries[]>([]);

  const prevLogColumnsRef = useRef<boolean>(viewChanges.logColumns);

  useEffect(() => {
    getTaskEntries?.data?.time_entries && setLogData(getTaskEntries?.data?.time_entries);
  }, [getTaskEntries?.data?.time_entries]);

  useEffect(() => {
    const handleTeamMember = () => {
      const newTeamMembers = getTaskEntries?.data.filters.team_members.map((member) => member.user);
      const newTeamMemberIds = getTaskEntries?.data.filters.team_members.map((member) => member.id);

      newTeamMembers && setTeamMember((prevTeamMembers) => [...prevTeamMembers, ...newTeamMembers]);
      newTeamMemberIds && setTeamMemberId((prevIds) => [...prevIds, ...newTeamMemberIds]);
    };

    handleTeamMember();
  }, [getTaskEntries?.data.filters.team_members]);

  useEffect(() => {
    dispatch(setTimeLogColumnData(headers));
  }, [headers]);

  useEffect(() => {
    if (prevLogColumnsRef.current !== viewChanges.logColumns && viewChanges.logColumns) {
      toast.custom(
        (t) => (
          <SaveFilterToast
            body="Time Log Columns changed, would you want to save the new setting?"
            title="Columns changed"
            toastId={t.id}
            extended="timeLogColumns"
            extendedState={headers}
          />
        ),
        {
          position: 'bottom-right',
          duration: Infinity
        }
      );
    }

    prevLogColumnsRef.current = viewChanges.logColumns;
  }, [viewChanges.logColumns]);

  return (
    <RenderItemEntries
      getTaskEntries={getTaskEntries}
      headers={headers}
      logData={logData}
      setHeaders={setHeaders}
      setLogData={setLogData}
      setViewChanges={setViewChanges}
      teamMember={teamMember}
      teamMemberId={teamMemberId}
    />
  );
}
