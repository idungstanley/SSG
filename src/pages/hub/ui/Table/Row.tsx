import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { Column } from '../../types/hub';
import { Col } from './Col';

interface RowProps {
  task: ITaskFullList;
  columns: Column[];
}

export function Row({ task, columns }: RowProps) {
  const sticky = columns[0];
  const otherColumns = columns.slice(1);

  return (
    <>
      <tr className="contents group">
        {/* first col sticky */}
        <Col
          fieldId={sticky.id}
          style={{ zIndex: 3 }}
          field={sticky.field}
          task={task}
          value={task[sticky.field]}
          sticky
        />

        {otherColumns.map((col) => (
          <Col
            fieldId={col.id}
            field={col.field}
            task={task}
            value={task[col.field]}
            key={col.id}
            style={{ zIndex: 2 }}
          />
        ))}
      </tr>
    </>
  );
}
