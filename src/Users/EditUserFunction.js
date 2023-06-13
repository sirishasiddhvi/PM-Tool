import react, {useState, useEffect, useContext } from "react"
import axios from "axios"
import { SnackContext } from "../Context/UserContext"
import {useParams} from 'react-router-dom'

export const useEditUser=()=>{
    const id=useParams()
    const[user,setuser]=useState({
        name:"",
        email:"",
        mobile:"",
        role:""
    })
    const {setSnack}=useContext(SnackContext)
   const [err,setErr]=useState()
    useEffect(()=>{
        getSingleUser()
    },[])
    const userChange = (e) => {
      setuser({ ...user, [e.target.name]: e.target.value });
    };
    const getSingleUser=async()=>{
        const formdata = new FormData();
        formdata.append("idd", id);
        await axios.post("/api/view_single_user",formdata).then((res)=>{
            if(res.data.status===true){
                console.log(res.data.data)
                setuser({
                    name:res.data.data.user_name,
        email:res.data.data.user_email,
        mobile:res.data.data.user_mobile,
        role:res.data.data.user_role
                })
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
    const updateUser=async(e)=>{
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
}else if (user.role.length < 1) {
  setErr(6);
  setSnack({
    message: "Enter your role",
    type: "error",
    open: true,
  })
}
// else if (user.status.length < 1) {
//     setErr(7);
//     setSnack({
//       message: "Enter your status",
//       type: "error",
//       open: true,
//     })
// }
else {
        const formdata = new FormData();
        formdata.append("idd", 2);
    formdata.append("name", user.name);
    formdata.append("email", user.email);
    formdata.append("mobile", user.mobile);
    formdata.append("role", user.role);
    // formdata.append("", user.status);
    axios.post("/api/edit_user",formdata).then((res)=>{
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
    return[user,userChange,updateUser,err]
}