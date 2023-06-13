import CustomContainer from "../ReUsable/CustomContainer";
import CustomBox from "../ReUsable/CustomBox";
import CustomButton from "../ReUsable/CustomButton";
import { useUsers } from "./UsersFunction";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [data] = useUsers();
  const history= useNavigate()
  const columns = [
    { selector: "user_id", name: "ID", sortable: true, width: "8%" },
    { selector: "user_name", name: "Name", sortable: true, width: "15%" },
    { selector: "user_email", name: "Email", sortable: true, width: "15%" },
    { selector: "user_mobile", name: "Mobile", sortable: true, width: "15%" },
    { cell:(row)=>(<div>
        <p>{row.user_role==1?"Admin":""}</p>
        <p>{row.user_role==2?"Manager":""}</p>
        <p>{row.user_role==3?"TeamLeader":""}</p>
        <p>{row.user_role==4?"Developer":""}</p>
        <p>{row.user_role==5?"Client":""}</p>
        </div>
    ), name: "Role", sortable: true, width: "15%" },
    { selector: "reg_date", name: "Reg-Date", sortable: true, width: "15%" },
    {
      cell: (row) => (
        <CustomButton
        type="button"
        variant="contained"
        label="edit"
          onClick={() => history(`/edituser/${row.user_id}`)}></CustomButton>
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
        /></DataTableExtensions>
      </CustomBox>
    </CustomContainer>
  );
};
