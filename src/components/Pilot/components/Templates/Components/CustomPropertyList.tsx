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
import { MdAccessTime, MdAlternateEmail, MdOutlineAttachEmail, MdOutlinePeopleAlt } from 'react-icons/md';
import { CiCalendarDate, CiDollar, CiHashtag } from 'react-icons/ci';
import { BiGlobe, BiLabel, BiSolidCaretDownSquare } from 'react-icons/bi';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { ImCheckboxChecked } from 'react-icons/im';
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
import AutoprogressIcon from '../../../../../assets/icons/propertyIcons/AutoprogressIcon';
import ShortTextIcon from '../../../../../assets/icons/propertyIcons/ShortTextIcon';
import LongTextIcon from '../../../../../assets/icons/propertyIcons/LongTextIcon';
import DotIcon from '../../../../../assets/icons/propertyIcons/DotIcon';
import FilesUploadedIcon from '../../../../../assets/icons/propertyIcons/FilesUploadedIcon';
import Docs from '../../../../../assets/icons/propertyIcons/Docs';
import CheckBoxIcon from '../../../../../assets/icons/propertyIcons/CheckBoxIcon';
import ToggleIcon from '../../../../../assets/icons/propertyIcons/ToggleIcon';
import AbOptionIcon from '../../../../../assets/icons/propertyIcons/AbOptionIcon';
import PercentageIcon from '../../../../../assets/icons/propertyIcons/PercentageIcon';
import NumbersIcon from '../../../../../assets/icons/propertyIcons/NumbersIcon';
import CallIcon from '../../../../../assets/icons/propertyIcons/CallIcon';
import EmailIcon from '../../../../../assets/icons/propertyIcons/EmailIcon';
import DirectoryIcon from '../../../../../assets/icons/propertyIcons/DirectoryIcon';
import AlsoitIcon from '../../../../../assets/icons/AlsoitIcon';

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
          icon: <LocationIcon color={color} />,
          onclick: () => null
        },
        {
          id: 'Routes',
          name: 'Routes',
          icon: <AltRouteIcon color={color} />,
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
          id: 'Workspace',
          name: 'Workspace',
          onclick: () => null,
          icon: <AlsoitIcon dimensions={{ width: 12, height: 12 }} />
        },
        {
          id: 'Neighbours',
          name: 'Neighbours',
          onclick: () => null,
          icon: <DotIcon />
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
          name: 'Auto',
          icon: <AutoprogressIcon />,
          onclick: () => null,
          type: 'progress_auto'
        },
        {
          id: 'progress_manual',
          name: 'Manual',
          icon: <ProgressBarIcon color={color} />,
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
          icon: <ShortTextIcon color={color} />
        },
        {
          id: 'long_text',
          name: 'Long Text',
          onclick: () => null,
          icon: <LongTextIcon color={color} />
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
          id: 'Checkbox',
          name: 'Checkbox',
          onclick: () => null,
          icon: <CheckBoxIcon color={color} />
        },
        {
          id: 'Toggle',
          name: 'Toggle',
          onclick: () => null,
          icon: <ToggleIcon color={color} />
        },
        {
          id: 'A_b_option',
          name: 'A/B Option',
          onclick: () => null,
          icon: <AbOptionIcon color={color} />
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
          id: 'directory',
          name: 'Directory',
          onclick: () => null,
          icon: <DirectoryIcon color={color} />
        },
        {
          id: 'Text',
          name: 'Text',
          onclick: () => null,
          icon: <ShortTextIcon color={color} />
        },
        {
          id: 'single_label',
          name: 'Single Label',
          onclick: () => null,
          icon: <NestedTextIcon color={color} />
        },
        {
          id: 'Shapes',
          name: 'Shapes',
          onclick: () => null,
          icon: <DotIcon color={color} />
        },
        {
          id: 'Images',
          name: 'Images',
          onclick: () => null,
          icon: <DotIcon color={color} />
        },
        {
          id: 'Avatar',
          name: 'Avatar',
          onclick: () => null,
          icon: <DotIcon color={color} />
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
          id: 'workspace_files',
          name: 'Workspace Files',
          icon: <Docs color={color} />,
          onclick: () => null
        },
        {
          id: 'uploaded_files',
          name: 'Uploaded Files',
          icon: <FilesUploadedIcon color={color} />,
          onclick: () => null
        }
      ]
    },
    {
      id: 'ID_Generator',
      title: 'ID Generator',
      active: true,
      options: <FormulaOptions />,
      icon: <IdGeneratorIcon color={color} />,
      children: [
        {
          id: 'GSI_integration',
          name: 'GSI Integration',
          icon: <DotIcon color={color} />,
          onclick: () => null
        },
        {
          id: 'Auto_id',
          name: 'Auto ID',
          icon: <DotIcon color={color} />,
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
          id: 'Date',
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
          id: 'Economic',
          name: 'Economic',
          icon: <DotIcon color={color} />,
          onclick: () => null
        },
        {
          id: 'Percentage',
          name: 'Percentage',
          icon: <PercentageIcon color={color} />,
          onclick: () => null
        },
        {
          id: 'Numbers',
          name: 'Numbers',
          icon: <NumbersIcon color={color} />,
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
          id: 'Phone Number',
          name: 'Phone Number',
          icon: <CallIcon color={color} />,
          onclick: () => null
        },
        {
          id: 'Email',
          name: 'Email',
          icon: <EmailIcon color={color} />,
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
