import React, { useEffect, useState } from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeMenu,
  getPrevName,
  getSubMenu,
  setCreateWLID,
  setSelectedTreeDetails,
  setshowMenuDropdown
} from '../../features/hubs/hubSlice';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import Palette from '../ColorPalette';
import UploadImage from '../ColorPalette/component/UploadImage';
import { InvalidateQueryFilters } from '@tanstack/react-query';
import { setCreateWlLink, setEntityForPermissions } from '../../features/workspace/workspaceSlice';
import { ListColourProps } from './ListItem';
import { useParams } from 'react-router-dom';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import PlusIcon from '../../assets/icons/PlusIcon';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import MenuDropdown from '../Dropdown/MenuDropdown';
import SubDropdown from '../Dropdown/SubDropdown';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import Drag from '../../assets/icons/Drag';
import { getInitials } from '../../app/helpers';
import ToolTip from '../Tooltip/Tooltip';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import ActiveBarIdentification from './Component/ActiveBarIdentification';
import ActiveBackground from './Component/ActiveBackground';
import { useAbsolute } from '../../hooks/useAbsolute';
import { IHub } from '../../features/hubs/hubs.interfaces';
import { APP_HR, APP_TASKS } from '../../app/constants/app';
import { Checkbox } from '../Checkbox/Checkbox';
import { selectCalendar, setHrTeamMembers, setSelectedHubs } from '../../features/calendar/slice/calendarSlice';
import { useGetTeamMembers } from '../../features/settings/teamMembers/teamMemberService';
import { MembersList } from '../../pages/calendar/ui/ExtendedBar/MembersList';
import { STORAGE_KEYS, dimensions } from '../../app/config/dimensions';

