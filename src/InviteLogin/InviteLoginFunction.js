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
import {useNavigate}from "react-router-dom"
import { UserContext, SnackContext } from "../Context/UserContext";

export const  useInviteLoginF= () =>{
  let history=useNavigate()
  const { role, setRole, mail, setMail } = useContext(UserContext);
  const [err, setErr] = useState(0);
  const { snack, setSnack } = useContext(SnackContext);

  function submit(e) {
    e.preventDefault();
    setErr(0);
    if (role === "") {
      setErr(1);
      setSnack({
        message: "Enter Select your Role",
        type: "error",
        open: true,
        direction: "center",
      });
    } else if (mail === "" || !mail.includes("@") || !mail.includes(".")) {
      setErr(2);
      setSnack({
        message: "Enter a Valid Email",
        type: "error",
        open: true,
        direction: "center",
      });
    } else {
      console.log("onsumbiy")
              const formData = new FormData()
              formData.append('role',role)
              formData.append('email', mail)
              axios.post("/api/invite_user",formData ).then((res) => {
                  console.log(res)
                  if (res.data.status === true) {
                    history('accept_login')
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

  return [err, setErr,submit]
}
