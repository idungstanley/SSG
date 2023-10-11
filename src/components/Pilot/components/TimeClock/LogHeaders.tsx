import { TIME_INVENTORY_HEADER } from '../../../../utils/Constants/TimeClockConstants';

export function LogHeaders() {
  const headers = () =>
    TIME_INVENTORY_HEADER.map((header, index) => {
      return (
        <div key={index} className={`${index <= 1 ? 'header-cell-reduced' : 'header-cell'} text-alsoit-text-md`}>
          {header.name}
        </div>
      );
    });

  return (
    <div className="overflow-x-visible w-full">
      <div className="flex">{headers()}</div>
    </div>
  );
}
