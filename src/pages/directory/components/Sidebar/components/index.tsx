import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { AiOutlineBranches } from 'react-icons/ai';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDirectories } from '../../../../../features/directory/directoryService';
import { classNames } from '../../../../../utils';

interface IDir {
  name: string;
  id: string;
  parent_id: string | null;
  children: IDir[];
}

function updateNestedArray(
  array: IDir[],
  updateFn: (i: IDir) => IDir,
  idToUpdate?: string
) {
  return !idToUpdate
    ? array
    : array.map((item) => {
        if (item.id === idToUpdate) {
          return updateFn(item);
        } else if (item.children) {
          return {
            ...item,
            children: updateNestedArray(item.children, updateFn, idToUpdate),
          };
        }
        return item;
      });
}

function arrayToTree(array: IDir[]) {
  const nodes: Record<string, IDir> = {};

  array.forEach((node) => {
    nodes[node.id] = node;
  });

  const tree: IDir[] = [];

  Object.values(nodes).forEach((node) => {
    if (node.parent_id === null) {
      tree.push(node);
    } else {
      nodes[node.parent_id].children.push(node);
    }
  });
  return tree;
}

export default function DirectoryList() {
  const { directoryId } = useParams();

  const [directories, setDirectories] = useState<IDir[]>([]);

  const isSavedIdFromURL = !directories.length && !!directoryId;

  const { data } = useGetDirectories(directoryId, isSavedIdFromURL);

  useEffect(() => {
    if (data) {
      const stringifiedData = data.map((i) => ({
        id: i.id,
        name: i.name,
        parent_id: i.parent_id,
        children: [],
      }));

      if (isSavedIdFromURL) {
        setDirectories([...arrayToTree(stringifiedData)]);
      } else {
        setDirectories((oldData) =>
          oldData.length
            ? updateNestedArray(
                oldData,
                (item) => ({
                  ...item,
                  children: stringifiedData,
                }),
                directoryId
              )
            : stringifiedData
        );
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col mb-2">
      <Directories directories={directories} leftMargin={false} />
    </div>
  );
}

interface DirectoriesProps {
  directories: IDir[];
  leftMargin: boolean;
}

function Directories({ directories, leftMargin }: DirectoriesProps) {
  return (
    <>
      {directories.map((directory) => (
        <div key={directory.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <DirectoryItem id={directory.id} name={directory.name} />

          {directory.children.length ? (
            <Directories directories={directory.children} leftMargin />
          ) : null}
        </div>
      ))}
    </>
  );
}

interface DirectoryItemProps {
  id: string;
  name: string;
}

function DirectoryItem({ id, name }: DirectoryItemProps) {
  const { directoryId } = useParams();
  const navigate = useNavigate();

  const onClickDirectory = (id: string) => {
    const isActiveDirectory = directoryId === id;

    navigate(`/directory/shelf/${isActiveDirectory ? '' : id}`, {
      replace: true,
    });
  };

  return (
    <div
      className={classNames(
        'group hover:bg-gray-100 flex w-full p-1 justify-between items-center',
        directoryId === id ? 'bg-gray-100' : ''
      )}
    >
      <div
        onClick={() => onClickDirectory(id)}
        className="flex items-center gap-2 cursor-pointer"
      >
        {directoryId === id ? (
          <VscTriangleDown
            className="h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        ) : (
          <VscTriangleRight
            className="h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        )}
        <AiOutlineBranches className="h-5 w-5 cursor-pointer" />
        <p title={name}>{name}</p>
      </div>

      <span className="opacity-0 group-hover:opacity-100">
        <EllipsisHorizontalIcon className="h-5 w-5 cursor-pointer" />
      </span>
    </div>
  );
}

// import React from 'react';
// import { AiOutlineBranches } from 'react-icons/ai';
// import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Spinner } from '../../../../../common';
// import { IDirectory } from '../../../../../features/directory/directory.interfaces';
// import {
//   useGetDirectoryTmp,
// } from '../../../../../features/directory/directoryService';
// import { classNames } from '../../../../../utils';

// export default function DirectoryList() {
//   const { directoryId } = useParams();

//   const { data, status } = useGetDirectoryTmp(directoryId);

//   const tree = data?.tree;

//   return (
//     <div className="flex flex-col mb-2">
//       {/* status checking */}
//       {status === 'loading' ? (
//         <div className="mx-auto my-5 justify-center">
//           <Spinner size={8} color="#0F70B7" />
//         </div>
//       ) : null}

//       {/* if not selected  anyone directory */}
//       {data
//         ? data.directories?.map((directory) => (
//             <DirectoryItem
//               key={directory.id}
//               id={directory.id}
//               name={directory.name}
//             />
//           ))
//         : null}

//       {/* if selected one */}
//       {tree ? (
//         <>
//           {tree[0].directories?.map((rootDir) => (
//             <div key={rootDir.id}>
//               <DirectoryItem id={rootDir.id} name={rootDir.name} />

//               <div className="pl-5">
//                 {rootDir.id === tree.slice(1)[0].directory?.id ? (
//                   <Directories directories={tree.slice(1)} />
//                 ) : null}
//               </div>
//             </div>
//           ))}
//         </>
//       ) : null}

//       {/* {data
//         ? data.map((directory) => (
//             <div key={directory.id} className="flex flex-col w-full"> */}
//       {/* directory */}
//       {/* <div
//                 onClick={() => onClickDirectory(directory.id)}
//                 className="hover:bg-gray-100 flex w-full p-1 gap-2 items-center cursor-pointer"
//               >
//                 {directoryId === directory.id ? (
//                   <VscTriangleDown
//                     className="h-4 w-4 text-gray-500"
//                     aria-hidden="true"
//                   />
//                 ) : (
//                   <VscTriangleRight
//                     className="h-4 w-4 text-gray-500"
//                     aria-hidden="true"
//                   />
//                 )} */}
//       {/* <PlayIcon className="h-4 w-4 cursor-pointer text-gray-700" /> */}
//       {/* <AiOutlineBranches className="h-5 w-5 cursor-pointer" />
//                 <p>{directory.name}</p>
//               </div> */}

//       {/* templates */}
//       {/* <div
//                 className={classNames(
//                   'ml-6',
//                   directory.templates.length > 0 ? 'mt-2' : ''
//                 )}
//               > */}
//       {/* {directory.templates.map((template) => (
//                   <div key={template.id} className="flex gap-2">
//                     <Squares2X2Icon className="h-5 w-5 cursor-pointer" />
//                     <p>{template.name}</p>
//                   </div>
//                 ))} */}
//       {/* </div>
//             </div>
//           ))
//         : null} */}
//     </div>
//   );
// }

// interface DirectoriesProps {
//   directories: {
//     directories?: IDirectory[];
//     directory?: IDirectory;
//   }[];
// }

// function Directories({ directories }: DirectoriesProps) {
//   return (
//     <>
//       {directories.map((i, index) =>
//         i.directories?.map((j) => (
//           <div key={j.id} className={`pl-${index * 5}`}>
//             <DirectoryItem id={j.id} name={j.name} />
//           </div>
//         ))
//       )}
//     </>
//   );
// }

// interface DirectoryItemProps {
//   id: string;
//   name: string;
// }

// function DirectoryItem({ id, name }: DirectoryItemProps) {
//   const { directoryId } = useParams();
//   const navigate = useNavigate();

//   const onClickDirectory = (id: string) => {
//     const isActiveDirectory = directoryId === id;

//     navigate(`/directory/${isActiveDirectory ? '' : id}`, {
//       replace: true,
//     });
//   };

//   return (
//     <div
//       onClick={() => onClickDirectory(id)}
//       className={classNames(
//         'hover:bg-gray-100 flex w-full p-1 gap-2 items-center cursor-pointer',
//         directoryId === id ? 'bg-gray-100' : ''
//       )}
//     >
//       {directoryId === id ? (
//         <VscTriangleDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
//       ) : (
//         <VscTriangleRight
//           className="h-4 w-4 text-gray-500"
//           aria-hidden="true"
//         />
//       )}
//       <AiOutlineBranches className="h-5 w-5 cursor-pointer" />
//       <p>{name}</p>
//     </div>
//   );
// }
