import React from 'react';
import communicationIcon from '../../../assets/branding/communication.png';
import logsIcon from '../../../assets/branding/logs.png';
import detailIcon from '../../../assets/branding/detail.png';
import automationIcon from '../../../assets/branding/automation.png';
import propertiesIcon from '../../../assets/branding/properties-icon.png';
import permissionIcon from '../../../assets/branding/permission.png';
const pilotOptions = [
  {
    id: 1,
    name: 'communication',
    source: communicationIcon,
  },
  {
    id: 2,
    name: 'Logs',
    source: logsIcon,
  },
  {
    id: 3,
    name: 'Permissions',
    source: permissionIcon,
  },
  {
    id: 4,
    name: 'Properties',
    source: propertiesIcon,
  },
  {
    id: 5,
    name: 'Details',
    source: detailIcon,
  },
  {
    id: 6,
    name: 'Automation',
    source: automationIcon,
  },
];

function Pilot() {
  return (
    <div className="">
      {pilotOptions.map((item) => (
        <div key={item.id}>
          <img src={item.source} alt="" />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Pilot;
