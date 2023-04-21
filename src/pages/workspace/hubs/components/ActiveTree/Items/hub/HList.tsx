import React, { useEffect, useState } from 'react';
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
  setOpenedHubId,
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
  const [showChildren, setShowChidren] = useState<string | null | undefined>(null);
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const id = hubId || walletId || listId || currentItemId;

  const type = 'hub';

  useEffect(() => {
    setShowChidren(id);
  }, []);

  const handleLocation = (id: string, name: string) => {
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'hub',
        activeItemName: name
      })
    );
    setShowChidren(id);
    dispatch(setActiveEntity({ id: id, type: 'hub' }));
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`/hub/${id}`, {
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
    dispatch(setOpenedHubId(id));
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
          className={cl('z-10', !showSidebar && 'overflow-x-hidden w-12')}
        >
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={showChildren}
              handleHubSettings={handleHubSettings}
              handleLocation={handleLocation}
              type={taskType === 'subhub' ? 'subhub' : 'hub'}
            />
            {showSidebar && (
              <div>
                {hub.children.length && showChildren ? (
                  <HList hubs={hub.children} taskType="subhub" leftMargin={false} />
                ) : null}
                {hub.wallets.length && showChildren ? (
                  <WList
                    wallets={hub.wallets}
                    leftMargin={false}
                    type="wallet"
                    paddingLeft={`${taskType === 'hub' ? '33' : '35'}`}
                  />
                ) : null}
                {hub.lists.length && showChildren ? (
                  <LList list={hub.lists} leftMargin={false} paddingLeft={`${taskType === 'hub' ? '48' : '50'}`} />
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
