import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import StatusBodyTemplate from '../StatusBodyTemplate';
import Button from '../../Button';
import PlusIcon from '../../../assets/icons/PlusIcon';
import Input from '../../input/Input';
import { StatusProps } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

const statusTabOptions = [{ label: 'Use Space Statuses' }, { label: 'Custom' }];

const groupStatusByModelType = (statusTypes: StatusProps[]) => {
  return [...new Set(statusTypes.map(({ type }) => type))];
};

export default function CustomStatus() {
  const { spaceStatuses } = useAppSelector((state) => state.hub);
  const { statusTaskListDetails } = useAppSelector((state) => state.list);
  const [activeStatusTab, setActiveStatusTab] = useState<string>(statusTabOptions[0].label);
  const [statusTypesState, setStatusTypesState] = useState<StatusProps[]>(spaceStatuses);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<string>();
  const [addStatus, setAddStatus] = useState<boolean>(false);

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
    const nameWithoutWhiteSpace = newStatusValue?.trim();
    const isNameExist = statusTypesState.some(
      (status) => status.name?.toLowerCase() === nameWithoutWhiteSpace?.toLowerCase()
    );
    if (nameWithoutWhiteSpace !== '' && !isNameExist) {
      const newStatusItem: StatusProps = {
        name: newStatusValue,
        color: 'green',
        type: 'custom',
        position: statusTypesState.length,
        id: null
      };
      setStatusTypesState((prevStatusTypes) => [...prevStatusTypes, newStatusItem]);
      setNewStatusValue('');
      setValidationMessage('');
    } else {
      setNewStatusValue('');
      setValidationMessage(`Whoops, status with name '${newStatusValue}' already exist`);
    }
    setAddStatus(false);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStatusValue(e.target.value);
  };
  const groupedStatus = groupStatusByModelType(spaceStatuses);

  return (
    <section className="flex flex-col p-4">
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
      <p className="text-red-600 mt-auto text-start">{validationMessage}</p>
      <div className="mt-auto">
        <Button label="Save" buttonStyle="base" width="w-full" />
      </div>
    </section>
  );
}
