import emailIcon from "../../../assets/branding/email-icon.png";
import React from "react";
import PlaceItem from "../sidebar/components/PlaceItem";
import Favourite from "./Favourite";
import { useGetFavourites } from "../../../features/hubs/hubService";
import { Spinner } from "../../../common";

function Favorites() {
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
        {data?.data.favorites.map((fav: { name: string; id: string }) => {
          return <Favourite key={fav.id} item={fav} />;
        })}
        {/* <Favourite />
        <Favourite />
        <Favourite /> */}
      </div>
    </>
  );
}

export default Favorites;
