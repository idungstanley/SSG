import React, { useState } from 'react';
import NewColumn from '../../Components/NewColumn';
import { useAppSelector } from '../../../../../../app/hooks';
import CustomPropertyList from '../../Components/CustomPropertyList';
import NamedIconPair from '../../Components/NamedIconPair';
import CollapseIcon from '../../../../../Views/ui/collapseIcon/CollapseIcon';

export default function AddProperty() {
  const { columnTypes } = CustomPropertyList('white');
  const [openCard, setOpenCard] = useState<boolean>(false);

  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);
  const selectedPropertyType = React.useMemo(
    () =>
      columnTypes.find((option) => option.children.find((child) => child.id === newCustomPropertyDetails.id)) || null,
    [newCustomPropertyDetails, columnTypes]
  );

  const selectedChildProperty = React.useMemo(
    () => selectedPropertyType?.children.find((option) => option.id === newCustomPropertyDetails.id),
    [selectedPropertyType, newCustomPropertyDetails.id]
  );
  const title = '';

  return (
    <div className="w-full text-gray-500 bg-gray-100 rounded-md">
      <div className="grid h-8 " style={{ gridTemplateColumns: '36% 50%' }}>
        <div className="flex items-center uppercase">
          <div
            className={`flex items-center w-full gap-2 h-8 p-2 uppercase  bg-alsoit-gray-75 grow ${
              openCard ? 'rounded-tl-lg rounded-br-lg' : 'rounded-md rounded-tr-none'
            }`}
            onClick={() => setOpenCard((prev) => !prev)}
          >
            <span className="flex items-center justify-center w-5 h-5">
              <CollapseIcon color="#919191" active={!openCard} onToggle={() => ({})} hoverBg="white" />
            </span>
            <NamedIconPair
              isLeadingIcon={true}
              backgroundImage="linear-gradient(to right, transparent , #B2B2B2)"
              parentName={selectedPropertyType ? (selectedPropertyType?.title as string) : 'Type'}
              parentIcon={selectedPropertyType ? (selectedPropertyType?.icon as JSX.Element) : undefined}
              childIcon={selectedChildProperty ? (selectedChildProperty?.icon as JSX.Element) : undefined}
              childName={selectedChildProperty ? (selectedChildProperty?.name as string) : 'Title'}
            />
          </div>
          <p>{title}</p>
        </div>
      </div>
      {openCard && (
        <div className="p-2 pb-4 pl-4">
          <NewColumn />
        </div>
      )}
    </div>
  );
}
