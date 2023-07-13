import React, { useEffect, useState } from 'react';
import { Hub, ListProps } from '../../activetree.interfaces';
import WList from '../wallet/WList';
import LList from '../list/LList';
import { useNavigate, useParams } from 'react-router-dom';
import HubItem from '../../../../../../../components/tasks/HubItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setActiveTabId,
  setCreateWlLink,
  setCurrentItem,
  setShowHub,
  setShowPilot
} from '../../../../../../../features/workspace/workspaceSlice';
import {
  closeMenu,
  getCurrSubHubId,
  getPrevName,
  setCreateWLID,
  setOpenedHubId,
  setParentHubExt,
  setSelectedTreeDetails,
  setshowMenuDropdown,
  setSubHubExt
} from '../../../../../../../features/hubs/hubSlice';
import MenuDropdown from '../../../../../../../components/Dropdown/MenuDropdown';
import SubDropdown from '../../../../../../../components/Dropdown/SubDropdown';
import { cl } from '../../../../../../../utils';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import { Capitalize } from '../../../../../../../utils/NoCapWords/Capitalize';
import SubHList from './SubHList';

export default function HList({ hubs }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hubId, walletId, listId } = useParams();
  const { currentItemId, showExtendedBar, createEntityType } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId, entityToCreate } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.account);
  const [showChildren, setShowChidren] = useState<string | null | undefined>(null);
  const [stickyButtonIndex, setStickyButtonIndex] = useState<number | undefined>(-1);
  const [openedNewHubId, setOpenedNewHubId] = useState<string>('');
  const CapitalizeType = Capitalize(entityToCreate);
  const hubCreationStatus = 'New ' + CapitalizeType + ' Under Construction';
  const id = hubId || walletId || listId || currentItemId;

  const dummyHub = {
    name: hubCreationStatus,
    id: hubCreationStatus,
    wallets: [],
    lists: [],
    children: [],
    color: 'blue',
    path: null
  };

  const hubsSpread = [...hubs, dummyHub];
  const hubsWithEntity = createEntityType === EntityType.hub ? (hubsSpread as Hub[]) : hubs;

  useEffect(() => {
    setShowChidren(id);
  }, []);

  const handleLocation = (id: string, name: string, index?: number) => {
    dispatch(setSubHubExt({ id: null, type: null }));
    dispatch(setParentHubExt({ id: id, type: EntityType.hub }));
    dispatch(
      getCurrSubHubId({
        currSubHubId: null,
        currSubHubIdType: null
      })
    );
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.hub,
        activeItemName: name
      })
    );
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setActiveEntityName(name));
    setShowChidren(id);
    dispatch(setActiveEntity({ id: id, type: EntityType.hub }));
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`tasks/h/${id}`, {
      replace: true
    });
    localStorage.setItem(
      'hubDetailsStorage',
      JSON.stringify({
        activeItemId: id,
        activeItemType: EntityType.hub,
        activeItemName: name
      })
    );
  };

  const handleClick = (id: string, index?: number) => {
    dispatch(setSubHubExt({ id: null, type: null }));
    dispatch(setParentHubExt({ id, type: EntityType.hub }));

    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    if (!showSidebar) {
      navigate(`tasks/h/${id}`, {
        replace: true
      });
    }

    dispatch(setOpenedHubId(id));
    dispatch(setShowHub(true));

    if (id === openedNewHubId) {
      setShowChidren(null);
      setOpenedNewHubId('');
    } else {
      setShowChidren(id);
      setOpenedNewHubId(id);
    }

    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: EntityType.hub
      })
    );
  };

  const handleHubSettings = (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.hub }));
    dispatch(setCreateWLID(id));
    // dispatch(getCurrHubId(id));
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

  const isCanBeOpen = (id: string) => {
    if (openedNewHubId) {
      return openedNewHubId === id;
    }
    return !!showChildren;
  };

  return (
    <>
      {hubsWithEntity.map((hub, index) => (
        <div key={hub.id} className={cl(!showSidebar && 'overflow-hidden w-12')}>
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={
                ((hub.children.length || hub.wallets.length || hub.lists.length) &&
                  showChildren &&
                  isCanBeOpen(hub.id)) as boolean
              }
              handleHubSettings={handleHubSettings}
              handleLocation={handleLocation}
              isSticky={stickyButtonIndex !== undefined && stickyButtonIndex !== null && stickyButtonIndex <= index}
              stickyButtonIndex={stickyButtonIndex}
              index={index}
              type={EntityType.hub}
              topNumber="50px"
              zNumber="5"
            />
            {hub.children.length && isCanBeOpen(hub.id) ? <SubHList hubs={hub.children as Hub[]} /> : null}
            {showSidebar && (
              <div>
                {hub.wallets.length && showChildren && isCanBeOpen(hub.id) ? (
                  <WList
                    wallets={hub.wallets}
                    leftMargin={false}
                    topNumber={hub.parent_id ? 110 : 80}
                    type="wallet"
                    paddingLeft="33"
                  />
                ) : null}
                {hub.lists.length && showChildren && isCanBeOpen(hub.id) && !showExtendedBar ? (
                  <LList list={hub.lists} leftMargin={false} paddingLeft="48" />
                ) : null}
                {showMenuDropdown === hub.id && showSidebar ? <MenuDropdown /> : null}
                {SubMenuId === hub.id && showSidebar ? <SubDropdown /> : null}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
