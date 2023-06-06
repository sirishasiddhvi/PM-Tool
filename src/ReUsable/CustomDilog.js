import React from 'react';
import {Dialog,DialogContent,DialogContentText} from "@mui/material"

const CustomDialog = ({...props}) => {
  return (
    <Dialog {...props}>
       <DialogContent>
              <DialogContentText >  {props.children}</DialogContentText>
    </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;