import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { DaysOffContextValue, LeaveType, onCreateDayOffProps } from '../types/calendar';
import { Dayjs } from 'dayjs';
import { useAppSelector } from '../../../app/hooks';
import { MdBeachAccess } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

const initialData = [
  {
    id: '1',
    start: '2023-04-19',
    end: '2023-04-23',
    type: {
      id: '2',
      title: 'Sick day',
      color: 'red',
      icon: <AiOutlineHome className="w-5 h-5 stroke-current" />
    },
    reason: 'Blah blah blah',
    user: {
      id: '64dd1769-85b6-4877-a7f9-020278ed2947'
    }
  },
  {
    id: '2',
    start: '2023-04-25',
    end: '2023-04-26',
    type: {
      id: '1',
      title: 'Holiday',
      color: 'primary',
      icon: <MdBeachAccess className="w-5 h-5 stroke-current" />
    },
    reason: 'Blah blah blah blah',
    user: {
      id: '64dd1769-85b6-4877-a7f9-020278ed2947'
    }
  },
  {
    id: '3',
    start: '2023-04-28',
    end: '2023-04-29',
    type: {
      id: '2',
      title: 'Sick day',
      color: 'red',
      icon: <AiOutlineHome className="w-5 h-5 stroke-current" />
    },
    reason: 'Blah blah blah',
    user: {
      id: '66ffdf5a-255e-4396-a103-4ec2a190c2f3'
    }
  },
  {
    id: '4',
    start: '2023-05-01',
    end: '2023-05-01',
    type: {
      id: '2',
      title: 'Sick day',
      color: 'red',
      icon: <AiOutlineHome className="w-5 h-5 stroke-current" />
    },
    reason: 'Blah blah blah',
    user: {
      id: '66ffdf5a-255e-4396-a103-4ec2a190c2f3'
    }
  }
];

const initialTypes = [
  {
    id: '1',
    title: 'Holiday',
    color: 'primary',
    icon: <MdBeachAccess className="w-5 h-5 stroke-current" />
  },
  {
    id: '2',
    title: 'Sick day',
    color: 'red',
    icon: <AiOutlineHome className="w-5 h-5 stroke-current" />
  }
];

export const DaysOffContext = createContext<DaysOffContextValue>({
  daysOff: [],
  showCreateDayOffModal: false,
  onCreateDayOff: () => ({}),
  setShowCreateDayOffModal: () => ({}),
  activeMemberId: '',
  setActiveMemberId: () => ({}),
  newDayOff: null,
  setNewDayOff: () => ({}),
  leaveTypes: [],
  onAddLeaveType: () => ({}),
  onRemoveLeaveType: () => ({})
});

interface DaysOffProviderProps {
  children: ReactNode;
}

export const useDaysOff = () => useContext(DaysOffContext);

export function DaysOffProvider({ children }: DaysOffProviderProps) {
  const { currentUserId } = useAppSelector((state) => state.auth);

  const [leaveTypes, setLeaveTypes] = useState(initialTypes);
  const [daysOff, setDaysOff] = useState(initialData);
  const [showCreateDayOffModal, setShowCreateDayOffModal] = useState(false);
  const [activeMemberId, setActiveMemberId] = useState(currentUserId ?? '');
  const [newDayOff, setNewDayOff] = useState<{ start: Dayjs; end: Dayjs } | null>(null);

  const onAddLeaveType = (leaveType: Omit<LeaveType, 'id'>) =>
    setLeaveTypes((prev) => [...prev, { id: Date.now().toString(), ...leaveType }]);

  const onRemoveLeaveType = (id: Pick<LeaveType, 'id'>['id']) =>
    setLeaveTypes((prev) => [...prev.filter((i) => i.id !== id)]);

  const onCreateDayOff = useCallback(
    ({ type, reason, start, end, memberId }: onCreateDayOffProps) => {
      const dayOff = {
        id: Date.now().toString(),
        reason,
        type,
        start,
        end,
        user: {
          id: memberId
        }
      };

      setDaysOff((prev) => [...prev, dayOff]);

      setShowCreateDayOffModal(false);
    },
    [activeMemberId]
  );

  return (
    <DaysOffContext.Provider
      value={{
        leaveTypes,
        onAddLeaveType,
        onRemoveLeaveType,
        daysOff,
        onCreateDayOff,
        showCreateDayOffModal,
        setShowCreateDayOffModal,
        activeMemberId,
        setActiveMemberId,
        newDayOff,
        setNewDayOff
      }}
    >
      {children}
    </DaysOffContext.Provider>
  );
}
