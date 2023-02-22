import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Details from './components/Details';

export const sections = [
  {
    id: 1,
    element: <Details />,
  },
];

export const tabs = [
  {
    id: 1,
    label: 'Details',
    icon: <InformationCircleIcon className="w-5 h-5" />,
  },
];

const pilotConfig = { sections, tabs };

export default pilotConfig;
