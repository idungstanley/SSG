import moment from 'moment-timezone';
import axios from 'axios';
import { Buffer } from 'buffer';
import fileDownload from 'js-file-download';
import { explorerItemType } from '../types';
import { Location } from 'react-router-dom';
import { EntityType } from '../utils/EntityTypes/EntityType';
import { findCurrentHub } from '../managers/Hub';
import { Hub, List, Wallet } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentWallet } from '../managers/Wallet';
import { findCurrentList } from '../managers/List';

export async function GetFileWithHeaders(type: string, id: string) {
  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/af`;
  const accessToken = JSON.parse(localStorage.getItem('accessToken') || '""') as string;
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId') || '""') as string;
  const endpoint = type === 'inboxFile' ? `${baseUrl}/inbox-files/${id}/contents` : `${baseUrl}/files/${id}/contents`;

  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      current_workspace_id: currentWorkspaceId
    },
    responseType: 'arraybuffer'
  });

  const data = `data:${response.headers['content-type']};base64,${Buffer.from(
    response.data as string,
    'binary'
  ).toString('base64')}`;
  return data;
}

export async function DownloadFile(type: explorerItemType | 'inbox' | string, id: string, name: string) {
  let endpoint = '';

  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/af`;
  const accessToken = JSON.parse(localStorage.getItem('accessToken') || '""') as string;
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId') || '""') as string;

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
      current_workspace_id: currentWorkspaceId
    },
    responseType: 'blob' // Important
  });

  fileDownload(response.data as string, name);
}

export function OutputDateTime(timestamp: string, format = null, timezone = null) {
  return moment
    .utc(timestamp)
    .tz(timezone || moment.tz.guess())
    .format(format || 'DD MMM YYYY, HH:mm');
}

export function OutputFileSize(bytes: number) {
  const thresh = 1000;
  let tmpBytes = bytes;

  if (Math.abs(tmpBytes) < thresh) {
    return bytes + ' B';
  }

  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let u = -1;
  const r = 10 ** 3;

  do {
    tmpBytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(tmpBytes) * r) / r >= thresh && u < units.length - 1);

  let decimal_points = 0;
  if (units[u] == 'GB' || units[u] == 'MB') {
    decimal_points = 1;
  }

  return tmpBytes.toFixed(decimal_points) + ' ' + units[u];
}

export function getInitials(str: string) {
  return str
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function findFirstActiveEntityExt(location: Location) {
  const shortType = location.pathname.split('/')[3];
  const id = location.pathname.split('/')[4];
  const longType = shortType === 'h' ? EntityType.hub : shortType === 'w' ? EntityType.wallet : EntityType.list;
  return { id, type: longType };
}

export function findFirstActiveEntity(props: { id: string; type: string }, hubs: Hub[]) {
  let currentEntity = {} as Hub | Wallet | List;
  let currentType;
  if (props.type === EntityType.hub) {
    currentEntity = findCurrentHub(props.id, hubs) as Hub;
    if (currentEntity.parent_id) {
      currentType = EntityType.subHub;
    } else {
      currentType = EntityType.hub;
    }
  }
  if (props.type === EntityType.wallet) {
    currentEntity = findCurrentWallet(props.id, hubs) as Wallet;
    const hubId = hubs.find((hub) => hub.id === currentEntity.parent_id);
    if (hubId) {
      currentType = EntityType.wallet;
    } else {
      currentType = EntityType.subWallet;
    }
  }
  if (props.type === EntityType.list) {
    currentEntity = findCurrentList(props.id, hubs) as List;
    currentType = EntityType.list;
  }
  return { currentEntity, currentType };
}

export function findAllIdsBeforeActiveEntity(activeId: string, entities: [Hub | Wallet | List]): string[] {
  const arrayWithIds: string[] = [];
  const reversedEntities = [...entities].reverse();
  for (let i = 0; i < reversedEntities.length; i++) {
    if (reversedEntities[i].id === activeId) {
      arrayWithIds.push(reversedEntities[i].id, reversedEntities[i].parent_id ?? '');
    }
    if (arrayWithIds.includes(reversedEntities[i].id)) {
      arrayWithIds.push(reversedEntities[i].parent_id ?? '');
    }
  }
  return [...new Set(arrayWithIds)];
}
