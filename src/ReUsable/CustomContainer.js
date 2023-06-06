import React from 'react';
import {Container} from "@mui/material"

const CustomContainer = ({...props}) => {
  return (
    <Container {...props}>
      {props.children}
    </Container>
  );
};

export default CustomContainer;