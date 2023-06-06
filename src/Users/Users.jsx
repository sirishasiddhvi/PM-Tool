import { useUsers } from "./usersFunction";
import CustomContainer from "../ReUsable/CustomContainer";
import CustomBox from "../ReUsable/CustomBox";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

export const Users = () => {
  const [data] = useUsers();
  const columns = [
    { selector: "user_id", name: "ID", sortable: true, width: "8%" },
    { selector: "user_name", name: "Name", sortable: true, width: "15%" },
    { selector: "user_email", name: "Email", sortable: true, width: "15%" },
    { selector: "user_mobile", name: "Mobile", sortable: true, width: "15%" },
    { cell:(row)=>(
        <p>{row.user_role===1?"":""}</p>
    ), name: "Role", sortable: true, width: "15%" },
    { selector: "reg_date", name: "Reg-Date", sortable: true, width: "15%" },
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
