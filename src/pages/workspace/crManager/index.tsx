import { MdOutlineManageAccounts } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

export default function CrManager() {
  const { showSidebar } = useAppSelector((state) => state.account);
  return (
    <div>
      <PlaceItem label="CR MANAGER" id="10" icon={<MdOutlineManageAccounts className="w-4 h-4" />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>CR MANAGER</div>
    </div>
  );
}
