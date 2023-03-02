import React from "react";
import { AiOutlineEllipsis, AiOutlinePlus } from "react-icons/ai";
import { VscTriangleDown, VscTriangleRight } from "react-icons/vsc";
import { useAppSelector } from "../../app/hooks";
import AvatarWithInitials from "../avatar/AvatarWithInitials";

interface TaskItemProps {
  item: {
    id: string;
    name: string;
  };
  handleClick: (id: string, name?: string) => void;
  handleLocation: (id: string, name?: string) => void;
  showChildren: string | null;
}
export default function TaskItem({
  handleClick,
  item,
  handleLocation,
  showChildren,
}: TaskItemProps) {
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <div>
      <div
        className={`flex justify-between items-center hover:bg-gray-100 ${
          item.id === activeItemId && "bg-green-100 text-green-500"
        }`}
        tabIndex={0}
        onClick={() => handleClick(item.id)}
      >
        <div
          className={`flex relative justify-between items-center hover:bg-gray-100 ${
            item.id === activeItemId && "text-green-500"
          }`}
        >
          {item.id === activeItemId && (
            <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
          )}
          <div
            role="button"
            className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
          >
            {showSidebar && (
              <div className="mr-0.5">
                {item.id === showChildren ? (
                  <span className="flex flex-col">
                    <VscTriangleDown
                      className="flex-shrink-0 h-2"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                  </span>
                ) : (
                  <VscTriangleRight
                    className="flex-shrink-0 h-2"
                    aria-hidden="true"
                    color="#BBBDC0"
                  />
                )}
              </div>
            )}

            <div
              className={`flex items-center flex-1 min-w-0 ${
                !showSidebar && "ml-3"
              }`}
              onClick={() => handleLocation(item.id, item.name)}
            >
              <AvatarWithInitials
                initials={item.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
                height={showSidebar ? "h-4" : "h-6"}
                width={showSidebar ? "w-4" : "w-6"}
                backgroundColour="blue"
                roundedStyle="rounded"
              />
              <span className="ml-4 overflow-hidden">
                <a
                  className="tracking-wider capitalize truncate cursor-pointer"
                  style={{ fontSize: "12px" }}
                  onClick={() => handleLocation(item.id, item.name)}
                >
                  {item.name}
                </a>
              </span>
            </div>
          </div>
        </div>
        {isHovering === index && showSidebar && (
          <div
            className="flex items-center pr-1 space-x-1"
            onClick={(e) => e.stopPropagation()}
          >
            <AiOutlineEllipsis
              onClick={(e) => {
                handleHubSettings(item.id, item.name, e);
              }}
              className="cursor-pointer"
              id="menusettings"
            />
            <AiOutlinePlus
              onClick={() => handleItemAction(item.id)}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
