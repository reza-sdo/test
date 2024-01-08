import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});


// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>
  </BrowserRouter>
);
