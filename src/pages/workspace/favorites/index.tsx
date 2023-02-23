import emailIcon from "../../../assets/branding/email-icon.png";
import React from "react";
import PlaceItem from "../sidebar/components/PlaceItem";
import Favourite from "./Favourite";
import {
  UseDeleteFav,
  useGetFavourites,
} from "../../../features/hubs/hubService";
import { Spinner } from "../../../common";
import { useAppSelector } from "../../../app/hooks";

function Favorites() {
  const { delFavId } = useAppSelector((state) => state.hub);
  UseDeleteFav({
    delFav: delFavId,
  });
  // console.log(delStatus);

  const { data, status } = useGetFavourites();

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <PlaceItem
        label="Email"
        icon={<img src={emailIcon} alt="icon" className="h-4 w-4" />}
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
