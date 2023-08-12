import React, { useState } from 'react';
import ModalOverlay from '../Modal/ModalOverlay';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsManageStatus } from '../../features/workspace/workspaceSlice';
import Button from '../Button';
import PlusIcon from '../../assets/icons/PlusIcon';
import StatusBodyTemplate from './StatusBodyTemplate';
import Input from '../input/Input';

const statusTabOptions = [{ label: 'Use Space Statuses' }, { label: 'Custom' }];

const statusTypes = [
  { label: 'To do', color: 'grey', model_type: 'open', position: '1' },
  { label: 'In Progress', color: 'purple', model_type: 'custom', position: '2' },
  { label: 'Completed', color: 'green', model_type: 'closed', position: '3' }
];

interface ItemProps {
  label?: string;
  color: string;
  model_type: string;
}

const groupStatusByModelType = (statusTypes: ItemProps[]) => {
  return [...new Set(statusTypes.map(({ model_type }) => model_type))];
};

export default function StatusManagement() {
  const dispatch = useAppDispatch();
  const { isManageStatus } = useAppSelector((state) => state.workspace);
  const [activeStatusTab, setActiveStatusTab] = useState<string>(statusTabOptions[0].label);
  const [statusTypesState, setStatusTypesState] = useState<ItemProps[]>(statusTypes);
  const [newStatusValue, setNewStatusValue] = useState<string>();
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const handleCloseManageStatus = () => {
    dispatch(setIsManageStatus(!isManageStatus));
  };

  const handleSaveNewStatus = () => {
    if (newStatusValue?.trim() !== '') {
      const newStatusItem = {
        label: newStatusValue,
        color: 'green',
        model_type: 'custom'
      };
      setStatusTypesState((prevStatusTypes) => [...prevStatusTypes, newStatusItem]);
      setNewStatusValue('');
    }
    setAddStatus(false);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStatusValue(e.target.value);
  };
  const groupedStatus = groupStatusByModelType(statusTypesState);

  return (
    <ModalOverlay isModalVisible={isManageStatus} onCloseModal={handleCloseManageStatus}>
      <section className="flex flex-col p-4" style={{ minHeight: '450px' }}>
        <div>
          <h1>Edit statuses for List</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="flex flex-col space-y-3">
            {statusTabOptions.map((item, index) => (
              <span
                key={index}
                onClick={() => setActiveStatusTab(item.label)}
                className={`flex p-1 cursor-pointer justify-items-start  ${
                  activeStatusTab === item.label ? 'bg-alsoit-purple-300 text-white rounded' : ''
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>
          {activeStatusTab === statusTabOptions[0].label ? (
            <div className="flex flex-col space-y-2">
              {statusTypesState.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 p-1 text-white border rounded cursor-pointer border-alsoit-gray-75 justify-items-start"
                >
                  <span className="w-3 h-3 ml-4 rounded" style={{ backgroundColor: item.color }}></span>
                  <span style={{ color: item.color }} className="uppercase">
                    {item.label}
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-6">
              {groupedStatus.map((uniqueModelType, modelTypeIndex) => (
                <div className="space-y-2" key={modelTypeIndex}>
                  <p className="flex uppercase justify-items-start">{uniqueModelType} STATUSES</p>
                  {statusTypesState
                    .filter((ticket) => ticket.model_type === uniqueModelType)
                    .map((item, index) => (
                      <>
                        <StatusBodyTemplate index={index} item={item} setStatusTypesState={setStatusTypesState} />
                        {item.model_type === 'open' && !addStatus && (
                          <span className="flex justify-items-start" onClick={() => setAddStatus(true)}>
                            <Button height="h-8" icon={<PlusIcon />} label="Add Status" buttonStyle="base" />
                          </span>
                        )}
                        {item.model_type === 'open' && addStatus && (
                          <span className="flex justify-items-start">
                            <Input
                              trailingIcon={<PlusIcon />}
                              placeholder="Type Status name"
                              name="Status"
                              onChange={handleOnChange}
                              value={newStatusValue}
                              trailingClick={handleSaveNewStatus}
                            />
                          </span>
                        )}
                      </>
                    ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-auto">
          <Button label="Save" buttonStyle="base" width="w-full" />
        </div>
      </section>
    </ModalOverlay>
  );
}
