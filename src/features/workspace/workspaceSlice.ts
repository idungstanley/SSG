import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dimensions, STORAGE_KEYS } from '../../app/config/dimensions';
import {
  IRecorderLastMemory,
  ITimerLastMemory,
  IWorkspaceRes,
  WorkSpaceSettingsRes,
  WorkSpaceSettingsUpdateRes
} from './workspace.interfaces';
import { IActivityLog } from '../general/history/history.interfaces';
import dayjs, { Dayjs } from 'dayjs';
import { IView } from '../hubs/hubs.interfaces';

const initialActivePlaceId: number | null = (JSON.parse(localStorage.getItem('activePlaceIdLocale') as string) ||
  null) as number | null;
const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as {
  tabOrder: number[];
  showTabLabel: boolean;
};
const initialViewId: string | null = (JSON.parse(localStorage.getItem('activeViewIdLocale') as string) || null) as
  | string
  | null;
const showTabLabelFromLS = !!pilotFromLS.showTabLabel;
const hotkeyIdsFromLS = JSON.parse(localStorage.getItem(STORAGE_KEYS.HOT_KEYS) ?? '[]') as string[];

interface workspaceState {
  workspace: string[];
  currentItemId: string | null;
  currentItemType?: string | null;
  activePlaceId: number | null | boolean | undefined | string;
  activePlaceName: string | null;
  pilotWidth: number;
  fetchAllWorkspace: boolean;
  isManageStatus: boolean;
  showWallet: boolean;
  extendedSidebarWidth: number;
  isResize: boolean;
  showTabLabel: boolean;
  showMenuDropDown: boolean;
  showModal: boolean;
  searchIsActive: boolean;
  isExtSearchActive: boolean;
  activeItemId: string | null;
  activeItemType: string | null;
  activeItemName: string | null | undefined;
  showPilot: boolean;
  createEntityType: null | string;
  showIndependentPilot: boolean;
  sidebarWidthRD: number;
  showPilotIconView: boolean;
  showAddHotKeyDropdown: boolean;
  showRemoveHotKeyDropdown: boolean;
  getRecording: { id: string | null; type: string | null };
  isMuted: boolean;
  showPilotListView: boolean;
  activeTabId: string | undefined;
  showOverlay: boolean;
  pickedDateState: boolean;
  activeHotKeyTabId: number | null;
  activeSubCommunicationTabId: string | null;
  activeSubHubManagerTabId: string | null;
  activeStatusManagementTabId: string | null;
  activeSubDetailsTabId: string | null;
  activeSubTimeClockTabId: string | null;
  activeClockTab: string;
  showExtendedBar: boolean;
  activePlaceNameForNavigation: string | null;
  activePlaceIdForNavigation: number | null | string;
  createWlLink: boolean;
  activeSubRecordsTabId: number | null;
  recorderLastMemory: IRecorderLastMemory;
  timerLastMemory: ITimerLastMemory;
  activityArray: IActivityLog[];
  logType: 'activity' | 'history';
  activeLogTab: 'activity' | 'history';
  selectedDate: { date: Dayjs; dateType?: string } | null;
  showTreeInput: boolean;
  workspaceData: undefined | IWorkspaceRes;
  lastActiveItem: string;
  showMore: boolean;
  openedEntitiesIds: string[];
  extendedBarOpenedEntitiesIds: string[];
  workSpaceSettings: WorkSpaceSettingsRes[] | undefined;
  workSpaceSettingsObj: WorkSpaceSettingsUpdateRes | undefined;
  draggableActiveStatusId: string | null;
  isFavoritePinned: boolean;
  activeHotkeyIds: string[];
  nestedTimeEntityId: string | null;
  activeView: IView | null;
}

