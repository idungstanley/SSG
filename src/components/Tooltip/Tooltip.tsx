import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import React, { PropsWithChildren } from 'react';
// import { cl } from '../utils';

type CustomToolTipProps = PropsWithChildren<TooltipProps & { color?: string }>;

const ToolTip = styled(({ className, ...props }: CustomToolTipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ color, ...props }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: color || props.theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color || props.theme.palette.common.black
  }
}));

export default ToolTip;
