import { Outlet } from 'react-router-dom';
import Page from '../../components/Page';
import { ExtendedBar } from '../calendar/ui/ExtendedBar/ExtendedBar';
import Header from '../calendar/ui/Header';
import CreateDayOffModal from '../calendar/ui/CreateDayOffModal';
import AlsoHrIcon from '../../assets/icons/AlsoHrIcon';

function AlsoHr() {
  return (
    <Page header={<Header />} extendedBar={{ children: <ExtendedBar />, name: 'Also HR', icon: <AlsoHrIcon /> }}>
      <div className="w-full h-full overflow-y-scroll">
        <Outlet />
      </div>

      <CreateDayOffModal />
    </Page>
  );
}

export default AlsoHr;
