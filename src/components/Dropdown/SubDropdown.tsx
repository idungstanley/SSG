import { useState } from 'react';
import { DocumentDuplicateIcon, StarIcon, PlusIcon, LinkIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setShowPilotSideOver } from '../../features/general/slideOver/slideOverSlice';
import { getSubMenu, setEntityToCreate, setSubDropdownMenu, setshowMenuDropdown } from '../../features/hubs/hubSlice';
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
import { setVisibility } from '../../features/general/prompt/promptSlice';
import { Capitalize } from '../../utils/NoCapWords/Capitalize';
import { Fade, Menu } from '@mui/material';
import { Cords } from '../../hooks/useAbsolute';
import { BsFiletypeDoc } from 'react-icons/bs';
import AddHubIcon from '../../assets/icons/AddHub';
import AddWalletIcon from '../../assets/icons/AddWallet';
import AddListIcon from '../../assets/icons/AddList';
import { pilotTabs } from '../../app/constants/pilotTabs';
import { APP_HR } from '../../app/constants/app';

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
  walletLevel?: number;
  placeHubType: string;
}

export default function SubDropdown({ cords, placeHubType, walletLevel }: SubDropdownProps) {
  const dispatch = useDispatch();
  const { listId, hubId, walletId } = useParams();
  const { showMenuDropdownType, showMenuDropdown, selectedTreeDetails, entityToCreate, SubMenuType } = useAppSelector(
    (state) => state.hub
  );
  const { showTreeInput, lastActiveItem, activeItemId, activeItemType, sidebarWidthRD, activeItemName } =
    useAppSelector((state) => state.workspace);
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
      label: 'Choose ',
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
        dispatch(setActiveTabId(pilotTabs.ENTITY_MANAGER));
        dispatch(setVisibility(false));
        dispatch(setShowTreeInput(false));
        dispatch(setSubDropdownMenu(false));
        dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
        dispatch(setLastActiveItem(''));
        if (entityToCreate === EntityType.hub || entityToCreate === EntityType.subHub) {
          dispatch(setActiveSubHubManagerTabId(pilotTabs.CREATE_HUB));
        } else if (entityToCreate === EntityType.wallet) {
          dispatch(setActiveSubHubManagerTabId(pilotTabs.CREATE_WALLET));
        } else if (entityToCreate === EntityType.list) {
          dispatch(setActiveSubHubManagerTabId(pilotTabs.CREATE_LIST));
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

  const itemsList: itemsType[] =
    placeHubType == APP_HR
      ? [
          {
            title: 'Sub Hub',
            handleClick: () => {
              dispatch(setEntityToCreate(EntityType.subHub));
              dispatch(setLastActiveItem('Sub Hub'));
            },
            icon: <AddHubIcon />,
            isVisible:
              showMenuDropdownType === EntityType.hub ? true : false || SubMenuType === EntityType.hub ? true : false
          }
        ]
      : [
          {
            title: 'Sub Hub',
            handleClick: () => {
              dispatch(setEntityToCreate(EntityType.subHub));
              dispatch(setLastActiveItem('Sub Hub'));
              // dispatch(setSubDropdownMenu(false));
              // dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
            },
            icon: <AddHubIcon />,
            isVisible:
              showMenuDropdownType === EntityType.hub ? true : false || SubMenuType === EntityType.hub ? true : false
          },
          {
            title: (walletLevel as number) > 1 ? 'Sub Wallet' : 'Wallet',
            handleClick: () => {
              dispatch(setEntityToCreate(EntityType.wallet));
              dispatch(setLastActiveItem(selectedTreeDetails.type === EntityType.wallet ? 'Sub Wallet' : 'Wallet'));
              // dispatch(setSubDropdownMenu(false));
              // dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
            },
            icon: <AddWalletIcon />,
            isVisible:
              showMenuDropdownType === EntityType.list || (walletLevel as number) > 2 || SubMenuType === EntityType.list
                ? false
                : true
          },
          {
            title: 'Task',
            handleClick: () => {
              // dispatch(setCreateTaskSlideOverVisibility(true));
              dispatch(setActiveTabId(pilotTabs.ENTITY_MANAGER));
              dispatch(setActiveSubHubManagerTabId(pilotTabs.CREATE_TASK));
              dispatch(
                setShowPilotSideOver({
                  show: true,
                  id: activeItemId as string,
                  title: activeItemName as string,
                  type: activeItemType as string
                })
              );
              dispatch(setSubDropdownMenu(false));
              dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
              // navigate(`/${currentWorkspaceId}/tasks`);
              // dispatch(setLastActiveItem('Task'));
            },
            icon: <PlusIcon className="w-5 text-gray-700 h-7" aria-hidden="true" />,
            isVisible: showMenuDropdownType === EntityType.list || SubMenuType === EntityType.list ? true : false
          },
          {
            title: 'List',
            handleClick: () => {
              dispatch(setLastActiveItem('List'));
              dispatch(setEntityToCreate(EntityType.list));
              // dispatch(setSubDropdownMenu(false));
              // dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
            },
            icon: <AddListIcon />,
            isVisible: showMenuDropdownType === EntityType.list || SubMenuType === EntityType.list ? false : true
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
            isVisible: false
          },
          {
            title: 'Folder',
            handleClick: () => ({}),
            icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
            isVisible: false
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
      PaperProps={{
        style: {
          borderRadius: '12px'
        }
      }}
    >
      <div key="subDropdown" className="px-2 origin-top-right bg-white" style={{ minWidth: '200px' }}>
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
                    lastActiveItem ? '' : 'hover:bg-alsoit-gray-50 rounded-md cursor-pointer'
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
