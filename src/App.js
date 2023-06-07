import logo from './logo.svg';
import './App.css';
import { AddUser } from './Users/AddUser';
import { SnackContext, UserContext } from "./Context/UserContext"
import { BrowserRouter, Link,Route, Routes, Navigate } from "react-router-dom";
import { Snackbar, Alert, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Login } from './Login/Login';
import axios from "axios"
import InviteLogin from './InviteLogin/InviteLogin';
import AcceptLogin from './AcceptLogin/AcceptLogin'
import ProjectLogin from './ProjectLogin/ProjectLogin'


function App() {
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");
  const [userProfile,setUserProfile]=useState({})
  const [snack, setSnack] = useState({
    message: "",
    color: "",
    open: false,
  });
  useEffect(()=>{
    axios.post("/api/getsession").then((res)=>{
      if(res.data.status===true){
        console.log(res.data.data)
        setUserProfile(res.data.data)
      }
    })
    console.log(userProfile,"userProfile")
  },[])
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
      <Link to="invite_login">InviteLogin</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="accept_login">AcceptLogin</Link>&nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="project_login">InviteLogin</Link>
            <Routes>
            <Route path="adduser" element={<AddUser/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="invite_login" element={<InviteLogin/>}/>
              <Route path="accept_login" element={<AcceptLogin/>}/>
              <Route path="project_login" element={<ProjectLogin/>}/>
              </Routes></BrowserRouter>
      </SnackContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
