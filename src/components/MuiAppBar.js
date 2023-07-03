import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { Link , Routes, Route } from "react-router-dom";

const pages = ['Home', 'Generate'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function MuiAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar style={{display:"flex", justifySelf:"flex-start", background:"black", height: "8vh", paddingTop: "0.3%"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PublicOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/worlds"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WORLDS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <Link to="/worlds">
                <MenuItem key={0} onClick={() => {console.log("Home")}}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                </Link>

                <Link to="/worlds/generate">
                <MenuItem key={1} onClick={() => {console.log("GEN")}}>
                  <Typography textAlign="center">GENERATE</Typography>
                </MenuItem>
                </Link>

            </Menu>
          </Box>
          <PublicOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/worlds/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WORLDS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
             
             
                <Link to="/worlds/">
                <Button key={0} onClick={() => {console.log("Home")}} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Typography textAlign="center">Home</Typography>
                </Button>
                </Link>

                <Link to="/worlds/generate">
                <Button key={1} onClick={() => {console.log("GEN")}} sx={{ my: 2, color: 'white', display: 'block' }}  >
                  <Typography textAlign="center">GENERATE</Typography>
                </Button>
                </Link>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MuiAppBar;