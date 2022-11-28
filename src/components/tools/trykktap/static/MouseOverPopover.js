import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import NotListedLocationSharpIcon from '@mui/icons-material/NotListedLocationSharp';

export  function MouseOverPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <NotListedLocationSharpIcon />
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 ,maxWidth :300}}>{props.popoverText}</Typography>
      </Popover>
    </div>
  );
}



export const popoverText ={
    påfylling: `KB 25 / KB 32:
    For flere F11x5/12x5 antas det at påfyllingssett kobles på returledning til én av maskinene. 
    For F13x5 antas det at påfyllingssett kobles til returledningen til én kompressormodul
    \n
    PÅFYLLING 1 1/2'' OG 2'':
    Disse produktene er tatt ut for større system og antas alltid plassert i hovedrørstrekk. 
    Mao vil disse produktene alltid få hele kuldebærerstrømningen gjennom seg`,

  samlekum: `For den minst gunstig brønn som er lengst unna fra samlekum. Distanse, ikke total rørlengde. Distansen multipliseres med 2 for å antall rørmeter. 
  `,


  øvrigetap: `ved nominell strømning`,

}