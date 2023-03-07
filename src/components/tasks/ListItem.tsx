import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BsListUl } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeMenu,
  getPrevName,
  setshowMenuDropdown,
} from "../../features/hubs/hubSlice";
import {
  setActiveEntity,
  setActiveItem,
} from "../../features/workspace/workspaceSlice";

interface ListItemProps {
  list: {
    id: string;
    name: string;
  };
  paddingLeft: string;
}
export default function ListItem({ list, paddingLeft }: ListItemProps) {
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleListLocation = (id: string, name: string) => {
    navigate(`/list/${id}`);
    dispatch(
      setActiveItem({
        activeItemType: "list",
        activeItemId: id,
        activeItemName: name,
      })
    );
    dispatch(setActiveEntity({ id: id, type: "wallet" }));
  };

  const handleListSettings = (
    id: string,
    name: string,
    e: React.MouseEvent<HTMLButtonElement | SVGElement>
  ) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: "list",
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == "menusettings") {
        dispatch(closeMenu());
      }
    }
  };

  return (
    <section
      className={`relative flex items-center justify-between h-8 space-x-1 hover:bg-gray-100 group ${
        list.id === activeItemId && "bg-green-100 text-black font-medium"
      }`}
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      {list.id === activeItemId && (
        <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
      )}
      <div className="flex items-center space-x-1 tracking-wider capitalize truncate cursor-pointer">
        <BsListUl className="flex-shrink-0 w-5 h-3" aria-hidden="true" />
        <div
          onClick={() => handleListLocation(list.id, list.name)}
          style={{ fontSize: "12px" }}
          className="tracking-wider capitalize truncate cursor-pointer"
        >
          {list.name}
        </div>
      </div>
      {/* ends here */}
      <button
        type="button"
        id="listright"
        className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <TaskDropdown /> */}
        <AiOutlineEllipsis
          className="cursor-pointer"
          id="menusettings"
          onClick={(e) => handleListSettings(list.id, list.name, e)}
        />
      </button>
    </section>
  );
}
