import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AvatarWithInitials, Button, ComboBoxWithAvatar, SelectMenuSimple, SlideOver } from '../../../../../components';
import { setShowAddTeamMembersOrGroupsSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import {
  useAddTeamMemberOrGroupAccess,
  useGetTeamMembersOrGroups,
} from '../../../../../features/inbox/inboxSettingsService';

interface SideOverProps {
  isGroups: boolean;
}

interface ComboboxOption {
  id: string;
  name: string;
  avatar: JSX.Element;
}

export default function SideOver({ isGroups }: SideOverProps) {
  const dispatch = useAppDispatch();
  const { inboxId } = useParams();
  const [query, setQuery] = useState<string>('');
  const [itemId, setItemId] = useState<string | null>(null);
  const [selectedAccessLevelKey, setSelectedAccessLevelKey] = useState<
    string | null
  >(null);
  const [unpaginatedItemOptions, setUnpaginatedItemOptions] = useState<
    ComboboxOption[]
  >([]);

  const { showAddTeamMembersOrGroupsSideOver } = useAppSelector(
    (state) => state.slideOver
  );

  const { mutate: onAddAccess, isSuccess, isLoading } =
    useAddTeamMemberOrGroupAccess(inboxId);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setShowAddTeamMembersOrGroupsSideOver(false));
      setSelectedAccessLevelKey(null);
      setQuery('');
      setItemId(null);
    }
  }, [isSuccess]);

  const onChangeAccessLevel = (accessLevel: string) => {
    setSelectedAccessLevelKey(accessLevel);
  };

  const onQueryChange = (query: string) => {
    setQuery(query);
    setItemId(null);
  };

  const onChange = (id: string) => {
    setItemId(id);
  };

  const onSubmit = () => {
    onAddAccess({
      accessToId: itemId,
      accessLevelKey: selectedAccessLevelKey,
      inboxId,
      isGroups,
    });
  };

  const { status, data, fetchNextPage, hasNextPage } =
    useGetTeamMembersOrGroups({
      query,
      isGroups,
    });

  useEffect(() => {
    const temp: ComboboxOption[] = [];

    if (status === 'success' && data) {
      const flat = data.pages.flatMap((page) => isGroups ? page.data.team_member_groups : page.data.team_members);

      flat.filter(i => i).map((item) => {
        const avatar = (
          <AvatarWithInitials
            height="h-6"
            width="w-6"
            initials={item.initials}
            backgroundColour={item.colour}
            textSize="text-xs"
          />
        );

        return temp.push({
          id: item.id,
          name: isGroups ? item.name : item.user.name,
          avatar,
        });
      });
    }

    return setUnpaginatedItemOptions(temp);
  }, [data]);

  const keyWord = isGroups ? 'group' : 'member';

  return (
    <SlideOver
      show={showAddTeamMembersOrGroupsSideOver}
      onClose={() =>
        dispatch(setShowAddTeamMembersOrGroupsSideOver(false))
      }
      headerTitle={`Add ${keyWord} to inbox`}
      headerDescription={`Set a role and select a team member${isGroups ? ' group' : ''}`}
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
            <SelectMenuSimple
              label="Role"
              options={[
                { id: 'read', name: 'Read-only' },
                { id: 'modify', name: 'Manage' },
                { id: 'full-control', name: 'Full control' },
                { id: 'owner', name: 'Owner' },
              ]}
              onChange={onChangeAccessLevel}
              selectedId={selectedAccessLevelKey || ''}
            />
          </div>
          <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
            <ComboBoxWithAvatar
              label={`Team member ${keyWord}`}
              onQueryChange={onQueryChange}
              onChange={onChange}
              selectedKey={itemId || ''}
              options={unpaginatedItemOptions}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={status === 'loading'}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={isLoading}
          label={`Add ${keyWord}`}
          width="w-40"
        />
      }
    />
  );
}
