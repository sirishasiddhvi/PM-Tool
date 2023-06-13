import React from "react";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext, SnackContext } from "../Context/UserContext";
  
export default function EditProjectLoginFunction() {
  const { snack, setSnack } = useContext(SnackContext);
  const [data, setData] = useState('')
  const [err, setErr] = useState();

  function deleteID (projectID) {
    console.log(projectID, 'id id')
    const formData = new FormData();
    formData.append("proj_id", projectID);
    axios.post("/api/delete_project", formData).then((res) => {
      console.log(res);
      fetchData();
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
    })
  }

  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () =>{
    await axios.post('/api/view_projects').then((res) => {
      // setData(res.data)
      console.log(res,'sai')
      console.log(res.data.status,'sai')
      if (res.data.status === true){
        console.log('tiru')
        setData(res.data.data)

      }
    })
  }
  return [data, setData,deleteID];
}
