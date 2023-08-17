import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import StatusBodyTemplate from '../StatusBodyTemplate';
import Button from '../../Button';
import PlusIcon from '../../../assets/icons/PlusIcon';
import Input from '../../input/Input';
import { StatusProps } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import PlusCircle from '../../../assets/icons/AddCircle';
import { Chevron } from '../../Views/ui/Chevron';

const groupStatusByModelType = (statusTypes: StatusProps[]) => {
  return [...new Set(statusTypes.map(({ type }) => type))];
};

export default function CustomStatus() {
  const { spaceStatuses } = useAppSelector((state) => state.hub);
  const [statusTypesState, setStatusTypesState] = useState<StatusProps[]>(spaceStatuses);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<string>();
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [collapsedStatusGroups, setCollapsedStatusGroups] = useState<{ [key: string]: boolean }>({});

  const handleToggleGroup = (group: string) => {
    setCollapsedStatusGroups((prevCollapsedStatusGroups) => ({
      ...prevCollapsedStatusGroups,
      [group]: !prevCollapsedStatusGroups[group]
    }));
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
  const groupStylesMapping: Record<string, { backgroundColor: string; boxShadow: string }> = {
    open: { backgroundColor: '#FBFBFB', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' },
    custom: { backgroundColor: '#FCF1FF', boxShadow: '0px 0px 5px rgba(128, 0, 128, 0.2)' },
    closed: { backgroundColor: '#E6FAE9', boxShadow: '0px 0px 5px rgba(0, 128, 0, 0.2)' }
    // Add more model_type values and their styles as needed
  };

  return (
    <section className="flex flex-col p-4 gap-2">
      <div className="flex flex-col space-y-6">
        {groupedStatus.map((uniqueModelType, modelTypeIndex) => {
          if (uniqueModelType) {
            return (
              <div
                className="space-y-2 p-2 rounded"
                key={modelTypeIndex}
                style={{
                  backgroundColor: groupStylesMapping[uniqueModelType]?.backgroundColor,
                  boxShadow: groupStylesMapping[uniqueModelType]?.boxShadow
                }}
              >
                {uniqueModelType && (
                  <span className="flex gap-2">
                    <Chevron
                      onToggle={() => handleToggleGroup(uniqueModelType)}
                      active={collapsedStatusGroups[uniqueModelType]}
                      iconColor="text-gray-400"
                    />
                    <p className="flex uppercase justify-items-start">{uniqueModelType} STATUSES</p>
                  </span>
                )}
                {uniqueModelType &&
                  !collapsedStatusGroups[uniqueModelType] &&
                  statusTypesState
                    .filter((ticket) => ticket.type === uniqueModelType)
                    .map((item, index) => (
                      <>
                        <StatusBodyTemplate index={index} item={item} setStatusTypesState={setStatusTypesState} />
                      </>
                    ))}
                {uniqueModelType && uniqueModelType === 'open' && !addStatus && (
                  <span className="flex justify-items-start" onClick={() => setAddStatus(true)}>
                    <Button
                      height="h-7"
                      icon={<PlusCircle active={false} color="white" />}
                      label="Add Status"
                      buttonStyle="base"
                    />
                  </span>
                )}
                {uniqueModelType && uniqueModelType === 'open' && addStatus && (
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
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <p className="text-red-600 mt-auto text-start">{validationMessage}</p>
      <div className="flex justify-center">
        <Button label="Save" buttonStyle="base" width="w-40" height="h-8" />
      </div>
    </section>
  );
}
