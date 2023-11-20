import Page from '../../components/Page';
import { Outlet } from 'react-router-dom';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import HrNav from '../workspace/hr/hrNav';

function AlsoHr() {
  return (
    <Page header={<AdditionalHeader />}>
      <HrNav />
      <div className="w-full h-full overflow-y-scroll">
        <Outlet />
      </div>
    </Page>
  );
}

export default AlsoHr;
