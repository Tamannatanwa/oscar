import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import "../styles/globals.css";
import Home from "./index";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <Head>
        <title>Oscar</title>
        <meta name="description" content="Created by Navgurukul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Oscar.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap"
        />
      </Head>
      <GoogleOAuthProvider clientId="925693822218-huca2rj0c58k11hlkcc0jpbfgt5fjmth.apps.googleusercontent.com">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
