import React from 'react';
import {TextField} from "@mui/material";

const CustomTextField = ({ label, ...props }) => {
  return (
    <TextField
      {...props}
      label={label}
    />
  );
};

export default CustomTextField;