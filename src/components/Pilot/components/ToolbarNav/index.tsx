import { useAppSelector } from '../../../../app/hooks';
import ArrowRightPilot from '../../../../assets/icons/ArrowRightPilot';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useState } from 'react';
import ModalPilotNav from '../../../Modal/ModalPilotNav';
import { initialPlaces } from '../../../../layout/components/MainLayout/Sidebar/components/Places';
import PilotNavIcon from '../../../../assets/icons/PilotNavIcon';
import ToolTip from '../../../Tooltip/Tooltip';

interface ToolbarNavInterface {
  id: string | null;
  name: string;
  url: string | null;
  parent: string | null;
  nesting: number;
}

export default function ToolbarNav() {
  const navigate = useNavigate();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { activeItemName, activePlaceId } = useAppSelector((state) => state.workspace);
  const toolbarNavItems: ToolbarNavInterface[] = [];
  const [modalOpened, setModalOpened] = useState<string>('');
  const [modalNavTree, setModalNavTree] = useState<ToolbarNavInterface[]>([]);
  const activeItems = document.querySelectorAll('.nav-item-parent .nav-item');
  const activePlace = initialPlaces.filter((place) => place.id == activePlaceId);

  const activeNavItemElement = document.querySelectorAll('.active-nav-item');

  const activeNavItem = Array.from(activeNavItemElement)
    .map((element) => {
      return element.getAttribute('data-id');
    })
    .filter(Boolean) as string[];

  for (let i = 0; i < activeItems.length; i++) {
    const element = activeItems[i] as HTMLElement;

    toolbarNavItems.push({
      id: element.getAttribute('data-id'),
      name: element.getAttribute('data-name'),
      url: element.getAttribute('data-url'),
      parent: element.getAttribute('data-parent'),
      nesting: 0
    } as ToolbarNavInterface);
    if (activeItemName === element.getAttribute('data-name')) {
      i = activeItems.length;
    }
  }

  const findPaginationTree = (data: ToolbarNavInterface[], targetId: string): ToolbarNavInterface[] => {
    const paginationTree: ToolbarNavInterface[] = [];
    let currentId: string | null = targetId;

    while (currentId !== null) {
      const item: ToolbarNavInterface | undefined = data.find((obj: ToolbarNavInterface) => obj.id === currentId);
      if (item) {
        paginationTree.unshift({ id: item.id, name: item.name, url: item.url, parent: item.parent, nesting: 0 });
        currentId = item.parent;
      } else {
        currentId = null;
      }
    }

    return paginationTree;
  };

  const toolbarNavTree: ToolbarNavInterface[] = findPaginationTree(toolbarNavItems, activeNavItem[0]);

  const lastItem = toolbarNavTree[toolbarNavTree.length - 1];

  const handleLocation = (url: string | null) => {
    if (!url) {
      return false;
    }
    navigate(`/${currentWorkspaceId}/${url}`, {
      replace: true
    });
  };

  const getModalNavTree = () => {
    const modalNavItems: ToolbarNavInterface[] = [];

    const items = document.querySelectorAll('.top-level-nav .nav-item');
    for (let i = 0; i < items.length; i++) {
      const element = items[i] as HTMLElement;

      modalNavItems.push({
        id: element.getAttribute('data-id'),
        name: element.getAttribute('data-name'),
        url: element.getAttribute('data-url'),
        parent: element.getAttribute('data-parent'),
        nesting: 0
      } as ToolbarNavInterface);
    }

    return modalNavItems;
  };

  const arrowClick = (id: string) => {
    setModalNavTree(getModalNavTree());

    if (modalOpened) {
      if (modalOpened != id) {
        setModalOpened(id);
      }
    } else {
      setModalOpened(id);
    }
  };

  const modalItemClick = (url: string | null) => {
    setModalOpened('');
    handleLocation(url);

    const activeParentBgElements = document.querySelectorAll('.pilot-nav-parent.bg-alsoit-gray-125');

    activeParentBgElements.forEach((element) => {
      element.classList.remove('bg-alsoit-gray-125');
    });
  };

  const arrows = document.querySelectorAll('.pilot-nav-arrow');

  arrows.forEach((arrow) => {
    const parent = arrow.closest('.pilot-nav-parent');
    if (parent) {
      arrow.addEventListener('mouseover', () => {
        parent.classList.add('bg-alsoit-gray-125');
      });

      arrow.addEventListener('mouseleave', () => {
        parent.classList.remove('bg-alsoit-gray-125');
      });
    }
  });

  return (
    <>
      <div className="flex items-center w-5 h-5 mr-1 overflow-hidden" style={{ margin: '1px 0 0 4px' }}>
        {activePlaceId == 'tasks' ? <PilotNavIcon /> : activePlace[0]?.icon}
      </div>
      {toolbarNavTree.map((item) => (
        <div
          key={item.name}
          className="flex items-center overflow-visible text-xs font-medium truncate transition duration-500 rounded text-alsoit-gray-300 whitespace-nowrap pilot-nav-parent"
          style={{
            paddingLeft: '3px'
          }}
        >
          <ToolTip placement="right" title={item.name}>
            <p
              className={`transition duration-500 rounded pilot-nav-child ${
                lastItem != item ? 'cursor-pointer hover:bg-alsoit-gray-125' : ''
              }`}
              style={{ fontSize: '13px', paddingLeft: '2.5px', paddingRight: '2.5px', letterSpacing: '0.2px' }}
              onClick={() => handleLocation(item.url)}
            >
              {item.name}
            </p>
          </ToolTip>
          {lastItem !== item && (
            <span
              className="relative overflow-visible rounded cursor-pointer pilot-nav-arrow"
              style={{ padding: '13px 5px 13px 2.5px' }}
              onClick={() => arrowClick(item.name)}
            >
              <ArrowRightPilot active={modalOpened == item.name} />
              {modalOpened == item.name && (
                <ModalPilotNav
                  modalItemClick={modalItemClick}
                  modalNavTree={modalNavTree}
                  activeNavItem={activeNavItem[0]}
                  activeArrowItem={item.id}
                />
              )}
            </span>
          )}
        </div>
      ))}
      {!toolbarNavTree.length && (
        <div
          className="items-center py-1 overflow-visible text-xs font-semibold capitalize truncate transition duration-500 rounded text-alsoit-gray-300 whitespace-nowrap hover:bg-alsoit-gray-125"
          style={{ paddingLeft: '5px', paddingRight: '5px' }}
        >
          {activeItemName}
        </div>
      )}
    </>
  );
}