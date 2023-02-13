import React from 'react';
import ItemsHubData from '.';

interface SubHubSectionsProps {
  data: {
    id: string;
    name: string;
  };
}

export default function SubHubSections({ data }: SubHubSectionsProps) {
  return (
    <div className=" capitalize ">
      <ItemsHubData hubId={data.id} hubName={data.name} />
    </div>
  );
}
