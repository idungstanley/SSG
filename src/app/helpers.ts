import moment from 'moment-timezone';
import axios from 'axios';
import { Buffer } from 'buffer';
import fileDownload from 'js-file-download';
import { explorerItemType } from '../types';

const accessTokenLS = localStorage.getItem('accessToken') || 'null';
const currentWorkspaceIdLS =
  localStorage.getItem('currentWorkspaceId') || 'null';

export async function GetFileWithHeaders(type: string, id: string) {
  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/af`;
  const accessToken = JSON.parse(accessTokenLS);
  const currentWorkspaceId = JSON.parse(currentWorkspaceIdLS);
  const endpoint =
    type === 'inboxFile'
      ? `${baseUrl}/inbox-files/${id}/contents`
      : `${baseUrl}/files/${id}/contents`;

  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      current_workspace_id: currentWorkspaceId,
    },
    responseType: 'arraybuffer',
  });
  const data = `data:${response.headers['content-type']};base64,${Buffer.from(
    response.data,
    'binary'
  ).toString('base64')}`;
  return data;
}

export async function DownloadFile(
  type: explorerItemType | 'inbox' | string,
  id: string,
  name: string
) {
  let endpoint = '';

  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/af`;
  const accessToken = JSON.parse(accessTokenLS);
  const currentWorkspaceId = JSON.parse(currentWorkspaceIdLS);

  if (type === 'inboxFile') {
    endpoint = `${baseUrl}/inbox-files/${id}/download`;
  } else if (type === 'file') {
    endpoint = `${baseUrl}/files/${id}/download`;
  } else if (type === 'folder') {
    endpoint = `${baseUrl}/folders/${id}/download`;
  }

  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      current_workspace_id: currentWorkspaceId,
    },
    responseType: 'blob', // Important
  });

  fileDownload(response.data, name);
}

export function OutputDateTime(
  timestamp: string,
  format = null,
  timezone = null
) {
  return moment
    .utc(timestamp)
    .tz(timezone || moment.tz.guess())
    .format(format || 'DD MMM YYYY, HH:mm');
}

export function OutputFileSize(bytes: number, si = true, dp = 3) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = si
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;
  let copyBytes = bytes;

  do {
    copyBytes /= thresh;
    u++;
  } while (
    Math.round(Math.abs(copyBytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  let decimal_points = 0;
  if (units[u] == 'GB' || units[u] == 'MB') {
    decimal_points = 1;
  }

  return `${bytes.toFixed(decimal_points)} ${units[u]}`;
}
