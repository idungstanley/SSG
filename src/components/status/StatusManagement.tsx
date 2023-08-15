import React, { useEffect, useState } from 'react';
import ModalOverlay from '../Modal/ModalOverlay';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsManageStatus } from '../../features/workspace/workspaceSlice';
import Button from '../Button';
import PlusIcon from '../../assets/icons/PlusIcon';
import StatusBodyTemplate from './StatusBodyTemplate';
import Input from '../input/Input';
import { StatusProps } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

const statusTabOptions = [{ label: 'Use Space Statuses' }, { label: 'Custom' }];

const groupStatusByModelType = (statusTypes: StatusProps[]) => {
  return [...new Set(statusTypes.map(({ type }) => type))];
};

export default function StatusManagement() {
  const dispatch = useAppDispatch();
  const { isManageStatus } = useAppSelector((state) => state.workspace);
  const { spaceStatuses } = useAppSelector((state) => state.hub);
  const { statusTaskListDetails } = useAppSelector((state) => state.list);
  const [activeStatusTab, setActiveStatusTab] = useState<string>(statusTabOptions[0].label);
  const [statusTypesState, setStatusTypesState] = useState<StatusProps[]>(spaceStatuses);
  const [newStatusValue, setNewStatusValue] = useState<string>();
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const handleCloseManageStatus = () => {
    dispatch(setIsManageStatus(!isManageStatus));
  };

  useEffect(() => {
    setStatusTypesState(
      spaceStatuses.map((status) => {
        return {
          name: status.name,
          color: status.color,
          id: status.id,
          type: status.type,
          position: status.position
        };
      })
    );
  }, [spaceStatuses]);

  const handleSaveNewStatus = () => {
    if (newStatusValue?.trim() !== '') {
      const newStatusItem: StatusProps = {
        name: newStatusValue,
        color: 'green',
        type: 'custom',
        position: statusTypesState.length,
        id: null
      };
      setStatusTypesState((prevStatusTypes) => [...prevStatusTypes, newStatusItem]);
      setNewStatusValue('');
    }
    setAddStatus(false);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStatusValue(e.target.value);
  };
  const groupedStatus = groupStatusByModelType(spaceStatuses);

  return (
    <ModalOverlay isModalVisible={isManageStatus} onCloseModal={handleCloseManageStatus}>
      <section className="flex flex-col p-4" style={{ minHeight: '450px' }}>
        <div>
          <h1>Edit statuses for {statusTaskListDetails.listName}</h1>
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
              {spaceStatuses.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 p-1 text-white border rounded cursor-pointer border-alsoit-gray-75 justify-items-start"
                >
                  <span className="w-3 h-3 ml-4 rounded" style={{ backgroundColor: item.color as string }}></span>
                  <span style={{ color: item.color as string }} className="uppercase">
                    {item.name}
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
                    .filter((ticket) => ticket.type === uniqueModelType)
                    .map((item, index) => (
                      <>
                        <StatusBodyTemplate index={index} item={item} setStatusTypesState={setStatusTypesState} />
                        {item.type === 'open' && !addStatus && (
                          <span className="flex justify-items-start" onClick={() => setAddStatus(true)}>
                            <Button height="h-8" icon={<PlusIcon active />} label="Add Status" buttonStyle="base" />
                          </span>
                        )}
                        {item.type === 'open' && addStatus && (
                          <span className="flex justify-items-start">
                            <Input
                              trailingIcon={<PlusIcon active />}
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
