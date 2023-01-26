import React from 'react';
import Status from './status/Status';
import Priority from './priority/Priority';
import CustomReference from './customReference/CustomReference';
import Share from './share/Share';
import EntitySettings from './entitySettings/EntitySettings';
import Assignees from './assignees/Assignees';
import Subscribers from './subscribers/Subscribers';
import { AvatarWithInitials } from '../../../../../components';
import SubDetails from './SubDetails';

export default function DetailsIndex() {
  return (
    <>
      <div className="flex justify-between items-center">
        <section className="flex items-center space-x-3">
          <Status />
          <Priority />
        </section>
        <section className="flex items-center justify-center space-x-3">
          <CustomReference />
          <Share />
          <EntitySettings />
        </section>
      </div>
      <section className="flex items-center mt-3 space-x-2">
        <Assignees />
        <span className="text-gray-300">|</span>
        <Subscribers />
        <span className="text-gray-300">|</span>
        <AvatarWithInitials
          initials="DN"
          backgroundColour="blue"
          roundedStyle="rounded"
          height="h-5"
          width="w-5"
        />
      </section>
      <section className="mt-3">
        <SubDetails />
      </section>
    </>
  );
}
