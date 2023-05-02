import React from 'react';
import DirectoryTab from './DirectoryTab';
import TemplateTab from './TemplateTab';

export default function LibraryData() {
  return (
    <div className="w-full">
      <TemplateTab />
      <hr />
      <DirectoryTab />
    </div>
  );
}
