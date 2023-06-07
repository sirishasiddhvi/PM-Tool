import CustomBox from "../ReUsable/CustomBox";
import CustomButton from "../ReUsable/CustomButton";
import CustomContainer from "../ReUsable/CustomContainer";
import CustomTextField from "../ReUsable/CustomTextfield";
import { MenuItem } from "@mui/material";
import CustomGrid from "../ReUsable/CustomGrid";
import CustomTypography from "../ReUsable/CustomTypography";
import CKEditor from "react-ckeditor-component";
import { useAddTask } from "./AddTaskFunction";

export const AddTask=()=>{
    const[task,taskChange,submitTask,err,content,handleChange]=useAddTask()
    return (
        <CustomContainer maxwidth="md">
          <CustomBox
          sx={{height:"50%",width:"60%",m:10,p:2,boxShadow:5}}>
            <form onSubmit={submitTask}>
              <CustomGrid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                  <CustomTypography variant="h3">Add Task</CustomTypography>
                
                  <CustomTextField
              size="small"
              type="text"
              name="project_id"
              label="Project Id"
              value={task.project_id}
              onChange={taskChange}
              color={err === 1 ? "error" : ""}
              focused={err === 1 ? true : false}
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
              <CustomTextField
              size="small"
              type="text"
              name="scope_id"
              label="Scope Id"
              value={task.scope_id}
              onChange={taskChange}
              color={err === 2 ? "error" : ""}
              focused={err === 2 ? true : false}
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
              <CustomTextField
              size="small"
              type="text"
              name="task_title"
              label="Task Title"
              value={task.task_title}
              onChange={taskChange}
              color={err === 3 ? "error" : ""}
              focused={err === 3 ? true : false}
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
             <CKEditor
              activeClass="p10"
              content={content}
              config={{
                toolbar: [
                  {
                    name: "document",
                    items: [
                      "Source",
                      "-",
                      "NewPage",
                      "Preview",
                      "-",
                      "Templates",
                    ],
                  },
                  {
                    name: "clipboard",
                    items: [
                      "Cut",
                      "Copy",
                      "Paste",
                      "PasteText",
                      "PasteFromWord",
                      "-",
                      "Undo",
                      "Redo",
                    ],
                  },
                  {
                    name: "styles",
                    items: ["Styles", "Format", "Font", "FontSize"],
                  },
                  {
                    name: "basicstyles",
                    items: [
                      "Bold",
                      "Underline",
                      "Italic",
                      "Strike",
                      "Subscript",
                      "Superscript",
                      "-",
                      "RemoveFormat",
                    ],
                  },
                  {
                    name: "colors",
                    items: ["fontColor", "fontBackgroundColor"],
                  },
                  { name: "links", items: ["Link", "Unlink", "Anchor"] },
                  {
                    name: "insert",
                    items: ["Image", "Table", "HorizontalRule", "SpecialChar"],
                  },
                  { name: "tools", items: ["Maximize"] },
                  { name: "others", items: ["-"] },
                  { name: "about", items: ["About"] },
                ],
                height: 300,
                width:800,
              }}
              events={{
                change: handleChange,
              }}
            />
             <CustomTextField
              size="small"
              type="text"
              name="task_assigned_by"
              label="Task Assigned By"
              value={task.task_assigned_by}
              onChange={taskChange}
              color={err === 5 ? "error" : ""}
              focused={err === 5 ? true : false}
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
             <CustomTextField
              size="small"
              type="text"
              name="task_assign_to"
              label="Task Assigned To"
              value={task.task_assign_to}
              onChange={taskChange}
              color={err === 6 ? "error" : ""}
              focused={err === 6 ? true : false}
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
             <CustomTextField
              size="small"
              type="date"
              name="task_due_date"
              label="Due Date"
              value={task.task_due_date}
              onChange={taskChange}
              color={err === 7 ? "error" : ""}
              focused={err === 7 ? true : false}
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            />
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
              sx={{ m: 2 }}
              style={{ width: "250px" }}
            >
                  <MenuItem value="1">Not Started</MenuItem>
                  <MenuItem value="2">In Progress</MenuItem>
                  <MenuItem value="3">In Review</MenuItem>
                  <MenuItem value="4">Completed</MenuItem>
            </CustomTextField>
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
    )
}