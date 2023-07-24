import React from 'react';
import { IDirWithChildren } from '../../../../../../../features/directory/directory.interfaces';
import DirectoryItem from './DirectoryItem';

interface DirectoryListProps {
  directories: IDirWithChildren[];
  leftMargin: boolean;
}

export default function DirectoryList({ directories, leftMargin }: DirectoryListProps) {
  return (
    <>
      {directories.map((directory) => (
        <div key={directory.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <DirectoryItem id={directory.id} name={directory.name} />

          {directory.children.length ? <DirectoryList directories={directory.children} leftMargin /> : null}
        </div>
      ))}
    </>
  );
}
