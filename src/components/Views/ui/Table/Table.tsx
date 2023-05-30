import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { Task } from '../../../../features/task/interface.tasks';
import { setUpdateCords } from '../../../../features/task/taskSlice';
import { useScroll } from '../../../../hooks/useScroll';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { MAX_COL_WIDTH, MIN_COL_WIDTH } from '../../config';
import { generateGrid } from '../../lib';
import { createHeaders } from '../../lib/tableHeadUtils';
import { Head } from './Head/Head';
import { Row } from './Row';

interface TableProps {
  heads: listColumnProps[];
  data: Task[];
  label: string;
}

export function Table({ heads, data, label }: TableProps) {
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const tableElement = useRef<HTMLTableElement>(null);

  const [collapseTasks, setCollapseTasks] = useState(false);

  const columns = createHeaders(heads).filter((i) => !i.hidden);

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex && col.ref.current) {
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

        // Otherwise return the previous width (no changes)
        return col.ref.current ? `${col.ref.current.offsetWidth}px` : null;
      });

      // Assign the px values to the table
      if (tableElement.current) {
        tableElement.current.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
      }
    },
    [activeIndex, columns]
  );

  const removeListeners = () => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  };

  // reset
  const onMouseUp = () => {
    document.body.style.userSelect = '';
    setActiveIndex(null);
    removeListeners();
    dispatch(setUpdateCords());
  };

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex]);

  // init height
  useEffect(() => {
    if (tableElement.current) {
      setTableHeight(tableElement.current.offsetHeight);
    }
  }, []);

  const onMouseDown = (index: number) => {
    document.body.style.userSelect = 'none';
    setActiveIndex(index);
  };

  const onScroll = useScroll(() => dispatch(setUpdateCords()));

  return (
    <div className="relative pl-6 overflow-hidden">
      <table
        onScroll={onScroll}
        style={{
          gridTemplateColumns: generateGrid(columns.length)
        }}
        className="grid w-full overflow-x-scroll overflow-y-hidden"
        ref={tableElement}
      >
        <Head
          collapseTasks={collapseTasks}
          onToggleCollapseTasks={() => setCollapseTasks((prev) => !prev)}
          label={label}
          columns={columns}
          mouseDown={onMouseDown}
          tableHeight={tableHeight}
        />

        {!collapseTasks ? (
          <tbody className="contents">
            {data.map((i) => (
              <Row columns={columns} task={i} key={i.id} />
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}
