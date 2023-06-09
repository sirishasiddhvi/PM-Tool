import CustomBox from "../ReUsable/CustomBox";
import CustomButton from "../ReUsable/CustomButton";
import CustomContainer from "../ReUsable/CustomContainer";
import CustomTextField from "../ReUsable/CustomTextfield";
import { CardActions, MenuItem, Card } from "@mui/material";
import CustomGrid from "../ReUsable/CustomGrid";
import CustomTypography from "../ReUsable/CustomTypography";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEditScope } from "./EditScopefunction";

export const EditScope = () => {
  const [
    scope,
    scopeChange,
    scopeSubmit,
    scope_desc,
    scope_descChange,
    scope_images,
    scope_imageChange,
    err,
  ] = useEditScope();
  return (
    <CustomContainer maxwidth="md">
      <CustomBox
        sx={{ height: "50%", width: "60%", m: 10, p: 2, boxShadow: 5 }}
      >
        <form onSubmit={scopeSubmit}>
          <CustomTypography variant="h3">Edit Scope</CustomTypography>
          <CustomGrid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              <CustomTextField
                size="small"
                type="text"
                name="project_id"
                label="ProjectId"
                value={scope.project_id}
                onChange={scopeChange}
                color={err === 1 ? "error" : ""}
                focused={err === 1 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              <CustomTextField
                size="small"
                type="text"
                name="manager_id"
                label="ManagerId"
                value={scope.manager_id}
                onChange={scopeChange}
                color={err === 2 ? "error" : ""}
                focused={err === 2 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              <CustomTextField
                size="small"
                type="text"
                name="client_id"
                label="ClientId"
                value={scope.client_id}
                onChange={scopeChange}
                color={err === 3 ? "error" : ""}
                focused={err === 3 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              {" "}
              <CustomTextField
                size="small"
                type="text"
                name="scope_title"
                label="ScopeTitle"
                value={scope.scope_title}
                onChange={scopeChange}
                color={err === 4 ? "error" : ""}
                focused={err === 4 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              {" "}
              <CKEditor
                editor={ClassicEditor}
                data={scope_desc}
                onChange={scope_descChange}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              {scope_images.length != 0 &&
                scope_images.split(",").map((scope) => (
                  <Card>
                    <img
                      width="250px"
                      height="250px"
                      src={"/static/scope/" + scope}
                    />
                    <CardActions>
                      <CustomButton
                        variant="contained"
                        color="primary"
                        label="delete"
                        // onClick={deleteImage}
                      />
                    </CardActions>
                  </Card>
                ))}
              {/* {<img width="250px" height="250px" src={scope_images} />} */}
              <br />
              <br />

              <input
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={scope_imageChange}
                id="contained-button-file"
                type="file"
              />
              <label htmlFor="contained-button-file">
                <CustomButton
                  variant="contained"
                  color="primary"
                  label="uploadImages"
                  component="span"
                  sx={{ m: 2, width: "90%" }}
                  // style={{ width: "250px" }}
                />
              </label>
              {err === 8 && (
                <div style={{ color: "red" }}>Please select a file.</div>
              )}
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              <CustomTextField
                select
                size="small"
                type="text"
                name="scope_approved"
                label="ScopeApproved"
                value={scope.scope_approved}
                onChange={scopeChange}
                color={err === 5 ? "error" : ""}
                focused={err === 5 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              >
                <MenuItem value="0">Not Approved</MenuItem>
                <MenuItem value="1">Approved</MenuItem>
              </CustomTextField>
            </CustomGrid>
            <CustomGrid item md={12} lg={12} xl={12} sm={12} xs={12}>
              <CustomButton
                size="small"
                type="submit"
                label="submit"
                variant="contained"
                sx={{ m: 2, width: "50%" }}
                // style={{ width: "250px" }}
              >
                submit
              </CustomButton>
            </CustomGrid>
          </CustomGrid>
        </form>
      </CustomBox>
    </CustomContainer>
  );
};
