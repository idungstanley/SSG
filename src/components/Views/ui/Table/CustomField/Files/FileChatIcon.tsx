import React from 'react';
import { AiFillFile, AiFillFileZip } from 'react-icons/ai';
import { BsFileEarmarkMusicFill } from 'react-icons/bs';
import ToolTip from '../../../../../Tooltip/Tooltip';
import { BiSolidFileDoc, BiSolidFileImage, BiSolidFilePdf, BiSolidFileTxt } from 'react-icons/bi';
import { PiFilePptFill, PiFileXlsFill } from 'react-icons/pi';
import { FaFileVideo } from 'react-icons/fa';

interface fileIconProps {
  fileExtension?: string;
  filePath?: string;
  fileName?: string;
  width: string;
  height: string;
}

function FileChatIcons({ fileExtension, filePath, fileName, width, height }: fileIconProps) {
  const iconStyle = `${width + ' ' + height}`;
  let icon;
  switch (fileExtension) {
    case 'pdf':
      icon = <BiSolidFilePdf className={iconStyle} color="#FF0E0F" />;
      break;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      icon = <BiSolidFileImage className={iconStyle} color="#788f9d" />;
      break;
    case 'doc':
    case 'docx':
      icon = <BiSolidFileDoc className={iconStyle} color="#5facf4" />;
      break;
    case 'txt':
      icon = <BiSolidFileTxt className={iconStyle} color="#788f9d" />;
      break;
    case 'xls':
    case 'xlsx':
      icon = <PiFileXlsFill className={iconStyle} color="#788f9d" />;
      break;
    case 'ppt':
    case 'pptx':
      icon = <PiFilePptFill className={iconStyle} color="#788f9d" />;
      break;
    case 'zip':
    case 'rar':
    case '7z':
      icon = <AiFillFileZip className={iconStyle} color="#788f9d" />;
      break;
    case 'mp3':
    case 'wav':
    case 'ogg':
      icon = <BsFileEarmarkMusicFill className={iconStyle} color="#FF0E0F" />;
      break;
    case 'mp4':
    case 'avi':
    case 'mkv':
      icon = <FaFileVideo className={iconStyle} color="#5facf4" />;
      break;
    default:
      icon = <AiFillFile className={iconStyle} />;
      break;
  }

  return (
    <ToolTip title={fileName}>
      <a href={filePath} download target="_blank" rel="noreferrer noopener">
        {icon}
      </a>
    </ToolTip>
  );
}

export default FileChatIcons;
