import React from 'react';
import {Grid} from "@mui/material"

 const CustomGrid = ({...props}) => {
  return (
    <Grid
    {...props} 
    >
      {props.children}
    </Grid>
  );
};
export default CustomGrid;

