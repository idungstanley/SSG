import React from 'react';

export default function RoundedCheckbox({
  onChange,
  isChecked,
  styles,
  onListStyle
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
  styles: string;
  onListStyle?: string;
}) {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      id="checked-checkbox"
      className={styles}
      style={{
        marginLeft: '-0.3px',
        backgroundColor: onListStyle && !isChecked ? onListStyle : '',
        borderColor: onListStyle && !isChecked ? onListStyle : ''
      }}
      onChange={onChange}
    />
  );
}
