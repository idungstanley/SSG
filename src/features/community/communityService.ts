import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { CommunityRes } from './community';

export const useCommunity = () =>
  useQuery(['community'], () =>
    requestNew<CommunityRes>({
      url: 'pulse',
      method: 'GET'
    })
  );
