import react, {useState, useEffect, useContext } from "react"
import axios from "axios"
import { SnackContext } from "../Context/UserContext"

export const useStatus=()=>{
    const [open,setOpen]=useState(false)
    const [task_id,setTask_id]=useState()
    const [task_status,setTask_status]= useState("")
    const [err,setErr]=useState()
    const { snack, setSnack } = useContext(SnackContext);
    const openStatus=(id)=>{
        setOpen(true)
        console.log(id)
        setTask_id(id)
      }
      const closeStatus=()=>{
        setOpen(true)
      }
      const statusChange=(e)=>{
        setTask_status(e.target.value)
      }
      const updateStatus=(e)=>{
        e.preventDefault();
        if (task_status.length < 1) {
            setErr(1);
            setSnack({
              message: "Enter Task Status",
              type: "error",
              open: true,
            })
          }else {
        const formdata=new FormData();
        console.log(task_id)
        formdata.append("",task_id)
        formdata.append("",task_status)
        axios.post("/api/",formdata).then((res)=>{
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
      }}
      return[task_status,statusChange,open,openStatus,closeStatus,updateStatus,err]
}