import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { ReactNode } from 'react';

type Option = string; // Change this type to match the type of your options

interface ReusableSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  placeholder: string;
  options: Option[];
  menuMaxHeight: string;
  styles: string;
}

function ReusableSelect({ value, onChange, placeholder, options, menuMaxHeight, styles }: ReusableSelectProps) {
  return (
    <FormControl fullWidth>
      <Select
        value={value}
        className={styles}
        onChange={onChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: menuMaxHeight }
          }
        }}
      >
        <MenuItem value="">
          <span style={{ fontSize: '10px' }}>{placeholder}</span>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            <span style={{ fontSize: '10px' }}>{option}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ReusableSelect;
