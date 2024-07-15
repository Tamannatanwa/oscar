import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useMediaQuery, Box, Stack, Button } from '@mui/material';

// Function to verify the token
const sendToken = (userData) => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${userData.token}`,
    },
  });
};

const GoogleLoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const onSignIn = (googleUser) => {
    setLoading(true);
    const idToken = googleUser.getAuthResponse().id_token;

    axios({
      url: 'https://merd-api.merakilearn.org/users/auth/google',
      method: 'POST',
      data: {
        idToken: idToken,
        mode: 'web',
      },
    })
      .then((response) => {
        console.log('Successful response:', response);
        const userData = { token: response.data.token };
        return sendToken(userData);
      })
      .then((tokenVerificationResponse) => {
        console.log('Token verification response:', tokenVerificationResponse);
        setLoading(false);
        // Perform further actions upon successful login and token verification
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        // Handle error scenarios
      });
  };

  const onGoogleLoginFail = (errorResponse) => {
    console.error('Google login failed:', errorResponse);
    setLoading(false);
    // Handle failure scenarios
  };

  const isActive = useMediaQuery('(max-width:600px)');
  const isActiveIpad = useMediaQuery('(max-width:768px)');

  return (
    <GoogleLogin
      clientId="925693822218-huca2rj0c58k11hlkcc0jpbfgt5fjmth.apps.googleusercontent.com" // Replace with your actual client ID
      buttonText="Log In with Google"
      onSuccess={onSignIn}
      onFailure={onGoogleLoginFail}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <Button
          variant="contained"
          onClick={renderProps.onClick}
          style={{
            backgroundColor: '#ff5c0a',
            color: '#fff',
            fontFamily: 'cursive',
            border: 'none',
            fontSize: '18px',
            padding: '15px',
            borderRadius: '50px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '10px 0',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          Log In with Google
        </Button>
      )}
    />
  );
};


export default GoogleLoginComponent;
