import React from 'react';
// ! change me
import FolderIcon from '../assets/icons/cabinet.svg';
import PDFIcon from '../assets/icons/cabinet.svg';
import JPGIcon from '../assets/icons/cabinet.svg';
import WordIcon from '../assets/icons/cabinet.svg';
import DocIcon from '../assets/icons/cabinet.svg';
import TXTIcon from '../assets/icons/cabinet.svg';
import ExcelIcon from '../assets/icons/cabinet.svg';
import PPTIcon from '../assets/icons/cabinet.svg';

interface FileIconProps {
  extensionKey: string | undefined;
  size: number;
}

function FileIcon({ extensionKey, size }: FileIconProps) {
  if (extensionKey === 'folder') {
    return <img className={`h-${size} w-${size}`} src={FolderIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'pdf') {
    return <img className={`h-${size} w-${size}`} src={PDFIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'jpeg' || extensionKey === 'jpg' || extensionKey === 'png' || extensionKey === 'image') {
    return <img className={`h-${size} w-${size}`} src={JPGIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'docx') {
    return <img className={`h-${size} w-${size}`} src={WordIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'doc') {
    return <img className={`h-${size} w-${size}`} src={DocIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'txt') {
    return <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'html') {
    return <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'rtf') {
    return <img className={`h-${size} w-${size}`} src={DocIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'odf') {
    return <img className={`h-${size} w-${size}`} src={DocIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'xlsx' || extensionKey === 'xls') {
    return <img className={`h-${size} w-${size}`} src={ExcelIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'ods') {
    return <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'csv') {
    return <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'xml') {
    return <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'pptx' || extensionKey === 'ppt') {
    return <img className={`h-${size} w-${size}`} src={PPTIcon} alt={extensionKey} />;
  }

  if (extensionKey === 'odp') {
    return <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />;
  }

  return <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />;
}
export default FileIcon;
