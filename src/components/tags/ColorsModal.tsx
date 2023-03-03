import React from "react";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { colors } from "./colors";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { useAppSelector } from "../../app/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseUpdateTagService } from "../../features/workspace/tags/tagService";

export default function ColorsModal() {
  const [isOpen, setIsOpen] = useState(true);
  const { currentTagId } = useAppSelector((state) => state.tag);
  const queryClient = useQueryClient();

  const changeColorMutation = useMutation(UseUpdateTagService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleChangeColor = async (color: string) => {
    await changeColorMutation.mutateAsync({
      color,
      tag_id: currentTagId,
    });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed -top-20 bottom-36 right-40 -left-40 flex items-center justify-center">
          <Dialog.Panel className="absolute px-3 py-2 z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 grid grid-cols-8 cursor-pointer focus:outline-none ">
            {colors?.map((color) => (
              <div
                key={color.id}
                className="flex"
                onClick={() => handleChangeColor(color.value)}
              >
                <RiCheckboxBlankFill
                  className={`pl-px text-${color.value}-400 flex rounded-md text-sm cursor-pointer`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
