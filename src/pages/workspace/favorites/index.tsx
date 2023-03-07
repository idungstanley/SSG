import React from "react";
import Favourite from "./Favourite";
import { useGetFavourites } from "../../../features/hubs/hubService";
import { Spinner } from "../../../common";
import { useAppSelector } from "../../../app/hooks";
import { cl } from "../../../utils";
import { AiFillStar } from "react-icons/ai";

function Favorites() {
  const { showSidebar } = useAppSelector((state) => state.account);
  const { data, status } = useGetFavourites();

  if (status === "loading") {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-200 focus:flex flex w-full py-5 items-center relative list-none gap-2">
        <div className="flex justify-center w-full">
          <div className="flex items-center">
            <span className="flex justify-between items-center w-full h-6 mx-1">
              <AiFillStar />
            </span>
            <span className="block font-semibold text-xs w-full cursor-pointer uppercase leading-3 tracking-wider text-black font-black mx-1">
              FAVORITES
            </span>
          </div>
        </div>
      </div>
      <div className={cl("mb-2", !showSidebar && "overflow-x-hidden w-12")}>
        {data?.data.favorites.map(
          (fav: {
            name: string;
            id: string;
            model_type: string;
            model_id: string;
          }) => {
            return <Favourite key={fav.id} item={fav} />;
          }
        )}
      </div>
    </>
  );
}

export default Favorites;
