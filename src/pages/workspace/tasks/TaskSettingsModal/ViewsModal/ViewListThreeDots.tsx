import { FiChevronRight } from 'react-icons/fi';
import DublicateIcon from '../../../../../assets/icons/DublicateIcon';
import { CiEdit } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import FavoriteIcon from '../../../../../assets/branding/FavoriteIcon';
import { useState } from 'react';
import Pin from '../../../../../assets/icons/Pin';
import { AiOutlineLink } from 'react-icons/ai';
import TemplatesIcon from '../../../../../assets/icons/Templates';
import { Menu } from '@mui/material';
import listIcon from '../../../../../assets/icons/listIcon.png';
import tableIcon from '../../../../../assets/icons/tableIcon.png';
import boardIcon from '../../../../../assets/icons/boardIcon.png';
import calenderIcon from '../../../../../assets/icons/calenderIcon.png';
import timeChartIcon from '../../../../../assets/icons/timeChartIcon.png';
import mapIcon from '../../../../../assets/icons/mapIcon.png';
import gantIcon from '../../../../../assets/icons/gantIcon.png';
import teamIcon from '../../../../../assets/icons/teamIcon.png';
import { useDublicateView } from '../../../../../features/workspace/workspaceService';
import { useParams } from 'react-router-dom';

export default function ViewListThreeDots() {
  const { viewId } = useParams();

  const [dublicateEl, setDublicateEl] = useState<null | HTMLElement>(null);

  const { mutate: onDublicate } = useDublicateView();

  const viewSettings = [
    {
      id: 'pin',
      icon: <Pin />,
      label: 'Pin',
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'add_to_favorites',
      icon: <FavoriteIcon />,
      label: 'Add to favorites',
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'dublicate_as',
      icon: <DublicateIcon />,
      label: 'Dublicate as',
      isHasArrow: true,
      handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setDublicateEl(e.currentTarget);
      }
    },
    {
      id: 'templates',
      icon: <TemplatesIcon />,
      label: 'Templates',
      isHasArrow: true,
      isHasDivider: true,
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'more_settings',
      icon: <BsThreeDots />,
      label: 'More settings',
      isHasArrow: true,
      handleClick: () => null,
      isUnusing: true
    }
  ];

  const dublicateOptions = [
    {
      id: 'list',
      icon: <img src={listIcon} alt="listIcon" />,
      label: 'List',
      handleClick: () => {
        onDublicate(viewId as string);
      }
    },
    {
      id: 'table',
      icon: <img src={tableIcon} alt="tableIcon" />,
      label: 'Table',
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'board',
      icon: <img src={boardIcon} alt="boardIcon" />,
      label: 'Board',
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'calender',
      icon: <img src={calenderIcon} alt="calenderIcon" />,
      label: 'Calender',
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'timeChart',
      icon: <img src={timeChartIcon} alt="timeChartIcon" />,
      label: 'TimeChart',
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'map',
      icon: <img src={mapIcon} alt="mapIcon" />,
      label: 'Map',
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'gantt',
      icon: <img src={gantIcon} alt="gantIcon" />,
      label: 'Gantt',
      handleClick: () => null,
      isUnusing: true
    },
    {
      id: 'team',
      icon: <img src={teamIcon} alt="teamIcon" />,
      label: 'Team',
      handleClick: () => null,
      isUnusing: true
    }
  ];

  return (
    <div style={{ width: '200px' }}>
      <div className="w-full flex justify-between items-center py-1 px-3">
        <div>View options</div>
        <div className="flex">
          <CiEdit />
          <AiOutlineLink />
        </div>
      </div>
      <div className="text-xs py-1 px-3">This view is required.</div>
      {viewSettings.map((setting) => (
        <div
          key={setting.id}
          className={`w-full flex items-center justify-between py-2 px-3 hover:bg-gray-300 cursor-pointer ${
            setting.isHasDivider ? 'border-t-2' : ''
          }`}
          style={{ background: setting.isUnusing ? '#f6efe3' : '', pointerEvents: setting.isUnusing ? 'none' : 'all' }}
          onClick={(e) => setting.handleClick(e)}
        >
          <div className="flex items-center">
            <span className="mr-1" style={{ width: '20px' }}>
              {setting.icon}
            </span>
            <span>{setting.label}</span>
          </div>
          <div>{setting?.isHasArrow ? <FiChevronRight /> : null}</div>
        </div>
      ))}
      {/* Dublicate options */}
      <Menu
        anchorEl={dublicateEl}
        open={!!dublicateEl}
        onClose={() => setDublicateEl(null)}
        style={{ marginLeft: '170px' }}
      >
        <div style={{ width: '180px' }}>
          {dublicateOptions.map((option) => (
            <div
              key={option.id}
              className="w-full flex items-center justify-between py-2 px-3 hover:bg-gray-300 cursor-pointer"
              style={{
                background: option.isUnusing ? '#f6efe3' : '',
                pointerEvents: option.isUnusing ? 'none' : 'all'
              }}
            >
              <div className="flex items-center" onClick={option.handleClick}>
                <span className="mr-3">{option.icon}</span>
                <span>{option.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Menu>
    </div>
  );
}
