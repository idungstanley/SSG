import { DocumentTextIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import ChatForPilot from '../../../../../components/Chat/ChatForPilot';
import History from '../../../../../components/Pilot/components/History';
import WatchersForPilot from '../../../../../components/Watchers/WatchersForPilot';
import { setShowPilotSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import Details from '../../../../../components/Pilot/components/details/Details';
import TimeClock from '../../../hubs/components/PilotSection/components/TimeClock';
import Checklists from '../../../../../components/Pilot/components/Checklist/Checklist';
import { VscChecklist, VscScreenFull } from 'react-icons/vsc';
import RecordScreen from '../../../../../components/Pilot/components/RecordScreen';
import HubManager from '../../../../../components/Pilot/components/HubManager/HubManager';
import Templates from '../../../../../components/Pilot/components/Templates';
import TemplatesIcon from '../../../../../assets/icons/Templates';
import Calendar from '../../../../../components/Pilot/components/Calendar';
import CalendarIcon from '../../../../../assets/icons/CalendarIcon';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { ClockIcon } from '../../../../../assets/icons/ClockIcon';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';
import PilotViewIcon from '../../../../../assets/icons/PilotViewIcon';
import Views from '../../../../../components/Pilot/components/Views/Index';
import Automations from '../../../hubs/components/PilotSection/components/Automations';
import Library from '../../../hubs/components/PilotSection/components/Library';
import DeepLinks from '../../../hubs/components/PilotSection/components/DeepLinks';
import Forms from '../../../hubs/components/PilotSection/components/Forms';
import AutomationIcon from '../../../../../assets/icons/AutomationIcon';
import LibraryIcon from '../../../../../assets/icons/LibraryIcon';
import DeepLinksIcon from '../../../../../assets/icons/DeepLinksIcon';
import FormsPilotIcon from '../../../../../assets/icons/FormsPilotIcon';
import TicketsPilotIcon from '../../../../../assets/icons/TicketsPilotIcon';
import Tickets from '../../../hubs/components/PilotSection/components/Tickets';
import PilotDetailsIcon from '../../../../../assets/icons/PilotDetailsIcon';
import PilotConnectIcon from '../../../../../assets/icons/PilotConnectIcon';
import PilotActivityIcon from '../../../../../assets/icons/PilotActivityIcon';
import PilotUtilityIcon from '../../../../../assets/icons/PilotUtilityIcon';
import PilotDeepLinksIcon from '../../../../../assets/icons/PilotDeepLinksIcon';
import PilotEntityManagerIcon from '../../../../../assets/icons/PilotEntityManagerIcon';
import PilotEfficiencyIcon from '../../../../../assets/icons/PilotEfficiencyIcon';
import Activity from '../../../hubs/components/PilotSection/components/Activity';
import Ties from '../../../hubs/components/PilotSection/components/Ties';
import Efficiency from '../../../hubs/components/PilotSection/components/Efficiency';

const sections = [
  {
    id: pilotTabs.DETAILS,
    element: <Details />
  },
  {
    id: pilotTabs.LOGS,
    element: <History />
  },
  {
    id: pilotTabs.WATCHERS,
    element: <WatchersForPilot />
  },
  {
    id: pilotTabs.CONNECT,
    element: <ChatForPilot />
  },
  {
    id: pilotTabs.TIME_CLOCK,
    element: <TimeClock />
  },
  {
    id: pilotTabs.CHECKLISTS,
    element: <Checklists />
  },
  {
    id: pilotTabs.SCREEN_RECORD,
    element: <RecordScreen />
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
    id: pilotTabs.ACTIVITY,
    element: <Activity />
  },
  {
    id: pilotTabs.UTILITIES,
    element: <TimeClock />
  },
  {
    id: pilotTabs.TIES,
    element: <Ties />
  },
  {
    id: pilotTabs.EFFICIENCY,
    element: <Efficiency />
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
    id: pilotTabs.LOGS,
    label: 'Logs',
    icon: <DocumentTextIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.WATCHERS,
    label: 'Watchers',
    icon: <EyeIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.TIME_CLOCK,
    label: 'Time clock',
    icon: <ClockIcon />
  },
  {
    id: pilotTabs.CHECKLISTS,
    label: 'Checklists',
    icon: <VscChecklist className="w-4 h-4" />
  },
  {
    id: pilotTabs.SCREEN_RECORD,
    label: 'Screen Record',
    icon: <VscScreenFull className="w-4 h-4" />
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
  const { walletId } = useParams();

  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { show } = pilotSideOver;

  // set data for pilot
  useEffect(() => {
    const selectedItemId = walletId;
    const selectedItemType = EntityType.wallet;

    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: selectedItemType,
          show: show,
          title: activeItemName ?? ''
        })
      );
    }
  }, [walletId, activeItemName]);

  return null;
}
