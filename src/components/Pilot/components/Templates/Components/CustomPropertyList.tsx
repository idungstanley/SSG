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
import {
  MdAccessTime,
  MdAlternateEmail,
  MdOutlineAttachEmail,
  MdOutlinePeopleAlt,
  MdOutlineStarRate,
  MdTextFields
} from 'react-icons/md';
import Text from '../../../../../assets/branding/Text';
import { CiCalendarDate, CiDollar, CiHashtag } from 'react-icons/ci';
import { BiGlobe, BiLabel, BiSolidCaretDownSquare } from 'react-icons/bi';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { ImCheckboxChecked } from 'react-icons/im';
import { GiProgression } from 'react-icons/gi';
import { TbMathFunction } from 'react-icons/tb';
import { FaFileSignature, FaPeopleArrows } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';
import { RxCalendar } from 'react-icons/rx';
import { GoNumber } from 'react-icons/go';

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
  active: boolean;
}

export const columnTypes: columnTypesProps[] = [
  {
    id: 'Dropdown',
    title: 'Dropdown',
    options: <DropdownOptions />,
    icon: <BiSolidCaretDownSquare />,
    active: true,
    children: [
      {
        id: 'single_label',
        name: 'Single Label',
        icon: <BiLabel />,
        onclick: () => null
      },
      {
        id: 'multi_label',
        name: 'Multi Label',
        icon: <BiSolidCaretDownSquare />,
        onclick: () => null
      },
      {
        id: 'tags',
        name: 'Tags',
        icon: <BiSolidCaretDownSquare />,
        onclick: () => null
      },
      {
        id: 'directories',
        name: 'Directories',
        icon: <BiSolidCaretDownSquare />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Text',
    title: 'Text',
    active: true,
    options: <TextOptions />,
    icon: <MdTextFields />,
    children: [
      {
        id: 'short_text',
        name: 'Short Text',
        onclick: () => null,
        icon: <GoNumber />
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
    active: true,
    options: <DateOptions />,
    icon: <RxCalendar />,
    children: [
      {
        id: 'date',
        name: 'Date',
        onclick: () => null,
        icon: <CiCalendarDate />
      }
    ]
  },
  {
    id: 'Currency',
    title: 'Currency',
    active: true,
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
    active: true,
    options: <NumberOptions />,
    icon: <CiHashtag />,
    children: [
      {
        id: 'number',
        name: 'Number',
        onclick: () => null,
        icon: <GoNumber />
      }
    ]
  },
  {
    id: 'Email',
    title: 'Email',
    active: true,
    options: <EmailOptions />,
    icon: <MdAlternateEmail />,
    children: [
      {
        id: 'email_options',
        name: 'Email',
        onclick: () => null,
        icon: <MdOutlineAttachEmail />
      }
    ]
  },
  {
    id: 'Website',
    title: 'Website',
    active: true,
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
    active: true,
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
    active: true,
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
    active: true,

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
    active: true,

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
    active: true,

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
    active: false,
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
    active: false,
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
    active: false,
    options: <PeopleOptions />,
    icon: <MdOutlinePeopleAlt />,
    children: [
      {
        id: 'people',
        name: 'People',
        icon: <FaPeopleArrows />,
        onclick: () => null
      }
    ]
  },
  {
    id: 'Location',
    title: 'location',
    active: false,
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
