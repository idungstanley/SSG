/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IHrHub } from '../../../../../features/hr/hubs.interfaces';
import { HrHub } from './activetree.interfaces';

export default function CreateTree(data: IHrHub[]) {
  const hubsById: Map<string, HrHub> = new Map();

  const subHubs = data.filter((item) => !item.type) as HrHub[];
  if (subHubs.length) {
    for (let subHub of subHubs) {
      subHub = {
        ...subHub,
        children: []
      };
      hubsById.set(subHub.id, subHub);
    }
  }

  const rootHubs: HrHub[] = [];
  for (const hub of hubsById.values()) {
    if (hub.parent_id) {
      const parentHub = hubsById.get(hub.parent_id);
      if (parentHub) {
        parentHub.children.push(hub);
      }
    } else {
      rootHubs.push(hub);
    }
  }

  return rootHubs;
}
