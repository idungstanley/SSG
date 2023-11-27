import { useParams } from 'react-router-dom';
import { findCurrentHub } from '../../managers/Hub';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { findCurrentWallet } from '../../managers/Wallet';
import { FaFolderOpen } from 'react-icons/fa';
import { findCurrentList } from '../../managers/List';
import { useAppSelector } from '../../app/hooks';
import { Hub, List } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { AvatarWithInitials } from '../index';
import { getInitials } from '../../app/helpers';
import { ListColourProps } from '../tasks/ListItem';
import ListIconComponent from '../ItemsListInSidebar/components/ListIconComponent';

interface ActiveEntityAvatarProps {
  width: string | null;
  height: string | null;
  size: string | null;
}

export default function ActiveEntityAvatar({ width = 'w-4', height = 'h-4', size = '14px' }: ActiveEntityAvatarProps) {
  const { workSpaceId: workspaceId, hubId, subhubId, walletId, listId } = useParams();
  const { hub } = useAppSelector((state) => state.hub);
  const { listColour } = useAppSelector((state) => state.list);

  if (!workspaceId) {
    return false;
  }

  const activeEntityId = hubId || subhubId || walletId || listId;

  const generateActiveEntityAvatar = (activeEntityId: string) => {
    let currentItem = null;

    if (hubId || subhubId) {
      currentItem = findCurrentHub(activeEntityId as string, hub);
      return generateHubImage(currentItem, hubId ? EntityType.hub : EntityType.subHub);
    } else if (walletId) {
      currentItem = findCurrentWallet(activeEntityId as string, hub);
      return (
        <>
          <FaFolderOpen className={`${width} ${height}`} color={currentItem.color || 'black'} />
        </>
      );
    } else if (listId) {
      currentItem = findCurrentList(activeEntityId as string, hub);
      return generateListIcon(currentItem);
    } else {
      return <div className={`${width} ${height}`} />;
    }
  };

  const generateHubImage = (item: Hub, type: string) => {
    return (
      <>
        <div className={`flex items-center justify-center ${width} ${height}`}>
          {item.path !== null ? (
            <img src={item.path} alt="hubs image" className="w-full h-full rounded" />
          ) : (
            <AvatarWithInitials
              initials={getInitials(item.name)}
              height={width as string}
              width={height as string}
              textSize={size as string}
              roundedStyle="rounded"
              backgroundColour={item.color ? item.color : type === EntityType.hub ? 'orange' : 'blue'}
            />
          )}
        </div>
      </>
    );
  };

  const generateListIcon = (item: List) => {
    if (item.color) {
      const color: ListColourProps = JSON.parse(item.color as string) as ListColourProps;
      const innerColour = item?.color ? (color.innerColour as string) : (listColour as ListColourProps)?.innerColour;
      const outerColour = item?.color ? (color.outerColour as string) : (listColour as ListColourProps)?.outerColour;
      return (
        <>
          <ListIconComponent
            shape={item.shape ? item.shape : 'solid-circle'}
            innerColour={innerColour}
            outterColour={outerColour}
            isHeader={true}
          />
        </>
      );
    }
  };

  return <>{generateActiveEntityAvatar(activeEntityId as string)}</>;
}
