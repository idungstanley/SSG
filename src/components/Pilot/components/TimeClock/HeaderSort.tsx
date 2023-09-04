import { useAppSelector } from '../../../../app/hooks';
import ArrowCaretUp from '../../../../assets/icons/ArrowCaretUp';
import CancelIcon from '../../../../assets/icons/Cancel';
import { Header } from './ClockLog';

interface Props {
  handleRemoveFilter: (title: string) => void;
  col: Header;
  setIconToggle: (
    value: React.SetStateAction<{
      cancelIcon: boolean;
      plusIcon: boolean;
    }>
  ) => void;
  icontoggle: {
    cancelIcon: boolean;
    plusIcon: boolean;
  };
}

export function HeaderSort({ handleRemoveFilter, col, setIconToggle, icontoggle }: Props) {
  const { timeArr, timeSortArr } = useAppSelector((state) => state.task);
  return (
    <div className="rounded-full sortClose-group">
      <div className="relative flex items-center justify-center w-5 h-5 space-x-1 font-medium text-white uppercase rounded-full cursor-pointer text-alsoit-text-lg bg-alsoit-danger group">
        <div className="font-bold cursor-pointer hover:text-clip" style={{ fontSize: '8px' }}>
          <>
            {timeArr.length === 1 && timeSortArr.length ? (
              <ArrowCaretUp active={false} dimensions={{ height: 6, width: 6 }} />
            ) : (
              <span className="flex gap-1">
                {timeArr.indexOf(col.title) + 1}
                <ArrowCaretUp active={false} dimensions={{ height: 6, width: 6 }} />
              </span>
            )}
          </>
        </div>
      </div>
      <div
        onClick={() => handleRemoveFilter(col.title)}
        onMouseEnter={() =>
          setIconToggle((prev) => ({
            ...prev,
            cancelIcon: true
          }))
        }
        onMouseLeave={() =>
          setIconToggle((prev) => ({
            ...prev,
            cancelIcon: false
          }))
        }
      >
        <CancelIcon active={icontoggle.cancelIcon} dimensions={{ width: 12, height: 12 }} />
      </div>
    </div>
  );
}
