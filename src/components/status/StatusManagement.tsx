import React, { useState } from 'react';
import ModalOverlay from '../Modal/ModalOverlay';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsManageStatus } from '../../features/workspace/workspaceSlice';
import Button from '../Button';
import PlusIcon from '../../assets/icons/PlusIcon';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import { IoMdCheckmark } from 'react-icons/io';

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

  const [editableStates, setEditableStates] = useState<boolean[]>(statusTypes.map(() => false));

  const handleToggleEditableContent = (index: number) => {
    // Create a new array with the same values as editableStates
    const newEditableStates = [...editableStates];
    // Toggle the editable state for the clicked status item
    newEditableStates[index] = true;
    setEditableStates(newEditableStates);
  };
  const handleCloseManageStatus = () => {
    dispatch(setIsManageStatus(!isManageStatus));
  };

  const handleSaveEditableContent = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    const newEditableStates = [...editableStates];
    // Toggle the editable state for the clicked status item
    newEditableStates[index] = false;
    setEditableStates(newEditableStates);
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
                  <span
                    key={index}
                    className="flex items-center gap-2 p-1 border rounded cursor-pointer justify-items-start border-alsoit-gray-75"
                    onClick={() => handleToggleEditableContent(index)}
                  >
                    <span className="w-3 h-3 ml-4 rounded" style={{ backgroundColor: item.color }}></span>
                    <span contentEditable={editableStates[index]} style={{ color: item.color }} className="uppercase">
                      {item.label}
                    </span>
                    {!editableStates[index] && (
                      <span className="ml-auto" onClick={(e) => e.stopPropagation()}>
                        <ThreeDotIcon />
                      </span>
                    )}
                    {editableStates[index] && (
                      <span className="ml-auto text-green-400" onClick={(e) => handleSaveEditableContent(e, index)}>
                        <IoMdCheckmark />
                      </span>
                    )}
                  </span>
                  {item.label === 'To do' && (
                    <span className="flex justify-items-start">
                      <Button height="h-8" icon={<PlusIcon />} label="Add Status" buttonStyle="base" />
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
