import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { Task } from '../../../../features/task/interface.tasks';
import { setUpdateCords } from '../../../../features/task/taskSlice';
import { useScroll } from '../../../../hooks/useScroll';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { MAX_COL_WIDTH, MIN_COL_WIDTH } from '../../config';
import { generateGrid } from '../../lib';
import { createHeaders } from '../../lib/tableHeadUtils';
import { AddTask } from '../AddTask/AddTask';
import CustomScrollbar from '../List/CustomScroll';
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
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [collapseTasks, setCollapseTasks] = useState(false);
  const taskLength = data.length;
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
    <CustomScrollbar>
      <table
        onScroll={onScroll}
        style={
          !collapseTasks
            ? {
                display: 'grid',
                gridTemplateColumns: generateGrid(columns.length)
              }
            : undefined
        }
        className="w-full"
        ref={tableElement}
      >
        <Head
          collapseTasks={collapseTasks}
          taskLength={taskLength}
          onToggleCollapseTasks={() => setCollapseTasks((prev) => !prev)}
          label={label}
          columns={columns}
          mouseDown={onMouseDown}
          tableHeight={tableHeight}
        />

        {/* rows */}
        {!collapseTasks ? (
          <tbody className="contents">
            {data.map((i) => (
              <Row columns={columns} task={i} key={i.id} />
            ))}

            {/* add task field */}

            {showNewTaskField ? (
              <AddTask
                columns={columns.slice(1)}
                parentId={data[0].list_id}
                isListParent
                status={label}
                onClose={() => setShowNewTaskField(false)}
              />
            ) : null}
          </tbody>
        ) : null}

        {/* add subtask button */}
        {!showNewTaskField ? (
          <div className="h-5">
            <button
              onClick={() => setShowNewTaskField(true)}
              className="absolute left-0 p-1.5 pl-12 text-left w-fit text-xs "
            >
              + New Task
            </button>
          </div>
        ) : null}
      </table>
    </CustomScrollbar>
  );
}