const initialState: workspaceState = {
  workspace: [],
  currentItemId: null,
  currentItemType: null,
  activePlaceId: initialActivePlaceId,
  activePlaceName: null,
  pilotWidth: 400,
  isResize: false,
  showOverlay: false,
  showTabLabel: showTabLabelFromLS,
  pickedDateState: false,
  showWallet: false,
  isManageStatus: false,
  showMenuDropDown: false,
  showIndependentPilot: false,
  showModal: false,
  searchIsActive: false,
  isExtSearchActive: false,
  getRecording: { id: null, type: null },
  isMuted: false,
  activeItemId: null,
  activeItemType: null,
  activeItemName: null,
  createEntityType: null,
  showPilot: true,
  showPilotIconView: false,
  showPilotListView: false,
  extendedSidebarWidth: dimensions.extendedBar.default,
  activeTabId: '',
  sidebarWidthRD: dimensions.navigationBar.default,
  activeHotKeyTabId: 0,
  activeSubDetailsTabId: 'properties',
  activeSubTimeClockTabId: 'time_clock',
  activeClockTab: 'Real Time',
  activeStatusManagementTabId: 'custom',
  activeSubHubManagerTabId: 'create_hub',
  activeSubCommunicationTabId: 'email',
  fetchAllWorkspace: false,
  showAddHotKeyDropdown: false,
  showExtendedBar: false,
  showRemoveHotKeyDropdown: false,
  activePlaceNameForNavigation: null,
  activePlaceIdForNavigation: null,
  createWlLink: false,
  workspaceData: undefined,
  activeSubRecordsTabId: 0,
  recorderLastMemory: { activeTabId: '', workSpaceId: '', listId: '', hubId: '', subhubId: '', taskId: '', viewId: '' },
  timerLastMemory: { activeTabId: '', workSpaceId: '', listId: '', hubId: '', subhubId: '', taskId: '', viewId: '' },
  activityArray: [],
  logType: 'activity',
  activeLogTab: 'activity',
  selectedDate: { date: dayjs() },
  showTreeInput: false,
  lastActiveItem: '',
  showMore: false,
  openedEntitiesIds: [],
  extendedBarOpenedEntitiesIds: [],
  workSpaceSettings: [],
  workSpaceSettingsObj: undefined,
  draggableActiveStatusId: null,
  isFavoritePinned: false,
  activeHotkeyIds: hotkeyIdsFromLS,
  nestedTimeEntityId: null,
  activeView: null
};

