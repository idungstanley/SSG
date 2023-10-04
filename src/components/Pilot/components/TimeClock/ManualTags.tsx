import { LabelIcon } from '../../../../assets/icons/LabelIcon';
import { MemoIcon } from '../../../../assets/icons/MemoIcon';
import { PoundsIcon } from '../../../../assets/icons/PoundsIcon';
import TagIcon from '../../../../assets/icons/TagIcon';

export function ManualTags() {
  return (
    <div className="flex space-x-1.5 items-center justify-center px-1 pt-1 pb-1.5 mt-5 w-28 rounded-sm bg-white">
      <PoundsIcon className="w-5 h-5 cursor-pointer" active />
      <MemoIcon className="w-5 h-5 cursor-pointer" active />
      <LabelIcon className="w-5 h-5 cursor-pointer" active />
      <TagIcon className="w-5 h-5 cursor-pointer" active />
    </div>
  );
}
