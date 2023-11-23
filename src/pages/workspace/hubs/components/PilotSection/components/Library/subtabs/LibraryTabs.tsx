import { useAppSelector } from '../../../../../../../../app/hooks';
import LibrarySubTabs from './LibrarySubTabs';

export default function LibraryTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <LibrarySubTabs />}</section>;
}
