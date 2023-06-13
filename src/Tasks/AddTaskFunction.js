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
        task_assigned_by:"",
        task_assign_to:"",
        task_due_date:"",
        task_status:""
    })
    const[task_images,setTask_images]= useState([])
    const[task_desc,setTask_desc]= useState("")
    const task_descChange=(event, editor)=>{
      const data = editor.getData();
      console.log(data);
      setTask_desc(data)
    }
    const taskChange=(e)=>{
        setTask({...task,[e.target.name]:e.target.value});
    };
    const task_imageChange=(e)=>{
      if (e.target.files.length != 0) {
        const files = e.target.files;
        const fileArray = [];
      
        for (let i = 0; i < files.length; i++) {
          const image = files[i];
          // const reader = new FileReader();
            var type=files.type
            fileArray.push({ raw:image, url:URL.createObjectURL(image) });
            setTask_images([...task_images,...fileArray]);
        }
      }
    }
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
          }
          else if (task_desc.length < 1) {
            setErr(4);
            setSnack({
              message: "Enter Task Description",
              type: "error",
              open: true,
            })
          }
          else if (task.task_assigned_by.length < 1) {
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
          }else if (task_images.length < 1) {
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
            formdata.append("proj_id", task.project_id);
            formdata.append("scope_id", task.scope_id);
            formdata.append("task_title", task.task_title);
            formdata.append("task_desc", task_desc);
            formdata.append("task_assigned_by", task.task_assigned_by);
            formdata.append("task_assigned_to", task.task_assign_to);
            formdata.append("due_date", task.task_due_date);
            formdata.append("task_status", task.task_status);
            for (let i=0;i<task_images.length;i++){
              console.log(task_images[i].raw)
              formdata.append("task_image",task_images[i].raw)
                   }
            axios.post("/api/add_task",formdata).then((res)=>{
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
    return[task,taskChange,submitTask,err,task_desc,task_descChange,task_images,task_imageChange]
}