import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { CommunityRes } from './community';

export const useCommunity = () =>
  useQuery(
    ['community'],
    () =>
      requestNew<CommunityRes>({
        url: 'pulse',
        method: 'GET'
      }),
    { select: (res) => res.data }
  );

export const setOnlineStatus = () =>
  useQuery(
    ['active-status'],
    () =>
      requestNew({
        url: 'pulse',
        method: 'POST'
      }),
    {
      refetchInterval: 300000 // 5m
    }
  );
