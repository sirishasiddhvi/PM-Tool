import CustomTextField from "../ReUsable/CustomTextfield";
import CustomButton from "../ReUsable/CustomButton"
import CustomTypography from "../ReUsable/CustomTypography";
import CustomContainer from "../ReUsable/CustomContainer"
import CustomBox from "../ReUsable/CustomBox"
import CustomDialog from "../ReUsable/CustomDilog";
import CustomGrid from "../ReUsable/CustomGrid";
import { InputAdornment,IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


import { useLogin } from "./LoginFunction";

export const Login=()=>{
    const [user,userChange,showPassword,handleClickShowPassword,loginSubmit,otpSubmit,otp,setOtp,open,setOpen,err,disable]=useLogin()
    return(
    <CustomContainer maxwidth="md">
          <CustomBox
      sx={{height:300,width:400,m:10,p:5,boxShadow:5}}>
        <form onSubmit={loginSubmit}>
          <CustomGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <CustomTypography variant="h3">Login</CustomTypography>
            <CustomTextField
              size="small"
              name="username"
              label="Username"
              value={user.username}
              onChange={userChange}
              color={err === 1 ? "error" : ""}
              focused={err === 1 ? true : false}
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
            <CustomTextField
             label="password"
             variant="outlined"
             name="password"
             size="small"
             color={err === 2 ? "error" : ""}
             focused={err === 2 ? true : false}
             value={user.password}
             type={showPassword ? "text" : "password"}
             onChange={userChange}
             InputProps={{
               endAdornment: (
                 <InputAdornment position="end">
                   <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     edge="end"
                   >
                     {showPassword ? <Visibility /> : <VisibilityOff />}
                   </IconButton>
                 </InputAdornment>
               ),
             }}
             sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
            <CustomButton  variant="contained"
                    type="submit"
                    disabled={disable === true ? true : false}
                    label="login"
                    sx={{ m: 2 }}
              style={{ width: "250px" }}
                    >login</CustomButton>
            </CustomGrid>
            </form>
            </CustomBox>
            <CustomDialog open={open} onClose={()=>{}}>
            <form onSubmit={otpSubmit}>
          <CustomGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <CustomTextField
              size="small"
              name="otp"
              label="OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
            <CustomButton  variant="contained"
                    type="submit"
                    // disabled={disable === true ? true : false}
                    label="send"
                    sx={{ m: 2 }}
              style={{ width: "250px" }}
                    >send</CustomButton>
            </CustomGrid>
            </form>
            </CustomDialog>
    </CustomContainer>
    )
}