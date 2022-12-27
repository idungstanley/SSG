export interface IPermission {
  id: string;
  team_member_role: string;
  team_member_role_key: string;
  permission_id: string;
  permission_key: string;
  value: boolean;
  can_be_changed: boolean;
}

export interface IPermissionsReq {
  data: {
    values: IPermission[];
  };
}

export interface IPermissionFromList {
  id: string;
  key: string;
  name: string;
  description: null | string;
  workspace_permission_category: {
    id: string;
    key: string;
    name: string;
  };
}
