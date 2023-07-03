import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

export default function ResponsiveDialog() {


  const navigate = useNavigate()

  function nav()
  {
          navigate( "/worlds/hardacc/" );
  }


  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <h2 style={{color:"black"}}>Browser configuration</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h3 style={{color:"black"}}>In case you experience lag or low frame rates while playing the game, you may need to enable Hardware Acceleration in your browser.</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={nav}>
            Enable Hardware Acceleration
          </Button>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}