import React, { useCallback, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { cl } from "../../../../utils";
import { setShowSidebar } from "../../../../features/account/accountSlice";
import { setSidebarWidthRD } from "../../../../features/workspace/workspaceSlice";
import Header from "./components/Header";
import NavigationItems from "./components/NavigationItems";
import Places from "./components/Places";
import ResizeBorder from "./components/ResizeBorder";
import Search from "./components/Search";
import Toggle from "./components/Toggle";

export const MIN_SIDEBAR_WIDTH = 240;
export const MAX_SIDEBAR_WIDTH = 350;
const RELATIVE_WIDTH = 10;

interface SidebarProps {
  allowSelect: boolean;
  setAllowSelect: (i: boolean) => void;
}

// getting sidebar width from localStorage
const sidebarFromLS: {
  sidebarWidth: number;
  showSidebar: boolean;
} = JSON.parse(localStorage.getItem("sidebar") || '""');
const sidebarWidthFromLS = sidebarFromLS.sidebarWidth;

export default function Sidebar({ allowSelect, setAllowSelect }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const [sidebarWidth, setSidebarWidth] = useState(
    sidebarWidthFromLS || MIN_SIDEBAR_WIDTH
  );

  const sidebarRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startX = e.clientX;

      const onMouseMove = (e: MouseEvent) => {
        if (allowSelect) {
          setAllowSelect(false);
        }
        // current width
        const width = sidebarWidth + e.clientX - startX;
        // actual size is bigger than bax
        if (width > MAX_SIDEBAR_WIDTH) {
          return;
        }
        // actual size is smaller than min
        if (width < MIN_SIDEBAR_WIDTH - RELATIVE_WIDTH) {
          return dispatch(setShowSidebar(false));
        }

        // sidebar hidden and becomes bigger
        if (width > startX) {
          dispatch(setShowSidebar(true));
        }

        // adjusted width according to min and max values
        const adjustedWidth =
          width >= MAX_SIDEBAR_WIDTH
            ? MAX_SIDEBAR_WIDTH
            : width <= MIN_SIDEBAR_WIDTH
            ? MIN_SIDEBAR_WIDTH
            : width;

        setSidebarWidth(adjustedWidth);
      };

      const onMouseEnd = () => {
        setAllowSelect(true);

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseEnd);

        // saving current sidebar size to localStorage
        if (sidebarRef.current) {
          const width = sidebarRef.current.clientWidth;
          const adjustedWidth =
            width >= MAX_SIDEBAR_WIDTH
              ? MAX_SIDEBAR_WIDTH
              : width <= MIN_SIDEBAR_WIDTH
              ? MIN_SIDEBAR_WIDTH
              : width;

          localStorage.setItem(
            "sidebar",
            JSON.stringify({
              adjustedWidth,
              showSidebar: width >= MIN_SIDEBAR_WIDTH,
            })
          );
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseEnd);
    },
    [allowSelect]
  );

  // dynamic width for sidebar
  const style = useMemo(
    () => ({
      width: sidebarWidth + "px",
      minWidth: MIN_SIDEBAR_WIDTH + "px",
      maxWidth: MAX_SIDEBAR_WIDTH + "px",
    }),
    [sidebarWidth]
  );
  useMemo(() => dispatch(setSidebarWidthRD(sidebarWidth)), [sidebarWidth]);

  return (
    <aside
      ref={sidebarRef}
      className={cl("flex text-center relative overflow-x-hidden")}
    >
      {/* show / hide sidebar icon */}
      <Toggle />
      {/* sidebar */}
      <section
        className="relative flex flex-col h-full gap-2 pr-1 border-r border-gray-300"
        style={showSidebar ? style : undefined}
      >
        <Header />
        <section
          className="relative flex flex-col pr-1.5 overflow-y-scroll overflow-x-hidden"
        >
          {showSidebar ? <Search /> : null}
          <NavigationItems />
          <Places />
        </section>
      </section>
      <ResizeBorder sidebarWidth={sidebarWidth} onMouseDown={onMouseDown} />
    </aside>
  );
}
