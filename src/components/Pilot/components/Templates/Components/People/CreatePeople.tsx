import React, { useState } from 'react';
import RoundedCheckbox from '../../../../../Checkbox/RoundedCheckbox';
import SaveCols from '../SaveCols';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';

function CreatePeople() {
  const [teams, setTeams] = useState(false);
  const [singleUser, setSingleUser] = useState(true);
  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField();

  const handleSubmit = () => {
    if (newCustomPropertyDetails.name && entityForCustom) {
      const name = newCustomPropertyDetails.name;
      const color = newCustomPropertyDetails.color;
      const is_bold = newCustomPropertyDetails.style?.is_bold;
      const is_italic = newCustomPropertyDetails.style?.is_italic;
      const is_underlined = newCustomPropertyDetails.style?.is_underlined;
      const style = {
        is_bold: is_bold as string,
        is_italic: is_italic as string,
        is_underlined: is_underlined as string
      };
      const customType = 'people';
      onCreate({
        name,
        style,
        color,
        id: entityForCustom.id,
        type: entityForCustom.type,
        options: undefined,
        customType,
        properties: {
          include_groups: teams,
          single_user: !singleUser
        }
      });
    }
  };
  return (
    <div>
      {/* To be implemented later */}
      {/* <div className="flex items-center gap-2 my-4">
        <RoundedCheckbox
          onChange={() => null}
          isChecked={false}
          styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
        />
        <h2>Show People from my entire workspace</h2>
      </div> */}
      {/* <div className="flex items-center gap-2 my-4">
        <RoundedCheckbox
          onChange={() => null}
          isChecked={false}
          styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
        />
        <h2>Show Guests</h2>
      </div> */}
      <div className="flex items-center gap-2 my-4">
        <RoundedCheckbox
          onChange={() => setSingleUser(!singleUser)}
          isChecked={singleUser}
          styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
        />
        <h2>Select multiple people</h2>
      </div>
      <div className="flex items-center gap-2 my-4">
        <RoundedCheckbox
          onChange={() => setTeams(!teams)}
          isChecked={teams}
          styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
        />
        <h2>Include Teams</h2>
      </div>
      <SaveCols
        handleSubmit={handleSubmit}
        header="People"
        body="This custom property which allows to track clients, vendors, leads and more by adding them against a task"
      />
    </div>
  );
}

export default CreatePeople;
