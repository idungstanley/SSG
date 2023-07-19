import React, { useRef, useEffect } from 'react';
import { DocumentDuplicateIcon, StarIcon, PlusIcon, LinkIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { FaFolder } from 'react-icons/fa';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import hubIcon from '../../assets/branding/hub.svg';
import { setCreateTaskSlideOverVisibility } from '../../features/general/slideOver/slideOverSlice';
import { getSubMenu, setEntityToCreate, setSubDropdownMenu } from '../../features/hubs/hubSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
  setActiveEntityName,
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

interface itemsType {
  id: number;
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

export default function SubDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listId, hubId, walletId } = useParams();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { showMenuDropdownType, selectedTreeDetails, entityToCreate, showMenuDropdown, SubMenuType, SubMenuId } =
    useAppSelector((state) => state.hub);
  const { showTreeInput, lastActiveItem } = useAppSelector((state) => state.workspace);
  const { lightBaseColor } = useAppSelector((state) => state.account);

  const isEntityActive = !!listId || !!hubId || !!walletId;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkClickedOutSide = (e: MouseEvent): void => {
      if (SubMenuId != null && ref.current && !ref.current.contains(e.target as HTMLButtonElement)) {
        if (lastActiveItem !== '') {
          dispatch(
            getSubMenu({
              SubMenuId: null,
              SubMenuType: null
            })
          );
        }
      }
    };
    document.addEventListener('click', checkClickedOutSide);
    return () => {
      document.removeEventListener('click', checkClickedOutSide);
    };
  }, [SubMenuId]);

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
          dispatch(setActiveEntityName(`New ${Capitalize(lastActiveItem as string)} Under Construction`));
        }
        dispatch(setShowOverlay(true));
        dispatch(setShowIndependentPilot(true));
        dispatch(setActiveTabId(PilotTabsId.entityManager));
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
      id: 1,
      title: 'Sub Hub',
      handleClick: () => {
        dispatch(setEntityToCreate(EntityType.subHub));
        dispatch(setLastActiveItem('Sub Hub'));
      },
      icon: <img src={hubIcon} alt="" className="w-4 h-4" />,
      isVisible: showMenuDropdownType == 'hubs' ? true : false || SubMenuType == 'hubs' ? true : false
    },
    {
      id: 2,
      title:
        SubMenuType === 'wallet' ||
        SubMenuType === 'subwallet2' ||
        showMenuDropdownType === 'wallet' ||
        showMenuDropdownType === 'subwallet2' ||
        showMenuDropdownType === 'subwallet'
          ? 'Sub Wallet'
          : 'Wallet',
      handleClick: () => {
        dispatch(setEntityToCreate(EntityType.wallet));
        dispatch(setLastActiveItem(selectedTreeDetails.type === EntityType.wallet ? 'Sub Wallet' : 'Wallet'));
      },
      icon: <FaFolder className="w-4 h-4" aria-hidden="true" />,
      isVisible:
        showMenuDropdownType == 'list' || showMenuDropdownType == 'subwallet3' || SubMenuType === 'subwallet3'
          ? false
          : true
    },
    {
      id: 3,
      title: 'Task',
      handleClick: () => {
        dispatch(setCreateTaskSlideOverVisibility(true));
        navigate(`/${currentWorkspaceId}/tasks`);
        dispatch(setLastActiveItem('Task'));
      },
      icon: <PlusIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />,
      isVisible: showMenuDropdownType == 'list' ? true : false
    },
    {
      id: 4,
      title: 'List',
      handleClick: () => {
        dispatch(setLastActiveItem('List'));
        dispatch(setEntityToCreate(EntityType.list));
      },
      icon: <AiOutlineUnorderedList className="w-4 h-4" aria-hidden="true" />,
      isVisible: showMenuDropdownType === 'list' ? false : true
    },
    {
      id: 5,
      title: 'Sprint',
      handleClick: () => ({}),
      icon: <SwatchIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 6,
      title: 'Folder',
      handleClick: () => ({}),
      icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      id: 7,
      title: 'From Template',
      handleClick: () => ({}),
      icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 8,
      title: 'Import',
      handleClick: () => ({}),
      icon: <StarIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    }
  ];

  return (
    <div className="" ref={ref}>
      <div
        className={`fixed w-96 p-2 origin-top-right bg-white rounded-md top-2/4 ring-1 ring-black ring-opacity-5 focus:outline-none ${
          showMenuDropdown == null ? 'left-56' : 'left-96'
        }`}
        style={{ boxShadow: '0 1px 10px #00000040', minWidth: '200px', zIndex: '999' }}
      >
        {itemsList.map((item) =>
          (lastActiveItem === '' || lastActiveItem === item.title) && item.isVisible ? (
            <div key={item.id}>
              <div
                className={`flex items-center p-2 space-x-2 text-sm text-left text-gray-600  ${
                  lastActiveItem ? '' : 'hover:bg-gray-200 rounded-md cursor-pointer'
                }`}
                onClick={item.handleClick}
              >
                {item.icon}
                <p>{lastActiveItem ? 'Create Entity' : item.title}</p>
              </div>
            </div>
          ) : null
        )}
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
    </div>
  );
}