export const wsSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    createWorkspace(state, action: PayloadAction<string>) {
      state.workspace.push(action.payload);
    },
    setPilotWidth(state, action: PayloadAction<number>) {
      state.pilotWidth = action.payload;
    },
    setShowTreeInput(state, action: PayloadAction<boolean>) {
      state.showTreeInput = action.payload;
    },
    setIsFavoritePinned(state, action: PayloadAction<boolean>) {
      state.isFavoritePinned = action.payload;
    },
    setIsManageStatus(state, action: PayloadAction<boolean>) {
      state.isManageStatus = action.payload;
    },
    setShowTabLabel(state, action: PayloadAction<boolean>) {
      state.showTabLabel = action.payload;
    },
    setPickedDateState(state, action: PayloadAction<boolean>) {
      state.pickedDateState = action.payload;
    },
    setIsResize(state, action: PayloadAction<boolean>) {
      state.isResize = action.payload;
    },
    setShowMore(state, action: PayloadAction<boolean>) {
      state.showMore = action.payload;
    },
    setShowOverlay(state, action: PayloadAction<boolean>) {
      state.showOverlay = action.payload;
    },
    setShowPilot(state, action: PayloadAction<boolean>) {
      state.showPilot = action.payload;
    },
    setFetchAllWorkspace(state, action: PayloadAction<boolean>) {
      state.fetchAllWorkspace = action.payload;
    },
    setCreateWlLink(state, action: PayloadAction<boolean>) {
      state.createWlLink = action.payload;
    },
    setShowExtendedBar(state, action: PayloadAction<boolean>) {
      state.showExtendedBar = action.payload;
    },
    setDraggableActiveStatusId(state, action: PayloadAction<string | null>) {
      state.draggableActiveStatusId = action.payload;
    },
    setShowPilotIconView(state, action: PayloadAction<boolean>) {
      state.showPilotIconView = action.payload;
    },
    setShowPilotListView(state, action: PayloadAction<boolean>) {
      state.showPilotListView = action.payload;
    },
    setSearchIsActive(state, action) {
      if (action.payload === 'TOGGLE') {
        return {
          ...state,
          searchIsActive: !state.searchIsActive
        };
      }
    },
    setIsExtSearchActive(state, action) {
      if (action.payload === 'TOGGLE') {
        return {
          ...state,
          isExtSearchActive: !state.isExtSearchActive
        };
      }
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    setShowAddHotKeyDropdown(state, action: PayloadAction<boolean>) {
      state.showAddHotKeyDropdown = action.payload;
    },
    setShowRemoveHotKeyDropdown(state, action: PayloadAction<boolean>) {
      state.showRemoveHotKeyDropdown = action.payload;
    },
    setShowMenuDropDown(state, action: PayloadAction<boolean>) {
      state.showMenuDropDown = action.payload;
    },
    setCreateEntityType(state, action: PayloadAction<null | string>) {
      state.createEntityType = action.payload;
    },
    setWorkspaceData(state, action: PayloadAction<undefined | IWorkspaceRes>) {
      state.workspaceData = action.payload;
    },
    setShowIndependentPilot(state, action: PayloadAction<boolean>) {
      state.showIndependentPilot = action.payload;
    },
    setSidebarWidthRD(state, action: PayloadAction<number>) {
      state.sidebarWidthRD = action.payload;
    },
    setActiveHotkeyIds(state, action: PayloadAction<string[]>) {
      state.activeHotkeyIds = action.payload;
    },
    setShowWallet(state, action: PayloadAction<boolean>) {
      state.showWallet = action.payload;
    },
    setRecording: (state, action: PayloadAction<{ id: string | null; type: string | null }>) => {
      state.getRecording = action.payload;
    },
    setActivePlaceId: (state, action: PayloadAction<number | boolean | null | undefined | string>) => {
      state.activePlaceId = action.payload;
    },
    setActivePlaceName: (state, action: PayloadAction<string | null>) => {
      state.activePlaceName = action.payload;
    },
    setCurrentItem(state, action: PayloadAction<{ currentItemId: string | null; currentItemType: string | null }>) {
      state.currentItemId = action.payload.currentItemId;
      state.currentItemType = action.payload.currentItemType;
    },
    setActiveItem(
      state,
      action: PayloadAction<{
        activeItemId: string;
        activeItemType: string;
        activeItemName?: string;
      }>
    ) {
      state.activeItemId = action.payload.activeItemId;
      state.activeItemType = action.payload.activeItemType;
      state.activeItemName = action.payload.activeItemName || state.activeItemName;
    },
    setActiveSubCommunicationTabId(state, action: PayloadAction<string | null>) {
      state.activeSubCommunicationTabId = action.payload;
    },
    setActiveStatusManagementTabId(state, action: PayloadAction<string | null>) {
      state.activeStatusManagementTabId = action.payload;
    },
    setActiveSubDetailsTabId(state, action: PayloadAction<string | null>) {
      state.activeSubDetailsTabId = action.payload;
    },
    setActiveSubHubManagerTabId(state, action: PayloadAction<string | null>) {
      state.activeSubHubManagerTabId = action.payload;
    },
    setActiveTabId(state, action: PayloadAction<string | undefined>) {
      state.activeTabId = action.payload;
    },
    setActiveHotKeyId(state, action: PayloadAction<number | null>) {
      state.activeHotKeyTabId = action.payload;
    },
    setActiveSubTimeClockTabId(state, action: PayloadAction<string | null>) {
      state.activeSubTimeClockTabId = action.payload;
    },
    setActiveClockTab(state, action: PayloadAction<string>) {
      state.activeClockTab = action.payload;
    },
    setExtendedSidebarWidth(state, action: PayloadAction<number>) {
      state.extendedSidebarWidth = action.payload;
    },
    resetCurrentItem(state) {
      state.currentItemId = null;
      state.currentItemType = null;
    },
    setActivePlaceForNav(
      state,
      action: PayloadAction<{
        activePlaceNameForNavigation: string | null;
        activePlaceIdForNavigation: number | null | string;
      }>
    ) {
      state.activePlaceNameForNavigation = action.payload.activePlaceNameForNavigation;
      state.activePlaceIdForNavigation = action.payload.activePlaceIdForNavigation;
    },
    checkIfWs: (state) => state,
    setActiveSubRecordTabId(state, action: PayloadAction<number | null>) {
      state.activeSubRecordsTabId = action.payload;
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted;
    },
    setRecorderLastMemory(state, action: PayloadAction<IRecorderLastMemory>) {
      state.recorderLastMemory = action.payload;
    },
    setTimerLastMemory(state, action: PayloadAction<ITimerLastMemory>) {
      state.timerLastMemory = action.payload;
    },
    resetWorkSpace(state, action: PayloadAction<IRecorderLastMemory | ITimerLastMemory>) {
      const { activeTabId, hubId, listId, taskId } = action.payload;
      activeTabId
        ? (state.activeTabId = activeTabId)
        : hubId
        ? (state.activeItemId = hubId)
        : listId
        ? (state.activeItemId = listId)
        : (state.activeItemId = taskId as string);
    },
    setActivityArray(state, action: PayloadAction<IActivityLog[]>) {
      state.activityArray = action.payload;
    },
    setLogType(state, action: PayloadAction<'activity' | 'history'>) {
      state.logType = action.payload;
    },
    setActiveLogTab(state, action: PayloadAction<'activity' | 'history'>) {
      state.activeLogTab = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<{ date: Dayjs; dateType?: string } | null>) {
      state.selectedDate = action.payload;
    },
    setLastActiveItem(state, action: PayloadAction<string>) {
      state.lastActiveItem = action.payload;
    },
    setOpenedEntitiesIds(state, action: PayloadAction<string[]>) {
      state.openedEntitiesIds = action.payload;
    },
    setExtendedBarOpenedEntitiesIds(state, action: PayloadAction<string[]>) {
      state.extendedBarOpenedEntitiesIds = action.payload;
    },
    setWorkSpaceSetting(state, action: PayloadAction<WorkSpaceSettingsRes[] | undefined>) {
      state.workSpaceSettings = action.payload;
    },
    setWorkSpaceSettingsObj(state, action: PayloadAction<WorkSpaceSettingsUpdateRes>) {
      state.workSpaceSettingsObj = action.payload;
    },
    setNestedTimeEntityId(state, action: PayloadAction<string | null>) {
      state.nestedTimeEntityId = action.payload;
    },
    setActiveView(state, action: PayloadAction<IView>) {
      state.activeView = action.payload;
    }
  }
});

