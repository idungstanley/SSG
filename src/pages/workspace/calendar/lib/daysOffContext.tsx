import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { DaysOffContextValue, onCreateDayOffProps } from '../types/calendar';
import { Dayjs } from 'dayjs';
import { useAppSelector } from '../../../../app/hooks';

const initialData = [
  {
    id: '1',
    start: '2023-04-19',
    end: '2023-04-23',
    type: 'sick leave',
    reason: 'Blah blah blah',
    user: {
      id: '1'
      // name: 'Snanislau',
      // email: 'lorderetik@gmail.com'
    }
  },
  {
    id: '2',
    start: '2023-04-25',
    end: '2023-04-26',
    type: 'holiday',
    reason: 'Blah blah blah blah',
    user: {
      id: '1'
      // name: 'Snanislau',
      // email: 'lorderetik@gmail.com'
    }
  },
  {
    id: '3',
    start: '2023-04-28',
    end: '2023-04-29',
    type: 'sick leave',
    reason: 'Blah blah blah',
    user: {
      id: '2'
      // name: 'John',
      // email: 'john@gmail.com'
    }
  },
  {
    id: '4',
    start: '2023-05-01',
    end: '2023-05-01',
    type: 'sick leave',
    reason: 'Blah blah blah',
    user: {
      id: '2'
      // name: 'John',
      // email: 'john@gmail.com'
    }
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
  setNewDayOff: () => ({})
});

interface DaysOffProviderProps {
  children: ReactNode;
}

export const useDaysOff = () => useContext(DaysOffContext);

export function DaysOffProvider({ children }: DaysOffProviderProps) {
  const { currentUserId } = useAppSelector((state) => state.auth);

  const [daysOff, setDaysOff] = useState(initialData);
  const [showCreateDayOffModal, setShowCreateDayOffModal] = useState(false);
  const [activeMemberId, setActiveMemberId] = useState(currentUserId ?? '');
  const [newDayOff, setNewDayOff] = useState<{ start: Dayjs; end: Dayjs } | null>(null);

  const onCreateDayOff = useCallback(({ type, reason, start, end }: onCreateDayOffProps) => {
    const dayOff = {
      id: Date.now().toString(),
      reason,
      type: type.title,
      start,
      end,
      user: {
        id: activeMemberId
      }
    };

    setDaysOff((prev) => [...prev, dayOff]);

    setShowCreateDayOffModal(false);
  }, []);

  return (
    <DaysOffContext.Provider
      value={{
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
