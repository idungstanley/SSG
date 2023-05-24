import { Column } from '../../../types/hub';
import { Col } from './Col';

interface HeadProps {
  columns: Column[];
  tableHeight: string | number;
  mouseDown: (i: number) => void;
}

export function Head({ columns, tableHeight, mouseDown }: HeadProps) {
  const sticky = columns[0];
  const otherColumns = columns.slice(1);

  return (
    <thead className="contents">
      <tr className="contents">
        {/* first sticky */}
        <Col
          isSticky
          value={sticky.value}
          ref={sticky.ref}
          style={{ height: tableHeight }}
          onMouseDown={() => mouseDown(0)}
        />

        {otherColumns.map(({ ref, value, id }, index) => (
          <Col
            style={{ height: tableHeight }}
            onMouseDown={() => mouseDown(index + 1)}
            ref={ref}
            key={id}
            value={value}
          />
        ))}
      </tr>
    </thead>
  );
}
