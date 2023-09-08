import React, { useState } from 'react';
import { DocumentDuplicateIcon, StarIcon, PlusIcon, LinkIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setCreateTaskSlideOverVisibility } from '../../features/general/slideOver/slideOverSlice';
import { getSubMenu, setEntityToCreate, setSubDropdownMenu } from '../../features/hubs/hubSlice';
import { useParams } from 'react-router-dom';
import {
  setActiveItem,
  setActiveSubHubManagerTabId,
  setActiveTabId,
  setLastActiveItem,
  setShowIndependentPilot,
  setShowOverlay,
  setShowTreeInput
} from '../../features/workspace/workspaceSlice';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import ActiveTreeSearch from '../ActiveTree/ActiveTreeSearch';
import Button from '../Button';
import { EntityManagerTabsId, PilotTabsId } from '../../utils/PilotUtils';
import { setVisibility } from '../../features/general/prompt/promptSlice';
import { Capitalize } from '../../utils/NoCapWords/Capitalize';
import { Fade, Menu } from '@mui/material';
import { Cords } from '../../hooks/useAbsolute';
import { BsFiletypeDoc } from 'react-icons/bs';
import AddHubIcon from '../../assets/icons/AddHub';
import AddWalletIcon from '../../assets/icons/AddWallet';
import AddListIcon from '../../assets/icons/AddList';

interface itemsType {
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}
interface optionsProps {
  label: string | null;
  style?: string;
  callback: () => void;
  bgColor?: string;
}

interface SubDropdownProps {
  cords?: Cords;
}

