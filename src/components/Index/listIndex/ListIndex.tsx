import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHubWallet } from '../../../features/hubs/hubService';
import { BsListUl } from 'react-icons/bs';
import { AiOutlineEllipsis } from 'react-icons/ai';
import {
  closeMenu,
  setshowMenuDropdown,
} from '../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import { setCurrentListId } from '../../../features/list/listSlice';
import { useAppSelector } from '../../../app/hooks';

interface ListIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
}

function ListIndex({ showHubList, getCurrentHubId }: ListIndexProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetHubWallet(getCurrentHubId);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const handleListLocation = (id: string) => {
    navigate(`/workspace/list/${id}`);
  };
  const handleListSettings = (id: string, e) => {
    dispatch(setCurrentListId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'list',
      })
    );
    if (showMenuDropdown != null) {
      if (e.target.id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  return (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.lists &&
        data?.data?.lists.map((list) => (
          <div key={list.id}>
            <section className="flex justify-between items-center text-sm pl-6 ml-0.5 h-8 hover:bg-gray-100">
              <div className="flex items-center justify-center space-x-1">
                <BsListUl
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => handleListLocation(list.id)}
                  className="tracking-wider capitalize ml-2"
                  style={{ fontSize: '10px' }}
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
                className="flex items-center justify-end space-x-1 mr-6"
              >
                {/* <TaskDropdown getListId={getListId} /> */}
                <AiOutlineEllipsis
                  className="cursor-pointer"
                  onClick={(e) => handleListSettings(list.id, e)}
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
