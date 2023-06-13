import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, CardMedia, Button } from "@mui/material";
import CustomTextField from "../ReUsable/CustomTextfield";
import CustomButton from "../ReUsable/CustomButton";
import CustomTypography from "../ReUsable/CustomTypography";
import CustomContainer from "../ReUsable/CustomContainer";
import CustomBox from "../ReUsable/CustomContainer";
import CustomGrid from "../ReUsable/CustomGrid";
import SingleProjectViewFunction from './SingleProjectEditFunction'

export default function SingleProjectView() {
    
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
      data, setData,
      created_date, setCreatedDate,
      project_id, setProjectId
    ] = SingleProjectViewFunction();


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
              name="project_id"
              type="text"
              value={project_id}
              label="Project ID *"
              onChange={(e) => setProjectId(e.target.value)}
              error={err == 1 && true}
              fullWidth
              sx={{ mt: 2 }}
            />
            <CustomTextField
              name="setProject_name"
              type="text"
              value={project_name}
              label="Project Name *"
              onChange={(e) => setProject_name(e.target.value)}
              error={err == 2 && true}
              fullWidth
              sx={{ mt: 2 }}
            />
            <CustomTextField
              name="project_desc"
              type="text"
              value={project_desc}
              label="Project Description *"
              onChange={(e) => setProject_Desc(e.target.value)}
              error={err == 3 && true}
              fullWidth
              sx={{ mt: 2 }}
            />
            <CustomTextField
              name="client_id"
              type="text"
              value={client_id}
              label="Client ID *"
              onChange={(e) => setClient_Id(e.target.value)}
              error={err == 4 && true}
              fullWidth
              sx={{ mt: 2 }}
            />
            <CustomTextField
              name="Manager_id"
              type="text"
              value={Manager_id}
              label="Manager ID *"
              onChange={(e) => setManager_Id(e.target.value)}
              error={err == 5 && true}
              fullWidth
              sx={{ mt: 2 }}
            />

            <CustomTextField
              name="created_date"
              type="text"
              value={created_date}
              label="Date *"
              onChange={(e) => setCreatedDate(e.target.value)}
              error={err == 6 && true}
              fullWidth
              disabled
              sx={{ mt: 2 }}
            />

{/* <Button
                variant="outlined"
                size="small"
                component="label"
                value={images}
                error={err == 5 && true}
                onChange={imageChange}
                // error={err == 7 && true}
                sx={{
                  width: "100%",
                  height: 36,
                  color: "#060847",
                  "&:hover": { color: "#060847" },
                  mt: 4,
                }}
              >
                images*
                <input hidden type="file" multiple />
              </Button> */}
{JSON.stringify(images)}
<Button
  variant="outlined"
  component="label"
  onChange={imageChange}
  value={images}
  error={err == 7 && true}
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
    hidden
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
    {console.log("Images:", images)}
    {Array.isArray(images) && images.length !== 0 ? (
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
              <CustomGrid item key={image.preview}>
                <Card>
                  <CardMedia
                    style={{ height: 200, width: 200 }}
                    image={image.preview}
                    title={image.preview}
                  />

             {/* <img src={`static/projects/${image}`} height={100} width={100}/> */}
                  
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
      <span style={{ color: "white" }}>
        <br />
        <br />
        No Images Found.
      </span>
    )}
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
  )
}
