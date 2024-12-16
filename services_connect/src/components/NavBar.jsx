import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import Login from './Login';
import Signin from './Signin';
import logo from '../assets/service-connect.svg';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar position="fixed" sx={{ bgcolor: 'white' }}>
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <Box  sx={{height: 40}} component={'img'} src={logo} ></Box>
          <Button
            startIcon={open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            color="inherit"
            onClick={handleMenuClick}
          >
            Accueil
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={handleCloseMenu}>Profil</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Paramètres</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Déconnexion</MenuItem>
          </Menu>
          <Button color="inherit">Tableau de bord</Button>
          <Button color="inherit" sx={{ ml: 'auto' }} onClick={() => setOpenSignInDialog(true)}>
            Inscription
          </Button>
          <Button color="inherit" onClick={() => setOpenLoginDialog(true)}>
            Connexion
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dialogs */}
      <Login open={openLoginDialog} onClose={() => setOpenLoginDialog(false)} />
      <Signin open={openSignInDialog} onClose={() => setOpenSignInDialog(false)} />
    </Box>
  );
}
