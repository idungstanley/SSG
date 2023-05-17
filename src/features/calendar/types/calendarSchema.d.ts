export interface CalendarState {
  updateCords: number; // random number
  blacklistIds: BlacklistId[]; //  member ids do not need to be shown
}

export type BlacklistId = string;
