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

import Landing from './components/marketplace/Landing';
import SignIn from './components/marketplace/SignIn';
import SignUp from './components/marketplace/SignUp';
import Dashboard from './components/marketplace/Dashboard';

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
          <Route path="worlds/marketplace/" element={ <Landing/> }/>
          <Route path="worlds/marketplace/signin" element={ <SignIn/> }/>
          <Route path="worlds/marketplace/signup" element={ <SignUp/> }/>
          <Route path="worlds/marketplace/dashboard" element={ <Dashboard/> }/>
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
