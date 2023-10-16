import Page from '../../components/Page';
import { ExtendedBar } from '../calendar/ui/ExtendedBar/ExtendedBar';
import ManageHr from './pages/ManageHr';
import AlsoHrIcon from '../../assets/icons/AlsoHrIcon';
import Header from './ui/Header';

function AlsoHr() {
  return (
    <Page header={<Header />} extendedBar={{ children: <ExtendedBar />, name: 'Also HR', icon: <AlsoHrIcon /> }}>
      <div className="w-full h-full overflow-y-scroll">
        <ManageHr />
      </div>
    </Page>
  );
}

export default AlsoHr;
