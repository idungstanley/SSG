import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../../components/CenterMessage/FullScreenMessage';
import ItemPreviewSidebar from '../../../../components/ItemPreviewSidebar';
import {
  resetSelectedFilesAndFolders,
  setSelectedFiles,
  setSelectedFolders,
  setSelectedItem,
} from '../../../../features/explorer/explorerSlice';
import {
  useGetFile,
  useGetFolder,
  useGetSharedFilesAndFolders,
} from '../../../../features/shared/sharedService';
import { explorerItemType } from '../../../../types';
import { IItem } from '../../../explorer/ExplorerPage/components/ListItems';
import Grid from '../../../explorer/ExplorerPage/components/ListItems/Grid';
import Table from '../../../explorer/ExplorerPage/components/ListItems/Table';
import { sortItems } from '../../../explorer/ExplorerPage/components/Toolbar/components/SortingItems';

export default function SharedTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const checkbox = useRef<{ indeterminate: boolean }>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const {
    selectedFileIds,
    selectedFolderIds,
    selectedSortingId,
    selectedViewId,
    selectedItemId,
    selectedItemType,
  } = useAppSelector((state) => state.explorer);
  const selectedItems = [...selectedFileIds, ...selectedFolderIds];

  const { data, status } = useGetSharedFilesAndFolders();

  const items: IItem[] = useMemo(() => [], [data]);

  useMemo(
    () =>
      data?.folders.map((i) =>
        items.push({
          icon: 'folder',
          name: i.folder.name,
          created_at: i.created_at,
          size: '-',
          item_type: 'folder',
          id: i.id,
          updated_at: i.updated_at,
        })
      ),
    [data]
  );

  useMemo(
    () =>
      data?.files.map((i) =>
        items.push({
          icon: i.file.display_name.split('.').at(-1) || '',
          name: i.file.display_name,
          created_at: i.created_at,
          size: i.file.size,
          item_type: 'file',
          id: i.id,
          updated_at: i.updated_at,
        })
      ),
    [data]
  );

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedItems.length > 0 && selectedItems.length < items?.length;

    if (
      selectedItems.length === items.length &&
      +selectedItems.length + +items.length > 0
    ) {
      setChecked(selectedItems.length === items.length);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedItems]);

  useEffect(() => {
    if (selectedItems.length) {
      dispatch(resetSelectedFilesAndFolders());
      setChecked(false);
    }
  }, [folderId]);

  function toggleAll() {
    if (checked || indeterminate) {
      dispatch(resetSelectedFilesAndFolders());
    } else {
      dispatch(
        setSelectedFiles([
          ...items.filter((i) => i.item_type === 'file').map((i) => i.id),
        ])
      );
      dispatch(
        setSelectedFolders([
          ...items.filter((i) => i.item_type === 'folder').map((i) => i.id),
        ])
      );
    }

    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    itemId: string,
    type: explorerItemType
  ) => {
    const target = e.target as HTMLButtonElement;

    if (selectedItems.length && !target.value) {
      dispatch(resetSelectedFilesAndFolders());
    }

    if (!target.value && selectedFolderIds.includes(itemId)) {
      navigate(`/explorer/${itemId}`, { replace: true });
      dispatch(resetSelectedFilesAndFolders());
      setChecked(false);
    }

    if (!target.value) {
      dispatch(
        setSelectedItem({
          selectedItemId: itemId,
          selectedItemType: type,
        })
      );
      dispatch(
        type === 'file'
          ? setSelectedFiles([itemId])
          : setSelectedFolders([itemId])
      );
    }
  };

  const handleChangeItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    type: string
  ) => {
    if (!e.target.checked) {
      dispatch(
        type === 'file'
          ? setSelectedFiles([...selectedFileIds.filter((i) => i !== itemId)])
          : setSelectedFolders([
              ...selectedFolderIds.filter((i) => i !== itemId),
            ])
      );
    } else {
      dispatch(
        type === 'file'
          ? setSelectedFiles([...selectedFileIds, itemId])
          : setSelectedFolders([...selectedFolderIds, itemId])
      );
    }
  };

  const sortedItems = useMemo(
    () => [
      ...sortItems(
        items?.filter((i) => i.item_type === 'folder'),
        selectedSortingId
      ),
      ...sortItems(
        items?.filter((i) => i.item_type === 'file'),
        selectedSortingId
      ),
    ],
    [data, selectedSortingId]
  );

  const { data: item } =
    selectedItemType === 'file'
      ? useGetFile(selectedItemId)
      : useGetFolder(selectedItemId);

  return status.files === 'loading' || status.folders === 'loading' ? (
    <div className="mx-auto w-6 mt-10 justify-center">
      <Spinner size={8} color="#0F70B7" />
    </div>
  ) : status.files === 'error' || status.folders ? (
    <FullScreenMessage
      title="Oops, an error occurred :("
      description="Please try again later."
    />
  ) : !items.length ? (
    <FullScreenMessage
      title="No files or folders in your shared items"
      description="Ask someone to share a file with you"
    />
  ) : (
    <div className="flex flex-col h-full px-3 md:px-0">
      {selectedItemId ? (
        <ItemPreviewSidebar item={item} type={selectedItemType} />
      ) : null}
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            {selectedViewId === 1 ? (
              <Table
                checkbox={checkbox}
                checked={checked}
                toggleAll={toggleAll}
                sortedItems={sortedItems}
                selectedItems={selectedItems}
                handleChangeItem={handleChangeItem}
                handleClick={handleClick}
              />
            ) : (
              <Grid
                checkbox={checkbox}
                checked={checked}
                toggleAll={toggleAll}
                sortedItems={sortedItems}
                selectedItems={selectedItems}
                handleChangeItem={handleChangeItem}
                handleClick={handleClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
