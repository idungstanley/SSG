import { TfiTicket } from 'react-icons/tfi';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

export default function Tickets() {
  const { showSidebar } = useAppSelector((state) => state.account);
  return (
    <div>
      <PlaceItem label="TICKETS" id="9" icon={<TfiTicket className="w-4 h-4" />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>TICKETS</div>
    </div>
  );
}
