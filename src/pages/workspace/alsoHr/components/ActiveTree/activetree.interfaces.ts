import { IHrHub } from '../../../../../features/hr/hubs.interfaces';

export interface HrHub extends IHrHub {
  children: HrHub[];
}

export interface ListProps {
  hubs: HrHub[];
}
