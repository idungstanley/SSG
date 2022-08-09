import React from 'react';
import PropTypes from 'prop-types';

import FolderIcon from '../assets/icons/fileFormats/folder.svg';
import PDFIcon from '../assets/icons/fileFormats/pdf.svg';
import JPGIcon from '../assets/icons/fileFormats/jpg.svg';
import WordIcon from '../assets/icons/fileFormats/word.svg';
import DocIcon from '../assets/icons/fileFormats/doc.svg';
import TXTIcon from '../assets/icons/fileFormats/txt.svg';
import ExcelIcon from '../assets/icons/fileFormats/xls.svg';
import PPTIcon from '../assets/icons/fileFormats/ppt.svg';

function FileIcon({ extensionKey, size }) {
  if (extensionKey === 'folder') {
    return (
      <img className={`h-${size} w-${size}`} src={FolderIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'pdf') {
    return (
      <img className={`h-${size} w-${size}`} src={PDFIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'jpeg' || extensionKey === 'jpg' || extensionKey === 'png' || extensionKey === 'image') {
    return (
      <img className={`h-${size} w-${size}`} src={JPGIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'docx') {
    return (
      <img className={`h-${size} w-${size}`} src={WordIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'doc') {
    return (
      <img className={`h-${size} w-${size}`} src={DocIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'txt') {
    return (
      <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'html') {
    return (
      <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'rtf') {
    return (
      <img className={`h-${size} w-${size}`} src={DocIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'odf') {
    return (
      <img className={`h-${size} w-${size}`} src={DocIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'xlsx' || extensionKey === 'xls') {
    return (
      <img className={`h-${size} w-${size}`} src={ExcelIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'ods') {
    return (
      <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'csv') {
    return (
      <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'xml') {
    return (
      <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'pptx' || extensionKey === 'ppt') {
    return (
      <img className={`h-${size} w-${size}`} src={PPTIcon} alt={extensionKey} />
    );
  }

  if (extensionKey === 'odp') {
    return (
      <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />
    );
  }

  return (
    <img className={`h-${size} w-${size}`} src={TXTIcon} alt={extensionKey} />
  );
}

FileIcon.propTypes = {
  extensionKey: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default FileIcon;
