import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHubWallet } from '../../../features/hubs/hubService';
import { BsListUl } from 'react-icons/bs';
import { AiOutlineEllipsis } from 'react-icons/ai';
import {
  closeMenu,
  getPrevName,
  setshowMenuDropdown,
} from '../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import { setCurrentListId } from '../../../features/list/listSlice';
import { useAppSelector } from '../../../app/hooks';
import {
  setActiveEntity,
  setActiveItem,
  setShowHub,
} from '../../../features/workspace/workspaceSlice';

interface ListIndexProps {
  showHubList: boolean
  getCurrentHubId: string | null
  paddingLeft?: string
}

function ListIndex({
  showHubList,
  getCurrentHubId,
  paddingLeft = '26',
}: ListIndexProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetHubWallet(getCurrentHubId);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const handleListLocation = (id: string, name: string) => {
    dispatch(setShowHub(true));
    navigate(`/list/${id}`);
    dispatch(
      setActiveItem({
        activeItemType: 'list',
        activeItemId: id,
        activeItemName: name,
      }),
    );
    dispatch(setActiveEntity({ id: id, type: 'list' }));
  };
  const handleListSettings = (
    id: string,
    name: string,
    e: React.MouseEvent<HTMLButtonElement | SVGElement>,
  ) => {
    dispatch(setCurrentListId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'list',
      }),
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  return (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.lists &&
        data?.data?.lists.map((list) => (
          <div key={list.id}>
            <section
              className={`flex relative justify-between items-center text-sm h-8 hover:bg-gray-100 ${
                list.id === activeItemId &&
                'bg-green-100 text-black font-medium'
              }`}
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              {list.id === activeItemId && (
                <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
              )}
              <div className="flex items-center justify-center space-x-1">
                <BsListUl
                  className="flex-shrink-0 w-5 h-3"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => handleListLocation(list.id, list.name)}
                  className="ml-2 tracking-wider capitalize truncate cursor-pointer"
                  style={{ fontSize: '12px' }}
                >
                  {list.name.length > 10
                    ? list.name.substr(0, 10) + '...'
                    : list.name}
                </button>
              </div>
              {/* ends here */}
              <button
                type="button"
                id="listright"
                className="flex items-center justify-end mr-6 space-x-1"
              >
                {/* <TaskDropdown getListId={getListId} /> */}
                <AiOutlineEllipsis
                  className="cursor-pointer"
                  onClick={(e) => handleListSettings(list.id, list.name, e)}
                  id="menusettings"
                />
              </button>
            </section>
            {showMenuDropdown === list.id ? <MenuDropdown /> : null}
          </div>
        ))}
    </div>
  );
}

export default ListIndex;
