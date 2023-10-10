import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Toast from '../../../../../common/Toast';
import { expiresIn } from '../../../../../features/shared/shared.interfaces';
import { useGetPublishLink } from '../../../../../features/shared/sharedService';
import useCopyToClipboard from '../../../../../hooks';
import SelectMenuSimple from '../../../../selectMenu/SelectMenuSimple';

interface PublishProps {
  shareLinkId: string;
  setShareLinkId: (i: string | null) => void;
}

const options: { id: string; name: expiresIn }[] = [
  {
    id: '1_hour',
    name: '1-hour'
  },
  {
    id: '3_hours',
    name: '3-hours'
  },
  {
    id: 'day',
    name: '24-hours'
  },
  {
    id: '3_days',
    name: '3-days'
  },
  {
    id: '7_days',
    name: '7-days'
  }
];

export default function Publish({ shareLinkId, setShareLinkId }: PublishProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const { mutate: onPublish, data } = useGetPublishLink(shareLinkId);

  const [onCopy] = useCopyToClipboard();

  const handlePublish = () => {
    onPublish({
      linkId: shareLinkId,
      expiresIn: selectedOption.name
    });
  };

  useEffect(() => {
    if (data?.data) {
      // save link to clipboard
      onCopy(data.data[0].temporary_url);

      // reset selected linkId
      setShareLinkId(null);

      // show toast with message
      toast.custom((t) => <Toast type="success" title={'Copied link to clipboard'} body={null} toastId={t.id} />);
    }
  }, [data?.data]);

  const onSelect = (selectedId: string) => {
    const findOption = options.find((i) => i.id === selectedId);

    if (findOption) {
      setSelectedOption(findOption);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-6">
      <SelectMenuSimple
        label="Select expires time"
        options={options}
        onChange={onSelect}
        selectedId={selectedOption.id}
      />

      <button
        type="button"
        onClick={handlePublish}
        disabled={!selectedOption}
        className="rounded mt-3 border border-transparent px-2.5 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:outline-none ring-0 focus:ring-0"
      >
        Copy link
      </button>
    </div>
  );
}
