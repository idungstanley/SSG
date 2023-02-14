import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { BsListUl } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEllipsis } from 'react-icons/ai';
import {
  closeMenu,
  setshowMenuDropdown,
} from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { getListServices } from '../../../../../features/list/listService';
import { dataProps } from '../../../../../components/Index/walletIndex/WalletIndex';

interface LastListIndexProps {
  finalParentId: string;
}

export default function LastListIndex({ finalParentId }: LastListIndexProps) {
  const dispatch = useDispatch();

  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { toggleArchiveList } = useAppSelector((state) => state.list);

  const { data: dataList } = getListServices({
    walletId: finalParentId,
    Archived: toggleArchiveList,
  });
  const navigate = useNavigate();
  const handleListLocation = (id: string) => {
    navigate(`/workspace/list/${id}`);
  };
  const handleListSettings = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement | SVGElement>
  ) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'list',
      })
    );
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  return dataList?.data.lists != null ? (
    <section>
      {dataList?.data?.lists.map((list: dataProps) => (
        <div key={list.id}>
          <section className="flex items-center justify-between pl-20 space-x-1 text-sm h-8 mr-6 hover:bg-gray-100">
            <div className="flex items-center space-x-1">
              <BsListUl className="flex-shrink-0 h-3 w-5" aria-hidden="true" />
              <div onClick={() => handleListLocation(list.id)}>{list.name}</div>
            </div>
            {/* ends here */}
            <button
              type="button"
              id="listright"
              className="flex items-center justify-end space-x-1 "
            >
              <AiOutlineEllipsis
                className="cursor-pointer"
                id="menusettings"
                onClick={(e) => handleListSettings(list.id, e)}
              />
            </button>
          </section>
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </section>
  ) : null;
}
