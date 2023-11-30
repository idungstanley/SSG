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
import ProgressOptions from './Progress/Progress';
import TimeOption from './Time/TimeOptions';
import FormulaOptions from './Formula/Formula';
import FilesOptions from './Files/FileOption';
import PeopleOptions from './People/PeopleOptions';
import LocationOptions from './Location/LocationOptions';
import { MdAccessTime, MdOutlineStarRate } from 'react-icons/md';
import DropdownIcon from '../../../../../assets/branding/DropdownIcon';
import Text from '../../../../../assets/branding/Text';
import CalendarIcon from '../../../../../assets/icons/CalendarIcon';
import { CiDollar } from 'react-icons/ci';
import Number from '../../../../../assets/branding/Number';
import Email from '../../../../../assets/branding/Email';
import { BiGlobe } from 'react-icons/bi';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { ImCheckboxChecked } from 'react-icons/im';
import { GiProgression } from 'react-icons/gi';
import { TbMathFunction } from 'react-icons/tb';
import { FaFileSignature } from 'react-icons/fa';
import AssigneeIcon from '../../../../../assets/icons/Assignee';
import { IoLocation } from 'react-icons/io5';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';

export interface columnTypesProps {
  id: string;
  title: string;
  options: JSX.Element;
  icon: JSX.Element;
  children: {
    id: string;
    name: string;
    icon?: JSX.Element;
    onclick?: () => void;
    type?: string;
  }[];
}

export const columnTypes: columnTypesProps[] = [
  {
    id: 'Dropdown',
    title: 'Dropdown',
    options: <DropdownOptions />,
    icon: <DropdownIcon />,
    children: [
      {
        id: 'single_label',
        name: 'Single Label',
        icon: <DropdownIcon />,
        onclick: () => null
      },
      {
        id: 'multi_label',
        name: 'Multi Label',
        icon: <DropdownIcon />,
        onclick: () => null
      },
      {
        id: 'tags',
        name: 'Tags',
        icon: <DropdownIcon />,
        onclick: () => null
      },
      {
        id: 'directories',
        name: 'Directories',
        icon: <DropdownIcon />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Text',
    title: 'Text',
    options: <TextOptions />,
    icon: <Text />,
    children: [
      {
        id: 'short_text',
        name: 'Short Text',
        onclick: () => null,
        icon: <Text />
      },
      {
        id: 'long_text',
        name: 'Long Text',
        onclick: () => null,
        icon: <Text />
      },
      {
        id: 'email',
        name: 'Email',
        onclick: () => null,
        icon: <Text />
      },
      {
        id: 'website',
        name: 'Website',
        onclick: () => null,
        icon: <Text />
      }
    ]
  },
  {
    id: 'Date',
    title: 'Date',
    options: <DateOptions />,
    icon: <CalendarIcon active={false} />,
    children: [
      {
        id: 'date',
        name: 'Date',
        onclick: () => null,
        icon: <CalendarIcon active={false} />
      }
    ]
  },
  {
    id: 'Currency',
    title: 'Currency',
    options: <CurrencyOptions />,
    icon: <CiDollar className="text-lg" />,
    children: [
      {
        id: 'currency',
        name: 'Currency',
        onclick: () => null,
        icon: <CiDollar className="text-lg" />
      }
    ]
  },
  {
    id: 'Number',
    title: 'Number',
    options: <NumberOptions />,
    icon: <Number />,
    children: [
      {
        id: 'number',
        name: 'Number',
        onclick: () => null,
        icon: <Number />
      }
    ]
  },
  {
    id: 'Email',
    title: 'Email',
    options: <EmailOptions />,
    icon: <Email />,
    children: [
      {
        id: 'email_options',
        name: 'Email',
        onclick: () => null,
        icon: <Email />
      }
    ]
  },
  {
    id: 'Website',
    title: 'Website',
    options: <WebsiteOptions />,
    icon: <BiGlobe />,
    children: [
      {
        id: 'website',
        name: 'Website',
        onclick: () => null,
        icon: <BiGlobe />
      }
    ]
  },
  {
    id: 'Phone',
    title: 'Phone',
    options: <PhoneOptions />,
    icon: <BsFillTelephoneOutboundFill />,
    children: [
      {
        id: 'phone',
        name: 'Phone',
        icon: <BsFillTelephoneOutboundFill />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Checkbox',
    title: 'Checkbox',
    options: <CheckBoxOptions />,
    icon: <ImCheckboxChecked />,
    children: [
      {
        id: 'checkbox',
        name: 'Checkbox',
        icon: <ImCheckboxChecked />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Rating',
    title: 'Rating',
    options: <RatingOption />,
    icon: <MdOutlineStarRate />,
    children: [
      {
        id: 'rating',
        name: 'Rating',
        icon: <MdOutlineStarRate />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Progress',
    title: 'Progress',
    options: <ProgressOptions />,
    icon: <GiProgression />,
    children: [
      {
        id: 'progress_auto',
        name: 'Progress(Auto)',
        icon: <GiProgression />,
        onclick: () => null,
        type: 'progress_auto'
      },
      {
        id: 'progress_manual',
        name: 'Progress(Manual)',
        icon: <GiProgression />,
        type: 'progress_manual',
        onclick: () => null
      }
    ]
  },
  {
    id: 'Time',
    title: 'Time',
    options: <TimeOption />,
    icon: <MdAccessTime />,
    children: [
      {
        id: 'time',
        name: 'Time',
        icon: <MdAccessTime />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Formula',
    title: 'Formula',
    options: <FormulaOptions />,
    icon: <TbMathFunction />,
    children: [
      {
        id: 'formula',
        name: 'Formula',
        icon: <TbMathFunction />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Files',
    title: 'Files',
    options: <FilesOptions />,
    icon: <FaFileSignature />,
    children: [
      {
        id: pilotTabs.ATTACHMENTS,
        name: 'Attachments',
        icon: <FaFileSignature />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'People',
    title: 'People',
    options: <PeopleOptions />,
    icon: <AssigneeIcon active={false} />,
    children: [
      {
        id: 'people',
        name: 'People',
        icon: <AssigneeIcon active={false} />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Location',
    title: 'location',
    options: <LocationOptions />,
    icon: <IoLocation />,
    children: [
      {
        id: 'location',
        name: 'Location',
        icon: <IoLocation />,
        onclick: () => null
      }
    ]
  }
];
