import { SnackContext } from "../Context/UserContext";
import React, { useState, useContext } from "react";
import axios from "axios"

export const useAddUser=()=>{
    const { snack, setSnack } = useContext(SnackContext);
    const[err,setErr]=useState();
    const[user,setUser]=useState({
        name:"",
        email:"",
        mobile:"",
        pass:"",
        role:"",
        // status:""
    })
    const userChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
     const submitUser=(e)=>{
        e.preventDefault();
        if (user.name.length < 1) {
          setErr(1);
          setSnack({
            message: "Enter your name",
            type: "error",
            open: true,
          })
    }else if (user.email.length < 1) {
        setErr(2);
        setSnack({
          message: "Enter your emailid",
          type: "error",
          open: true,
        })
  }
  else if (!user.email.includes("@")) {
    setErr(3);
    setSnack({
      message: "Enter your proper emailid",
      type: "error",
      open: true,
    })
}else if (user.mobile.length ==0) {
    setErr(4);
    setSnack({
      message: "Enter your proper mobilenumber",
      type: "error",
      open: true,
    })
}
else if (user.mobile.length != 10) {
    setErr(5);
    setSnack({
      message: "Enter your proper mobilenumber",
      type: "error",
      open: true,
    })
}else if (user.pass.length < 1) {
    setErr(6);
    setSnack({
      message: "Enter your password",
      type: "error",
      open: true,
    })
}else if (user.role.length < 1) {
    setErr(7);
    setSnack({
      message: "Enter your role",
      type: "error",
      open: true,
    })
}
// else if (user.status.length < 1) {
//     setErr(8);
//     setSnack({
//       message: "Enter your status",
//       type: "error",
//       open: true,
//     })
// }
else {
    const formdata = new FormData();
    formdata.append("name", user.name);
    formdata.append("email", user.email);
    formdata.append("mobile", user.mobile);
    formdata.append("passs", user.pass);
    formdata.append("role", user.role);
    // formdata.append("", user.status);
    axios.post("/api/add_user",formdata).then((res)=>{
        if(res.data.status==true){
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          })
        }else{
          setSnack({
            message: res.data.msg,
            type: "error",
            open: true,
          })
        }
    })
}
}
return[user,userChange,submitUser,err]
}