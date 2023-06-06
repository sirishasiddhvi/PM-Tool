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

export const useAcceptLoginF = () => {
  const {role, setRole,mail, setMail} = useContext(UserContext)
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rePass, setRePass] = useState("");
  const [err, setErr] = useState(0);
  const { snack, setSnack } = useContext(SnackContext);
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('')
  const [status, setStatus] = useState('')

  

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();
    setErr(0);
    if (name === "") {
      console.log(name, "name");
      setErr(1);
      setSnack({
        message: "Please Enter Name",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (mobile.length < 10) {
      setErr(2);
      setSnack({
        message: "Please Enter Mobile",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (password === '') {
      setErr(3);
      setSnack({
        message: "Please Enter password",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (password.length < 6) {
      setErr(3);
      setSnack({
        message: "password Must Have Atleast Six Digits",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (rePass === '') {
      setErr(4);
      setSnack({
        message: "Please Enter Conform PassWord",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (rePass !== password) {
      setErr(4);
      setSnack({
        message: "Both Are Not Matching",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      const formData = new FormData()
      formData.append('mobile',mobile)
      // formData.append('email', mail)
      axios.post("/api/accept_invite",formData ).then((res) => {
      console.log(res)
      console.log(res.data.status,'res.data.status')
      if (res.data.status === true) {
        setOpen(true)
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
          direction: "center",
        });
      } else {
        setErr(2);
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
          direction: "center",
        });
      }
          }
      )
    }
  };




  const submitOTP = (e) => {
    e.preventDefault();
    setErr(0);
    if (otp === "") {
      setErr(5);
      setSnack({
        message: "Please Enter OTP",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      
      const formData = new FormData()
      formData.append('role',role)
      formData.append('email', mail)
      formData.append('name',name)
      formData.append('mobile',mobile)
      formData.append('passs',password)
      formData.append('otp',otp)
      axios.post("/api/validate_invite_otp",formData ).then((res) => {
      console.log(res)
      console.log(res.data,'res.data')
      if (res.data.status === true) {
        
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
          direction: "center",
        });
        setOpen(false)
      } else {
        setErr(2);
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
          direction: "center",
        });
      }
          }
      )
    }
  };

  return [name, setName,mobile, setMobile,password, setPassword,rePass, setRePass,err, setErr,submit,open,handleClose,otp, setOtp,submitOTP]
}