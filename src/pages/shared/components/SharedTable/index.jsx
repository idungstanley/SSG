/* eslint react/prop-types: 0 */
/* eslint react/jsx-props-no-spreading: 0 */
/* eslint react/no-unstable-nested-components: 0 */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { kaReducer, Table } from 'ka-table';
import {
  deselectAllFilteredRows,
  deselectRow,
  deselectAllRows,
  selectAllFilteredRows,
  selectRow,
  selectRowsRange,
  updateData,
} from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { kaPropsUtils } from 'ka-table/utils';
import { FileIcon } from '../../../../common';
import { OutputDateTime, OutputFileSize } from '../../../../app/helpers';
import {
  setSelectedFiles,
  setSelectedFolders,
  selectItem,
  resetSelectedItem,
  previewFileFullPage,
} from '../../../../features/shared/sharedSlice';
import { prefetchExplorerFilesAndFoldersService } from '../../../../features/explorer/explorerService';
// import { useGetSharedFilesAndFolders } from '../../../../features/shared/sharedService';
// import { showExplorerFileContextMenu } from '../../../../../features/general/contextMenu/contextMenuSlice';

function SelectionCell({
  rowKeyValue,
  dispatch,
  isSelectedRow,
  selectedRows,
}) {
  return (
    <input
      type="checkbox"
      checked={isSelectedRow}
      onChange={(event) => {
        if (event.nativeEvent.shiftKey) {
          dispatch(selectRowsRange(rowKeyValue, [...selectedRows].pop()));
        } else if (event.currentTarget.checked) {
          dispatch(selectRow(rowKeyValue));
        } else {
          dispatch(deselectRow(rowKeyValue));
        }
      }}
    />
  );
}

function SelectionHeader({ dispatch, areAllRowsSelected }) {
  return (
    <input
      type="checkbox"
      checked={areAllRowsSelected}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          dispatch(selectAllFilteredRows()); // also available: selectAllVisibleRows(), selectAllRows()
        } else {
          dispatch(deselectAllFilteredRows()); // also available: deselectAllVisibleRows(), deselectAllRows()
        }
      }}
    />
  );
}

function CustomCell({
  column,
  value,
  rowData,
}) {
  if (column.key === 'name') {
    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          {rowData.item_type === 'file' ? (
            <FileIcon extensionKey="file" size={10} />
          ) : (
            <FileIcon extensionKey="folder" size={10} />
          )}
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{rowData.name}</div>
        </div>
      </div>
    );
  }

  if (column.type === 'dateTime') {
    return (
      <div>
        { OutputDateTime(value) }
      </div>
    );
  }

  if (column.type === 'sizeInBytes') {
    return (
      <div>
        { value === null || value === '-' ? '-' : OutputFileSize(value) }
      </div>
    );
  }

  return (
    <div>
      {value}
    </div>
  );
}

