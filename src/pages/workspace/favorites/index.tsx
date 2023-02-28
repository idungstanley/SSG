import React from "react";
import PlaceItem from "../../../layout/components/MainLayout/Sidebar/components/PlaceItem";
import Favourite from "./Favourite";
import {
  UseDeleteFav,
  useGetFavourites,
  // UseUpdateFavService,
} from "../../../features/hubs/hubService";
import { Spinner } from "../../../common";
import { useAppSelector } from "../../../app/hooks";
import { MdAlternateEmail } from "react-icons/md";

function Favorites() {
  const { delFavId } = useAppSelector((state) => state.hub);
  UseDeleteFav({
    delFav: delFavId,
  });

  const { data, status } = useGetFavourites();

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <PlaceItem
        label="Email"
        icon={<MdAlternateEmail className="w-4 h-4" />}
      />
      <div>
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
