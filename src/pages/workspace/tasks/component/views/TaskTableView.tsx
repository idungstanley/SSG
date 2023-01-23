import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { BiExport } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineFilter } from 'react-icons/ai';
import { FaSort } from 'react-icons/fa';

function TaskTableView() {
  const defaultMaterialTheme = createTheme();
  const { myTaskData } = useAppSelector((state) => state.task);

  const editable = myTaskData.map((o) => ({ ...o }));

  console.log(editable);

  const icons: any = {
    Export: () => <BiExport />,
    Search: () => null,
    Filter: () => <AiOutlineFilter />,
    ViewColumn: () => <BiHide />,
    Clear: () => <AiOutlineFilter />,
    SortArrow: () => <FaSort />,
    FirstPage: () => null,
    LastPage: () => null,
    NextPage: () => null,
    PreviousPage: () => null,
  };

  const columnHead: any = [];
  const singleObj: any = editable[0];
  columnHead.push(Object.keys(singleObj));

  const dynamicColum: any = [];

  // console.log("columnHead", columnHead);

  columnHead[0].map((column) => {
    const singleColumn = {
      title:
        column.split('_').join(' ').toUpperCase() == 'NAME'
          ? 'TASKS'
          : column.split('_').join(' ').toUpperCase(),
      field: column,
      emptyValue: () => <p>-</p>,
    };
    dynamicColum.push(singleColumn);
  });

  return (
    <>
      <div>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            // tableRef={tableRef}
            title="{SSG}"
            columns={dynamicColum}
            data={editable ?? []}
            options={{
              searchFieldAlignment: 'right',
              // filtering: true,
              exportButton: true,
              selection: true,
              showSelectAllCheckbox: false,
              grouping: true,
              columnResizable: false,
              columnsButton: true,
              headerStyle: {
                fontSize: '10px',
              },
              rowStyle: { fontSize: '10px' },
              maxBodyHeight: '300px',
            }}
            icons={icons}
          />
        </ThemeProvider>
      </div>
    </>
  );
}

export default TaskTableView;
