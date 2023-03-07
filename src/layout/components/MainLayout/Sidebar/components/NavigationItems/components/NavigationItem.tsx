import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import { setActivePlaceName } from "../../../../../../../features/workspace/workspaceSlice";
import { cl } from "../../../../../../../utils";

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
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const handleClick = (name: string | null) => {
    dispatch(setActivePlaceName(name));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Link
      to={item.href}
      className={cl(
        pathname === item.href
          ? "bg-green-100 hover:bg-green-200"
          : "hover:bg-gray-100",
        !showSidebar ? "justify-center" : "gap-2 items-center",
        "relative flex cursor-pointer pl-4 p-2 w-full"
      )}
      onClick={() => handleClick(item.name)}
    >
      {item.href === pathname ? (
        <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg " />
      ) : null}
      <span
        className={`w-4 h-4 flex items-center ${
          item.name === "Home" && "bg-green-400 rounded text-white"
        }`}
        style={{ backgroundColor: item.name === "Home" ? "#00CC25" : "" }}
      >
        {item.icon || (
          <img className="w-4 h-4" src={item.source} alt={item.name} />
        )}
      </span>
      {showSidebar ? (
        <p className="ml-3 text-xs truncate">{item.name}</p>
      ) : null}
    </Link>
  );
}
