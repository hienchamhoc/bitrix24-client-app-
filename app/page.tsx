"use client"
import { Box, Button, Card, CardContent, CardHeader, createTheme, Grid, LinearProgress, List, ListItem, responsiveFontSizes, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import {User, UserField } from "./data/user";
import dayjs from "dayjs";
import DetailDialog from "./detail";
import oauthApi from "./api/oauth2";
import toast from "react-hot-toast";
import userApi from "./api/user";
import userFieldApi from "./api/user/field";

interface CellType {
  row: User
}
interface Data {
  result: User[],
  total:number,
  time:any
}

export default function Home() {
  let theme = createTheme();
  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  };

  const [detailDialog, setDetailDialog] = useState<boolean>(false)
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [field,setField] = useState<UserField>()
  const [data, setData] = useState<Data>();
  const handleOpenDetail = useCallback(() => {
    setDetailDialog(true)
  }, [])
  const getAccessToken = async ()=>{
    try {
      const res = await oauthApi.getAccessToken()
      setToken(res.data.token)
    } catch (error) {
      toast.error("Lấy token không thành công")
    }
  }
  useEffect( ()=>{
    getAccessToken()
  },[])

  const getListUser = async ()=>{
    if(token){
      const res = await userApi.getList({token:token})
      setData(res.data)
    }
  }
  const getUserField = async ()=>{
    if(token){
      const res = await userFieldApi.getField({token:token})
      setField(res.data.result)
    }
  }

  useEffect(()=>{
    getUserField()
    getListUser()
  },[token])

  useEffect(()=>{
    console.log(data);
    
  },[])

  var columns: GridColDef[] = [
    {
      flex: 0.05,
      field: 'id',
      minWidth: 50,
      headerName: field? field.ID:'',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography>
            {row.ID}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'name',
      minWidth: 100,
      headerName: field? field.NAME:'',
      renderCell: ({row}:CellType) => {
        return <Typography>{row.NAME}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 140,
      field: 'email',
      headerName: field? field.EMAIL:'',
      sortable: false,
      renderCell: ({row}:CellType) => {
        return <Typography>{row.EMAIL}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'active',
      headerName: field? field.ACTIVE:'',
      sortable: false,
      renderCell: ({row}:CellType) => {
        if(row.ACTIVE){
          return <Typography>Có</Typography>
        }else{
          return <Typography>không</Typography>
        }
        
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'date_register',
      headerName: field? field.DATE_REGISTER: '',
      sortable: false,
      renderCell: ({row}:CellType) => {
        return <Typography>{dayjs(row.DATE_REGISTER).format("DD/MM/YYYY")}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'last_login',
      headerName:  field? field.LAST_LOGIN: '',
      sortable: false,
      renderCell: ({row}:CellType) => {
        return <Typography>{dayjs(row.LAST_LOGIN).format("HH:mm DD/MM/YYYY")}</Typography>
      }
    },
  ]

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ m: 2 }} >
      <Grid container spacing={0} rowGap={4}>
      <Grid item xs={12}>
          <Card>
          {detailDialog ? <DetailDialog field={field} open={detailDialog} user={user!} setOpen={setDetailDialog} /> : null}
            <CardHeader
              title={
                <Grid container>
                  <Grid item xs={12} sm={10} md={9} lg={10}>
                    Bài kiểm tra sơ cấp vòng 1
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} lg={2}>
                  </Grid>
                </Grid>
              }
            ></CardHeader>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Grid container>
                  <Grid item xs={12} sm={10} md={9} lg={10}>
                    <Typography >Danh sách nhân viên</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} lg={2}>
                    
                  </Grid>
                </Grid>
              }
              action={
                <Grid container spacing={3} >
                  <Grid item md={4} xs={12} >
                    <Button variant='outlined' color="info"
                      size={useMediaQuery(theme.breakpoints.down("sm")) ? "small" : "medium"}
                      onClick={()=>{
                        getListUser()
                      }}>
                      &nbsp; <Typography>Refesh</Typography>
                    </Button>
                  </Grid>
                  <Grid item  md={8} xs={12}>
                    <Button variant='outlined' size={useMediaQuery(theme.breakpoints.down("sm")) ? "small" : "medium"} 
                      onClick={()=>{
                        if(user){
                          handleOpenDetail()
                        }
                      }}>
                      &nbsp; <Typography>View Employee</Typography>
                    </Button>
                  </Grid>
                </Grid>
              }
            ></CardHeader>
            <CardContent>
            <DataGrid
                autoHeight
                paginationMode='client'
                slotProps={{
                  pagination: {
                    labelRowsPerPage: 'Số bản ghi mỗi trang',
                    labelDisplayedRows(paginationInfo) {
                      return (
                        <Typography>
                          {paginationInfo.from} - {paginationInfo.to} trên {paginationInfo.count}
                        </Typography>
                      )
                    }
                  }
                }}
                getRowId={(row)=>row.ID}
                pagination
                pageSizeOptions={[10, 25, 50]}
                // paginationModel={paginationModel}
                // onPaginationModelChange={setPaginationModel}
                // sortModel={sortModel}
                // onSortModelChange={newSortModel => setSortModel(newSortModel)}
                rowHeight={62}
                sx={{
                  // disable cell selection style
                  '.MuiDataGrid-cell:focus': {
                    outline: 'none'
                  },

                  // pointer cursor on ALL rows
                  '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer'
                  }
                }}
                hideFooterSelectedRowCount
                // rowCount={data.total}
                rows={data ? data.result.filter(user =>user.USER_TYPE === 'employee'): []}
                columns={columns}
                // disableRowSelectionOnClick
                // disableColumnSelector
                disableColumnFilter
                disableColumnMenu
                onRowClick={ ({ id }) => {
                  const userFound = data!.result.find((element)=> element.ID === (id as any))
                  if(userFound){
                    setUser(userFound)
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </Box>
    </ThemeProvider>
  );
}