export default function SubDropdown({ cords }: SubDropdownProps) {
  const dispatch = useDispatch();
  const { listId, hubId, walletId } = useParams();

  const { showMenuDropdownType, showMenuDropdown, selectedTreeDetails, entityToCreate, SubMenuType } = useAppSelector(
    (state) => state.hub
  );
  const { showTreeInput, lastActiveItem, activeItemId, activeItemType, sidebarWidthRD } = useAppSelector(
    (state) => state.workspace
  );
  const { lightBaseColor, showSidebar, userSettingsData } = useAppSelector((state) => state.account);

  const [open, setOpen] = useState<boolean>(true);

  const isEntityActive = !!listId || !!hubId || !!walletId;

  const closeMenu = () => {
    setOpen(false);
    dispatch(
      getSubMenu({
        SubMenuId: null,
        SubMenuType: null
      })
    );
  };

  const options = [
    {
      label: 'Cancel',
      style: 'danger',
      callback: () => {
        dispatch(setSubDropdownMenu(false));
        dispatch(setLastActiveItem(''));
        dispatch(setShowTreeInput(false));
        dispatch(
          getSubMenu({
            SubMenuId: null,
            SubMenuType: null
          })
        );
      }
    },
    {
      label: 'Choose Location',
      style: 'white',
      callback: () => {
        dispatch(setVisibility(false));
        dispatch(setShowTreeInput(!showTreeInput));
      }
    },
    {
      label: 'Proceed',
      bgColor: lightBaseColor,
      callback: () => {
        if (!isEntityActive) {
          dispatch(
            setActiveItem({
              activeItemId: activeItemId as string,
              activeItemType: activeItemType as string,
              activeItemName: `New ${Capitalize(lastActiveItem as string)} Under Construction`
            })
          );
        }
        dispatch(setShowOverlay(true));
        dispatch(setShowIndependentPilot(true));
        dispatch(setActiveTabId(PilotTabsId.entityManager));
        dispatch(setVisibility(false));
        dispatch(setShowTreeInput(false));
        dispatch(setSubDropdownMenu(false));
        dispatch(setLastActiveItem(''));
        if (entityToCreate === EntityType.hub || entityToCreate === EntityType.subHub) {
          dispatch(setActiveSubHubManagerTabId(EntityManagerTabsId.hub));
        } else if (entityToCreate === EntityType.wallet) {
          dispatch(setActiveSubHubManagerTabId(EntityManagerTabsId.wallet));
        } else if (entityToCreate === EntityType.list) {
          dispatch(setActiveSubHubManagerTabId(EntityManagerTabsId.list));
        }
        dispatch(
          getSubMenu({
            SubMenuId: null,
            SubMenuType: null
          })
        );
      }
    }
  ];

  const itemsList: itemsType[] = [
    {
      title: 'Sub Hub',
      handleClick: () => {
        dispatch(setEntityToCreate(EntityType.subHub));
        dispatch(setLastActiveItem('Sub Hub'));
      },
      icon: <AddHubIcon />,
      isVisible: showMenuDropdownType === EntityType.hub ? true : false || SubMenuType === EntityType.hub ? true : false
    },
    {
      title:
        SubMenuType === EntityType.wallet ||
        SubMenuType === 'subwallet2' ||
        showMenuDropdownType === EntityType.wallet ||
        showMenuDropdownType === 'subwallet2' ||
        showMenuDropdownType === EntityType.subWallet
          ? 'Sub Wallet'
          : 'Wallet',
      handleClick: () => {
        dispatch(setEntityToCreate(EntityType.wallet));
        dispatch(setLastActiveItem(selectedTreeDetails.type === EntityType.wallet ? 'Sub Wallet' : 'Wallet'));
      },
      icon: <AddWalletIcon />,
      isVisible:
        showMenuDropdownType === EntityType.list ||
        showMenuDropdownType === 'subwallet3' ||
        SubMenuType === 'subwallet3'
          ? false
          : true
    },
    {
      title: 'Task',
      handleClick: () => {
        dispatch(setCreateTaskSlideOverVisibility(true));
        // navigate(`/${currentWorkspaceId}/tasks`);
        dispatch(setLastActiveItem('Task'));
      },
      icon: <PlusIcon className="w-5 text-gray-700 h-7" aria-hidden="true" />,
      isVisible: showMenuDropdownType === EntityType.list ? true : false
    },
    {
      title: 'List',
      handleClick: () => {
        dispatch(setLastActiveItem('List'));
        dispatch(setEntityToCreate(EntityType.list));
      },
      icon: <AddListIcon />,
      isVisible: showMenuDropdownType === EntityType.list ? false : true
    },
    {
      title: 'Sprint',
      handleClick: () => ({}),
      icon: <SwatchIcon className="w-5 text-gray-700 h-7" aria-hidden="true" />,
      isVisible: true
    },
    {
      title: 'Docs',
      handleClick: () => ({}),
      icon: <BsFiletypeDoc className="w-5 text-gray-700 h-7" aria-hidden="true" />,
      isVisible: true
    },
    {
      title: 'Folder',
      handleClick: () => ({}),
      icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    },
    {
      title: 'From Template',
      handleClick: () => ({}),
      icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    },
    {
      title: 'Import',
      handleClick: () => ({}),
      icon: <StarIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    }
  ];

  return (
    <Menu
      open={open}
      onClose={closeMenu}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: showMenuDropdown ? 'center' : Number(cords?.top) - 100,
        horizontal:
          showSidebar && showMenuDropdown
            ? Number(userSettingsData?.sidebarWidth) + 120
            : showSidebar && !showMenuDropdown
            ? Number(userSettingsData?.sidebarWidth) - 100
            : sidebarWidthRD
      }}
    >
      <div className="px-2 origin-top-right bg-white" style={{ minWidth: '200px' }}>
        <div className="w-auto gap-2 mb-1 px-0.5">
          {itemsList.map((item, index) =>
            (lastActiveItem === '' || lastActiveItem === item.title) && item.isVisible ? (
              <div
                key={index}
                className={`py-1 ${item.title === 'List' ? 'border-b' : ''} ${
                  item.title === 'Folder' ? 'border-y' : ''
                }`}
              >
                <div
                  className={`flex items-center gap-1 p-1.5 py-1.5 space-x-2 text-sm text-left text-gray-600  ${
                    lastActiveItem ? '' : 'hover:bg-alsoit-gray-75 rounded-md cursor-pointer'
                  }`}
                  onClick={item.handleClick}
                >
                  <span className="flex items-center w-5 h-5">{item.icon}</span>
                  <p>{lastActiveItem ? 'Create Entity' : item.title}</p>
                </div>
              </div>
            ) : null
          )}
        </div>
        {lastActiveItem && (
          <div className="mb-2">
            <span className="flex p-2 mb-2 truncate whitespace-normal text-start">
              {`Do you want to create your ${lastActiveItem} under ${selectedTreeDetails.name}`}
            </span>
            <div className="flex items-center justify-between gap-2 p-2">
              {options.map((option: optionsProps) => (
                <div key={option.label}>
                  <Button
                    height="h-8"
                    label={option.label}
                    bgColor={option.bgColor}
                    onClick={option.callback}
                    buttonStyle={option.style}
                  />
                </div>
              ))}
            </div>
            <div>{showTreeInput && <ActiveTreeSearch />}</div>
          </div>
        )}
      </div>
    </Menu>
  );
}
