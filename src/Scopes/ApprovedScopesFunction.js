import React from 'react'
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext, SnackContext } from "../Context/UserContext";

export default function ApprovedScopesFunction() {
    const [data, setData] = useState('')

    useEffect(() => {
      fetchData();
    }, [])
    const fetchData = async () =>{
      await axios.post('/api/view_approved_scopes').then((res) => {
        console.log('view_approved_scopes1')
        // setData(res.data)
        if (res.data.status === true){
          console.log('tiru')
          setData(res.data.data)

        }
      })
    }
    
    return [data, setData];
  } 