import React, { MouseEvent, useState } from 'react';
import { useGetSubHub } from '../../../features/hubs/hubService';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  closeMenu,
  getCurrHubId,
  getCurrSubHubId,
  getPrevName,
  setCreateWLID,
  setHubParentId,
  setshowMenuDropdown
} from '../../../features/hubs/hubSlice';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import SHubDropdownList from '../../ItemsListInSidebar/components/SHubDropdownList';
import SubDropdown from '../../Dropdown/SubDropdown';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setShowHub
} from '../../../features/workspace/workspaceSlice';
// import { useNavigate } from 'react-router-dom';
import HubItem from '../../tasks/HubItem';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';

export default function SubHubIndex() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showSubChildren, setShowSubChidren] = useState<string | null | undefined>(null);
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { data, status } = useGetSubHub({
    parentId: currentItemId
  });

  if (status === 'success') {
    data?.data?.hubs.map(({ parent_id }) => dispatch(setHubParentId(parent_id)));
  }
  const { hubParentId, showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);

  const handleClick = (id: string) => {
    setShowSubChidren(id);
    dispatch(setCreateWLID(id));
    dispatch(
      setActiveItem({
        activeItemType: 'subhub',
        activeItemId: id
      })
    );
    dispatch(setActiveEntity({ id: id, type: 'hub' }));
    dispatch(
      getCurrSubHubId({
        currSubHubId: id,
        currSubHubIdType: 'subhub'
      })
    );
    if (showSubChildren === id) {
      return setShowSubChidren(null);
    }
  };

  const handleShowMenu = (id: string, name: string, e: MouseEvent) => {
    dispatch(getCurrHubId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'subhub'
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const handleLocation = (id: string, name: string) => {
    dispatch(setShowHub(true));
    dispatch(setActiveEntityName(name));

    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'subhub',
        activeItemName: name
      })
    );
    dispatch(
      setShowPilotSideOver({
        id: id,
        type: 'subhub',
        show: true,
        title: name
      })
    );
    // navigate(`/h/${id}`);
    dispatch(setActiveEntity({ id: id, type: 'hub' }));
  };

  return currentItemId === hubParentId ? (
    <div id="subhub">
      {data?.data?.hubs.length !== 0 &&
        data?.data?.hubs.map((subhub) => (
          <div key={subhub.id}>
            <HubItem
              item={subhub}
              handleClick={handleClick}
              showChildren={showSubChildren}
              handleLocation={handleLocation}
              handleHubSettings={handleShowMenu}
              type="subhub"
            />
            {showSubChildren === subhub.id ? <SHubDropdownList /> : null}
            {showMenuDropdown === subhub.id ? <MenuDropdown /> : null}
            {SubMenuId === subhub.id ? <SubDropdown /> : null}
          </div>
        ))}
    </div>
  ) : null;
}
