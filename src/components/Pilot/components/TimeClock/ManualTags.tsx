import { LabelIcon } from '../../../../assets/icons/LabelIcon';
import { MemoIcon } from '../../../../assets/icons/MemoIcon';
import { PoundsIcon } from '../../../../assets/icons/PoundsIcon';
import TagIcon from '../../../../assets/icons/TagIcon';

interface Props {
  IconsInteractions: { [key: string]: string };
  billable?: boolean;
}

export function ManualTags({ IconsInteractions, billable }: Props) {
  return (
    <div className="flex space-x-1.5 items-center justify-center px-1 pt-1 pb-1.5 mt-5 w-28 rounded-sm bg-white">
      <PoundsIcon className="w-5 h-5 cursor-pointer" active={billable} />
      <MemoIcon className="w-5 h-5 cursor-pointer" active={!!IconsInteractions['description']} />
      <LabelIcon className="w-5 h-5 cursor-pointer" active={!!IconsInteractions['label']} />
      <TagIcon className="w-5 h-5 cursor-pointer" active={!!IconsInteractions['tags']} />
    </div>
  );
}
