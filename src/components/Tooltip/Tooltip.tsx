import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import React from 'react';
// import { cl } from '../utils';

const ToolTip = styled(({ className, placement, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement={placement ?? 'top'} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
    '&:before': {
      transform: 'rotate(45deg) skew(14deg, 14deg)',
      borderRadius: '1px'
    }
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    padding: '4px',
    maxWidth: 'max-content'
  }
}));

export default ToolTip;
