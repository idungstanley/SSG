import { DayOff } from './daysOff';

export interface CalendarState {
  updateCords: number; // random number
  blacklistIds: BlacklistId[]; //  member ids do not need to be shown
  newDayOff: NewDayOff | null;
  intervalType: string;
  timeInterval: number | string;
  reminderType: string | number;
  reminderInterval: number | string;
  selectedHubs: SelectedHubs[];
  savedSelections: SavedSelections[];
  hrOpenedEntities: HrOpenedEntities[];
}

interface NewDayOff extends Pick<DayOff, 'start_date' | 'end_date'> {
  userId: string;
}

export type BlacklistId = string;

interface SelectedHubs {
  hubId: string;
  hubName: string | null;
  hubColor: string | null;
}

export type SavedSelections = string;

export type HrOpenedEntities = string;
