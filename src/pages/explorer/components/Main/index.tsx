import { useAppSelector } from '../../../../app/hooks';
import { cl } from '../../../../utils';
import FilePreview from './components/FilePreview';
import FilesListWithToolbar from './components/FilesListWithToolbar';

export default function Main() {
  const { fastPreview } = useAppSelector((state) => state.explorer);
  const { settings } = useAppSelector((state) => state.account);

  const { showPreview } = settings;

  // show only if preview toggle or fast preview is enabled
  const showFilePreview = showPreview || fastPreview.show;
  return (
    <div className={cl('border-t h-full w-full grid', showFilePreview ? 'grid-cols-2' : 'grid-cols-1')}>
      <FilesListWithToolbar />

      {/* file preview */}
      {showFilePreview ? <FilePreview /> : null}
    </div>
  );
}
