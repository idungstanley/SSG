import React from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  setCreateListSlideOverVisibility,
  setCreateWalletSlideOverVisibility,
} from "../../features/general/slideOver/slideOverSlice";

export default function CreateWL({ paddingLeft }: { paddingLeft: string | number }) {
  const dispatch = useAppDispatch();
  return (
    <div
      className="flex space-x-1 text-xs py-1.5 h-8 tracking-wider capitalize truncate"
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      <span>
        Create a
        <span
          onClick={() => dispatch(setCreateWalletSlideOverVisibility(true))}
          className="mx-1 underline cursor-pointer"
        >
          Wallet,
        </span>
        <span
          onClick={() => dispatch(setCreateListSlideOverVisibility(true))}
          className="underline cursor-pointer"
        >
          List
        </span>
      </span>
    </div>
  );
}
