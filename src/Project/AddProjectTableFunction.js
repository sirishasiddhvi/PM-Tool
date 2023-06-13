import React from "react";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext, SnackContext } from "../Context/UserContext";
  
export default function EditProjectLoginFunction() {
  const [data, setData] = useState('')
  return [data, setData];
}
