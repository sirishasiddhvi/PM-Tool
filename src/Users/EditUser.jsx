import CustomBox from "../ReUsable/CustomBox";
import CustomButton from "../ReUsable/CustomButton";
import CustomContainer from "../ReUsable/CustomContainer";
import CustomTextField from "../ReUsable/CustomTextfield";
import { MenuItem } from "@mui/material";
import { useAddUser } from "./AddUserFunction";
import CustomGrid from "../ReUsable/CustomGrid";
import {useEditUser} from "./EditUserFunction"


export const EditUser=()=>{
    const [user,userChange,updateUser,err]=useEditUser()
    return (
        <CustomContainer maxwidth="md">
          <CustomBox
          sx={{height:"50%",width:"60%",m:10,p:2,boxShadow:5}}>
            <form onSubmit={updateUser}>
              <CustomGrid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <CustomTextField
                  size="small"
                  type="text"
                  name="name"
                  label="Name"
                  value={user.name}
                  onChange={userChange}
                  color={err === 1 ? "error" : ""}
                  focused={err === 1 ? true : false}
                  sx={{ m: 2 }}
                  style={{ width: "250px" }}
                />
                <CustomTextField
                  size="small"
                  type="email"
                  name="email"
                  label="EmailId"
                  value={user.email}
                  onChange={userChange}
                  color={err === 2||err===3 ? "error" : ""}
                  focused={err === 2||err===3 ? true : false}
                  sx={{ m: 2 }}
                  style={{ width: "250px" }}
                />
                <CustomTextField
                  size="small"
                  type="number"
                  name="mobile"
                  label="MobileNumber"
                  value={user.mobile}
                  onChange={userChange}
                  color={err === 4||err === 5 ? "error" : ""}
                  focused={err === 4||err === 5 ? true : false}
                  sx={{ m: 2 }}
                  style={{ width: "250px" }}
                />
                <CustomTextField
                  select
                  size="small"
                  type="text"
                  name="role"
                  label="Role"
                  value={user.role}
                  onChange={userChange}
                  color={err === 6 ? "error" : ""}
                  focused={err === 6 ? true : false}
                  sx={{ m: 2 }}
                  style={{ width: "250px" }}
                >
                  <MenuItem value="1">Admin</MenuItem>
                  <MenuItem value="2">Manager</MenuItem>
                  <MenuItem value="3">TeamLeader</MenuItem>
                  <MenuItem value="4">Developer</MenuItem>
                  <MenuItem value="5">Client</MenuItem>
                </CustomTextField>
                {/* <CustomTextField      
                size="small"
                type="text"
                name="status"
                label="Status"
                value={user.status}
                onChange={userChange}
                color={err===6?"error":""}
                focused={err===6?true:false}
                sx={{ m: 2 }}
                style={{ width: "250px" }}
              /> */}
                <CustomButton
                  size="small"
                  type="submit"
                  label="submit"
                  variant="contained"
                  sx={{ m: 2 }}
                  style={{ width: "250px" }}
                >
                  submit
                </CustomButton>
              </CustomGrid>
            </form>
          </CustomBox>
        </CustomContainer>
      );
}