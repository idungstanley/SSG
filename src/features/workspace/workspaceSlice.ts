import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dimensions } from '../../app/config/dimensions';
import { IRecorderLastMemory, ITimerLastMemory } from './workspace.interfaces';
import { IActivityLog } from '../general/history/history.interfaces';

const initialActivePlaceId: number | null = (JSON.parse(localStorage.getItem('activePlaceIdLocale') as string) ||
  null) as number | null;

interface workspaceState {
  workspace: string[];
  currentItemId: string | null;
  currentItemType?: string | null;
  activePlaceId: number | null | boolean | undefined | string;
  activePlaceName: string | null;
  pilotWidth: number;
  showHub: boolean;
  fetchAllWorkspace: boolean;
  showWallet: boolean;
  extendedSidebarWidth: number;
  showMenuDropDown: boolean;
  showModal: boolean;
  searchIsActive: boolean;
  isExtSearchActive: boolean;
  activeItemId?: string | null;
  activeItemType?: string | null;
  activeItemName: string | null | undefined;
  activeEntityName: string | null | undefined;
  currentWalletId: string | null;
  currentSubWalletId: string | null;
  currentWalletName: string | null | undefined;
  showPilot: boolean;
  sidebarWidthRD: number;
  showPilotIconView: boolean;
  showAddHotKeyDropdown: boolean;
  showRemoveHotKeyDropdown: boolean;
  getRecording: { id: string | null; type: string | null };
  isMuted: boolean;
  activeEntity: { id: string | null; type: string | null };
  showPilotListView: boolean;
  activeTabId: number | undefined;
  activeHotKeyTabId: number | null;
  activeSubCommunicationTabId: number | null;
  activeSubDetailsTabId: number | null;
  activeSubTimeClockTabId: number | null;
  activeSubChecklistTabId: number | null;
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
}

const initialState: workspaceState = {
  workspace: [],
  currentItemId: null,
  currentItemType: null,
  activePlaceId: initialActivePlaceId,
  activePlaceName: null,
  pilotWidth: 400,
  showHub: false,
  showWallet: false,
  showMenuDropDown: false,
  showModal: false,
  searchIsActive: false,
  isExtSearchActive: false,
  getRecording: { id: null, type: null },
  isMuted: false,
  activeItemId: null,
  activeItemType: null,
  activeItemName: null,
  activeEntityName: null,
  currentSubWalletId: null,
  currentWalletId: null,
  currentWalletName: null,
  showPilot: false,
  showPilotIconView: false,
  showPilotListView: false,
  extendedSidebarWidth: dimensions.extendedBar.default,
  activeTabId: 0,
  sidebarWidthRD: dimensions.navigationBar.default,
  activeHotKeyTabId: 0,
  activeSubDetailsTabId: 1,
  activeSubTimeClockTabId: 0,
  activeSubCommunicationTabId: 1,
  activeSubChecklistTabId: 2,
  fetchAllWorkspace: false,
  showAddHotKeyDropdown: false,
  showExtendedBar: false,
  showRemoveHotKeyDropdown: false,
  activeEntity: { id: null, type: null },
  activePlaceNameForNavigation: null,
  activePlaceIdForNavigation: null,
  createWlLink: false,
  activeSubRecordsTabId: 0,
  recorderLastMemory: { activeTabId: 0, workSpaceId: '', listId: '', hubId: '' },
  timerLastMemory: { activeTabId: 0, workSpaceId: '', listId: '', hubId: '' },
  activityArray: [],
  logType: 'activity',
  activeLogTab: 'activity'
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
    setActiveEntity(state, action: PayloadAction<{ id: string | null; type: string | null }>) {
      state.activeEntity = action.payload;
    },
    setShowHub(state, action: PayloadAction<boolean>) {
      state.showHub = action.payload;
    },
    setSidebarWidthRD(state, action: PayloadAction<number>) {
      state.sidebarWidthRD = action.payload;
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
        activeItemId?: string | null;
        activeItemType?: string | null;
        activeItemName?: string | undefined | null;
      }>
    ) {
      state.activeItemId = action.payload.activeItemId;
      state.activeItemType = action.payload.activeItemType;
      state.activeItemName = action.payload.activeItemName;
    },
    setActiveEntityName(state, action: PayloadAction<string | undefined | null>) {
      state.activeEntityName = action.payload;
    },
    setCurrentWalletId(state, action: PayloadAction<string | null>) {
      state.currentWalletId = action.payload;
    },
    setActiveSubCommunicationTabId(state, action: PayloadAction<number | null>) {
      state.activeSubCommunicationTabId = action.payload;
    },
    setActiveSubDetailsTabId(state, action: PayloadAction<number | null>) {
      state.activeSubDetailsTabId = action.payload;
    },
    setActiveTabId(state, action: PayloadAction<number | undefined>) {
      state.activeTabId = action.payload;
    },
    setActiveHotKeyId(state, action: PayloadAction<number | null>) {
      state.activeHotKeyTabId = action.payload;
    },
    setActiveSubTimeClockTabId(state, action: PayloadAction<number | null>) {
      state.activeSubTimeClockTabId = action.payload;
    },
    setActiveSubChecklistTabId(state, action: PayloadAction<number | null>) {
      state.activeSubChecklistTabId = action.payload;
    },
    setCurrentWalletName(state, action: PayloadAction<string | null | undefined>) {
      state.currentWalletName = action.payload;
    },
    setCurrenSubtWalletId(state, action: PayloadAction<string | null>) {
      state.currentSubWalletId = action.payload;
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
      const { activeTabId, hubId, listId } = action.payload;
      activeTabId
        ? (state.activeTabId = activeTabId)
        : hubId
        ? (state.activeItemId = hubId)
        : listId
        ? (state.activeItemId = listId)
        : '';
    },
    setActivityArray(state, action: PayloadAction<IActivityLog[]>) {
      state.activityArray = action.payload;
    },
    setLogType(state, action: PayloadAction<'activity' | 'history'>) {
      state.logType = action.payload;
    },
    setActiveLogTab(state, action: PayloadAction<'activity' | 'history'>) {
      state.activeLogTab = action.payload;
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
  setShowHub,
  setShowWallet,
  setShowMenuDropDown,
  setShowModal,
  setSearchIsActive,
  setIsExtSearchActive,
  setActiveItem,
  setActiveEntityName,
  setCurrentWalletId,
  setCurrenSubtWalletId,
  setCurrentWalletName,
  setShowPilot,
  setShowPilotIconView,
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
  setActiveSubTimeClockTabId,
  setPilotWidth,
  setShowPilotListView,
  setActiveTabId,
  setActiveSubChecklistTabId,
  setShowAddHotKeyDropdown,
  setShowRemoveHotKeyDropdown,
  setActiveHotKeyId,
  setActiveEntity,
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
  setTimerLastMemory,
  resetWorkSpace,
  setActivityArray,
  setLogType,
  setActiveLogTab
} = wsSlice.actions;

export default wsSlice.reducer;
