import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button, Input, SlideOver } from '../../../../components';
import { createHubService, useGetHubChildren } from '../../../../features/hubs/hubService';
import { useAppSelector } from '../../../../app/hooks';
import { getCurrHubId, getSubMenu, setshowMenuDropdown, setSubDropdownMenu } from '../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setCreateSubHubSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { displayPrompt, setVisibility } from '../../../../features/general/prompt/promptSlice';
// import { IHubDetailResErr } from '../../../../features/hubs/hubs.interfaces';

function SubHubModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currHubId, SubMenuId, SubMenuType } = useAppSelector((state) => state.hub);

  const { data } = useGetHubChildren({
    query: SubMenuType === 'hubs' ? SubMenuId : currHubId
  });

  const isCreateAllowed = data?.data.wallets.length === 0 && data?.data.lists.length === 0;

  const createHub = useMutation(createHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setVisibility(false));
      dispatch(setCreateSubHubSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        getSubMenu({
          SubMenuId: null
        })
      );
      dispatch(getCurrHubId(null));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null
        })
      );
    }

    // onError: (data: IHubDetailResErr) => {
    //   if (data.data.data.need_confirmation === true) {
    //     dispatch(
    //       displayPrompt('Create Subhub', 'Would move all entities in Hub to Subhub. Do you want to proceed?', [
    //         {
    //           label: 'Create Subhub',
    //           style: 'danger',
    //           callback: async () => {
    //             await createHub.mutateAsync({
    //               name,
    //               currentWorkspaceId,
    //               currHubId: SubMenuType === 'hubs' ? SubMenuId : currHubId,
    //               confirmAction: 1
    //             });
    //           }
    //         },
    //         {
    //           label: 'Cancel',
    //           style: 'plain',
    //           callback: () => {
    //             dispatch(setVisibility(false));
    //           }
    //         }
    //       ])
    //     );
    //   }
    // }
  });

  const handleCloseSlider = () => {
    dispatch(setCreateSubHubSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null
      })
    );
  };

  const defaultHubFormState = {
    name: ''
  };

  const [formState, setFormState] = useState(defaultHubFormState);

  const handleHubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId') || '"') as string;

  const { name } = formState;

  const onSubmit = async () => {
    if (isCreateAllowed) {
      await createHub.mutateAsync({
        name,
        currentWorkspaceId,
        currHubId: SubMenuType === 'hubs' ? SubMenuId : currHubId,
        confirmAction: 1
      });
    } else {
      dispatch(
        displayPrompt('Create Subhub', 'Would move all entities in Hub to Subhub. Do you want to proceed?', [
          {
            label: 'Create Subhub',
            style: 'danger',
            callback: async () => {
              await createHub.mutateAsync({
                name,
                currentWorkspaceId,
                currHubId: SubMenuType === 'hubs' ? SubMenuId : currHubId,
                confirmAction: 1
              });
            }
          },
          {
            label: 'Cancel',
            style: 'plain',
            callback: () => {
              dispatch(setVisibility(false));
            }
          }
        ])
      );
    }
  };

  const { showCreateSubHubSlideOver } = useAppSelector((state) => state.slideOver);
  return (
    <SlideOver
      show={showCreateSubHubSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle="Create A New Sub Hub"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Sub Hub Name:"
              placeholder="Enter Sub Hub Name"
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
          label="Create Sub Hub"
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default SubHubModal;
