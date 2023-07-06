import React from "react";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import "./Dashboard.css";

function DashboardDrawer(props)
{
    return (
        <Drawer
        variant="permanent"
        sx={{
          display: "flex",
          width: "17%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "17%", boxSizing: 'border-box', boxShadow : "0px 0px 1vw 0px #00000069" },
        }}
      >
        <Toolbar />
        <div className="SidebarLogo"  />
        <h2 className="UserGreet">Welcome, <br/><b>{props.userName}</b></h2>
          <Divider />
        <Box sx={{ overflow: 'auto' , display: "flex", flexDirection : "column" , height: "100%"}}>
          <List>
            {['Home', 'Generate', 'Gallery', 'Market'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={ () => { props.changeWindow(index) } }>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Divider  sx={{ marginTop : "auto"}}/>
          <List>
            {['Sign Out'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={ () => { props.signOut() } }>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    )
}

export default DashboardDrawer;