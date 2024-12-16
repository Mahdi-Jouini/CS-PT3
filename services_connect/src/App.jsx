import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProvidersList from './pages/providersList';
import NotFound from './pages/NotFound';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from "./components/NavBar";
import Provider from "./pages/Provider";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#d1c4e9', // Light variant
      main: '#b39ddb',  // Default/main color
      dark: '#836fa9',  // Dark variant
      //contrastText: '#ffffff', // Text color on primary
    },
    secondary: {
      light: '#f73378', 
      main: '#dc004e', 
      dark: '#9a0036', 
      contrastText: '#ffffff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
      contrastText: '#000000',
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5', // Background for the app
      paper: '#ffffff',   // Background for paper elements
    },
    text: {
      primary: '#212121', // Primary text color
      secondary: '#757575', // Secondary text color
      disabled: '#bdbdbd',  // Disabled text color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: "capitalize",
      //fontWeight: 'bold',
    },
  },
});


function App() {

  return (
<ThemeProvider theme={theme}>

  <BrowserRouter>
  <NavBar/>
    <Routes>   
      <Route path="/" element={<Home />} />
      <Route path="/providers/service/:id" element={<ProvidersList />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/providers/:id" element={<Provider />} />
    </Routes>
  </BrowserRouter>
</ThemeProvider>
  )
}

export default App
