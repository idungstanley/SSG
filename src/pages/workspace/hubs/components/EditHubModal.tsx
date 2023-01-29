import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Button, Input, SlideOver } from "../../../../components";
import { useEditHubService } from "../../../../features/hubs/hubService";
import { useAppSelector } from "../../../../app/hooks";
import { useDispatch } from "react-redux";
import { setshowMenuDropdown } from "../../../../features/hubs/hubSlice";
import { setEditHubSlideOverVisibility } from "../../../../features/general/slideOver/slideOverSlice";

export default function EditHubModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currHubId, prevName } = useAppSelector((state) => state.hub);
  const createHub = useMutation(useEditHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setEditHubSlideOverVisibility(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
        })
      );
    },
  });

  const defaultHubFormState = {
    name: prevName,
  };

  const [formState, setFormState] = useState(defaultHubFormState);

  const handleHubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const currentWorkspaceId = JSON.parse(
    localStorage.getItem("currentWorkspaceId") || '"'
  );

  const { name } = formState;

  const onSubmit = async () => {
    await createHub.mutateAsync({
      name,
      currentWorkspaceId,
      currHubId,
    });
  };

  const handleCloseSlider = () => {
    dispatch(setEditHubSlideOverVisibility(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
      })
    );
  };

  const { showEditHubSlideOver } = useAppSelector((state) => state.slideOver);
  const { showMenuDropdownType } = useAppSelector((state) => state.hub);
  return (
    <SlideOver
      show={showEditHubSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle={
        showMenuDropdownType === "hubs" ? " Edit hub" : "Edit subhub"
      }
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label={
                showMenuDropdownType === "hubs" ? "Hub Name:" : "Subhub Name:"
              }
              placeholder={
                showMenuDropdownType === "hubs"
                  ? "Enter hub Name"
                  : "Enter SubHub Name"
              }
              name="name"
              value={name}
              type="text"
              onChange={handleHubChange}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label={showMenuDropdownType === "hubs" ? "Edit hub" : "Edit  Subhub"}
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}
