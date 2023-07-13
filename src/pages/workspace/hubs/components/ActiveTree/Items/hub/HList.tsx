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

export default function HList({ hubs, leftMargin, taskType, level = 1 }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hubId, walletId, listId } = useParams();
  const { currentItemId, showExtendedBar, createEntityType } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId, entityToCreate } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.account);
  const [showChildren, setShowChidren] = useState<string | null | undefined>(null);
  const [stickyButtonIndex, setStickyButtonIndex] = useState<number | undefined>(-1);
  const [openedSubhubsIds, setOpenedSubhubIds] = useState<string[]>([]);
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

  const parentType = EntityType.hub;
  const subType = EntityType.subHub;

  const handleLocation = (id: string, name: string, index?: number) => {
    if (level === 1) {
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
          activeItemType: parentType,
          activeItemName: name
        })
      );
    } else if (level === 2) {
      dispatch(
        setActiveItem({
          activeItemId: id,
          activeItemType: subType,
          activeItemName: name
        })
      );
      dispatch(setSubHubExt({ id: id, type: subType }));
      dispatch(
        getCurrSubHubId({
          currSubHubId: id,
          currSubHubIdType: subType
        })
      );
    }
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setActiveEntityName(name));
    setShowChidren(id);
    dispatch(setActiveEntity({ id: id, type: taskType }));
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`tasks/h/${id}`, {
      replace: true
    });
    localStorage.setItem(
      'hubDetailsStorage',
      JSON.stringify({
        activeItemId: id,
        activeItemType: taskType,
        activeItemName: name
      })
    );
  };

  const handleClick = (id: string, index?: number) => {
    if (taskType === EntityType.hub) {
      dispatch(setSubHubExt({ id: null, type: null }));
      dispatch(setParentHubExt({ id: id, type: taskType }));
    } else {
      dispatch(setSubHubExt({ id: id, type: taskType }));
    }

    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    if (!showSidebar) {
      navigate(`tasks/h/${id}`, {
        replace: true
      });
    }

    dispatch(setOpenedHubId(id));
    dispatch(setShowHub(true));
    if (id === showChildren) {
      setShowChidren(null);
    } else {
      setShowChidren(id);
    }
    if (taskType === EntityType.subHub) {
      if (openedSubhubsIds.includes(id)) {
        setOpenedSubhubIds([...openedSubhubsIds.filter((subhubId) => subhubId !== id)]);
        setShowChidren(null);
      } else {
        setOpenedSubhubIds([...openedSubhubsIds, id]);
        setShowChidren(id);
      }
    }

    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: parentType
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
        showMenuDropdownType: taskType === EntityType.subHub ? EntityType.subHub : 'hubs'
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
    if (showChildren === id || (taskType === EntityType.subHub && openedSubhubsIds.includes(id))) {
      return true;
    }
    return false;
  };

  return (
    <>
      {hubsWithEntity.map((hub, index) => (
        <div
          key={hub.id}
          style={{ marginLeft: leftMargin ? 20 : 0 }}
          className={cl(!showSidebar && 'overflow-hidden w-12')}
        >
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={showChildren}
              handleHubSettings={handleHubSettings}
              handleLocation={handleLocation}
              isSticky={stickyButtonIndex !== undefined && stickyButtonIndex !== null && stickyButtonIndex <= index}
              stickyButtonIndex={stickyButtonIndex}
              index={index}
              type={taskType === EntityType.subHub ? EntityType.subHub : EntityType.hub}
              topNumber={taskType === EntityType.subHub ? '80px' : '50px'}
              zNumber={taskType === EntityType.subHub ? '4' : '5'}
            />
            {hub.children.length && isCanBeOpen(hub.id) ? (
              <HList
                hubs={(entityToCreate === EntityType.subHub ? [...hub.children, dummyHub] : hub.children) as Hub[]}
                level={level + 1}
                taskType={EntityType.subHub}
                leftMargin={false}
              />
            ) : null}
            {showSidebar && (
              <div>
                {hub.wallets.length && isCanBeOpen(hub.id) ? (
                  <WList
                    wallets={hub.wallets}
                    leftMargin={false}
                    topNumber={hub.parent_id ? 110 : 80}
                    type="wallet"
                    paddingLeft={`${taskType === EntityType.hub ? '33' : '35'}`}
                  />
                ) : null}
                {hub.lists.length && isCanBeOpen(hub.id) && !showExtendedBar ? (
                  <LList
                    list={hub.lists}
                    leftMargin={false}
                    paddingLeft={`${taskType === EntityType.hub ? '48' : '50'}`}
                  />
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
