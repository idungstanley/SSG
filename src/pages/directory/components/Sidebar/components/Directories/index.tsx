import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IDirWithChildren } from '../../../../../../features/directory/directory.interfaces';
import { useGetDirectories } from '../../../../../../features/directory/directoryService';
import DirectoryList from './components/DirectoryList';

function updateNestedArray(
  array: IDirWithChildren[],
  updateFn: (i: IDirWithChildren) => IDirWithChildren,
  idToUpdate?: string
): IDirWithChildren[] {
  return !idToUpdate
    ? array
    : array.map((item) => {
        if (item.id === idToUpdate) {
          return updateFn(item);
        } else if (item.children) {
          return {
            ...item,
            children: updateNestedArray(item.children, updateFn, idToUpdate)
          };
        }
        return item;
      });
}

function arrayToTree(array: IDirWithChildren[]) {
  const nodes: Record<string, IDirWithChildren> = {};

  array.forEach((node) => {
    nodes[node.id] = node;
  });

  const tree: IDirWithChildren[] = [];

  Object.values(nodes).forEach((node) => {
    if (node.parent_id === null) {
      tree.push(node);
    } else {
      nodes[node.parent_id].children.push(node);
    }
  });
  return tree;
}

export default function Directories() {
  const { directoryId } = useParams();
  const [directories, setDirectories] = useState<IDirWithChildren[]>([]);
  // if it's first mount and directory id saved in URL
  const isSavedIdFromURL = !directories.length && !!directoryId;
  const { data } = useGetDirectories(directoryId, isSavedIdFromURL);

  useEffect(() => {
    if (data) {
      // add children key to each directory
      const stringifiedData = data.map((i) => ({
        id: i.id,
        name: i.name,
        parent_id: i.parent_id,
        children: []
      }));

      if (isSavedIdFromURL) {
        // if it's first mount and directory id saved in URL
        setDirectories([...arrayToTree(stringifiedData)]);
      } else {
        setDirectories((oldData) =>
          oldData.length
            ? updateNestedArray(
                oldData,
                (item) => ({
                  ...item,
                  children: stringifiedData
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
      <DirectoryList directories={directories} leftMargin={false} />
    </div>
  );
}
