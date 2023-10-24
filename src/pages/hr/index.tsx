import Page from '../../components/Page';
import Header from './ui/Header';
import { Outlet } from 'react-router-dom';

function AlsoHr() {
  return (
    <Page header={<Header />}>
      <div className="w-full h-full overflow-y-scroll">
        <Outlet />
      </div>
    </Page>
  );
}

export default AlsoHr;
