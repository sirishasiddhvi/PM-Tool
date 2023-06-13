import React from 'react'
import axios from 'axios';
import { useState, useContext, useEffect } from "react";
import { UserContext, SnackContext } from "../Context/UserContext";
import { useParams } from 'react-router-dom'
 
export default function SingleProjectViewFunction() {
    let id = useParams();
    let id1 = id.id
    const [data, setData] = useState()
    const { snack, setSnack } = useContext(SnackContext);
    const [project_name, setProject_name] = useState("");
    const [project_desc, setProject_Desc] = useState("");
    const [client_id, setClient_Id] = useState("");
    const [Manager_id, setManager_Id] = useState("");
    const [images, setImages] = useState([]);
    const [created_date, setCreatedDate] = useState();
    const [project_id, setProjectId] = useState();
    const [err, setErr] = useState();
    const [uploadwait, setUploadWait] = useState(false);
    const [oldImg,setOldImg]=useState([])

    
    const imageChange = async (e) => {
      var img=e.target.files[0]
      setImages({ raw: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) })
      // console.log(img)
      console.log(img.length)
    }
   
    function submit(e) {
      e.preventDefault();
      setErr(0);
      if (project_id === "") {
        setErr(4);
        setSnack({
          message: "Please Enter Project ID",
          type: "error",
          open: true,
          direction: "center",
        });
      } else if (project_name === "") {
        setErr(1);
        setSnack({
          message: "Please Enter The Project Name",
          type: "error",
          open: true,
          direction: "center",
        });
      } else if (project_desc === "") {
        setErr(2);
        setSnack({
          message: "Please Enter The Project Description",
          type: "error",
          open: true,
          direction: "center",
        });
      } else if (client_id === "") {
        setErr(3);
        setSnack({
          message: "Please Enter Client ID",
          type: "error",
          open: true,
          direction: "center",
        });
      } else if (Manager_id === "") {
        setErr(4);
        setSnack({
          message: "Please Enter Manager ID",
          type: "error",
          open: true,
          direction: "center",
        });
      } else if (created_date === "") {
        setErr(4);
        setSnack({
          message: "Please Enter Created Date",
          type: "error",
          open: true,
          direction: "center",
        });
      } else if (images.length === 0) {
        setErr(5);
        setSnack({
          message: "Please Choose Image",
          type: "error",
          open: true,
          direction: "center",
        });
      } else {
        const formData = new FormData();
        formData.append("proj_name", project_name);
        formData.append("proj_desc", project_desc);
        formData.append("client_id", client_id);
        formData.append("manager_id", Manager_id);
        formData.append("proj_id", project_id);
        // for (let i = 0; i < images.length; i++) {
          formData.append("proj_images", images.raw);
        // }
        axios.post("/api/edit_project", formData).then((res) => {
          console.log(res);
          if (res.data.status === true) {
            // history('accept_login')
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
        });
      }
    }
 
    useEffect(() => {
        editProject();
      }, [])

    const editProject = async () => {
        const formData = new FormData();
      formData.append("proj_id", id1);
        await axios.post('/api/view_single_project',formData).then((res) => {
          if (res.data.status === true){
            setClient_Id(res.data.data.client_id,)
            setCreatedDate(res.data.data.created_date)
            setManager_Id(res.data.data.manager_id)
            setProject_Desc(res.data.data.project_desc)
            setProjectId(res.data.data.project_id)
            setImages(res.data.data.project_images)
            setProject_name(res.data.data.project_name)
            setOldImg(res.data.data.project_images)

          }
        })
      }
  
    return [
      project_name,
      setProject_name,
      project_desc,
      setProject_Desc,
      client_id,
      setClient_Id,
      Manager_id,
      setManager_Id,
      err,
      setErr,
      submit,
      imageChange,
      images,
      setImages,
      uploadwait,
      setUploadWait,
      data, setData,
      created_date, setCreatedDate,
      project_id, setProjectId,oldImg,setOldImg
    ];
}
