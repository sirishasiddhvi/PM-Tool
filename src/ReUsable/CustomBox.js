import React from 'react';
import {Box} from "@mui/material"

const CustomBox = ({...props}) => {
  return (
    <Box
    {...props} 
    >
      {/* {props.children} */}
    </Box>
  );
};

export default CustomBox;