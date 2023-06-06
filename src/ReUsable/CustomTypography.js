import React from 'react';
import {Typography}from "@mui/material"

const CustomTypography = ({...props}) => {
  return (
    <Typography 
    {...props}
    >
      {props.children}
    </Typography>
  );
};

export default CustomTypography;