export const {
  createWorkspace,
  checkIfWs,
  setCurrentItem,
  resetCurrentItem,
  setRecording,
  setActivePlaceId,
  setShowWallet,
  setCreateEntityType,
  setShowMenuDropDown,
  setShowModal,
  setShowMore,
  setSearchIsActive,
  setIsExtSearchActive,
  setActiveItem,
  setIsResize,
  setShowOverlay,
  setShowPilot,
  setShowPilotIconView,
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
  setActiveSubTimeClockTabId,
  setActiveClockTab,
  setPilotWidth,
  setShowPilotListView,
  setActiveTabId,
  setShowAddHotKeyDropdown,
  setShowRemoveHotKeyDropdown,
  setActiveHotKeyId,
  setSidebarWidthRD,
  setShowExtendedBar,
  setExtendedSidebarWidth,
  setActivePlaceName,
  setActivePlaceForNav,
  setCreateWlLink,
  setFetchAllWorkspace,
  setActiveSubRecordTabId,
  toggleMute,
  setRecorderLastMemory,
  setWorkspaceData,
  setPickedDateState,
  setTimerLastMemory,
  resetWorkSpace,
  setActivityArray,
  setLogType,
  setActiveLogTab,
  setSelectedDate,
  setShowTreeInput,
  setShowIndependentPilot,
  setActiveSubHubManagerTabId,
  setLastActiveItem,
  setIsManageStatus,
  setShowTabLabel,
  setOpenedEntitiesIds,
  setExtendedBarOpenedEntitiesIds,
  setActiveStatusManagementTabId,
  setWorkSpaceSetting,
  setIsFavoritePinned,
  setWorkSpaceSettingsObj,
  setDraggableActiveStatusId,
  setActiveHotkeyIds,
  setNestedTimeEntityId,
  setActiveView
} = wsSlice.actions;

export default wsSlice.reducer;
