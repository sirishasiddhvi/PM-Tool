import React from "react";
import Typography from "@mui/material/Typography";

import { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { UserContext, SnackContext } from "../Context/UserContext";
import {useInviteLoginF} from './InviteLoginFunction'
import CustomTextField from '../ReUsable/CustomTextfield'
import CustomButton from '../ReUsable/CustomButton'
import CustomTypography from '../ReUsable/CustomTypography'
import CustomContainer from '../ReUsable/CustomContainer'
import CustomBox from '../ReUsable/CustomContainer'

export default function InviteLogin() {

 const [err, setErr,submit] = useInviteLoginF()
 const {role, setRole,mail, setMail} = useContext(UserContext)
  return (
    <div >
       <br />
      <CustomContainer maxWidth="xs">
        <CustomBox sx={{ textAlign: "center", border:1, p:5, borderRadius:2, mt:15}}>
        <CustomTypography variant="h4" sx={{ textAlign: "center" }}>
        Invite User
      </CustomTypography>
      <br />
          <form onSubmit={submit}>
           
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role *"
                onChange={(e) => setRole(e.target.value)}
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
              name="mail"
              type="text"
              value={mail}
              label="Email *"
              onChange={(e) => setMail(e.target.value)}
              error={err == 2 && true}
              fullWidth
            />
            <br />
            <br />
            <br />

            <CustomButton
              // sx={{ backgroundColor: "#0b57cf ", color: "black" }}
              type="submit"
              label={'Invite'}
              variant="contained"
            >
            </CustomButton>
          </form>
        </CustomBox>
      </CustomContainer>
    </div>
  );
}
