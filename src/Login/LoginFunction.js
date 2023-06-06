import react,{useState,useContext} from "react"
import { SnackContext,UserContext } from "../Context/UserContext";
import axios from "axios"

export const useLogin=()=>{
    const [user, setUser] = useState({
        username: "",
        password: "",
        // showPassword: false,
      });
  const [loading, setLoading] = useState();
  const [showPassword,setShowPassword]= useState(false)
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState();
  const [disable, setDisable] = useState(false);
  const[open,setOpen]=useState(false)
  const { snack, setSnack } = useContext(SnackContext);
  const {userProfile,setUserProfile}=useContext(UserContext)
  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleClickShowPassword = () => {
    // setUser({
    //   ...user,
    //   showPassword: !showPassword,
    // });
    setShowPassword(!showPassword)
  };
  const loginSubmit=async(e)=>{
    e.preventDefault();
    if (user.username.length === 0) {
      setErr(1);
      setSnack({
        message: "Please enter a  mobile number or emailid...",
        color: "error",
        type: "error",
        open: true,
      });
    } else if (isNaN(user.username) && !user.username.includes("@")) {
      setErr(1);
      setSnack({
        message: "Please enter a valid emailid...",
        color: "error",
        type: "error",
        open: true,
      });
    } else if (!isNaN(user.username) && user.username.length !== 10) {
      setErr(1);
      setSnack({
        message: "Please enter a valid mobile number...",
        color: "error",
        type: "error",
        open: true,
      });
    } else if (user.password.length === 0) {
      setErr(2);
      setSnack({
        message: "Please Enter a Password...",
        color: "error",
        type: "error",
        open: true,
      });
    } else if (user.password.length < 6) {
      setErr(2);
      setSnack({
        message: "password length should be 6 characters...",
        color: "error",
        type: "error",
        open: true,
      });
    } else {
      setErr();
      setDisable(true);
      setLoading(true);
      const formdata = new FormData();
      formdata.append("uname", user.username);
      formdata.append("passs", user.password);
      await axios.post("/api/user_login", formdata).then(function(res) {
        if (res.data.status === true) {
          setSnack({
            message: res.data.msg,
            color: "green",
            type: "success",
            open: true,
          });
          setLoading(false);
          setOpen(true);
        } else {
          setLoading(false);
          setDisable(false);
          setSnack({
            message: res.data.msg,
            color: "error",
            type: "error",
            open: true,
          });
        }
      });
    }
  };
  const otpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 0) {
      setSnack({
        message: "Please Enter OTP",
        color: "green",
        type: "error",
        open: true,
      });
    } else if (otp.length < 6) {
      setSnack({
        message: "otp length should be 6 characters...",
        color: "error",
        type: "error",
        open: true,
      });
    } else {
    //   setOtpOpen(false);
      const formdata = new FormData();
      formdata.append("otp", otp);
      formdata.append("uname", user.username);
      formdata.append("passs", user.password);
      console.log(formdata);
      await axios.post("/api/validate_user_otp", formdata).then(function(res) {
        console.log(res.data);
        if (res.data.status === true) {
          setLoading(false);
          setSnack({
            message: res.data.msg,
            color: "green",
            type: "success",
            open: true,
          });
   setUserProfile(res.data.data)
          setOpen(false)
          console.log(userProfile)
        } else {
          setLoading(false);
          setSnack({
            message: res.data.msg,
            color: "green",
            type: "error",
            open: true,
          });
        //   setOtpOpen(true);
        }
      });
    }
  };
  return[user,userChange,showPassword,handleClickShowPassword,loginSubmit,otpSubmit,otp,setOtp,open,setOpen,err,disable]
}