import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import LibraryIcon from '../../../../../../../assets/icons/LibraryIcon';
import LibraryTabs from './subtabs/LibraryTabs';

export default function Library() {
  return (
    <>
      <SectionArea label="Library" icon={<LibraryIcon />} />
      <LibraryTabs />
    </>
  );
}
