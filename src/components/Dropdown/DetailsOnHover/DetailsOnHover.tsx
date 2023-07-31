import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Description from '../../badges/Description';

interface DetailsOnHoverProps {
  hoverElement?: React.ReactNode;
  content: React.ReactElement;
  additionalStyles?: { [key: string]: string };
}

export default function DetailsOnHover({ content, hoverElement, additionalStyles }: DetailsOnHoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className="font-semibold alsoit-gray-300 text-alsoit-text-lg flex items-center"
        // style={{ maxWidth: '40%' }}
      >
        {hoverElement ? hoverElement : content}
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, maxWidth: '300px', ...additionalStyles }}>{content}</Typography>
      </Popover>
    </div>
  );
}
