import React from 'react';
// import { useAppSelector } from '../../../../../../../../../app/hooks';
// import { FileIcon, PathBadge } from '../../../../../../../../../common';
// import { useGetInboxFile } from '../../../../../../../../../features/inbox/inboxService';

function AlsoSavedIn() {
  // const { selectedInboxFileId } = useAppSelector((state) => state.inbox);
  // const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  // const selectedInboxFileFullDetails = {
  //   inbox_file: {
  //     also_saved_in_files: [],
  //   },
  // };

  // return inboxFile ? (
  //   <div>
  //     <h3 className="font-medium text-gray-900">Already saved in</h3>
  //     <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
  //       {selectedInboxFileFullDetails.inbox_file.also_saved_in_files.map(
  //         (alsoSavedInFile) => (
  //           <li
  //             key={alsoSavedInFile.id}
  //             className="py-3 flex justify-between items-center"
  //           >
  //             <div className="flex items-center space-x-4">
  //               <div className="flex-shrink-0">
  //                 <FileIcon
  //                   iconName={inboxFile.inbox_file.file_format.icon_name}
  //                   size={8}
  //                 />
  //               </div>
  //               <div className="flex-1 min-w-0">
  //                 <PathBadge folder={alsoSavedInFile.folder} />
  //                 <p className="text-xs text-gray-500 mt-1 truncate">{`Saved as "${alsoSavedInFile.display_name}"`}</p>
  //               </div>
  //             </div>
  //             <button
  //               type="button"
  //               className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //             >
  //               View
  //               <span className="sr-only">
  //                 {' '}
  //                 <span className="px-2 inline-flex mr-1 text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
  //                   {alsoSavedInFile.display_name}
  //                 </span>
  //               </span>
  //             </button>
  //           </li>
  //         )
  //       )}
  //     </ul>
  //   </div>
  // ) : null;
  return <></>;
}

export default AlsoSavedIn;
