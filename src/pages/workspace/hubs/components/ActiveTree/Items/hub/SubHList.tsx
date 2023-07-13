import React, { useEffect, useState } from 'react';
import { ListProps } from '../../activetree.interfaces';
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
  setCurrentItem,
  setShowHub,
  setShowPilot
} from '../../../../../../../features/workspace/workspaceSlice';
import { getCurrSubHubId, setOpenedHubId, setSubHubExt } from '../../../../../../../features/hubs/hubSlice';
import MenuDropdown from '../../../../../../../components/Dropdown/MenuDropdown';
import SubDropdown from '../../../../../../../components/Dropdown/SubDropdown';
import { cl } from '../../../../../../../utils';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';

export default function SubHubList({ hubs }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hubId, walletId, listId } = useParams();
  const { currentItemId, showExtendedBar, createEntityType } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId, entityToCreate } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.account);
  const [showChildren, setShowChidren] = useState<string | null | undefined>(null);
  const [stickyButtonIndex, setStickyButtonIndex] = useState<number | undefined>(-1);
  const [openedSubhubsIds, setOpenedSubhubIds] = useState<string[]>([]);
  const id = hubId || walletId || listId || currentItemId;

  useEffect(() => {
    setShowChidren(id);
    if (hubId && !currentItemId) {
      setOpenedSubhubIds((prev) => [...prev, hubId]);
    }
  }, []);

  const handleLocation = (id: string, name: string, index?: number) => {
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.subHub,
        activeItemName: name
      })
    );
    dispatch(setSubHubExt({ id: id, type: EntityType.subHub }));
    dispatch(
      getCurrSubHubId({
        currSubHubId: id,
        currSubHubIdType: EntityType.subHub
      })
    );
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setActiveEntityName(name));
    setShowChidren(id);
    dispatch(setActiveEntity({ id: id, type: EntityType.subHub }));
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`tasks/h/${id}`, {
      replace: true
    });
    localStorage.setItem(
      'hubDetailsStorage',
      JSON.stringify({
        activeItemId: id,
        activeItemType: EntityType.subHub,
        activeItemName: name
      })
    );
  };

  const handleClick = (id: string, index?: number) => {
    dispatch(setSubHubExt({ id, type: EntityType.subHub }));

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

    if (openedSubhubsIds.includes(id)) {
      setOpenedSubhubIds([...openedSubhubsIds.filter((subhubId) => subhubId !== id)]);
      setShowChidren(null);
    } else {
      setOpenedSubhubIds([...openedSubhubsIds, id]);
      setShowChidren(id);
    }

    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: EntityType.subHub
      })
    );
  };

  const isCanBeOpen = (id: string) => {
    if (openedSubhubsIds.length) {
      return openedSubhubsIds.includes(id);
    }
    return !!showChildren;
  };

  return (
    <>
      {hubs.map((hub, index) => (
        <div key={hub.id} className={cl(!showSidebar && 'overflow-hidden w-12')}>
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={((hub.wallets.length || hub.lists.length) && isCanBeOpen(hub.id)) as boolean}
              handleLocation={handleLocation}
              isSticky={stickyButtonIndex !== undefined && stickyButtonIndex !== null && stickyButtonIndex <= index}
              stickyButtonIndex={stickyButtonIndex}
              index={index}
              type={EntityType.subHub}
              topNumber="80px"
              zNumber="4"
            />
            {showSidebar && (
              <div>
                {hub.wallets.length && isCanBeOpen(hub.id) ? (
                  <WList
                    wallets={hub.wallets}
                    leftMargin={false}
                    topNumber={hub.parent_id ? 110 : 80}
                    type="wallet"
                    paddingLeft="35"
                  />
                ) : null}
                {hub.lists.length && isCanBeOpen(hub.id) && !showExtendedBar ? (
                  <LList list={hub.lists} leftMargin={false} paddingLeft="50" />
                ) : null}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
