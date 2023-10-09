/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HrHub, ListProps } from '../../activetree.interfaces';
import { cl } from '../../../../../../../utils';
import HubItem from '../../../../../../../components/AlsoHr/HubItem';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import SubHList from '../../../../../alsoHr/components/ActiveTree/Items/hub/SubHList';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setParentHubExt } from '../../../../../../../features/hubs/hubSlice';
import {
  setActiveItem,
  setActiveTabId,
  setCurrentItem,
  setOpenedEntitiesIds,
  setShowExtendedBar,
  setShowPilot
} from '../../../../../../../features/workspace/workspaceSlice';
import { useNavigate } from 'react-router-dom';
import { IHrHub } from '../../../../../../../features/hr/hubs.interfaces';
import { generateHrViewsUrl } from '../../../../../../../utils/generateHrViewsUrl';

export default function HList({ hubs }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hub } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.account);
  const [allHubsId, setAllHubsId] = useState<string[]>([]);
  const { openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const [openedNewHubId, setOpenedNewHubId] = useState<string>('');

  useEffect(() => {
    if (hub.length) {
      setAllHubsId(hub.map((item) => item.id));
    }
  }, [hub]);

  const handleLocation = (id: string, name: string, item: IHrHub) => {
    const viewsUrl = generateHrViewsUrl(id, item, EntityType.hub) as string;
    dispatch(setParentHubExt({ id: id, type: EntityType.hub }));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.hub,
        activeItemName: name
      })
    );
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(viewsUrl, {
      replace: true
    });
    if (!showSidebar) {
      dispatch(setShowExtendedBar(true));
    }
  };

  const isCanBeOpen = (id: string) => {
    if (openedNewHubId) {
      return openedNewHubId === id;
    }
    if (openedEntitiesIds.includes(id)) return true;
  };

  const handleClick = (id: string, type?: string) => {
    dispatch(setParentHubExt({ id, type: EntityType.hub }));

    if (id === openedNewHubId && type !== 'isOver') {
      setOpenedNewHubId('');
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((item) => item !== id)));
    } else {
      setOpenedNewHubId(id);
      dispatch(setOpenedEntitiesIds([...openedEntitiesIds.filter((openedId) => !allHubsId.includes(openedId)), id]));
    }

    hub.forEach((item) => {
      if (item.id === id && !item.children) {
        const viewsUrl = generateHrViewsUrl(id, item, EntityType.hub) as string;
        navigate(viewsUrl, {
          replace: true
        });
      }
    });

    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: EntityType.hub
      })
    );
  };

  return (
    <>
      {hubs.map((hub) => (
        <div key={hub.id} className={cl(!showSidebar && 'overflow-hidden w-12')}>
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={(hub?.children?.length && isCanBeOpen(hub.id)) as boolean}
              handleLocation={handleLocation}
              type={EntityType.hub}
              topNumber="50px"
              zNumber="5"
            />
            {hub?.children?.length && isCanBeOpen(hub.id) ? <SubHList hubs={hub.children as HrHub[]} /> : null}
          </div>
        </div>
      ))}
    </>
  );
}
