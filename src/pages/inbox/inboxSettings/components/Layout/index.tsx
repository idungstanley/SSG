import React from 'react';
import { useAppDispatch } from '../../../../../app/hooks';
import { Button } from '../../../../../components';
import { setShowAddTeamMembersOrGroupsSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import Header from '../Header';
import TabbedHeading from '../TabbedHeading';
import Table from '../Table';

interface LayoutProps {
  isGroups: boolean;
}

export default function Layout({ isGroups }: LayoutProps) {
  const dispatch = useAppDispatch();

  const addItem = () => {
    dispatch(setShowAddTeamMembersOrGroupsSideOver(true));
  };

  const keyWord = isGroups ? 'group' : 'member';

  return (
    <div className="h-full flex flex-col w-full flex-1 bg-white overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
        <div className="my-10">
          <TabbedHeading
            selectedTabKey={`${keyWord}s`}
            actions={
              <Button
                buttonStyle="primary"
                onClick={addItem}
                loading={false}
                label={`Add ${keyWord}`}
                width="w-36"
              />
            }
          />
        </div>
        <Table isGroups={isGroups} />
      </div>
    </div>
  );
}
