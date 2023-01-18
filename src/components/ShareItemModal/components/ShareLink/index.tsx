import React, { useEffect, useState } from 'react';
import { useGetShareLink } from '../../../../features/shared/sharedService';
import AddFolderToLink from './components/AddFolderToLink';
import FoldersFromLink from './components/FoldersFromLink';
import AddFileToLink from './components/AddFileToLink';
import FilesFromLink from './components/FilesFromLink';
import Publish from './components/Publish';

export default function ShareLink() {
  const [shareLinkId, setShareLinkId] = useState<string | null>(null);

  const { data } = useGetShareLink(shareLinkId);

  useEffect(() => {
    if (!shareLinkId && data?.id) {
      setShareLinkId(data.id);
    }
  }, [data]);

  return (
    <div className="w-full">
      {shareLinkId ? (
        <>
          {/* search folder to add to link */}
          <AddFolderToLink shareLinkId={shareLinkId} />

          {/* list of selected folder */}
          <FoldersFromLink shareLinkId={shareLinkId} />

          {/* search file to add to link */}
          <AddFileToLink shareLinkId={shareLinkId} />

          {/* list of selected folder */}
          <FilesFromLink shareLinkId={shareLinkId} />

          {/* publish and copy link */}
          <Publish shareLinkId={shareLinkId} setShareLinkId={setShareLinkId} />
        </>
      ) : null}
    </div>
  );
}
