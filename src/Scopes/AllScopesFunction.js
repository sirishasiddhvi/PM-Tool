import React from 'react'
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext, SnackContext } from "../Context/UserContext";

export default function ScopeFunction() {
  const [reject, setReject] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [id, setID] = useState('');
  const [err, setErr] = useState(0)

  console.log(id, 'id id');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => { 
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const res = await axios.post('/api/view_all_scopes');
      console.log(res, 'view_all_scopes');
      console.log(res.data.status, 'view_all_scopes');
      if (res.data.status === true) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handle = () => {
    const formData = new FormData();
    formData.append("scope_id", id);
    // formData.append("proj_id", status);

    axios.post("/api/scope_status", formData).then((res) => {
      console.log(res,'scope_status');
      setOpen(false);

      if (res.data.status === true) {
        console.log('tirumalasai')
        fetchData();
      }

      // if (res.data.status === true) {
      //   setSnack({
      //     message: res.data.msg,
      //     type: "success",
      //     open: true,
      //     direction: "center",
      //   });
      // } else {
      //   setErr(1);
      //   setSnack({
      //     message: res.data.msg,
      //     type: "error",
      //     open: true,
      //     direction: "center",
      //   });
      // }
    });
  };


 
  return [data, setData,reject, setReject,open, setOpen,status, setStatus,handleClickOpen,handleClose,handle,id, setID,];
}
 