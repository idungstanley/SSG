import { useEffect, useState } from 'react';
import { Menu } from '@mui/material';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { UseGetWalletDetails } from '../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../features/list/listService';
import { IField, IListDetails } from '../../../../features/list/list.interfaces';
import { IHubDetails } from '../../../../features/hubs/hubs.interfaces';
import { IWalletDetails } from '../../../../features/wallet/wallet.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Button } from '../../../../components';
import { useMutation } from '@tanstack/react-query';
import { addNewField } from '../../../../features/task/taskService';
import { setSubtasks, setTasks } from '../../../../features/task/taskSlice';
import { updateCustomFieldManager } from '../../../../managers/Task';

export default function CustomFieldsModal() {
  const dispatch = useAppDispatch();
  const { hubId, walletId, listId } = useParams();

  const { selectedTasksArray, tasks, subtasks } = useAppSelector((state) => state.task);

  const [searchInput, setSearchInput] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [customFieldColumns, setCustomFieldColumns] = useState<IField[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<IField[]>([]);
  const [details, setDetails] = useState<IHubDetails | IWalletDetails | IListDetails>();
  const [activeField, setActiveField] = useState<IField | null>(null);
  const [newValue, setNewValue] = useState<string>('');

  const { data: hubDetails } = UseGetHubDetails({ activeItemId: hubId, activeItemType: EntityType.hub });
  const { data: walletDetails } = UseGetWalletDetails({ activeItemId: walletId, activeItemType: EntityType.wallet });
  const { data: listDetails } = UseGetListDetails(listId);

  useEffect(() => {
    setDetails(hubDetails?.data.hub || walletDetails?.data.wallet || listDetails?.data.list);
  }, [hubDetails, walletDetails, listDetails]);

  useEffect(() => {
    if (details) {
      setCustomFieldColumns(details.custom_field_columns);
      setFilteredProperties(details.custom_field_columns);
    }
  }, [details]);

  const searchItem = (value: string) => {
    setSearchInput(value);
    if (searchInput) {
      const filtered = customFieldColumns?.filter((el) => el.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(customFieldColumns);
    }
  };

  const addFieldValue = useMutation(addNewField, {
    onSuccess: () => {
      let newTasks = { ...tasks };
      let newSubtasks = { ...subtasks };
      selectedTasksArray.forEach((id) => {
        const { updatedTasks, updatedSubtasks } = updateCustomFieldManager(
          newTasks,
          newSubtasks,
          {
            id: activeField?.id as string,
            values: [
              {
                ...activeField,
                id: activeField?.id as string,
                name: activeField?.name as string,
                value: newValue
              }
            ]
          },
          id
        );
        newTasks = updatedTasks;
        newSubtasks = updatedSubtasks;
      });
      dispatch(setTasks(newTasks));
      dispatch(setSubtasks(newSubtasks));
      setAnchorEl(null);
      setActiveField(null);
      setNewValue('');
    }
  });

  return (
    <>
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
        <BiEdit />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setActiveField(null);
          setNewValue('');
        }}
      >
        <div key="customFieldModal">
          {activeField ? (
            <div className="p-3">
              <div className="mb-4 pt-1 pb-2 text-center border-b-2 border-gray-300">
                {activeField.name.toUpperCase()}
              </div>
              <input
                type={activeField.type === 'number' ? activeField.type : 'text'}
                placeholder=""
                className="w-full mb-4 p-2 m-auto border-1 border-gray-300 rounded-md"
                onChange={(e) => setNewValue(e.target.value)}
                value={newValue}
              />
              <div className="flex justify-between">
                <Button
                  buttonStyle="white"
                  onClick={() => {
                    setActiveField(null);
                    setNewValue('');
                  }}
                  label="Cancel"
                  padding="py-2 px-4"
                  height="h-7"
                  width="w-30"
                />
                <Button
                  buttonStyle="primary"
                  onClick={() =>
                    addFieldValue.mutateAsync({
                      ids: selectedTasksArray,
                      custom_field_id: activeField.id,
                      values: newValue
                    })
                  }
                  label="Save"
                  padding="py-2 px-6"
                  height="h-7"
                  width="w-30"
                />
              </div>
            </div>
          ) : (
            <div className="p-1">
              <section className="relative sticky z-10 flex items-center bg-white">
                <AiOutlineSearch className="absolute w-5 h-5 right-3" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-11/12 p-2 m-auto border-0 rounded-md focus:outline-none"
                  onChange={(e) => searchItem(e.target.value)}
                  value={searchInput}
                />
              </section>
              {filteredProperties.map((field) => (
                <div
                  key={field.id}
                  className="px-4 py-2 hover:bg-alsoit-gray-50 text-sm text-gray-600 text-left space-x-2 w-full rounded-md cursor-pointer"
                  onClick={() => setActiveField(field)}
                >
                  {field.name.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </Menu>
    </>
  );
}
