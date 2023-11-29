import { DocumentTextIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import WatchersForPilot from '../../../../../components/Watchers/WatchersForPilot';
import { setShowPilotSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import Details from '../../../../../components/Pilot/components/details/Details';
import TimeClock from './components/TimeClock';
import HubManager from '../../../../../components/Pilot/components/HubManager/HubManager';
import TemplatesIcon from '../../../../../assets/icons/Templates';
import Templates from '../../../../../components/Pilot/components/Templates';
import Calendar from '../../../../../components/Pilot/components/Calendar';
import CalendarIcon from '../../../../../assets/icons/CalendarIcon';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';
import Views from '../../../../../components/Pilot/components/Views/Index';
import PilotViewIcon from '../../../../../assets/icons/PilotViewIcon';
import Commnunication from '../../../pilot/components/communication/Communication';
import Logs from '../../../../../components/Pilot/components/Logs/Logs';
import AutomationIcon from '../../../../../assets/icons/AutomationIcon';
import Automations from './components/Automations';
import LibraryIcon from '../../../../../assets/icons/LibraryIcon';
import Library from './components/Library';
import DeepLinksIcon from '../../../../../assets/icons/DeepLinksIcon';
import FormsPilotIcon from '../../../../../assets/icons/FormsPilotIcon';
import TicketsPilotIcon from '../../../../../assets/icons/TicketsPilotIcon';
import DeepLinks from './components/DeepLinks';
import Forms from './components/Forms';
import Tickets from './components/Tickets';
import PilotDetailsIcon from '../../../../../assets/icons/PilotDetailsIcon';
import PilotConnectIcon from '../../../../../assets/icons/PilotConnectIcon';
import PilotUtilityIcon from '../../../../../assets/icons/PilotUtilityIcon';
import PilotActivityIcon from '../../../../../assets/icons/PilotActivityIcon';
import PilotDeepLinksIcon from '../../../../../assets/icons/PilotDeepLinksIcon';
import PilotEntityManagerIcon from '../../../../../assets/icons/PilotEntityManagerIcon';
import PilotEfficiencyIcon from '../../../../../assets/icons/PilotEfficiencyIcon';

const sections = [
  {
    id: pilotTabs.DETAILS,
    element: <Details />
  },
  {
    id: pilotTabs.LOGS,
    element: <Logs />
  },
  {
    id: pilotTabs.WATCHERS,
    element: <WatchersForPilot />
  },
  {
    id: pilotTabs.CONNECT,
    element: <Commnunication />
  },
  {
    id: pilotTabs.UTILITIES,
    element: <TimeClock />
  },
  {
    id: pilotTabs.ENTITY_MANAGER,
    element: <HubManager />
  },
  {
    id: pilotTabs.VIEWS,
    element: <Views />
  },
  {
    id: pilotTabs.TEMPLATES,
    element: <Templates />
  },
  {
    id: pilotTabs.CALENDAR,
    element: <Calendar />
  },
  {
    id: pilotTabs.AUTOMATIONS,
    element: <Automations />
  },
  {
    id: pilotTabs.LIBRARY,
    element: <Library />
  },
  {
    id: pilotTabs.DEEP_LINKS,
    element: <DeepLinks />
  },
  {
    id: pilotTabs.FORMS,
    element: <Forms />
  },
  {
    id: pilotTabs.TICKETS,
    element: <Tickets />
  },
  {
    id: pilotTabs.EFFICIENCY,
    element: <Tickets />
  }
];

const tabs = [
  {
    id: pilotTabs.DETAILS,
    label: 'Details',
    icon: <PilotDetailsIcon active={false} />
  },
  {
    id: pilotTabs.CONNECT,
    label: 'Connect',
    icon: <PilotConnectIcon active={false} />
  },
  {
    id: pilotTabs.ACTIVITY,
    label: 'Activity',
    icon: <PilotActivityIcon active={false} />
  },
  {
    id: pilotTabs.UTILITIES,
    label: 'Utilities',
    icon: <PilotUtilityIcon active={false} />
  },
  {
    id: pilotTabs.TIES,
    label: 'Ties',
    icon: <PilotDeepLinksIcon active={false} />
  },
  {
    id: pilotTabs.ENTITY_MANAGER,
    label: 'Entity Manager',
    icon: <PilotEntityManagerIcon active={false} />
  },
  {
    id: pilotTabs.VIEWS,
    label: 'Views',
    icon: <PilotViewIcon />
  },
  {
    id: pilotTabs.EFFICIENCY,
    label: 'Efficiency',
    icon: <PilotEfficiencyIcon active={false} />
  },
  {
    id: pilotTabs.WATCHERS,
    label: 'Watchers',
    icon: <EyeIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.TEMPLATES,
    label: 'Templates',
    icon: <TemplatesIcon />
  },
  {
    id: pilotTabs.CALENDAR,
    label: 'Calendar',
    icon: <CalendarIcon active={false} />
  },
  {
    id: pilotTabs.AUTOMATIONS,
    label: 'Automations',
    icon: <AutomationIcon />
  },
  {
    id: pilotTabs.LOGS,
    label: 'Logs',
    icon: <DocumentTextIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.LIBRARY,
    label: 'Library',
    icon: <LibraryIcon />
  },
  {
    id: pilotTabs.DEEP_LINKS,
    label: 'Deep links',
    icon: <DeepLinksIcon />
  },
  {
    id: pilotTabs.FORMS,
    label: 'Forms',
    icon: <FormsPilotIcon />
  },
  {
    id: pilotTabs.TICKETS,
    label: 'Tickets',
    icon: <TicketsPilotIcon />
  }
];

export const pilotConfig = { sections, tabs };

export default function PilotSection() {
  const dispatch = useAppDispatch();

  const { hubId } = useParams();
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { show } = pilotSideOver;

  // set data for pilot
  useEffect(() => {
    const selectedItemId = hubId;
    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: EntityType.hub,
          show: show,
          title: activeItemName ?? ''
        })
      );
    }
  }, [hubId, activeItemName]);

  return null;
}
