import React, { useState } from 'react';
import { ListProps } from '../../activetree.interfaces';
// import HItem from './HItem';
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
  getCurrHubId,
  getPrevName,
  setCreateWLID,
  setshowMenuDropdown
} from '../../../../../../../features/hubs/hubSlice';
import MenuDropdown from '../../../../../../../components/Dropdown/MenuDropdown';
import SubDropdown from '../../../../../../../components/Dropdown/SubDropdown';
import { cl } from '../../../../../../../utils';

export default function HList({ hubs, leftMargin, taskType }: ListProps) {
  const { hubId } = useParams();
  const { walletId } = useParams();
  const { listId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showChildren, setShowChidren] = useState<string | null>(null);
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const id = hubId || walletId || listId;
  const type = 'hub';

  const handleLocation = (id: string, name: string, parentId?: string | null) => {
    const isActiveHub = hubId === id;
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
    navigate(`/hub/${isActiveHub ? parentId || '' : id}`, {
      replace: true
    });
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
  return (
    <>
      {hubs.map((hub) => (
        <div
          key={hub.id}
          style={{ marginLeft: leftMargin ? 20 : 0 }}
          className={cl('z-20', !showSidebar && 'overflow-x-hidden w-12')}
        >
          <HubItem
            item={hub}
            handleClick={handleClick}
            handleHubSettings={handleHubSettings}
            handleLocation={handleLocation}
            showChildren={showChildren}
            type={taskType === 'subhub' ? 'subhub' : 'hub'}
          />
          {showSidebar && (
            <div>
              {hub.children.length && id ? <HList hubs={hub.children} taskType="subhub" leftMargin={false} /> : null}
              {hub.wallets.length && id ? (
                <WList
                  wallets={hub.wallets}
                  leftMargin={false}
                  type="wallet"
                  paddingLeft={`${taskType === 'hub' ? '10' : '35'}`}
                />
              ) : null}
              {hub.lists.length && id ? (
                <LList list={hub.lists} leftMargin={false} paddingLeft={`${taskType === 'hub' ? '26' : '10'}`} />
              ) : null}
              {showMenuDropdown === hub.id && showSidebar ? <MenuDropdown /> : null}
              {SubMenuId === hub.id && showSidebar ? <SubDropdown /> : null}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
