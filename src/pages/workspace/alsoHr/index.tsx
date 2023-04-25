import { FaHandsHelping } from 'react-icons/fa';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

export default function AlsoHr() {
  const { showSidebar } = useAppSelector((state) => state.account);
  return (
    <div>
      <PlaceItem label="ALSO HR" id="9" icon={<FaHandsHelping className="w-4 h-4" />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>ALSO HR</div>
    </div>
  );
}
