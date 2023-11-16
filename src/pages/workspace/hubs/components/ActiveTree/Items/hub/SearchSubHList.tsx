import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Hub } from '../../activetree.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setCurrentItem } from '../../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import SearchHubItem from '../../../../../../../components/tasks/SearchHubItem';
import SearchWList from '../wallet/SearchWList';
import SearchLList from '../list/SearchLList';
import { OPTIONS_WITH_AVAILABLE_LISTS } from '../../../../../tasks/component/taskMenu/TaskMenu';
import { unavailableStyles } from '../../../../../../../components/ActiveTree/ActiveTreeList';

interface ISearchSubHListProps {
  hubs: Hub[];
  option?: string;
  handleTabClick: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: string,
    name: string,
    type: string
  ) => void;
}

export default function SearchSubHList({ hubs, handleTabClick, option }: ISearchSubHListProps) {
  const dispatch = useAppDispatch();
  const { hubId, walletId, listId } = useParams();
  const { currentItemId, showExtendedBar } = useAppSelector((state) => state.workspace);
  const { lastActiveItem } = useAppSelector((state) => state.workspace);

  const [showChildren, setShowChidren] = useState<string | null | undefined>(null);
  const [openedSubhubsIds, setOpenedSubhubIds] = useState<string[]>([]);

  const id = hubId || walletId || listId || currentItemId;

  useEffect(() => {
    setShowChidren(id);
    if (hubId && !currentItemId) {
      setOpenedSubhubIds((prev) => [...prev, hubId]);
    }
  }, []);

  const handleClick = (id: string) => {
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
        currentItemType: EntityType.hub
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
      {hubs.map((hub) => (
        <div key={hub.id}>
          <div
            className="relative flex flex-col"
            style={
              lastActiveItem === 'Sub Hub' && !OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string)
                ? unavailableStyles
                : {}
            }
          >
            <SearchHubItem
              item={hub}
              handleClick={handleClick}
              handleTabClick={handleTabClick}
              showChildren={
                ((hub?.children?.length || hub?.wallets?.length || hub?.lists?.length) &&
                  showChildren &&
                  isCanBeOpen(hub.id)) as boolean
              }
              type={EntityType.subHub}
            />
            <div
              style={
                lastActiveItem === 'Wallet' && !OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string)
                  ? unavailableStyles
                  : {}
              }
            >
              {hub.wallets.length && isCanBeOpen(hub.id) ? (
                <SearchWList
                  wallets={hub.wallets}
                  leftMargin={false}
                  type="wallet"
                  paddingLeft="35"
                  option={option}
                  handleTabClick={handleTabClick}
                />
              ) : null}
            </div>
            <div style={!OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string) ? unavailableStyles : {}}>
              {hub.lists.length && isCanBeOpen(hub.id) && !showExtendedBar ? (
                <SearchLList option={option} list={hub.lists} leftMargin={false} paddingLeft="50" />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
