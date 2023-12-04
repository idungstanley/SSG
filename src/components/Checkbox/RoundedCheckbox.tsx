import React from 'react';

export default function RoundedCheckbox({
  onChange,
  isChecked,
  styles,
  onListStyle,
  listBg
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
  styles: string;
  onListStyle?: string;
  listBg?: string;
}) {
  const borderStyle = `solid 1px ${listBg}`;
  return (
    <input
      type="checkbox"
      checked={isChecked}
      id="checked-checkbox"
      className={`${onListStyle && 'mb-1.5'} ${styles}`}
      style={{
        marginLeft: onListStyle ? '1px' : '-0.3px',
        backgroundColor: onListStyle && !isChecked ? onListStyle : '',
        borderColor: onListStyle && !isChecked ? onListStyle : '',
        border: onListStyle ? borderStyle : ''
      }}
      onChange={onChange}
    />
  );
}
