import { useState } from 'react';
import listIcon from '../../../../../assets/icons/listIcon.png';
import tableIcon from '../../../../../assets/icons/tableIcon.png';
import boardIcon from '../../../../../assets/icons/boardIcon.png';
import calenderIcon from '../../../../../assets/icons/calenderIcon.png';
import timeChartIcon from '../../../../../assets/icons/timeChartIcon.png';
import mapIcon from '../../../../../assets/icons/mapIcon.png';
import gantIcon from '../../../../../assets/icons/gantIcon.png';
import teamIcon from '../../../../../assets/icons/teamIcon.png';
import { useCreateView } from '../../../../../features/workspace/workspaceService';
import { useParams } from 'react-router-dom';
import viewList from '../../../../../assets/branding/viewList.svg';
import { Button } from '../../../../../components';
import { Capitalize } from '../../../../../utils/NoCapWords/Capitalize';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';

interface IViewOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  imageUrl: string;
  description: string;
  isUnusing?: boolean;
}

interface ICreateNewViewModalProps {
  closeAllModal: () => void;
}

export default function CreateNewViewModal({ closeAllModal }: ICreateNewViewModalProps) {
  const { hubId, walletId, listId } = useParams();

  const [newName, setNewName] = useState<string>('');
  const [isError, setError] = useState<boolean>(false);

  const { mutate: onCreate } = useCreateView();

  const dublicateOptions = [
    {
      id: 'list',
      icon: <img src={listIcon} alt="listIcon" />,
      label: 'List',
      imageUrl: viewList,
      description:
        'Use List view to organize your tasks in anyway imaginable - sort, filter, group, and customize columns.'
    },
    {
      id: 'table',
      icon: <img src={tableIcon} alt="tableIcon" />,
      label: 'Table',
      imageUrl: viewList,
      description: 'Easily manage, update, and organize your tasks with Table view.',
      isUnusing: true
    },
    {
      id: 'board',
      icon: <img src={boardIcon} alt="boardIcon" />,
      label: 'Board',
      imageUrl: viewList,
      description: 'Build your perfect Board and easily drag-and-drop tasks between columns.',
      isUnusing: true
    },
    {
      id: 'calender',
      icon: <img src={calenderIcon} alt="calenderIcon" />,
      label: 'Calender',
      imageUrl: viewList,
      description: 'Calendar view is your place for planning, scheduling, and resource management.',
      isUnusing: true
    },
    {
      id: 'timeChart',
      icon: <img src={timeChartIcon} alt="timeChartIcon" />,
      label: 'TimeChart',
      imageUrl: viewList,
      description:
        'Plan out your work over time. See overlaps, map your schedule out and see it all divided by groups.',
      isUnusing: true
    },
    {
      id: 'map',
      icon: <img src={mapIcon} alt="mapIcon" />,
      label: 'Map',
      imageUrl: viewList,
      description:
        'Map view is your place to visualize all your tasks that are tied to an address using a Location Custom Field.',
      isUnusing: true
    },
    {
      id: 'gantt',
      icon: <img src={gantIcon} alt="gantIcon" />,
      label: 'Gantt',
      imageUrl: viewList,
      description: 'Plan time, manage resources, visualize dependencies and more with Gantt view.',
      isUnusing: true
    },
    {
      id: 'team',
      icon: <img src={teamIcon} alt="teamIcon" />,
      label: 'Team',
      imageUrl: viewList,
      description: 'Monitor what people are working on, what has been done, and who needs more tasks with Team view',
      isUnusing: true
    }
  ];

  const [activeView, setActiveView] = useState<IViewOption>(dublicateOptions[0]);

  const handleCreateView = () => {
    if (!newName) {
      setError(true);
    } else {
      onCreate({
        model: hubId ? EntityType.hub : walletId ? EntityType.wallet : EntityType.list,
        model_id: (hubId || walletId || listId) as string,
        type: activeView.id,
        name: Capitalize(newName)
      });
      closeAllModal();
    }
  };

  return (
    <div>
      <div className="flex">
        <div style={{ width: '180px' }}>
          <div className="p-2 py-2">
            <div>View name</div>
            <input
              onChange={(e) => {
                setNewName(e.target.value);
                setError(false);
              }}
              type="text"
              className={`searchHover block w-full alsoit-radius text-alsoit-gray-300-lg border text-gray-700 appearance-none ${
                isError ? 'border-amber-600' : 'border-slate-200'
              }`}
              placeholder="Add name"
            />
          </div>
          {dublicateOptions.map((option) => (
            <div
              key={option.id}
              className="w-full flex items-center justify-between py-2 px-3 hover:bg-gray-300 cursor-pointer"
              style={{ color: option.isUnusing ? 'orange' : '' }}
              onClick={() => setActiveView(option)}
            >
              <div className="flex items-center">
                <span
                  className="mr-3"
                  style={{ background: option.isUnusing ? 'orange' : '', opacity: option.isUnusing ? '0.5' : '1' }}
                >
                  {option.icon}
                </span>
                <span>{option.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: '500px' }}>
          <div className="p-4">
            <div>
              <img src={activeView.imageUrl} alt="view-list" />
              <div className="text-2xl">{activeView.label}</div>
              <div>{activeView.description}</div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                buttonStyle="primary"
                onClick={handleCreateView}
                label={`Add ${activeView.label}`}
                padding="py-2 px-2"
                height="h-7"
                width="w-fit"
                labelSize="text-sm"
                disabled={activeView.isUnusing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
