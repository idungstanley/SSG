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
  MdOutlineStarRate
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
import { GoNumber } from 'react-icons/go';
import MapIcon from '../../../../../assets/icons/MapIcon';
import FormulaIcon from '../../../../../assets/icons/propertyIcons/FormulaIcon';
import RatingIcon from '../../../../../assets/icons/propertyIcons/RatingIcon';
import CurrencyIcon from '../../../../../assets/icons/propertyIcons/CurrencyIcon';
import CalendarIcon from '../../../../../assets/icons/propertyIcons/CalendarIcon';
import NestedTextIcon from '../../../../../assets/icons/propertyIcons/NestedTextIcon';
import ProgressBarIcon from '../../../../../assets/icons/propertyIcons/ProgressBarIcon';
import BooleanIcon from '../../../../../assets/icons/propertyIcons/BooleanIcon';
import LabelIcon from '../../../../../assets/icons/propertyIcons/LabelIcon';
import AttachmentIcon from '../../../../../assets/icons/propertyIcons/AttachmentIcon';
import IdGeneratorIcon from '../../../../../assets/icons/propertyIcons/IdGeneratorIcon';
import ContactIcon from '../../../../../assets/icons/propertyIcons/ContactIcon';
import AvatarWithInitials from '../../../../avatar/AvatarWithInitials';
import IntegrationIcon from '../../../../../assets/icons/propertyIcons/IntegrationIcon';
import LocationIcon from '../../../../../assets/icons/propertyIcons/LocationIcon';
import AltRouteIcon from '../../../../../assets/icons/propertyIcons/AltRouteIcon';

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

import React from 'react';

export default function CustomPropertyList(color?: string) {
  const columnTypes: columnTypesProps[] = [
    {
      id: 'Map',
      title: 'Map',
      options: <LocationOptions />,
      icon: <MapIcon color={color} />,
      active: true,
      children: [
        {
          id: 'What3Words',
          name: 'What3Words',
          icon: <IntegrationIcon color={color} />,
          onclick: () => null
        },
        {
          id: 'Location',
          name: 'Location',
          icon: <LocationIcon />,
          onclick: () => null
        },
        {
          id: 'Routes',
          name: 'Routes',
          icon: <AltRouteIcon />,
          onclick: () => null
        }
      ]
    },
    {
      id: 'Community',
      title: 'Cummunity',
      active: true,
      options: <DateOptions />,
      icon: (
        <AvatarWithInitials initials="SH" backgroundColour="#3075DD" roundedStyle="rounded" height="h-5" width="w-5" />
      ),
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
      id: 'Dropdown',
      title: 'Dropdown',
      options: <DropdownOptions />,
      icon: <BiSolidCaretDownSquare />,
      active: false,
      children: [
        {
          id: 'single_label',
          name: 'Single Label',
          icon: <BiLabel />,
          onclick: () => null
        },
        {
          id: 'Location',
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
      id: 'Progress',
      title: 'Progress',
      active: true,
      options: <ProgressOptions />,
      icon: <ProgressBarIcon color={color} />,
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
      id: 'Text',
      title: 'Text',
      active: true,
      options: <TextOptions />,
      icon: <NestedTextIcon color={color} />,
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
      id: 'Boolean',
      title: 'Boolean',
      active: true,
      options: <DateOptions />,
      icon: <BooleanIcon color={color} />,
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
      id: 'Labels',
      title: 'Labels',
      active: true,
      options: <DateOptions />,
      icon: <LabelIcon color={color} />,
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
      id: 'Formula',
      title: 'Formula',
      active: false,
      options: <FormulaOptions />,
      icon: <FormulaIcon color={color} />,
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
      id: 'Attachments',
      title: 'Attachments',
      active: false,
      options: <FormulaOptions />,
      icon: <AttachmentIcon color={color} />,
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
      id: 'ID_Generator',
      title: 'ID Generator',
      active: false,
      options: <FormulaOptions />,
      icon: <IdGeneratorIcon color={color} />,
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
      id: 'Date',
      title: 'Date',
      active: true,
      options: <DateOptions />,
      icon: <CalendarIcon color={color} />,
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
      id: 'Rating',
      active: true,

      title: 'Rating',
      options: <RatingOption />,
      icon: <RatingIcon color={color} />,
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
      id: 'Currency',
      title: 'Currency',
      active: true,
      options: <CurrencyOptions />,
      icon: <CurrencyIcon color={color} />,
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
      id: 'Contacts',
      active: true,
      title: 'Contacts',
      options: <RatingOption />,
      icon: <ContactIcon color={color} />,
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
      id: 'Number',
      title: 'Number',
      active: false,
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
      active: false,
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
      active: false,
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
      active: false,
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
      active: false,
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
      id: 'Time',
      title: 'Time',
      active: false,

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
  return { columnTypes };
}
