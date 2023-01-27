import React from "react";
import { useGetHubList } from "../../../features/hubs/hubService";
import ItemsListInSidebar from "../../../components/ItemsListInSidebar";
import { useDispatch } from "react-redux";
import { getHub } from "../../../features/hubs/hubSlice";
import everythingIcon from "../../../assets/branding/everything-icon.png";
import { useAppSelector } from "../../../app/hooks";

function Hubs() {
  const dispatch = useDispatch();
  const { toggleArchive } = useAppSelector((state) => state.hub);
  const { data, status } = useGetHubList({
    query: toggleArchive,
  });
  if (status === "success") {
    dispatch(getHub(data?.data.hubs));
  }
  return (
    <>
      <div className="flex items-center justify-between pl-4 hover:bg-gray-100">
        <div className="flex items-center content-center self-center py-2">
          <img src={everythingIcon} alt="Hub Icon" className="h-4 mr-4" />
          <p className="tracking-wider" style={{ fontSize: "12px" }}>
            Everthing
          </p>
        </div>
      </div>
      <ItemsListInSidebar items={data?.data.hubs} status={status} type="hub" />
    </>
  );
}

export default Hubs;
