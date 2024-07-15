// SignupPage.js
import React, { useState } from 'react';
import { Box, Container, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import styles from '../styles/SignupPage.module.css';
import GoogleLoginComponent from './GoogleLogin';

const SignupPage = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailLogin = () => {
    console.log('Email login clicked');
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Fraunces, Arial, sans-serif !important',
      }}
    >
      <Box mt={15} textAlign="center">
        <Typography variant="h1" fontSize={90}>
          Go from fuzzy thought
        </Typography>
        <Typography variant="h1" fontSize={90}>
          to clear text.
          <span style={{ color: '#FF5C0A', fontFamily: 'cursive' }}> Fast.</span>
        </Typography>
        <Typography variant="h5" mt={4} fontFamily="DM Sans" fontWeight="bold">
          AudioPen converts voice notes into text that's easy to read and ready to share.
        </Typography>
        <Typography variant="h5" fontWeight="lighter" paddingInline={32} mt={4}>
          Create meeting notes, memos, emails, articles and more. All you have to do is talk.
        </Typography>
        <Box mt={5}>
          <button className={styles.primaryButton} onClick={handleClickOpen}>
            sign up / log in
          </button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} PaperProps={{ className: styles.dialogPaper }}>
        <DialogTitle className={styles.dialogTitle}>
          <Typography variant="h4">sign up / log in</Typography>
        </DialogTitle>
        <DialogContent>
          <Box mt={4}>
            {open && <GoogleLoginComponent />}
          </Box>
          <Box mt={2}>
            <button className={styles.secondaryButton} onClick={handleEmailLogin}>
              or sign up / log in with email
            </button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default SignupPage;
