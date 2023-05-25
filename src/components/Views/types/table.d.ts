import { listColumnProps } from '../../../pages/workspace/tasks/component/views/ListColumns';

export interface Column extends listColumnProps {
  ref: React.RefObject<HTMLTableCellElement>;
}
