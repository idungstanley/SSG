import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ArrowDown from '../../../../../assets/icons/ArrowDown';
import { useAppSelector } from '../../../../../app/hooks';
import { Capitalize } from '../../../../../utils/NoCapWords/Capitalize';
import { Dialog, Transition } from '@headlessui/react';
import { useAbsolute } from '../../../../../hooks/useAbsolute';
import DropdownOptions from './Dropdown/Dropdown';
import TextOptions from './Texts/Text';
import DateOptions from './Date/Date';
import CurrencyOptions from './Currency/Currency';
import NumberOptions from './Number/Number';
import EmailOptions from './Email/Email';
import WebsiteOptions from './Websites/WebsiteOptions';
import PhoneOptions from './Phone/PhoneOptions';
import CheckBoxOptions from './Checkbox/CheckboxOptions';
import RatingOption from './Rating/RatingOptions';
import { VerticalScroll } from '../../../../ScrollableContainer/VerticalScroll';
import ProgressOptions from './Progress/Progress';
import TimeOption from './Time/TimeOptions';
import FilesOptions from './Files/FileOption';
import PeopleOptions from './People/PeopleOptions';
import LocationOptions from './Location/LocationOptions';

const columnTypes = [
  {
    id: 'Dropdown',
    title: 'Dropdown',
    options: <DropdownOptions />
  },
  {
    id: 'Text',
    title: 'Text',
    options: <TextOptions />
  },
  {
    id: 'Date',
    title: 'Date',
    options: <DateOptions />
  },
  {
    id: 'Currency',
    title: 'Currency',
    options: <CurrencyOptions />
  },
  {
    id: 'Number',
    title: 'Number',
    options: <NumberOptions />
  },
  {
    id: 'Email',
    title: 'Email',
    options: <EmailOptions />
  },
  {
    id: 'Website',
    title: 'Website',
    options: <WebsiteOptions />
  },
  {
    id: 'Phone',
    title: 'Phone',
    options: <PhoneOptions />
  },
  {
    id: 'Checkbox',
    title: 'Checkbox',
    options: <CheckBoxOptions />
  },
  {
    id: 'Rating',
    title: 'Rating',
    options: <RatingOption />
  },
  {
    id: 'Progress',
    title: 'Progress',
    options: <ProgressOptions />
  },
  {
    id: 'Time',
    title: 'Time',
    options: <TimeOption />
  },
  {
    id: 'Files',
    title: 'Files',
    options: <FilesOptions />
  },
  {
    id: 'People',
    title: 'People',
    options: <PeopleOptions />
  },
  {
    id: 'Location',
    title: 'location',
    options: <LocationOptions />
  }
];

export default function ColumnTypeDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeModal = () => setIsOpen(false);
  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);

  const onClickOpenDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const { updateCords } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, 372);

  return (
    <div>
      <div ref={relativeRef}>
        <button
          onClick={onClickOpenDropdown}
          className="bg-white flex gap-4 items-center justify-between cursor-pointer w-full px-2"
          style={{ height: '30px', borderRadius: '6px' }}
        >
          <p className="text-black text-alsoit-gray-300-md font-semibold">
            {Capitalize(newCustomPropertyDetails.type)}
          </p>
          <ArrowDown />
        </button>
      </div>
      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <div style={{ ...cords }} className="fixed">
            <div
              className="flex-col bg-white h-fit py-1 outline-none flex items-start text-left mt-2 rounded-md shadow-lg focus:outline-none"
              style={{ ...cords, width: '174px' }}
            >
              <p className="text-alsoit-text-sm font-bold flex justify-center pt-3 w-full">CUSTOM PROPERTY</p>
              <div className="relative flex justify-center mt-2 w-full">
                <hr className="bg-gray-300 h-0.5 w-full relative" />
                <span className="text-alsoit-text-sm font-bold text-gray-400 text-center absolute -top-1 px-1 bg-white">
                  SELECT PROPERTY
                </span>
              </div>
              <VerticalScroll>
                <div className="w-full mt-2 overflow-visible" style={{ maxHeight: '300px', maxWidth: '174px' }}>
                  {columnTypes.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="hover:bg-alsoit-gray-50 cursor-pointer h-10 w-full flex justify-between items-center"
                      >
                        <MenuItem className="w-full">{item.options}</MenuItem>
                      </div>
                    );
                  })}
                </div>
              </VerticalScroll>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
