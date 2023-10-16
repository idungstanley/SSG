import React, { useState } from 'react';
import GraphResizeIcon from '../../assets/icons/GraphResizeIcon';
import GraphEditIcon from '../../assets/icons/GraphEditIcon';
import GraphDotsIcon from '../../assets/icons/GraphDotsIcon';
import { Fade, Menu, MenuItem } from '@mui/material';
import DublicateIcon from '../../assets/icons/DublicateIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import PilotIcon from '../../assets/icons/PilotIcon';
import PilotExtended from '../../assets/icons/PilotExtended';
import FullScreenIcon from '../../assets/icons/FullScreenIcon';
import DragMove from './DragMove';
import { useAppSelector } from '../../app/hooks';

interface IGraphContainerProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isPieChart?: boolean;
}

export default function GraphContainer({ id, title, children, isPieChart }: IGraphContainerProps) {
  const { movingGraphId } = useAppSelector((state) => state.insights);

  const [resizeDropdownEl, setResizeDropdownEl] = React.useState<null | HTMLElement>(null);
  const [resizeDropdownFullEl, setResizeDropdownFullEl] = React.useState<null | HTMLElement>(null);
  const [settingDropdownEl, setSettingDropdownEl] = React.useState<null | HTMLElement>(null);
  const [settingDropdownFullEl, setSettingDropdownFullEl] = React.useState<null | HTMLElement>(null);

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isShowSettings, setShowSettings] = useState<boolean>(false);
  const [fullMode, setFullMode] = useState<boolean>(false);

  const containerSettings = [
    {
      id: 'resize',
      icon: <GraphResizeIcon />
    },
    {
      id: 'edit',
      icon: <GraphEditIcon />,
      isUnusing: true
    },
    {
      id: 'settings',
      icon: <GraphDotsIcon />,
      isUnusing: true
    }
  ];

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (id === 'resize') {
      setResizeDropdownEl(event.currentTarget);
    } else if (id === 'settings') {
      setSettingDropdownEl(event.currentTarget);
    }
  };

  const handleClickFullMode = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (id === 'resize') {
      setResizeDropdownFullEl(event.currentTarget);
    } else if (id === 'settings') {
      setSettingDropdownFullEl(event.currentTarget);
    }
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY
    });
  };

  return (
    <>
      <div
        className="m-3 p-2 relative bg-white rounded-xl"
        style={{
          maxWidth: '330px',
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
          transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
          zIndex: id === movingGraphId ? 100 : 0
        }}
        onMouseOver={() => setShowSettings(true)}
        onMouseLeave={() => setShowSettings(false)}
      >
        {isShowSettings ? (
          <div className="absolute right-2 flex items-center">
            {containerSettings.map((item) => (
              <div
                key={item.id}
                className={`w-6 h-6 flex justify-center items-center ml-1 rounded-sm ${
                  item.isUnusing ? 'bg-orange-100' : 'bg-alsoit-gray-50'
                } hover:bg-alsoit-purple-50 cursor-pointer`}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.icon}
              </div>
            ))}
          </div>
        ) : null}
        <DragMove onDragMove={handleDragMove} id={id}>
          <div className="text-center text-2xl cursor-move">{title}</div>
        </DragMove>
        <div className={`${isPieChart ? 'flex justify-center' : ''}`} style={{ height: isPieChart ? '150px' : 'auto' }}>
          {children}
        </div>
        {/* Resize dropdown */}
        <Menu
          open={Boolean(resizeDropdownEl)}
          anchorEl={resizeDropdownEl}
          onClose={() => setResizeDropdownEl(null)}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              setFullMode(true);
              setResizeDropdownEl(null);
            }}
          >
            <span className="w-5 flex justify-center mr-2">
              <FullScreenIcon />
            </span>
            Full Screen
          </MenuItem>
          <MenuItem style={{ background: '#f6efe3' }}>
            <span className="w-5 flex justify-center mr-2">
              <PilotIcon />
            </span>
            Pilot
          </MenuItem>
          <MenuItem style={{ background: '#f6efe3' }}>
            <span className="w-5 flex justify-center mr-2">
              <PilotExtended />
            </span>
            Extended Pilot
          </MenuItem>
        </Menu>
        {/* Settings dropdown */}
        <Menu
          open={Boolean(settingDropdownEl)}
          anchorEl={settingDropdownEl}
          onClose={() => setSettingDropdownEl(null)}
          TransitionComponent={Fade}
        >
          <MenuItem className="flex items-center" style={{ background: '#f6efe3' }}>
            <span className="w-5 flex justify-center mr-2">
              <DublicateIcon />
            </span>
            Duplicate
          </MenuItem>
          <MenuItem className="flex items-center" style={{ background: '#f6efe3', color: '#FF0E0F' }}>
            <span className="w-5 flex justify-center mr-2">
              <TrashIcon />
            </span>
            Delete Graph
          </MenuItem>
        </Menu>
      </div>

      {/* full screen mode */}
      <Menu
        open={fullMode}
        onClose={() => setFullMode(false)}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <div style={{ width: '1000px', height: '600px' }} className="relative rounded-xl p-6">
          <div className="text-center text-2xl mb-4">{title}</div>
          <div className="absolute top-3 right-8 flex items-center" style={{ transform: 'scale(1.5)' }}>
            {containerSettings.map((item) => (
              <div
                key={item.id}
                className={`w-6 h-6 flex justify-center items-center ml-1 rounded-sm ${
                  item.isUnusing ? 'bg-orange-100' : 'bg-alsoit-gray-50'
                } hover:bg-alsoit-purple-50 cursor-pointer`}
                onClick={(e) => handleClickFullMode(e, item.id)}
              >
                {item.icon}
              </div>
            ))}
          </div>
          <div
            className={`${isPieChart ? 'flex justify-center' : ''}`}
            style={{ height: isPieChart ? '400px' : 'auto' }}
          >
            {children}
          </div>
          {/* Resize dropdown */}
          <Menu
            open={Boolean(resizeDropdownFullEl)}
            anchorEl={resizeDropdownFullEl}
            onClose={() => setResizeDropdownFullEl(null)}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={() => {
                setFullMode(false);
                setResizeDropdownFullEl(null);
              }}
            >
              <span className="w-5 flex justify-center mr-2">
                <GraphResizeIcon />
              </span>
              Minimized
            </MenuItem>
            <MenuItem style={{ background: '#f6efe3' }}>
              <span className="w-5 flex justify-center mr-2">
                <PilotIcon />
              </span>
              Pilot
            </MenuItem>
            <MenuItem style={{ background: '#f6efe3' }}>
              <span className="w-5 flex justify-center mr-2">
                <PilotExtended />
              </span>
              Extended Pilot
            </MenuItem>
          </Menu>
          {/* Settings dropdown */}
          <Menu
            open={Boolean(settingDropdownFullEl)}
            anchorEl={settingDropdownFullEl}
            onClose={() => setSettingDropdownFullEl(null)}
            TransitionComponent={Fade}
          >
            <MenuItem className="flex items-center" style={{ background: '#f6efe3' }}>
              <span className="w-5 flex justify-center mr-2">
                <DublicateIcon />
              </span>
              Duplicate
            </MenuItem>
            <MenuItem className="flex items-center" style={{ background: '#f6efe3', color: '#FF0E0F' }}>
              <span className="w-5 flex justify-center mr-2">
                <TrashIcon />
              </span>
              Delete Graph
            </MenuItem>
          </Menu>
        </div>
      </Menu>
    </>
  );
}
