import React, { useState } from 'react';
import { GrTemplate } from 'react-icons/gr';
import { useAppSelector } from '../../../../../app/hooks';

export default function TemplateTab() {
  const [showDirectoryFile, setShowDirectoryFile] = useState<boolean>(false);
  const { lightBaseColor } = useAppSelector((state) => state.account);
  const handleClick = () => {
    setShowDirectoryFile((prev) => !prev);
  };
  return (
    <div
      className="relative flex items-center gap-5 p-2 hover:bg-gray-100"
      onClick={handleClick}
      style={{ backgroundColor: showDirectoryFile ? lightBaseColor : undefined, height: '25px' }}
    >
      {showDirectoryFile && (
        <span className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg" style={{ backgroundColor: '#BF00FF' }} />
      )}
      <GrTemplate />
      <p>Template Center</p>
    </div>
  );
}
