import { useState } from 'react';
import headerIcon from '../../assets/icons/headerIcon.png';
import Checkbox from '../Checkbox';

interface ITimeHubItem {
  data: {
    id: string;
    value: string;
  };
}
export default function TimeHubItem({ data }: ITimeHubItem) {
  const [isCheckedItem, setCheckedItem] = useState<boolean>(false);

  return (
    <div className="flex items-center px-6 py-3">
      <Checkbox checked={isCheckedItem} onChange={() => setCheckedItem(!isCheckedItem)} height="5" width="5" />
      <img src={headerIcon} alt="" className="w-4 h-4 mr-4 ml-3" />
      {data.value}
    </div>
  );
}
