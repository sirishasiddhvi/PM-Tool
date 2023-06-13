import CustomContainer from "../ReUsable/CustomContainer";
import CustomBox from "../ReUsable/CustomBox";
import CustomButton from "../ReUsable/CustomButton";
import DataTable from "react-data-table-component";
import CustomGrid from "../ReUsable/CustomGrid";
import CustomTextField from "../ReUsable/CustomTextfield";
import CustomTypography from "../ReUsable/CustomTypography";
import CustomDialog from "../ReUsable/CustomDilog";
import { MenuItem } from "@mui/material";
import DataTableExtensions from "react-data-table-component-extensions";
import { useTasks } from "./TasksFunction";
import { useNavigate } from "react-router-dom";
import { useStatus } from "./UpdateStatusFunction";

export const Tasks = () => {
  const [data] = useTasks();
  const [task_status,statusChange,open,openStatus,closeStatus,updateStatus,err]=useStatus()
  const history = useNavigate();
  const columns = [
    { selector: "task_id", name: "ID", sortable: true, width: "8%" },
    { selector: "task_title", name: "TaskTitle", sortable: true, width: "8%" },
    { selector: "project_id", name: "ProjectId", sortable: true, width: "8%" },
    { selector: "scope_id", name: "ScopeId", sortable: true, width: "8%" },
    {
      selector: "task_assigned_by",
      name: "AssignedBy",
      sortable: true,
      width: "8%",
    },
    {
      selector: "task_assigned_to",
      name: "AssignedTo",
      sortable: true,
      width: "8%",
    },
    {
      selector: "task_created_date",
      name: "CreatedDate",
      sortable: true,
      width: "8%",
    },
    { selector: "task_due_date", name: "DueDate", sortable: true, width: "8%" },
    { selector: "task_desc", name: "Description", sortable: true, width: "8%" },
    {
      cell: (row) =>
        row.task_images.split(",").map((task) => (
          <CustomGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={"/static/tasks/" + task} style={{ height: "50px" }} />
          </CustomGrid>
        )),
      name: "TaskImages",
      sortable: true,
      width: "20%",
    },
    {
      cell: (row) => (
        <div>
          <p>{row.task_status == 1 ? "Not Started" : ""}</p>
          <p>{row.task_status == 2 ? "In Progress" : ""}</p>
          <p>{row.task_status == 3 ? "In Review" : ""}</p>
          <p>{row.task_status == 4 ? "Completed" : ""}</p>
        </div>
      ),
      name: "Status",
      sortable: true,
      width: "10%",
    },
    {
      cell: (row) => (
        <CustomButton
          type="button"
          variant="contained"
          label="taskupdate"
          sx={{textTransform:"lowercase"}}
          onClick={()=>openStatus(row.task_id)}
        ></CustomButton>
      ),
      name: "TaskUpdate",width:"10%"
    },
    {
      cell: (row) => (
        <CustomButton
          type="button"
          variant="contained"
          label="edit"
          sx={{textTransform:"lowercase"}}
          onClick={() => history(`/edittask/${row.task_id}`)}
        ></CustomButton>
      ),
      name: "Edit",width:"8%"
    },
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <CustomContainer maxwidth="md">
      <CustomBox sx={{ m: 10, p: 2, boxShadow: 5 }}>
        <DataTableExtensions
          print={false}
          export={false}
          columns={columns}
          filterPlaceholder="Search..."
          {...tableData}
        >
          <DataTable
            customStyles={{
              headCells: {
                style: {
                  fontSize: "15px",
                },
              },
            }}
            columns={columns}
            data={data}
            print={false}
            pagination
            highlightOnHover
            striped
          />
        </DataTableExtensions>
      </CustomBox>
      <CustomDialog open={open}
      onClose={closeStatus}>
      <CustomTypography variant="h4" align="center">Task Status</CustomTypography>
        <form>
          <CustomGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
             <CustomTextField
                select
                size="small"
                type="text"
                name="task_status"
                label="Task Status"
                value={task_status}
                onChange={statusChange}
                color={err === 1 ? "error" : ""}
                focused={err === 1 ? true : false}
                sx={{ m: 2, width: "90%" }}
                // style={{ width: "250px" }}
              >
                <MenuItem value="1">Not Started</MenuItem>
                <MenuItem value="2">In Progress</MenuItem>
                <MenuItem value="3">In Review</MenuItem>
                <MenuItem value="4">Completed</MenuItem>
              </CustomTextField>
              <CustomGrid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
              <CustomButton
                size="small"
                type="submit"
                label="update"
                variant="contained"
                sx={{ m: 2, width: "20%" ,textTransform:"lowercase"}}
                // style={{ width: "250px" }}
                onClick={updateStatus}
              />
               <CustomButton
                size="small"
                type="submit"
                label="close"
                variant="contained"
                sx={{ m: 2, width: "20%",textTransform:"lowercase" }}
                // style={{ width: "250px" }}
                onClick={closeStatus}
              /></CustomGrid>
              </CustomGrid>
              </form>
      </CustomDialog>
    </CustomContainer>
  );
};
