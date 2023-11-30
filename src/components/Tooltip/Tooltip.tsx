import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import React from 'react';
// import { cl } from '../utils';

const ToolTip = styled(({ className, placement, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement={placement ?? 'top'} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#424242',
    '&:before': {
      transform: 'rotate(45deg) skew(14deg, 14deg)',
      borderRadius: '1px'
    }
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#424242',
    fontSize: '10px',
    padding: '2px 5px 2px 5px',
    borderRadius: '2px',
    marginLeft: '0'
  }
}));

export default ToolTip;
