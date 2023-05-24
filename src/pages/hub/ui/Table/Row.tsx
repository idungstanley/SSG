import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { cl } from '../../../../utils';
import { Column } from '../List/List';

interface RowProps {
  task: ITaskFullList;
  columns: Column[];
}

const DEFAULT_ROW_BG = 'bg-white opacity-90';

export function Row({ task, columns }: RowProps) {
  return (
    <>
      <tr className="contents group">
        {/* first col sticky */}
        <td
          style={{ zIndex: 3 }}
          className="sticky flex -left-1 text-center justify-center items-center text-sm font-medium text-gray-900"
        >
          <div className="bg-purple-50 h-full flex items-center">
            <span className="p-1 group-hover:opacity-100 opacity-0">=</span>
          </div>
          <div className="bg-white border-t border-gray-200 opacity-90 w-full h-full py-4 p-4">{task.name}</div>
        </td>

        {columns.slice(1).map((col) => (
          <td
            key={col.id}
            style={{ zIndex: 2 }}
            className={cl(
              DEFAULT_ROW_BG,
              'flex border-t justify-center items-center text-sm font-medium text-gray-900 p-4'
            )}
          >
            {task[col.field]?.toString()}
          </td>
        ))}
      </tr>
    </>
  );
}
