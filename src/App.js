import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import MuiAppBar from './components/MuiAppBar'
import Game from './components/Game';
import Generate from './components/Generate';
import Home from './components/Home';
import HardAcc from './components/hardacc';

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#FFFFFF"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <BrowserRouter>
    <MuiAppBar/>
      <Routes>
          <Route path="worlds/" element={<Home />}/>
          <Route path="worlds/generate/" element={<Generate/>} />
          <Route path="worlds/game/" element={<Game />} />
          <Route path="worlds/hardacc/" element={<HardAcc />} />
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
