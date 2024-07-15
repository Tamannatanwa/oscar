// Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

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

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <HoverContainer>
          <IconButton edge="start" color="inherit" aria-label="profile">
            <AccountCircleIcon sx={{ fontSize: 50 }} />
          </IconButton>
          <HoverText className="hover-text">Profile</HoverText>
        </HoverContainer>
        <Box sx={{ flexGrow: 1 }} />
        <HoverContainer>
          <HoverText className="hover-text">Settings</HoverText>
          <IconButton edge="end" color="inherit" aria-label="settings">
            <SettingsIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </HoverContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
