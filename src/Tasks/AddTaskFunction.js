import { SnackContext } from "../Context/UserContext";
import React, { useState, useContext } from "react";
import axios from "axios"

export const useAddTask=()=>{
    const { snack, setSnack } = useContext(SnackContext);
    const[err,setErr]=useState();
    const[task,setTask]=useState({
        project_id:"",
        scope_id:"",
        task_title:"",
        task_desc:"",
        task_assigned_by:"",
        task_assign_to:"",
        task_due_date:"",
        task_images:"",
        task_status:""
    })
    const taskChange=(e)=>{
        setTask({...task,[e.target.name]:e.target.value});
    };
    const submitTask=(e)=>{
        e.preventDefault();
        if (task.project_id.length < 1) {
          setErr(1);
          setSnack({
            message: "Enter Project Id",
            type: "error",
            open: true,
          })
        }else if (task.scope_id.length < 1) {
            setErr(2);
            setSnack({
              message: "Enter Scope Id",
              type: "error",
              open: true,
            })
          }else if (task.task_title.length < 1) {
            setErr(3);
            setSnack({
              message: "Enter Task Title",
              type: "error",
              open: true,
            })
          }else if (task.task_desc.length < 1) {
            setErr(4);
            setSnack({
              message: "Enter Task Description",
              type: "error",
              open: true,
            })
          }else if (task.task_assigned_by.length < 1) {
            setErr(5);
            setSnack({
              message: "Enter The Person Who Assigned The task ",
              type: "error",
              open: true,
            })
          }else if (task.task_assign_to.length < 1) {
            setErr(6);
            setSnack({
              message: "Enter The Person Whom To Task Assigned",
              type: "error",
              open: true,
            })
          }else if (task.task_due_date.length < 1) {
            setErr(7);
            setSnack({
              message: "Enter Task Due Date",
              type: "error",
              open: true,
            })
          }else if (task.task_images.length < 1) {
            setErr(8);
            setSnack({
              message: "Select Task Images",
              type: "error",
              open: true,
            })
          }else if (task.task_status.length < 1) {
            setErr(9);
            setSnack({
              message: "Enter Task Status",
              type: "error",
              open: true,
            })
          }else {
            const formdata = new FormData();
            formdata.append("", task.project_id);
            formdata.append("", task.scope_id);
            formdata.append("", task.task_title);
            formdata.append("", task.task_desc);
            formdata.append("", task.task_assigned_by);
            formdata.append("", task.task_assign_to);
            formdata.append("", task.task_due_date);
            formdata.append("", task.task_images);
            formdata.append("", task.task_status);
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
          }
    }
    return[task,taskChange,submitTask,err]
}