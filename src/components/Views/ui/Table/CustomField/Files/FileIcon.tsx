import React from 'react';
import { AiFillFile } from 'react-icons/ai';
import { BsFiletypeDoc, BsFiletypePpt, BsFiletypeXls, BsFillFileEarmarkMusicFill } from 'react-icons/bs';
import { FaFilePdf } from 'react-icons/fa';
import { GrDocumentZip } from 'react-icons/gr';
import ToolTip from '../../../../../Tooltip/Tooltip';

interface fileIconProps {
  fileExtension?: string;
  filePath?: string;
  fileName?: string;
  width: string;
  height: string;
}

function FileIcons({ fileExtension, filePath, fileName, width, height }: fileIconProps) {
  const iconStyle = `${width + ' ' + height}`;
  let icon;
  switch (fileExtension) {
    case 'pdf':
      icon = <FaFilePdf className={iconStyle} />;
      break;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      icon = <img className={iconStyle} src={filePath} alt="" />;
      break;
    case 'doc':
    case 'docx':
      icon = <BsFiletypeDoc className={iconStyle} />;
      break;
    case 'xls':
    case 'xlsx':
      icon = <BsFiletypeXls className={iconStyle} />;
      break;
    case 'ppt':
    case 'pptx':
      icon = <BsFiletypePpt className={iconStyle} />;
      break;
    case 'zip':
    case 'rar':
    case '7z':
      icon = <GrDocumentZip className="w-5 h-5" />;
      break;
    case 'mp3':
    case 'wav':
    case 'ogg':
      icon = <BsFillFileEarmarkMusicFill />;
      break;
    case 'mp4':
    case 'avi':
    case 'mkv':
      icon = (
        <video width="640" height="360" controls className={iconStyle}>
          <source src={filePath} type="video/mp4" />
        </video>
      );
      break;
    default:
      icon = <AiFillFile className={iconStyle} />;
      break;
  }

  return (
    <ToolTip title={fileName}>
      <a href={filePath} download>
        {icon}
      </a>
    </ToolTip>
  );
}

export default FileIcons;
