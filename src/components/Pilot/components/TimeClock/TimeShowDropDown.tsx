import { useState } from 'react';
import ArrowRight from '../../../../assets/icons/ArrowRight';
import { TIME_ENTITY_SHOW_PROPERTY, TIME_TABS } from '../../../../utils/Constants/TimeClockConstants';
import ActiveTreeSearch from '../../../ActiveTree/ActiveTreeSearch';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { SlideButton } from '../../../SlideButton';
import DropdownWithHeader from './components/DropdownWithHeader';

export function TimeShowDropDown() {
  const [dropDown, setDropDown] = useState<{ [key: string]: boolean }>({
    nested_entities: false
  });
  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleChange = (index: number) => {
    const newArr = [...checkedState];
    newArr[index] = !newArr[index];
    setCheckedState(newArr);
  };

  const handleToggle = (target: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDropDown({ ...dropDown, [target]: !dropDown[target] });
    if (target === TIME_TABS.nestedEntities) {
      setAnchor(e.currentTarget);
    }
  };
  const node = () => (
    <div>
      {TIME_ENTITY_SHOW_PROPERTY.map((property, index) => (
        <div
          key={index}
          className={`flex flex-col space-y-3 ${
            index === 3 ? 'border-b-2 pb-2' : property.value !== TIME_TABS.nestedEntities ? 'text-orange-500' : ''
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {property.sideTag === 'dropDown' ? (
            <div
              className="flex justify-between items-center px-3.5 py-3 hover:bg-alsoit-gray-50 relative"
              onClick={(e) => handleToggle(property.value, e)}
            >
              <div className="flex items-center capitalize font-semibold">{property.name}</div>
              <ArrowRight />
              {/* {dropDown[TIME_TABS.nestedEntities] && property.value === TIME_TABS.nestedEntities && (
                <TabsDropDown
                  styles="w-44 -right-10 top-5 px-1.5 h-max-24"
                  subStyles="left-12"
                  header="shared entity"
                  subHeader="select entity"
                  closeModal={() =>
                    setDropDown((prev) => ({ ...prev, [TIME_TABS.nestedEntities]: !prev[TIME_TABS.nestedEntities] }))
                  }
                >
                  <VerticalScroll>
                    <ActiveTreeSearch option={TIME_TABS.nestedEntities} />
                  </VerticalScroll>
                </TabsDropDown>
              )} */}
            </div>
          ) : (
            <div
              className="flex justify-between items-center px-3.5 py-4 hover:bg-alsoit-gray-50"
              onClick={(e) => handleToggle(property.value, e)}
            >
              <div className="flex items-center capitalize font-semibold relative">
                {property.value === TIME_TABS.verticalGrid && (
                  <div className="absolute text-alsoit-text-sm left-16 px-0.5 bg-white w-28 text-center uppercase -top-6">
                    Grid settings
                  </div>
                )}
                {property.name}
              </div>
              <SlideButton changeFn={handleChange} index={index} state={checkedState} />
            </div>
          )}
        </div>
      ))}
      <DropdownWithHeader header="shared entity" subHeader="select entity" anchor={anchor} setAnchor={setAnchor}>
        <VerticalScroll>
          <div style={{ maxWidth: '230px' }}>
            <ActiveTreeSearch option={TIME_TABS.nestedEntities} />
          </div>
        </VerticalScroll>
      </DropdownWithHeader>
    </div>
  );
  return node();
}
