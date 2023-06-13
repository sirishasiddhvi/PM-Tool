import React from "react";
import ScopeFunction from "./AllScopesFunction";
import CustomButton from "../ReUsable/CustomButton";
import CustomTypography from "../ReUsable/CustomTypography";
import CustomContainer from "../ReUsable/CustomContainer";
import CustomBox from "../ReUsable/CustomContainer";
import CustomGrid from "../ReUsable/CustomGrid";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomDialog from "../ReUsable/CustomDilog";
import CustomTextField from "../ReUsable/CustomTextfield";
import { DialogActions, MenuItem, TextField, Button } from "@mui/material";

export  function AllScopes() {
  let history = useNavigate();
  const [
    data,
    setData,
    reject,
    setReject,
    open,
    setOpen,
    status,
    setStatus,
    handleClickOpen,
    handleClose,
    handle,
    id,
    setID,
  ] = ScopeFunction();

  const columns = [
    { selector: "scope_id", name: "Scope ID", sortable: true, width: "8%" },
    {
      selector: "scope_title",
      name: "Scope Title",
      sortable: true,
      width: "9%",
    },
    { selector: "project_id", name: "Project ID", sortable: true, width: "9%" },
    { selector: "manager_id", name: "Manager ID", sortable: true, width: "9%" },
    { selector: "client_id", name: "Client ID", sortable: true, width: "9%" },
    { selector: "scope_desc", name: "Scope Desc", sortable: true, width: "9%" },
    {
      selector: "created_date",
      name: "Created Date",
      sortable: true,
      width: "9%",
    },
    {
      selector: "scope_images",
      name: "Scope Images",
      sortable: true,
      width: "9%",
    },
    {
      cell: (row) => (
        <img
          src={"static/scope/" + row.scope_images}
          height={100}
          width={100}
        />
      ),
      name: "Project Images",
      sortable: true,
      width: "9%",
    }, 
    {
      selector: "scope_approval_status",
      name: "Status",
      sortable: true,
      width: "7%",
    },

    {
      cell: (row) =>
        row.scope_approval_status === 'Approved' ? (
          <CustomButton
          type="button"
          size='small'
          variant="contained"
          label="Reject"
          onClick={() => {
            handleClickOpen();
            setID(row.scope_id);
          }}
        ></CustomButton>
        ) : (
         

          <CustomButton
            type="button"
            size='small'
            variant="contained"
            label="Approve"
            onClick={() => {
              handleClickOpen();
              setID(row.scope_id);
            }}
          ></CustomButton>
        ),
      name: "Approve/Reject",
      width: "10%",
    },
    {
      cell: (row) => (
        <CustomButton
          type="button"
          size='small'
          variant="contained"
          label="edit"
          onClick={() => history(`/single_project_view/${row.project_id}`)}
        ></CustomButton>
      ),
      name: "Edit",
      width: "6%",
    },
    {
      cell: (row) => (
        <CustomButton
          type="button"
          size='small'
          variant="contained"
          label="Deactive"
          onClick={() => {}}
        ></CustomButton>
      ),
      name: "Deactive",
      width: "8%",
    },
  ];

  console.log(data, "data data data data");
  const tableData = {
    columns,
    data,
  };

  return (
    <div>
      <br />
      <CustomContainer>
        <CustomBox
          sx={{ textAlign: "center", border: 1, p: 6, borderRadius: 2, mt: 15 }}
        >
          <CustomTypography variant="h4" sx={{ textAlign: "center" }}>
            Scope
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
            />
          </DataTableExtensions>
        </CustomBox>
      </CustomContainer>

      <CustomDialog open={open} onClose={handleClose}>
        <h4>ARE YOU SURE?</h4>

        {/* <CustomTextField
    
             select
             size="small"
             name="status"
             label="Status"
             value={status}

             sx={{
               m: 2,
               width: "80%",
             }}
             onChange={(e) => setStatus(e.target.value)}
            //  sx={{width:180}}
           >
            <MenuItem value="0">Inactive</MenuItem>
            <MenuItem value="1">Active</MenuItem>

           </CustomTextField> */}
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handle} >
            Agree
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}
