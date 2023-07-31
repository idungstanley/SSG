import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import React from 'react';
// import { cl } from '../utils';

const ToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black
  }
}));

export default ToolTip;
