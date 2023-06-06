import React from "react"
import {Button, Typography} from "@mui/material"
import CustomTypography from "./CustomTypography"

const CustomButton =({ label,...props }) =>{
    return(
         <Button
         {...props}
         label={label}
        >{label} </Button>
    )
}
export default CustomButton; 