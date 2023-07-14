import React from 'react';
import Description from './Description';
import AttachFile from './AttachFile';
import SubtaskWithCount from './SubtaskWithCount';

export default function Badges() {
  return (
    <div className="flex items-center space-x-1">
      <Description />
      <AttachFile />
      <SubtaskWithCount />
    </div>
  );
}
