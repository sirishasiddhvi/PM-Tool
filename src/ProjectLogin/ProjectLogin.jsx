import React from "react";
import { Card, CardMedia, Button } from "@mui/material";
import CustomTextField from "../ReUsable/CustomTextfield";
import CustomButton from "../ReUsable/CustomButton";
import CustomTypography from "../ReUsable/CustomTypography";
import CustomContainer from "../ReUsable/CustomContainer";
import CustomBox from "../ReUsable/CustomContainer";
import CustomGrid from "../ReUsable/CustomGrid";
import ProjectLoginFunction from "./ProjectLoginFunction";
import { useState, useEffect } from "react";

export default function ProjectLogin() {
  const [
    project_name,
    setProject_name,
    project_desc,
    setProject_Desc,
    client_id,
    setClient_Id,
    Manager_id,
    setManager_Id,
    err,
    setErr,
    submit,
    imageChange,
    images,
    setImages,
    uploadwait,
    setUploadWait,
  ] = ProjectLoginFunction();

  return (
    <div>
      <br />
      <CustomContainer maxWidth="xs">
        <CustomBox
          sx={{ textAlign: "center", border: 1, p: 6, borderRadius: 2, mt: 15 }}
        >
          <CustomTypography variant="h4" sx={{ textAlign: "center" }}>
            Project
          </CustomTypography>
          <br />
          <form onSubmit={submit}>
            <CustomTextField
              name="setProject_name"
              type="text"
              value={project_name}
              label="Project Name *"
              onChange={(e) => setProject_name(e.target.value)}
              error={err == 1 && true}
              fullWidth
              sx={{ mt: 2 }}
            />
            <CustomTextField
              name="project_desc"
              type="text"
              value={project_desc}
              label="Project Description *"
              onChange={(e) => setProject_Desc(e.target.value)}
              error={err == 2 && true}
              fullWidth
              sx={{ mt: 2 }}
            />
            <CustomTextField
              name="client_id"
              type="text"
              value={client_id}
              label="Client ID *"
              onChange={(e) => setClient_Id(e.target.value)}
              error={err == 3 && true}
              fullWidth
              sx={{ mt: 2 }}
            />
            <CustomTextField
              name="Manager_id"
              type="text"
              value={Manager_id}
              label="Manager ID *"
              onChange={(e) => setManager_Id(e.target.value)}
              error={err == 4 && true}
              fullWidth
              sx={{ mt: 2 }}
            />

            <Button
              variant="outlined"
              onChange={imageChange}
              error={err == 5 && true}
              sx={{
                mt: 2,
                width: "100%",
                color: "#060847",
                "&:hover": { color: "#060847" },
              }}
            >
              upload image *
              <input
                type="file"
                multiple
                accept="image/jpeg, image/jpg, image/png"
              />
            </Button>
            {uploadwait ? (
              <span style={{ color: "white" }}>
                <br />
                <br />
                Adding Images...
              </span>
            ) : (
              <>
                {images.length !== 0 ? (
                  <CustomGrid item xs={12}>
                    <CustomGrid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      spacing={3}
                    >
                      {images.map((image) => {
                        return (
                          <CustomGrid item>
                            <Card>
                              <CardMedia
                                style={{ height: 200, width: 200 }}
                                image={image.preview}
                                title={image.preview}
                              />
                              <CustomButton
                                label={"DELETE IMAGE"}
                                variant="outlined"
                                color="primary"
                                component="span"
                                style={{
                                  border: "1px solid black",
                                  color: "#060847",
                                  "&:hover": { color: "#060847" },
                                }}
                                fullWidth
                                onClick={() => {
                                  setImages(
                                    images.filter(
                                      (item) => item.preview !== image.preview
                                    )
                                  );
                                }}
                              >
                                DELETE IMAGE
                              </CustomButton>
                            </Card>
                          </CustomGrid>
                        );
                      })}
                    </CustomGrid>
                  </CustomGrid>
                ) : (
                  ""
                )}{" "}
              </>
            )}

            <CustomButton
              // sx={{ backgroundColor: "#0b57cf ", color: "black" }}
              type="submit"
              label={"Submit"}
              variant="contained"
              sx={{ mt: 4 }}
            />
          </form>
        </CustomBox>
      </CustomContainer>
    </div>
  );
}

