import CustomContainer from "../ReUsable/CustomContainer";
import CustomBox from "../ReUsable/CustomBox";
import CustomButton from "../ReUsable/CustomButton";
import DataTable from "react-data-table-component";
import CustomGrid from "../ReUsable/CustomGrid";
import DataTableExtensions from "react-data-table-component-extensions";
import { useTasks } from "./TasksFunction";
import { useNavigate } from "react-router-dom";

export const Tasks = () => {
  const [data] = useTasks();
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
      width: "15%",
    },
    {
      cell: (row) => (
        <CustomButton
          type="button"
          variant="contained"
          label="edit"
          onClick={() => history(`/edittask/${row.task_id}`)}
        ></CustomButton>
      ),
      name: "Edit",
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
    </CustomContainer>
  );
};
