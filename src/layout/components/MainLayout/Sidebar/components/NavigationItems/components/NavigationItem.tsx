import React from "react";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import {
  setActivePlaceName,
  setShowExtendedBar,
} from "../../../../../../../features/workspace/workspaceSlice";
import { cl } from "../../../../../../../utils";
import { useNavigate } from "react-router-dom";

interface NavigationItemProps {
  item: {
    name: string;
    href: string;
    alwaysShow: boolean;
    source?: string;
    icon?: JSX.Element;
  };
  isVisible: boolean;
}

export default function NavigationItem({
  item,
  isVisible,
}: NavigationItemProps) {
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { activePlaceName } = useAppSelector((state) => state.workspace);
  const handleClick = (name: string | null, link: string) => {
    dispatch(setActivePlaceName(name));
    dispatch(setShowExtendedBar(true));
    if (name !== "Favorites") {
      navigate(link);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cl(
        activePlaceName === item.name
          ? "bg-green-100 hover:bg-green-200"
          : "hover:bg-gray-100",
        !showSidebar ? "justify-center" : "gap-2 items-center",
        "relative flex cursor-pointer pl-4 p-2 w-full"
      )}
      onClick={() => handleClick(item.name, item.href)}
    >
      {activePlaceName === item.name ? (
        <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg " />
      ) : null}
      <span className="w-4 h-4">
        {item.icon || (
          <img className="w-4 h-4" src={item.source} alt={item.name} />
        )}
      </span>
      {showSidebar ? (
        <p className="ml-3 text-xs truncate">{item.name}</p>
      ) : null}
    </div>
  );
}