function SharedTable({ data, tableTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const title = tableTitle === undefined ? 'Name' : tableTitle;

  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
        type: 'select',
      },
      {
        key: 'name',
        title,
        dataType: DataType.String,
        type: 'text',
      },
      {
        key: 'created_at',
        title: 'Created at',
        dataType: DataType.String,
        type: 'dateTime',
      },
      {
        key: 'shared_by',
        title: 'Shared by',
        dataType: DataType.String,
        type: 'text',
      },
    ],
    paging: {
      enabled: false,
    },
    rowKeyField: 'item_id_with_type',
    selectedRows: [],
  };

  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const kaTableDispatch = (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  };

  const selectedFileIds = useSelector((state) => state.explorer.selectedFileIds);
  const selectedFolderIds = useSelector((state) => state.explorer.selectedFolderIds);

  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    dispatch(resetSelectedItem());

    if (!data.filesStatus || !data.foldersStatus) {
      return false;
    }

    if (data) {
      const processedFolders = data.folders.map((folder, index) => ({
        full_object: folder,
        name: folder.name,
        created_at: folder.created_at,
        shared_by: folder.shared_by.user.name,
        item_id_raw: folder.id,
        item_id_with_type: `folder|${folder.id}`,
        item_type: 'folder',
        id: index + 1, // Must be index, and not the ID of the folder/file, must be + 1 as otherwise issue with selecting shift from first item...
      }));

      const processedFiles = data.files.map((file, index) => ({
        full_object: file,
        name: file.display_name,
        created_at: file.created_at,
        shared_by: file.shared_by.user.name,
        item_id_raw: file.id,
        item_id_with_type: `file|${file.id}`,
        item_type: 'file',
        id: processedFolders.length + index + 1, // Must be index, and not the ID of the folder/file, must be + 1 as otherwise issue with selecting shift from first item...
      }));

      setProcessedData([...processedFolders, ...processedFiles]);

      kaTableDispatch(updateData([...processedFolders, ...processedFiles]));
    }
    return true;
  }, []);

  useEffect(() => {
    var i = 0;
    var tempSelectedFileIds = [];
    var tempSelectedFolderIds = [];

    const selectedRowsRaw = tableProps.selectedRows;

    for (i = 0; i < selectedRowsRaw.length; i += 1) {
      const split = selectedRowsRaw[i].split('|');
      if (split[0] === 'file') {
        tempSelectedFileIds.push(split[1]);
      } else if (split[0] === 'folder') {
        tempSelectedFolderIds.push(split[1]);
      }
    }

    dispatch(setSelectedFiles(tempSelectedFileIds));
    dispatch(setSelectedFolders(tempSelectedFolderIds));
  }, [tableProps]);

  useEffect(() => {
    // Set selected item for preview

    if (selectedFileIds.length === 1 && selectedFolderIds.length === 0) {
      dispatch(selectItem({
        itemId: selectedFileIds[0],
        itemType: 'file',
      }));
    } else if (selectedFolderIds.length === 1 && selectedFileIds.length === 0) {
      dispatch(selectItem({
        itemId: selectedFolderIds[0],
        itemType: 'folder',
      }));
    } else {
      // Multiple items selected
      dispatch(resetSelectedItem());
    }
  }, [selectedFileIds, selectedFolderIds]);

  const onFullPagePreview = async (fileId) => {
    dispatch(
      previewFileFullPage(
        {
          fileId,
          cb: () => {},
        },
      ),
    );
  };

  return (
    <Table
      {...tableProps}
      childComponents={{
        table: {
          elementAttributes: () => ({
            className: 'min-w-full',
          }),
        },
        tableBody: {
          elementAttributes: () => ({
            className: 'bg-white divide-y divide-gray-200',
          }),
        },
        cell: {
          elementAttributes: (props) => ({
            className: props.column.key === 'selection-cell' ? 'hidden' : 'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
          }),
        },
        cellText: {
          elementAttributes: () => ({
          }),
          content: (props) => {
            if (props.column.key === 'selection-cell') {
              return <SelectionCell {...props} />;
            }

            return <CustomCell {...props} />;
          },
        },
        filterRowCell: {
          content: (props) => {
            if (props.column.key === 'selection-cell') {
              return null;
            }

            return null;
          },
        },
        headCell: {
          elementAttributes: (props) => ({
            className: props.column.key === 'selection-cell' ? 'hidden' : 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
          }),
          content: (props) => {
            if (props.column.key === 'selection-cell') {
              return (
                <SelectionHeader
                  {...props}
                  areAllRowsSelected={kaPropsUtils.areAllFilteredRowsSelected(tableProps)}
                  // areAllRowsSelected={kaPropsUtils.areAllVisibleRowsSelected(tableProps)}
                />
              );
            }

            return null;
          },
        },
        tableHead: {
          elementAttributes: () => ({
            className: 'bg-gray-50 select-none border-b border-gray-200',
          }),
        },
        dataRow: {
          elementAttributes: (props) => ({
            className: `select-none cursor-default ${props.isSelectedRow === true ? 'bg-gray-200' : 'hover:bg-gray-100 active:bg-gray-200'}`,
            onClick: async (event, extendedEvent) => {
              if (event.nativeEvent.shiftKey) {
                // If shift key is being held, select the range of rows
                // Deselect the current selected item (for preview)

                extendedEvent.dispatch(selectRowsRange(extendedEvent.childProps.rowKeyValue, [...props.selectedRows].pop()));
              } else if (event.nativeEvent.metaKey) {
                // If control/command key is being held (meta key)
                // Append/remove the current row from the selected rows

                if (extendedEvent.childProps.isSelectedRow) {
                  kaTableDispatch(deselectRow(extendedEvent.childProps.rowKeyValue));
                } else {
                  kaTableDispatch(selectRow(extendedEvent.childProps.rowKeyValue));
                }
              } else {
                // No shift/control being held - basic select
                // Deselect all currently selected
                // Select just the current row
                // Set it as the selected item (for preview)

                kaTableDispatch(deselectAllRows());
                kaTableDispatch(selectRow(extendedEvent.childProps.rowKeyValue));
              }

              if (extendedEvent.childProps.rowData.item_type === 'folder') {
                prefetchExplorerFilesAndFoldersService(queryClient, extendedEvent.childProps.rowData.item_id_raw);
              }
            },
            onDoubleClick: (event, extendedEvent) => {
              if (extendedEvent.childProps.rowData.item_type === 'folder') {
                // Remove selected files, folders, selected preview item - can cause it to crash as it won't exist

                kaTableDispatch(deselectAllRows()); // Very important
                dispatch(resetSelectedItem());
                dispatch(setSelectedFiles([]));
                dispatch(setSelectedFolders([]));

                navigate(`/explorer/${extendedEvent.childProps.rowData.item_id_raw}`, { replace: false });
              } else if (extendedEvent.childProps.rowData.item_type === 'file') {
                onFullPagePreview(extendedEvent.childProps.rowData.item_id_raw);
              }
            },
            /*
            onContextMenu: (event, extendedEvent) => {
              event.preventDefault();

              // If selected item, is not already selected
              if (extendedEvent.childProps.isSelectedRow === false) {
                kaTableDispatch(deselectAllRows());
                kaTableDispatch(selectRow(extendedEvent.childProps.rowKeyValue));
              }

              dispatch(showExplorerFileContextMenu({
                x: event.pageX,
                y: event.pageY,
              }));
            },
            */
          }),
        },
      }}
      dispatch={kaTableDispatch}
      data={processedData}
    />
  );
}

export default SharedTable;
