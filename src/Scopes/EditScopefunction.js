import { SnackContext } from "../Context/UserContext";
import React, { useState, useContext,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const useEditScope=()=>{
    const id =useParams()
    const { snack, setSnack } = useContext(SnackContext);
    const [err, setErr] = useState();
    const [scope, setScope] = useState({
      project_id: "",
      manager_id: "",
      client_id: "",
      scope_title: "",
      scope_approved: "",
    });
   
    const [images, setImages] = useState([])
    const [imageids, setImageIds] = useState("");
    const [scope_desc,setScope_desc]=useState("")
    const [scope_images, setScope_images] = useState("");
    useEffect(()=>{
        singleScope()
    },[])
    const singleScope=async()=>{
   const formdata= new FormData()
   formdata.append("scope_id",9)
   await axios.post("/api/view_single_scope",formdata).then((res)=>{
    if(res.data.status===true){
        console.log(res.data.data)
        setScope({
            project_id:res.data.data.project_id,
            manager_id:res.data.data.manager_id,
            client_id:res.data.data.client_id,
            scope_title:res.data.data.scope_title,
            scope_approved:res.data.data.scope_approved,
        })
        setScope_desc(res.data.data.scope_desc)
        setImageIds(res.data.data.scope_images)
        setScope_images(res.data.data.scope_images)
    }
})
}
    const scopeChange = (e) => {
      setScope({ ...scope, [e.target.name]: e.target.value });
    };
    const scope_descChange=(event, editor)=>{
      const data = editor.getData();
      console.log(data);
      setScope_desc(data)
    }
    const scope_imageChange = (e) => {
      if (e.target.files.length != 0) {
        const files = e.target.files;
        const fileArray = [];
  
        for (let i = 0; i < files.length; i++) {
          const image = files[i];
          // const reader = new FileReader();
          var type = files.type;
          fileArray.push({ raw: image, url: URL.createObjectURL(image) });
          setScope_images([...scope_images, ...fileArray]);
        }
      }
    };
    const scopeSubmit = (e) => {
      e.preventDefault();
      if (scope.project_id.length < 1) {
        setErr(1);
        setSnack({
          message: "Enter Your Project Id",
          type: "error",
          open: true,
        });
      } else if (scope.manager_id.length < 1) {
        setErr(2);
        setSnack({
          message: "Enter Your Manager Id",
          type: "error",
          open: true,
        });
      } else if (scope.client_id.length < 1) {
        setErr(3);
        setSnack({
          message: "Enter Your Client Id",
          type: "error",
          open: true,
        });
      } else if (scope.scope_title.length < 1) {
        setErr(4);
        setSnack({
          message: "Enter Your Scope Title",
          type: "error",
          open: true,
        });
      } else if (scope_desc.length < 1) {
        setErr(5);
        setSnack({
          message: "Enter Your Scope Description",
          type: "error",
          open: true,
        });
      } else if (scope.scope_approved.length < 1) {
        setErr(6);
        setSnack({
          message: "Select Approved Status",
          type: "error",
          open: true,
        });
      } else {
        const formdata = new FormData();
        formdata.append("scope_id",id)
        formdata.append("proj_id", scope.project_id);
        formdata.append("manager_id", scope.manager_id);
        formdata.append("client_id", scope.client_id);
        formdata.append("scope_title", scope.scope_title);
        formdata.append("scope_desc", scope_desc);
        formdata.append("scope_approved", scope.scope_approved);
        for (let i = 0; i < scope_images.length; i++) {
          console.log(scope_images[i].raw);
          formdata.append("scope_images", scope_images[i].raw);
        }
        axios.post("/api/edit_scope", formdata).then((res) => {
          if (res.data.status == true) {
            setSnack({
              message: res.data.msg,
              type: "success",
              open: true,
            });
          } else {
            setSnack({
              message: res.data.msg,
              type: "error",
              open: true,
            });
          }
        });
      }
    };
    return [scope, scopeChange, scopeSubmit,scope_desc,scope_descChange,scope_images, scope_imageChange, err];
}