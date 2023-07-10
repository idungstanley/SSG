import React from 'react';

export default function RoundedCheckbox({
  onChange,
  isChecked
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
}) {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      id="checked-checkbox"
      className="w-2 h-2 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100"
      style={{ marginLeft: '-0.3px' }}
      onChange={onChange}
      // onClick={() => {
      //   displayNav(task?.id as string);
      // }}
    />
  );
}
