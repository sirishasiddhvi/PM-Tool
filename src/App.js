import logo from "./logo.svg";
import "./App.css";
import { AddUser } from "./Users/AddUser";
import { SnackContext, UserContext } from "./Context/UserContext";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { Snackbar, Alert, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Login } from './Login/Login';
import {Users} from "./Users/Users"
import { EditUser } from "./Users/EditUser";
import {AddTask} from "./Tasks/AddTask"
import {Tasks} from "./Tasks/Tasks"
import InviteLogin from './InviteLogin/InviteLogin';
import AcceptLogin from './AcceptLogin/AcceptLogin'
import ProjectLogin from './ProjectLogin/ProjectLogin'
import { EditTask } from "./Tasks/EditTask";
import { AddScope } from "./Scopes/AddScope";
import { EditScope } from "./Scopes/EditScope";
import {AllScopes}from "./Scopes/AllScopes"
import {ApprovedScopes} from "./Scopes/ApprovedScopes"

import AddProject from './Project/AddProject'
import ProjectData from './Project/AddProjectTable'
import SingleProjectView from './Project/SingleProjectEdit'

function App() {
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [snack, setSnack] = useState({
    message: "",
    color: "",
    open: false,
  });
  // useEffect(() => {
  //   axios.post("/api/getsession").then((res) => {
  //     if (res.data.status === true) {
  //       console.log(res.data.data);
  //       setUserProfile(res.data.data);
  //     }
  //   });
  //   console.log(userProfile, "userProfile");
  // }, []);
  return (
    <div className="App">
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => {
          setSnack((prevdata) => {
            return {
              ...prevdata,
              open: false,
            };
          });
        }}
        TransitionComponent={Slide}
      >
        <Alert
          variant="filled"
          onClose={() => {
            setSnack((prevdata) => {
              return {
                ...prevdata,
                open: false,
              };
            });
          }}
          severity={snack.type}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      <UserContext.Provider value={{userProfile,setUserProfile,role, setRole, mail, setMail}}>
      <SnackContext.Provider value={{ snack, setSnack }}>
      <BrowserRouter>
      <Link to="adduser">AddUser</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="login">Login</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      {/* <Link to="edituser">EditUser</Link>&nbsp; &nbsp; &nbsp; &nbsp; */}
      <Link to="users">Users</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="addtask">AddTask</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="tasks">Tasks</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="addscope">AddScope</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="editscope">EditScope</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      {/* <Link to="edittask">EditTask</Link>&nbsp; &nbsp; &nbsp; &nbsp; */}
      <Link to="invite_user">InviteUser</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="accept_invite">AcceptInvite</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="add_project">AddProject</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="project_data">ProjectData</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="allscopes">AllScopes</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="approvescope">ApproveScope</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      {/* <Link to="edittask">EditTask</Link>&nbsp; &nbsp; &nbsp; &nbsp; */}
      <Link to="project_login">InviteLogin</Link>
            <Routes>
            <Route path="adduser" element={<AddUser/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="edituser/:id" element={<EditUser/>}/>
              <Route path="users" element={<Users/>}/>
              <Route path="addtask" element={<AddTask/>}/>
              <Route path="tasks" element={<Tasks/>}/>
              <Route path="addscope" element={<AddScope/>}/>
              <Route path="editscope" element={<EditScope/>}/>
              <Route path="edittask/:id" element={<EditTask/>}/>
              <Route path="invite_user" element={<InviteLogin/>}/>
              <Route path="accept_invite" element={<AcceptLogin/>}/>
              <Route path="add_project" element={<AddProject/>}/>
              <Route path="project_data" element={<ProjectData/>}/>
              <Route path="single_project_view/:id" element={<SingleProjectView/>}/>
              <Route path="allscope" element={<AllScopes/>}/>
              <Route path="approvescope" element={<ApprovedScopes/>}/>
              <Route path="edittask/:id" element={<EditTask/>}/>
              <Route path="project_login" element={<ProjectLogin/>}/>
              </Routes></BrowserRouter>
      </SnackContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
