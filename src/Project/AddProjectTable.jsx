import React from 'react'
import { Card,CardMedia,Button} from "@mui/material";
import CustomTextField from '../ReUsable/CustomTextfield'
import CustomButton from '../ReUsable/CustomButton'
import CustomTypography from '../ReUsable/CustomTypography'
import CustomContainer from '../ReUsable/CustomContainer'
import CustomBox from '../ReUsable/CustomContainer'
import CustomGrid from '../ReUsable/CustomGrid'
import axios from 'axios';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import EditProjectLoginFunction from './AddProjectTableFunction'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
  
export default function EditProjectLogin() {
  let history = useNavigate();
  
    const [data, setData] = EditProjectLoginFunction()

    

    const columns = [
      { selector: "project_id", name: "Project ID", sortable: true, width: "8%" },
      { selector: "project_name", name: "Project Name", sortable: true, width: "15%" },
      { selector: "client_id", name: "Client ID", sortable: true, width: "15%" },
      { selector: "manager_id", name: "Manager ID", sortable: true, width: "15%" },
      { selector: "project_desc", name: "Project Desc", sortable: true, width: "15%" },
      { selector: "created_date", name: "Created Date", sortable: true, width: "15%" },
      {
        cell:(row)=>(
          <img src={"static/projects/"+row.project_images} height={100} width={100}/>
        ), name: "Project Images", sortable: true, width: "15%" },  
      {
        cell: (row) => (
          <CustomButton
          type="button"
          variant="contained"
          label="edit"
          onClick={() => history(`/single_project_view/${row.project_id}`)}></CustomButton>
        ),
        name: "Edit",
      },  
      {
        cell: (row) => (
          <CustomButton
          type="button"
          variant="contained"
          label="Deactive"
            onClick={() => {}}></CustomButton>
        ),
        name: "Deactive",
      },
    ];

    console.log(data,'data data data data')
    const tableData = {
      columns,
      data,
    };

    useEffect(() => {
      fetchData();
    }, [])
    const fetchData = async () =>{
      await axios.post('/api/view_projects').then((res) => {
        // setData(res.data)
        console.log(res,'sai')
        console.log(res.data.status,'sai')
        if (res.data.status === true){
          console.log('tiru')
          setData(res.data.data)

        }
      })
    }
     return (
       <div >
          <br />
         <CustomContainer >
           <CustomBox sx={{ textAlign: "center", border:1, p:6, borderRadius:2, mt:15}}>
           <CustomTypography variant="h4" sx={{ textAlign: "center" }}>
           Project
         </CustomTypography>
         <br />
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
       </div>
     );
   }
   
