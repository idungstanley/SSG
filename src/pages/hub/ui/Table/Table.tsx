import { useCallback, useEffect, useRef, useState } from 'react';
import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { listColumnProps } from '../../../workspace/tasks/component/views/ListColumns';
import { createHeaders } from '../../lib/tableHeadUtils';
import { Head } from './Head/Head';
import { Row } from './Row';

interface TableProps {
  heads: listColumnProps[];
  data: ITaskFullList[];
}

const MIN_COL_WIDTH = 100;
const MAX_COL_WIDTH = 300;
const DEFAULT_COL_WIDTH = 150;

export function Table({ heads, data }: TableProps) {
  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const tableElement = useRef<HTMLTableElement>(null);

  const columns = createHeaders(heads).filter((i) => !i.hidden);

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          if (col.ref.current) {
            const mouseX = e.clientX;
            const widthFromLeftToCurrentBlock = Math.round(col.ref.current.getBoundingClientRect().right);
            const currentBlockWidth = col.ref.current.offsetWidth;

            const width =
              widthFromLeftToCurrentBlock -
              (widthFromLeftToCurrentBlock - currentBlockWidth) -
              (widthFromLeftToCurrentBlock - mouseX);

            if (width >= MIN_COL_WIDTH && width <= MAX_COL_WIDTH) {
              return `${width}px`;
            }
          }
        }

        // Otherwise return the previous width (no changes)
        return col.ref.current ? `${col.ref.current.offsetWidth}px` : null;
      });

      // Assign the px values to the table
      if (tableElement.current) tableElement.current.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
    },
    [activeIndex, columns]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    document.body.style.userSelect = '';
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  useEffect(() => {
    if (tableElement.current) {
      setTableHeight(tableElement.current.offsetHeight);
    }
  }, []);

  const mouseDown = (index: number) => {
    document.body.style.userSelect = 'none';
    setActiveIndex(index);
  };

  return (
    <div className="relative overflow-hidden pl-6">
      <table
        style={{
          display: 'grid',
          gridTemplateColumns: `minmax(${MAX_COL_WIDTH}px, 1fr) ${columns
            .slice(1)
            .map(() => `minmax(${DEFAULT_COL_WIDTH}px, 1fr)`)
            .join(' ')}`
        }}
        className="w-full overflow-x-scroll overflow-y-hidden"
        ref={tableElement}
      >
        <Head columns={columns} mouseDown={mouseDown} tableHeight={tableHeight} />

        <tbody className="contents">
          {data.map((i) => (
            <Row columns={columns} task={i} key={i.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
