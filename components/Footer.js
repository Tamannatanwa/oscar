// Footer.js
import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  width: '100%',
  backgroundColor: '#f8f8f8',
  textAlign: 'center',
  padding: '1rem',
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 1000,
});

const HoverText = styled(Typography)({
  display: 'none',
  color: 'gray',
  marginLeft: '8px',
  marginRight: '8px',
});

const HoverContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '&:hover .hover-text': {
    display: 'block',
  },
});

const Footer = () => {
  const handleUploadAudio = () => {
    console.log('Upload audio clicked');
  };

  const handleEditNote = () => {
    console.log('Edit note clicked');
  };

  return (
    <FooterContainer sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Tooltip title="Upload Audio">
        <HoverContainer>
          <IconButton aria-label="upload audio" onMouseEnter={() => console.log('Hover Upload Audio')}>
            <ArrowUpwardIcon sx={{ fontSize: 40, padding: "10px", backgroundColor: "gray", color: "#fff", borderRadius: "50%" }} />
          </IconButton>
          <HoverText className="hover-text">Upload Audio</HoverText>
        </HoverContainer>
      </Tooltip>
      <MicIcon sx={{ backgroundColor: "#ff5c0a", color: '#fff', fontSize: 100, borderRadius: "50%", padding: "20px"}} />
      <Tooltip title="Rewrite the Text Note">
        <HoverContainer>
          <HoverText className="hover-text">Rewrite the Text Note</HoverText>
          <IconButton aria-label="edit note" onMouseEnter={() => console.log('Hover Rewrite the Text Note')}>
            <EditIcon sx={{ fontSize: 40, padding: "10px", backgroundColor: "gray", color: "#fff", borderRadius: "50%" }} />
          </IconButton>
        </HoverContainer>
      </Tooltip>
    </FooterContainer>
  );
};

export default Footer;
