import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Data from "./page/Data";
import { createTheme } from "@mui/material";
import { useEffect } from 'react';

function App() {


  const theme = createTheme({
    direction: "rtl",
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/data" element={<Data />} />
      </Routes>
      
    </>
  );
}

export default App;
