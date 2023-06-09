import { SnackContext } from "../Context/UserContext";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios"

export const useTasks=()=>{
    const [tasks,setTasks]=useState([])
    const { snack, setSnack } = useContext(SnackContext);

    useEffect(()=>{
        getdata()
    },[])
    const getdata=()=>{
        axios.post("/api/view_all_tasks").then((res)=>{
            if(res.data.status==true){
                console.log(res.data.data)
                setTasks(res.data.data)
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
    return[tasks]
}