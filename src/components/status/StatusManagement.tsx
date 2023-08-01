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
  { label: 'To do', color: 'grey', model_type: 'open' },
  { label: 'In Progress', color: 'purple', model_type: 'custom' },
  { label: 'Completed', color: 'green', model_type: 'closed' }
];

export default function StatusManagement() {
  const dispatch = useAppDispatch();
  const { isManageStatus } = useAppSelector((state) => state.workspace);
  const [activeStatusTab, setActiveStatusTab] = useState<string>(statusTabOptions[0].label);
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const handleCloseManageStatus = () => {
    dispatch(setIsManageStatus(!isManageStatus));
  };
  const handleSaveNewStatus = () => {
    setAddStatus(false);
  };

  return (
    <ModalOverlay isModalVisible={isManageStatus} onCloseModal={handleCloseManageStatus}>
      <section className="flex flex-col p-4" style={{ height: '450px' }}>
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
              {statusTypes.map((item, index) => (
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
              {statusTypes.map((item, index) => (
                <div className="space-y-2" key={index}>
                  <p className="flex uppercase justify-items-start">{item.model_type + ' STATUSES'}</p>
                  <StatusBodyTemplate index={index} item={item} />
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
                        onChange={() => ({})}
                        trailingClick={handleSaveNewStatus}
                      />
                    </span>
                  )}
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
