import React from 'react';
import { FaRoute } from 'react-icons/fa';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';

export default function RoutePlanner() {
  return (
    <div>
      <PlaceItem label="ROUTE PALNNER" icon={<FaRoute className="w-5 h-5" />} />
      <div>ROUTE PALNNER</div>
    </div>
  );
}
