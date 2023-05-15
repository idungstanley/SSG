import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../common';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setActiveTabId,
  setCreateWlLink,
  setCurrentItem,
  setShowHub,
  setShowPilot
} from '../../features/workspace/workspaceSlice';
import DropdownList from './components/DropdownList';
import MenuDropdown from '../Dropdown/MenuDropdown';
import FullScreenMessage from '../CenterMessage/FullScreenMessage';
import { useAppSelector } from '../../app/hooks';
import { IInbox } from '../../features/inbox/inbox.interfaces';
import { IHub } from '../../features/hubs/hubs.interfaces';
import { closeMenu, getCurrHubId, getPrevName, setCreateWLID, setshowMenuDropdown } from '../../features/hubs/hubSlice';
import SubDropdown from '../Dropdown/SubDropdown';
import { useNavigate } from 'react-router-dom';
import { cl } from '../../utils';
import HubItem from '../tasks/HubItem';

interface ItemsListInSidebarProps {
  status: string;
  type: string;
  items?: IInbox[] | IHub[];
}

export default function ItemsListInSidebar({ items, status, type }: ItemsListInSidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showChildren, setShowChidren] = useState<string | null>(null);
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  // const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);

  if (status === 'error') {
    return (
      <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." showOneThirdMessage />
    );
  }
  if (status === 'loading') {
    <div className="flex justify-center mx-auto mt-10">
      <Spinner size={8} color="#0F70B7" />
    </div>;
  }

  const handleLocation = (id: string, name: string) => {
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'hub',
        activeItemName: name
      })
    );
    dispatch(setActiveEntity({ id: id, type: 'hub' }));
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`tasks/h/${id}`);
    localStorage.setItem(
      'hubDetailsStorage',
      JSON.stringify({
        activeItemId: id,
        activeItemType: 'hub',
        activeItemName: name
      })
    );
  };

  const handleClick = (id: string) => {
    const isMatch = id === showChildren;
    dispatch(setCreateWLID(id));
    if (isMatch) {
      dispatch(setShowHub(false));
      setShowChidren(null);
      if (!currentItemId) {
        dispatch(
          setCurrentItem({
            currentItemId: id,
            currentItemType: type
          })
        );
      }
    } else {
      dispatch(setShowHub(true));
      setShowChidren(id);
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: type
        })
      );
    }
  };

  const handleHubSettings = (id: string, name: string, e: React.MouseEvent<HTMLButtonElement | SVGElement>): void => {
    dispatch(getCurrHubId(id));
    dispatch(setCreateWlLink(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'hubs'
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  return status === 'success' ? (
    <ul className={cl('z-20', !showSidebar && 'overflow-x-hidden w-12')}>
      {items?.map((i: { id: string; name: string; path?: string | null; parent_id?: string | null }) => (
        <li key={i.id} className="relative flex flex-col">
          <HubItem
            item={i}
            handleClick={handleClick}
            showChildren={showChildren}
            handleHubSettings={handleHubSettings}
            handleLocation={handleLocation}
            type="hub"
          />
          {showChildren === i.id && showSidebar ? <DropdownList /> : null}
          {showMenuDropdown === i.id && showSidebar ? <MenuDropdown /> : null}
          {SubMenuId === i.id && showSidebar ? <SubDropdown /> : null}
        </li>
      ))}
    </ul>
  ) : null;
}
