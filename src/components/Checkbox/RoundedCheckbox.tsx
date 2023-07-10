import React from 'react';

export default function RoundedCheckbox({
  onChange,
  isChecked,
  styles
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
  styles: string;
}) {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      id="checked-checkbox"
      className={styles}
      style={{ marginLeft: '-0.3px' }}
      onChange={onChange}
      // onClick={() => {
      //   displayNav(task?.id as string);
      // }}
    />
  );
}
