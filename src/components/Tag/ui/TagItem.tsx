import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
// import { Tag, TaskId } from '../../../../../../features/task/interface.tasks';
import { cl } from '../../../utils';
import { TaskId, Tag } from '../../../features/task/interface.tasks';
// import { cl } from '../../../../../../utils';

interface TagItemProps extends Tag {
  children: ReactNode;
  entityId: TaskId;
  defaultBg?: boolean;
}

const ACTIVE_TAG_BG = 'border-primary-200';
const DEFAULT_TAG_BG = 'border-white';

export function TagItem({ name, defaultBg, color, children, entityId }: TagItemProps) {
  const { taskId: taskIdFromParams } = useParams();

  const bg = !defaultBg && entityId === taskIdFromParams ? ACTIVE_TAG_BG : DEFAULT_TAG_BG;

  return (
    <div className={cl('group relative h-5 mr-3 w-fit flex items-center', `bg-${color}-300`)}>
      {children}

      <div
        className={cl(bg, '-ml-1 h-0 w-0 rotate-90 transform border-x-[11px] border-b-[14px] border-x-transparent')}
      ></div>
      <span title={name} className={cl('truncate text-center w-14 text-xs', `text-${color}-700`)}>
        {name}
      </span>
      <div
        className={cl(
          'absolute -right-[17px] rotate-90 transform border-x-[10px] border-b-[14px] border-x-transparent bg-transparent',
          `border-${color}-300`
        )}
      ></div>
    </div>
  );
}
