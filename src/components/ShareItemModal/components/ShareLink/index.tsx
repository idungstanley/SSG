import React, { useEffect, useState } from 'react';
import { useGetShareLink } from '../../../../features/shared/sharedService';
import AddFolderToLink from './components/AddFolderToLink';
import FoldersFromLink from './components/FoldersFromLink';
import AddFileToLink from './components/AddFileToLink';
import FilesFromLink from './components/FilesFromLink';
import Publish from './components/Publish';
import { Spinner } from '../../../../common';

export default function ShareLink() {
  const [shareLinkId, setShareLinkId] = useState<string | null>(null);

  const { data, status } = useGetShareLink(shareLinkId);

  useEffect(() => {
    if (!shareLinkId && data?.id) {
      setShareLinkId(data.id);
    }
  }, [data]);

  return (
    <div className="w-full">
      {status === 'loading' ? (
        <div className="mx-auto w-6 mt-5 justify-center">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : null}

      {shareLinkId ? (
        <>
          {/* search folder to add to link */}
          <AddFolderToLink shareLinkId={shareLinkId} />

          {/* list of selected folder */}
          <FoldersFromLink shareLinkId={shareLinkId} />

          {/* search file to add to link */}
          <AddFileToLink shareLinkId={shareLinkId} />

          {/* list of selected file */}
          <FilesFromLink shareLinkId={shareLinkId} />

          {/* publish and copy link */}
          <Publish shareLinkId={shareLinkId} setShareLinkId={setShareLinkId} />
        </>
      ) : null}
    </div>
  );
}
