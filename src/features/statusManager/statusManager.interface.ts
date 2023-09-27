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
