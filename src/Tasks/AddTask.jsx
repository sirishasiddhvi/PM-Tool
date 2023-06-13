import CustomBox from "../ReUsable/CustomBox";
import CustomButton from "../ReUsable/CustomButton";
import CustomContainer from "../ReUsable/CustomContainer";
import CustomTextField from "../ReUsable/CustomTextfield";
import { MenuItem } from "@mui/material";
import CustomGrid from "../ReUsable/CustomGrid";
import CustomTypography from "../ReUsable/CustomTypography";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAddTask } from "./AddTaskFunction";

export const AddTask = () => {
  const [
    task,
    taskChange,
    submitTask,
    err,
    task_desc,
    task_descChange,
    task_images,
    task_imageChange,
  ] = useAddTask();
  return (
    <CustomContainer maxwidth="md">
      <CustomBox
        sx={{ height: "50%", width: "60%", m: 10, p: 5, boxShadow: 5 }}
      >
        <CustomTypography variant="h3">Add Task</CustomTypography>
        <form onSubmit={submitTask}>
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
                label="Project Id"
                value={task.project_id}
                onChange={taskChange}
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
                name="scope_id"
                label="Scope Id"
                value={task.scope_id}
                onChange={taskChange}
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
                name="task_title"
                label="Task Title"
                value={task.task_title}
                onChange={taskChange}
                color={err === 3 ? "error" : ""}
                focused={err === 3 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              <CustomTextField
                size="small"
                type="date"
                name="task_due_date"
                label="Due Date"
                value={task.task_due_date}
                onChange={taskChange}
                color={err === 7 ? "error" : ""}
                focused={err === 7 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              <CustomTextField
                size="small"
                type="text"
                name="task_assigned_by"
                label="Task Assigned By"
                value={task.task_assigned_by}
                onChange={taskChange}
                color={err === 5 ? "error" : ""}
                focused={err === 5 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              <CustomTextField
                size="small"
                type="text"
                name="task_assign_to"
                label="Task Assigned To"
                value={task.task_assign_to}
                onChange={taskChange}
                color={err === 6 ? "error" : ""}
                focused={err === 6 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              />
            </CustomGrid>
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              <CKEditor
                editor={ClassicEditor}
                data={task_desc}
                onChange={task_descChange}
              />
            </CustomGrid>
           
            <CustomGrid item md={6} lg={6} xl={6} sm={12} xs={12}>
              {task_images.length != 0 &&
                task_images.map((article) => (
                  <img width="250px" height="250px" src={article.url} />
                ))}
              <br />
              <br />

              <input
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={task_imageChange}
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
                  //  style={{ width: "250px" }}
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
                name="task_status"
                label="Task Status"
                value={task.task_status}
                onChange={taskChange}
                color={err === 9 ? "error" : ""}
                focused={err === 9 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              >
                <MenuItem value="1">Not Started</MenuItem>
                <MenuItem value="2">In Progress</MenuItem>
                <MenuItem value="3">In Review</MenuItem>
                <MenuItem value="4">Completed</MenuItem>
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
