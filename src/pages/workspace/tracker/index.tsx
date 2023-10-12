import { useState } from 'react';
import { MdInsights } from 'react-icons/md';
// import { SiPivotaltracker } from 'react-icons/si';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import TimeClockInsightsIcon from '../../../assets/icons/TimeClockInsightsIcon';

function WorkInsights() {
  const navigate = useNavigate();

  const { showSidebar, lightBaseColor, baseColor } = useAppSelector((state) => state.account);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const [activePlace, setActivePlace] = useState<string>('');

  const workInsightsType = [
    {
      id: 'time_clock',
      label: 'Time Clock',
      icon: <TimeClockInsightsIcon />,
      link: 'time-clock'
    }
    // {
    //   id: 'tracker',
    //   label: 'Tracker',
    //   icon: <SiPivotaltracker />
    // }
  ];

  const handleClick = (link: string) => {
    navigate(`/${currentWorkspaceId}/insights/${link}`);
    setActivePlace(link);
  };

  return (
    <>
      <PlaceItem
        label="WORK INSIGHTS"
        id="6"
        icon={<MdInsights className="w-4 h-4" />}
        isActiveLayoutCondition={!activePlace.length}
      />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>
        <ul className="flex flex-col">
          {workInsightsType.map((item) => (
            <li className="relative" key={item.id}>
              {activePlace === item.link && (
                <>
                  <span
                    className="absolute inset-0 z-0 before:content before:absolute before:inset-0"
                    style={{ backgroundColor: lightBaseColor }}
                  />
                  <span
                    className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg"
                    style={{ backgroundColor: baseColor }}
                  />
                </>
              )}
              <span
                className="flex items-center h-8 pl-6 gap-7 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleClick(item.link)}
                style={{ backgroundColor: activePlace === item.link ? '#BF00FF08' : 'white' }}
              >
                {item.icon}
                <p>{item.label}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default WorkInsights;
