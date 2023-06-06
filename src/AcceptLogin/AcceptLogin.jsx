import React from "react";
import { useState, useContext, useEffect } from "react";
import {Box,Container,FormControl,Select,InputLabel,MenuItem,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,OutlinedInput,InputAdornment,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { UserContext, SnackContext } from "../Context/UserContext";
import {useAcceptLoginF} from './AcceptLoginFunction'
import CustomTextField from '../ReUsable/CustomTextfield'
import CustomButton from '../ReUsable/CustomButton'
import CustomContainer from '../ReUsable/CustomContainer'
import CustomBox from '../ReUsable/CustomBox'
import CustomTypography from '../ReUsable/CustomTypography'


export default function AcceptLogin() {
  const {role, setRole,mail, setMail} = useContext(UserContext)

  const [name, setName,mobile, setMobile,password, setPassword,rePass, setRePass,err, setErr,submit,open,handleClose,otp, setOtp,submitOTP] = useAcceptLoginF();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {" "}
      <br />
      <CustomContainer maxWidth="xs">
        <CustomBox sx={{ textAlign: "center", border:1, p:5, borderRadius:2, mt:15}}>
        <CustomTypography variant="h4" sx={{ textAlign: "center" }}>
        Accept Invite
      </CustomTypography>
      <br />
          <form onSubmit={submit}>
            {/* {JSON.stringify(role,'role role')} */}
            <br /> <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role *"
                disabled
                // onChange={(e) => setRole(e.target.value)}
                error={err == 1 && true}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Manager</MenuItem>
                <MenuItem value={3}>Team Leader</MenuItem>
                <MenuItem value={4}>Developer</MenuItem>
                <MenuItem value={5}>Client</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <CustomTextField
              name="name"
              type="text"
              value={name}
              label="Name *"
              onChange={(e) => setName(e.target.value)}
              error={err === 1 && true}
              fullWidth
            />
            <br />
            <br />
            <CustomTextField
              name="name"
              type="text"
              value={mail}
              label="Email *"
              // onChange={(e) => setName(e.target.value)}
              disabled
              error={err === 1 && true}
              fullWidth
            />
            <br />
            <br />
            <CustomTextField
              name="mobile"
              type="number"
              value={mobile}
              label="Mobile *"
              onChange={(e) => setMobile(e.target.value)}
              error={err === 2 && true}
              fullWidth
            />
            <br />
            <br />
            <FormControl fullWidth>
                   <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                   <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}                   
                     fullwidth                      
                      // placeholder='Password *'                      
                      name='password' 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      error={err == 3 && true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ?  <Visibility /> : <VisibilityOff /> }
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>



            {/* <CustomTextField
              name="password"
              type="text"
              value={password}
              label="Password *"
              onChange={(e) => setPassword(e.target.value)}
              error={err === 3 && true}
              fullWidth
            /> */}
            <br />
            <br />
            <FormControl fullWidth>
                   <InputLabel htmlFor="outlined-adornment-password">Conform Password *</InputLabel>
                   <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}                   
                     fullwidth                      
                   //   placeholder='Conform Password *'                      
                      name='rePass' 
                      value={rePass} 
                      onChange={(e) => setRePass(e.target.value)}
                      error={err == 4 && true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ?  <Visibility /> : <VisibilityOff /> }
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Conform Password"
                    />
                  </FormControl>



            {/* <CustomTextField
              name="rePass"
              type="text"
              value={rePass}
              label="Conform Password*"
              onChange={(e) => setRePass(e.target.value)}
              error={err === 4 && true}
              fullWidth
            /> */}
            <br />
            <br />
            <br />
            <CustomButton
              // sx={{ backgroundColor: "#0b57cf ", color: "black" }}
              type="submit"
              label={'Send OTP'}
              variant="contained"
            >
              
            </CustomButton>
          </form>
        </CustomBox>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{textAlign:'center'}}
      >
        <CustomBox sx={{p:2}}>
        <DialogTitle >
          {'OTP'}
        </DialogTitle>
        <br/>
        <form onSubmit={submitOTP}>
        <CustomTextField
              name="otp"
              type="text"
              value={otp}
              label="OTP *"
              onChange={(e) => setOtp(e.target.value)}
              error={err === 5 && true}
              fullWidth
            />
            <br/><br/><br/>
            <CustomButton
              // sx={{ backgroundColor: "#0b57cf ", color: "black" }}
              type="submit"
              label={'Accept'}
              variant="contained"
            >
              
            </CustomButton>
            </form>
        </CustomBox>
      </Dialog>
      
      </CustomContainer>
    </div>
  );
}
