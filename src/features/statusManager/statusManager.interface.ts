export interface statusItemsProps {
  color: string;
  position: number;
  name: string;
  type: string;
}
export interface taskStatusProps {
  checksum: string;
  id: string;
  items: statusItemsProps[];
  name: string;
}
export interface getStatusTemplateRes {
  data: {
    task_status_templates: taskStatusProps[];
  };
}

export const COLLECTION_TYPES = {
  BESPOKE_TO_ENTITY: 'Bespoke to Entity',
  PARENT_ENTITY: 'Parent Entity',
  SHARED_ENTITY: 'Shared Entity',
  TEMPLATE_COLLECTION: 'Template Collection'
};
