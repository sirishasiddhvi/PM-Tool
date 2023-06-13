import React from 'react'
// import ScopeFunction from './AllScopesFunction'
import CustomButton from '../ReUsable/CustomButton'
import CustomTypography from '../ReUsable/CustomTypography'
import CustomContainer from '../ReUsable/CustomContainer'
import CustomBox from '../ReUsable/CustomContainer'
import CustomGrid from '../ReUsable/CustomGrid'
import axios from 'axios';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ApprovedScopesFunction from './ApprovedScopesFunction'

export  function ApprovedScopes() {
  console.log('view_approved_scopes2')
    let history = useNavigate();
    const [data, setData] = ApprovedScopesFunction();

    const columns = [
        { selector: "scope_id", name: "Scope ID", sortable: true, width: "8%" },
        { selector: "scope_title", name: "Scope Title", sortable: true, width: "15%" },
        { selector: "project_id", name: "Project_ID", sortable: true, width: "15%" },
        { selector: "manager_id", name: "Manager ID", sortable: true, width: "15%" },
        { selector: "client_id", name: "Client ID", sortable: true, width: "15%" },
        { selector: "scope_approved", name: "Scope Approved", sortable: true, width: "15%" },
        { selector: "scope_desc", name: "Scope Desc", sortable: true, width: "15%" },
        { selector: "created_date", name: "Created Date", sortable: true, width: "15%" },
        {
          cell:(row)=>(
            row.scope_images.split(",").map((scope)=>(
            <img src={"static/scope/"+ scope} height={100} width={100}/>))
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
  
      const tableData = {
        columns,
        data,
      };
  
       return (
         <div >
            <br />
           <CustomContainer >
             <CustomBox sx={{ textAlign: "center", border:1, p:6, borderRadius:2, mt:15}}>
             <CustomTypography variant="h4" sx={{ textAlign: "center" }}>
             Approved Scopes
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
     
