import React from "react";
// import { BsThreeDots } from "react-icons/bs";
import FavModal from "./FavModal";
// import { useGetFavourites } from "../../../features/hubs/hubService";

interface nameType {
  item: {
    name: string;
  };
}

function Favourite({ item }: nameType) {
  //   const [modal, setModal] = useState<boolean>(false);
  return (
    <div className="hover:bg-gray-100 py-0.5 h-6 flex">
      <div className="items-center w-full mx-2 flex justify-between  items-center  relative">
        <h4
          className="tracking-wider capitalize truncate cursor-pointer"
          style={{ fontSize: "10px" }}
        >
          {item.name}
        </h4>
        <FavModal />
      </div>
      {/* {modal && <FavModal />} */}
    </div>
  );
}

export default Favourite;
