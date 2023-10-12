import ArrowRight from '../../../../assets/icons/ArrowRight';
import { TIME_LABEL_PROPERTY } from '../../../../utils/Constants/TimeClockConstants';

export function TimeLabel() {
  return TIME_LABEL_PROPERTY.map((entry, index) => (
    <div key={index} className="flex flex-col space-y-2.5 capitalize">
      <div className="flex w-full py-2 px-1.5 hover:bg-alsoit-purple-50 cursor-pointer justify-between items-center">
        <span>{entry.name}</span>
        <ArrowRight />
      </div>
    </div>
  ));
}
