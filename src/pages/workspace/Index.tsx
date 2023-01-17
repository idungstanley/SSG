import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./sidebar/Header";
import UploadModal from "../../components/UploadModal";
import ExpandedNav from "../../views/ExpandedNav";

function Index() {
  const { showSidebar, showExtendedBar, sidebarWidth } = useAppSelector(
    (state) => state.workspace
  );
  const paddingStyles: any = () => {
    if (showSidebar && sidebarWidth > 54) {
      return { paddingLeft: `min(${sidebarWidth}px, 321px)` };
    } else if (sidebarWidth < 55) {
      return { paddingLeft: `${54}px` };
    } else {
      return { paddingLeft: `${54}px` };
    }
  };

  return (
    <div className="flex  flex-row">
      <UploadModal />
      <Sidebar />
      <div className="flex flex-1 flex-row" style={paddingStyles()}>
        {showExtendedBar && <ExpandedNav />}
        <Header />
        <main className="flex-1">
          <div
            className={`py-3.5 mx-auto sm:px-0 ${
              showSidebar ? "px-8" : "px-0"
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Index;
