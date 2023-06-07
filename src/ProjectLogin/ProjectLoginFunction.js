import React from "react";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext, SnackContext } from "../Context/UserContext";

export default function ProjectLoginFunction() {
  const { snack, setSnack } = useContext(SnackContext);
  const [project_name, setProject_name] = useState("");
  const [project_desc, setProject_Desc] = useState("");
  const [client_id, setClient_Id] = useState("");
  const [Manager_id, setManager_Id] = useState("");
  const [images, setImages] = useState([]);
  const [err, setErr] = useState();
  const [uploadwait, setUploadWait] = useState(false);

  const imageChange = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const totalImages = images.length + selectedFiles.length;

      if (totalImages <= 5) {
        const arr = [];

        for (let i = 0; i < selectedFiles.length; i++) {
          const image = selectedFiles[i];
          const fileType = image.type;

          if (
            fileType === "image/jpeg" ||
            fileType === "image/jpg" ||
            fileType === "image/png"
          ) {
            arr.push({ raw: image, preview: URL.createObjectURL(image) });
          } else {
            alert("Please select only JPEG, JPG, PNG Images.");
          }
        }

        setImages((prevImages) => [...prevImages, ...arr]);
      } else {
        alert("Maximum Image limit is 5.");
      }
    }
    e.target.value = null;
  };

  function submit(e) {
    e.preventDefault();
    setErr(0);
    if (project_name === "") {
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
      for (let i = 0; i < images.length; i++) {
        formData.append("proj_images", images[i].raw);
      }
      axios.post("/api/add_project", formData).then((res) => {
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
  ];
}
