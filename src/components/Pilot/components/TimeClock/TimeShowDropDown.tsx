import { MouseEvent, useState } from 'react';
import ArrowRight from '../../../../assets/icons/ArrowRight';
import { TIME_ENTITY_SHOW_PROPERTY, TIME_TABS } from '../../../../utils/Constants/TimeClockConstants';
import { TabsDropDown } from './TabsDropDown';
import ActiveTreeSearch from '../../../ActiveTree/ActiveTreeSearch';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';

export function TimeShowDropDown() {
  const [dropDown, setDropDown] = useState<{ [key: string]: boolean }>({
    nested_entities: false
  });

  const handleToggle = (target: string) => {
    setDropDown({ ...dropDown, [target]: !dropDown[target] });
  };
  const node = () =>
    TIME_ENTITY_SHOW_PROPERTY.map((property, index) => (
      <div
        key={index}
        className={`flex flex-col space-y-2.5 ${index === 3 ? 'border-b-2 pb-2' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {property.sideTag === 'dropDown' ? (
          <div
            className="flex justify-between items-center px-3.5 py-1.5 hover:bg-alsoit-gray-50 relative"
            onClick={() => handleToggle(property.value)}
          >
            <div className="flex items-center capitalize font-semibold">{property.name}</div>
            <ArrowRight />
            {dropDown[TIME_TABS.nestedEntities] && property.value === TIME_TABS.nestedEntities && (
              <TabsDropDown
                styles="w-44 -right-10 top-5 px-1.5 h-max-24"
                subStyles="left-12"
                header="shared entity"
                subHeader="select entity"
              >
                <VerticalScroll>
                  <ActiveTreeSearch option={TIME_TABS.nestedEntities} />
                </VerticalScroll>
              </TabsDropDown>
            )}
          </div>
        ) : (
          <div
            className="flex justify-between items-center px-3.5 py-1.5 hover:bg-alsoit-gray-50"
            onClick={() => handleToggle(property.value)}
          >
            <div className="flex items-center capitalize font-semibold">{property.name}</div>
            <input type="radio" />
          </div>
        )}
      </div>
    ));
  return node();
}
