import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import Copy from '../../../../../../assets/icons/Copy';
import { cl } from '../../../../../../utils';

interface LocationProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
}

function LocationField({ taskCustomFields, taskId, fieldId }: LocationProps) {
  const [location, setLocation] = useState<string | undefined>(taskCustomFields?.values[0].value);
  const [isCopied, setIsCopied] = useState<number>(0);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleSetNewLocation = (place?: google.maps.places.PlaceResult) => {
    const lat = place?.geometry?.location?.lat();
    const lon = place?.geometry?.location?.lng();
    const value = place?.formatted_address;
    if (value)
      onUpdate({
        taskId,
        value: [{ value: value, lat, lon }],
        fieldId
      });
    setLocation(value);
  };

  const handleCopyTexts = async () => {
    if (location) {
      await navigator.clipboard.writeText(location);
      setIsCopied(1);
      setTimeout(() => {
        setIsCopied(0);
      }, 500);
    }
  };

  return (
    <div className="w-full flex justify-center group/parent">
      <Autocomplete
        style={{ width: '90%', backgroundColor: 'transparent' }}
        apiKey={process.env.REACT_APP_GOOGLE_APIKEY}
        onPlaceSelected={(place) => {
          handleSetNewLocation(place);
        }}
        options={{
          types: ['address']
        }}
        defaultValue={location}
        className="truncate"
      />
      <figure
        className={cl(
          'opacity-0 cursor-pointer',
          isCopied === 1 ? 'mt-1' : '',
          !location ? 'group-hover/parent:opacity-0' : 'group-hover/parent:opacity-100'
        )}
        style={{ width: '10%' }}
        onClick={handleCopyTexts}
      >
        <Copy />
      </figure>
    </div>
  );
}

export default LocationField;
