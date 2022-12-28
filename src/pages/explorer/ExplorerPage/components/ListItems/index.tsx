import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../../../../common';
import {
  useGetExplorerFilesAndFolders,
  useGetFile,
  useGetFolder,
} from '../../../../../features/explorer/explorerService';
import {
  setSelectedFiles,
  setSelectedFolders,
  resetSelectedFilesAndFolders,
  setSelectedItem,
} from '../../../../../features/explorer/explorerSlice';
import { sortItems } from '../Toolbar/components/SortingItems';
import Table from './Table';
import Grid from './Grid';
import FullScreenMessage from '../../../../../components/CenterMessage/FullScreenMessage';
import { setShowUploadModal } from '../../../../../features/general/uploadFile/uploadFileSlice';
import ItemPreviewSidebar from '../../../../../components/ItemPreviewSidebar';
import { useAppSelector } from '../../../../../app/hooks';

export interface IItem {
  icon: string;
  name: string;
  created_at: string;
  size: string | number;
  item_type: 'folder' | 'file';
  id: string;
  updated_at: string;
}

export default function ExplorerTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const checkbox = useRef<HTMLInputElement | null>(null);
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

  const { data, status } = useGetExplorerFilesAndFolders(folderId);

  const items: IItem[] = useMemo(() => [], [data]);

  useMemo(
    () =>
      data?.data.folders.map((i) =>
        items.push({
          icon: 'folder',
          name: i.name,
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
      data?.data.files.map((i) =>
        items.push({
          icon: i.file_format.key,
          name: i.display_name,
          created_at: i.created_at,
          size: i.size,
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
    type: 'folder' | 'file'
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

  return status === 'loading' ? (
    <div className="mx-auto w-6 mt-10 justify-center">
      <Spinner size={8} color="#0F70B7" />
    </div>
  ) : status === 'error' ? (
    <FullScreenMessage
      title="Oops, an error occurred :("
      description="Please try again later."
    />
  ) : !items.length ? (
    <FullScreenMessage
      title="No files or folders in your explorer"
      description="Upload one to start working"
      ctaText="Upload"
      ctaOnClick={() => dispatch(setShowUploadModal(true))}
      showCta
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