interface TaskItemProps {
  item: Hub;
  showChildren: boolean;
  type: string;
  topNumber?: string;
  zNumber?: string;
  isExtendedBar?: boolean;
  handleClick: (id: string, type?: string) => void;
  handleLocation: (id: string, name: string, item: IHub) => void;
  placeHubType: string;
}
export default function HubItem({
  item,
  showChildren,
  type,
  topNumber = '0',
  zNumber,
  isExtendedBar,
  handleClick,
  handleLocation,
  placeHubType = APP_TASKS
}: TaskItemProps) {
  const dispatch = useAppDispatch();
  const { hubId, subhubId } = useParams();

  const { activeItemId, openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { showSidebar } = useAppSelector((state) => state.account);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const { updateCords } = useAppSelector((state) => state.task);

  const [uploadId, setUploadId] = useState<string | null | undefined>('');
  const [paletteColor, setPaletteColor] = useState<string | undefined | ListColourProps | null>(
    type === EntityType.hub ? 'blue' : 'orange'
  );

  const { paletteId, show } = paletteDropdown;

  const handleHubColour = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (showSidebar) {
      e.stopPropagation();
      dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: EntityType.hub }));
    }
  };

  useEffect(() => {
    setUploadId(paletteId);
  }, [paletteId]);

  const handleItemAction = (id: string, name?: string | null) => {
    dispatch(getPrevName(name as string));
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.hub }));
    dispatch(setCreateWlLink(false));
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: type === EntityType.hub ? EntityType.hub : EntityType.subHub
      })
    );
  };

  const handleHubSettings = (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    e.preventDefault();
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.hub }));
    dispatch(setCreateWLID(id));
    dispatch(setCreateWlLink(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: EntityType.hub
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id === 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const renderEmptyArrowBlock = () => {
    return <div className="pl-3.5" />;
  };

  const { isOver, setNodeRef } = useDroppable({
    id: item.id,
    data: {
      isOverHub: true
    }
  });

  useEffect(() => {
    if (isOver) {
      handleClick(item.id, 'isOver');
    }
  }, [isOver]);

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform
  } = useDraggable({
    id: item.id,
    data: {
      isHub: true
    }
  });

  const paddingLeft = () => {
    if (!showSidebar) {
      return '7';
    }
    if (type === EntityType.subHub) {
      if (isExtendedBar) {
        return '17';
      } else {
        return '25';
      }
    } else {
      return '17';
    }
  };

  const { cords, relativeRef } = useAbsolute(updateCords, 266);
  const { cords: menuCords, relativeRef: menuRef } = useAbsolute(updateCords, 352);
  const { selectedHubs, hrTeamMembers } = useAppSelector(selectCalendar);

  const { data } = useGetTeamMembers({ page: 1, query: '' });

  const members = data?.data.team_members ?? [];

  const onCheckbox = (i: boolean, hubId: string, hubName: string, hubColor: string) => {
    if (i) {
      const currentHubMembers = members.map((el) => ({
        uuid: el['id'] + hubId,
        id: el['id'],
        hubId: hubId
      }));
      dispatch(setSelectedHubs([...selectedHubs, { hubId, hubName, hubColor }]));
      dispatch(setHrTeamMembers([...hrTeamMembers, ...currentHubMembers]));
    } else {
      dispatch(setSelectedHubs([...selectedHubs.filter((i) => i.hubId !== hubId)]));
      dispatch(setHrTeamMembers([...hrTeamMembers.filter((hrTeamMember) => hrTeamMember.hubId != hubId)]));
    }
  };

  const parentCheckboxCondition = (hubId: string) => {
    const filteredMembers = hrTeamMembers.filter((item) => item.hubId === hubId).length;
    if (filteredMembers == members.length) {
      return 'hr-checked-full';
    } else if (!filteredMembers) {
      return '';
    }

    return 'hr-checked-partial';
  };

  const checkSelectedHubs = (id: string) => {
    return selectedHubs.filter((i) => i.hubId == id).length > 0;
  };

  const checkSelectedMembers = (hubId: string) => {
    return hrTeamMembers.filter((i) => i.hubId == hubId).length > 0;
  };

  const onCheckboxHr = (i: boolean, id: string, hubId: string, uuid: string) => {
    if (i) {
      if (!checkSelectedHubs(hubId)) {
        dispatch(setSelectedHubs([...selectedHubs, { hubId, hubName: item.name, hubColor: item.color as string }]));
      }
      dispatch(setHrTeamMembers([...hrTeamMembers, { uuid, id, hubId }]));
    } else {
      dispatch(setHrTeamMembers([...hrTeamMembers.filter((hrTeamMember) => hrTeamMember.uuid != uuid)]));
    }
  };

  useEffect(() => {
    selectedHubs.map((listItem) => {
      if (!checkSelectedMembers(listItem.hubId)) {
        dispatch(setSelectedHubs([...selectedHubs.filter((i) => i.hubId !== listItem.hubId)]));
      }
    });
  }, [hrTeamMembers]);

  const sidebarWidthFromLS =
    (JSON.parse(localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH) || '""') as number) ||
    dimensions.navigationBar.default;

  return (
    <div
      className={`w-full ${openedEntitiesIds.includes(item.id) ? 'sticky bg-white opacity-100 hub-item' : ''}`}
      style={{
        top: openedEntitiesIds.includes(item.id) && showSidebar ? topNumber : '',
        zIndex: openedEntitiesIds.includes(item.id) ? zNumber : '2',
        opacity: transform ? 0 : 100
      }}
    >
      <div
        className={`bg-white w-full truncate items-center group ${
          item.id !== activeItemId && 'hover:bg-alsoit-gray-50'
        } ${isOver ? 'bg-primary-100 border-primary-500 shadow-inner shadow-primary-300' : ''}`}
        ref={setNodeRef}
        tabIndex={0}
      >
        <div
          className={`relative flex items-center justify-between ${placeHubType == APP_HR ? 'hr-hub-item' : ''}`}
          style={{ height: '30px', paddingLeft: `${paddingLeft()}px` }}
        >
          <div className="flex items-center justify-between">
            <ActiveBackground showBgColor={item.id === hubId || item.id === subhubId} />
            <ActiveBarIdentification showBar={item.id === hubId || item.id === subhubId} />
            {showSidebar && !isExtendedBar ? (
              <div
                className="absolute rounded-r-lg opacity-0 cursor-move left-2 group-hover:opacity-100"
                ref={draggableRef}
                {...listeners}
                {...attributes}
              >
                <Drag />
              </div>
            ) : null}
            {placeHubType == APP_HR && (
              <div
                className={`flex items-center justify-center ml-2 hr-checkbox-wrapper ${parentCheckboxCondition(
                  item.id
                )}`}
              >
                <Checkbox
                  styles="ml-0 mr-0 text-primary-500 focus:ring-primary-500 mx-0 hr-checkbox hr-checkbox-parent"
                  checked={checkSelectedHubs(item.id)}
                  setChecked={(e) => onCheckbox(e, item.id, item.name, item.color as string)}
                />
              </div>
            )}
            <div
              role="button"
              className={`flex items-center justify-start overflow-y-hidden text-sm truncate ${
                placeHubType == APP_HR ? 'w-full' : ''
              }`}
              onClick={
                showSidebar || isExtendedBar
                  ? () => handleClick(item.id)
                  : () => handleLocation(item.id, item.name, item as Hub)
              }
              style={{ zIndex: 1 }}
            >
              {((item?.wallets?.length || item?.lists?.length || item.has_descendants) && placeHubType === APP_TASKS) ||
              placeHubType === APP_HR ? (
                <div>
                  {showChildren ? (
                    <span className="flex flex-col">
                      <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="#919191" />
                    </span>
                  ) : (
                    <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#919191" />
                  )}
                </div>
              ) : (
                renderEmptyArrowBlock()
              )}
              <div className={`flex items-center flex-1 min-w-0 ${placeHubType == APP_HR ? 'gap-1' : 'gap-5'}`}>
                <div
                  onClick={(e) => handleHubColour(item.id, e)}
                  className="flex items-center justify-center w-6 h-6"
                  ref={relativeRef}
                >
                  {item.path !== null ? (
                    <img src={item.path} alt="hubs image" className="w-full h-full rounded" />
                  ) : (
                    <AvatarWithInitials
                      initials={getInitials(item.name)}
                      height="h-4"
                      width="w-4"
                      textSize="8px"
                      backgroundColour={
                        item.color
                          ? item.color
                          : !paletteColor && type === EntityType.hub
                          ? 'blue'
                          : !paletteColor && type === EntityType.subHub
                          ? 'orange'
                          : (paletteColor as string)
                      }
                      roundedStyle="rounded"
                    />
                  )}
                </div>
                <span
                  className="pr-2 overflow-hidden"
                  style={{ width: sidebarWidthFromLS - 135 - Number(paddingLeft()) }}
                >
                  <ToolTip title={item.name}>
                    <p
                      className={`capitalize text-left truncate cursor-pointer ${
                        item.id === hubId || item.id === subhubId ? 'text-alsoit-purple-300' : ''
                      }`}
                      style={{
                        fontSize: '13px',
                        lineHeight: '15.56px',
                        verticalAlign: 'baseline',
                        letterSpacing: '0.28px'
                      }}
                      onClick={() => handleLocation(item.id, item.name, item as Hub)}
                    >
                      {item.name}
                    </p>
                  </ToolTip>
                </span>
              </div>
            </div>
          </div>
          {showSidebar && (
            <div
              className="z-10 flex items-center pr-1 space-x-2 text-black opacity-0 group-hover:opacity-100 hover:text-fuchsia-500"
              onClick={(e) => e.stopPropagation()}
              ref={menuRef}
            >
              {!item.parent_id ? (
                <span onClick={() => handleItemAction(item.id, item.name)} className="cursor-pointer">
                  <PlusIcon className="hover:text-alsoit-purple-300" />
                </span>
              ) : null}
              <span
                onClick={(e) => {
                  handleHubSettings(item.id, item.name, e);
                  dispatch(setEntityForPermissions(item));
                }}
                className="cursor-pointer"
                id="menusettings"
              >
                <ThreeDotIcon className="hover:text-alsoit-purple-300" />
              </span>
            </div>
          )}
        </div>
      </div>

      {placeHubType == APP_HR && showChildren && (
        <MembersList members={members} onCheckbox={onCheckboxHr} hubId={item.id} place={'menu'} />
      )}
      <UploadImage endpoint={`hubs/${uploadId}`} invalidateQuery={['hubs'] as InvalidateQueryFilters<unknown>} />
      {paletteId === item.id && show ? (
        <Palette
          title="Hub"
          setPaletteColor={setPaletteColor}
          activeOutterColor={item.color as string}
          cords={{ top: cords.top, left: 10 }}
        />
      ) : null}
      {showMenuDropdown === item.id && showSidebar ? (
        <MenuDropdown isExtendedBar={isExtendedBar} cords={menuCords} />
      ) : null}
      {SubMenuId === item.id && showSidebar ? <SubDropdown cords={menuCords} placeHubType={placeHubType} /> : null}
    </div>
  );
}
