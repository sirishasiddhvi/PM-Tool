import logo from './logo.svg';
import './App.css';
import { AddUser } from './Users/AddUser';
import { SnackContext, UserContext } from "./Context/UserContext"
import { BrowserRouter, Link,Route, Routes, Navigate } from "react-router-dom";
import { Snackbar, Alert, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Login } from './Login/Login';
import axios from "axios"

function App() {
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
      <UserContext.Provider value={{userProfile,setUserProfile}}>
      <SnackContext.Provider value={{ snack, setSnack }}>
      <BrowserRouter>
      <Link to="adduser">AddUser</Link>&nbsp;&nbsp;
      <Link to="login">Login</Link>
            <Routes>
            <Route path="adduser" element={<AddUser/>}/>
              <Route path="login" element={<Login/>}/>
              </Routes></BrowserRouter>
      </SnackContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
