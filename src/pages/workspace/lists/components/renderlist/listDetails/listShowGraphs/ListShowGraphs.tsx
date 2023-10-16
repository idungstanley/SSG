import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Button from '../../../../../../../components/Buttons/Button';
import ShowIcon from '../../../../../../../assets/icons/ShowIcon';
import ArrowDrop from '../../../../../../../assets/icons/ArrowDrop';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setShowedGraphs } from '../../../../../../../features/insights/insightsSlice';
import { graphs } from '../../../../../../../app/constants/graphs';

export default function ListShowGraphs() {
  const dispatch = useAppDispatch();

  const { showedGraphs } = useAppSelector((state) => state.insights);

  const isActiveColor = showedGraphs.length ? '#BF01FE' : 'black';

  const viewSettings = [
    {
      id: graphs.PIE_CHART,
      label: 'Pie Chart'
    },
    {
      id: graphs.LINE_GRAPH,
      label: 'Line Graph'
    },
    {
      id: graphs.BAR_CHART,
      label: 'Bar Chart'
    },
    {
      id: graphs.HISTOGRAM,
      label: 'Histogram'
    },
    {
      id: graphs.SCATTER_PLOT,
      label: 'Scatter Plot'
    },
    {
      id: graphs.ADDITIONAL,
      label: 'Line Graph 2'
    }
  ];

  const handleChange = (id: string) => {
    let graphIds: string[] = [...showedGraphs];
    if (showedGraphs.includes(id)) {
      graphIds = graphIds.filter((item) => item !== id);
    } else {
      graphIds.push(id);
    }
    dispatch(setShowedGraphs(graphIds));
  };

  return (
    <Menu>
      <div
        className={`viewSettingsParent flex justify-center items-center text-${
          showedGraphs.length && 'alsoit-purple-50'
        }`}
      >
        <Menu.Button className="flex ml-1">
          <Button active={!!showedGraphs.length as boolean}>
            <ShowIcon color={isActiveColor} width="21" height="21" /> <span>Show</span>{' '}
            <ArrowDrop color={isActiveColor} />
          </Button>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          style={{ zIndex: 61, height: '250px', width: '200px', overflow: 'auto', transform: 'translateX(60%)' }}
          className="absolute w-64 mt-3 top-8 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <p className="flex justify-center pt-3 mb-2 font-bold text-alsoit-text-sm" style={{ lineHeight: '9.6px' }}>
            GRAPH SELECTION
          </p>

          {viewSettings.map((view) => (
            <Fragment key={view.id}>
              <Menu.Item
                as="a"
                className="flex items-center w-full py-2 font-semibold text-left text-alsoit-text-lg "
                style={{ lineHeight: '15.6px' }}
              >
                <button
                  className={`flex justify-between items-center w-full group ${
                    view.label === 'Title Vertical Grid Line' && 'border-t-2 pt-4'
                  } ${view.label === 'Task In Multiple Lists' && 'border-t-2 pt-4'} ${
                    view.label === 'Split 2 level of subtasks' && 'border-t-2 pt-4'
                  }`}
                >
                  <p className="flex items-center pl-2 space-x-2 text-md whitespace-nowrap">{view.label}</p>
                  <div className="flex items-center pr-2 ">
                    <label className="switch" onClick={(event) => event.stopPropagation()}>
                      <input
                        className="inputShow"
                        type="checkbox"
                        checked={showedGraphs.includes(view.id)}
                        onChange={() => handleChange(view.id)}
                      />
                      <div className={`slider ${showedGraphs.includes(view.id) ? 'checked' : ''}`}></div>
                    </label>
                  </div>
                </button>
              </Menu.Item>
            </Fragment>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
