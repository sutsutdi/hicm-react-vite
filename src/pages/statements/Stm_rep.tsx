import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Tab,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridRenderCellParams,
  GridRowModesModel,
} from '@mui/x-data-grid'

import { Delete, Add, ModeEdit } from '@mui/icons-material'
import CardHeader1 from '../../assets/account.jpg'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { TabContext, TabList, TabPanel } from '@mui/lab'

const apiUrl = import.meta.env.VITE_API_URL // localhost
// const apiUrl = import.meta.env.VITE_API_SERVER_URL // server HICM

type ReceiptProp = {
  id: number
  receipt_no: string
  receipt_date: string
  statement: string
  repno: string
  amount: number
}

type StmRepProp = {
  statement: string
  repno: string
  amount: number
}

const stmrep0 = {
  statement: 'xxx',
  repno: '123',
  amount: 122.23,
}

export default function StmRepPage() {
  const [receipt,setReceipt] = useState<ReceiptProp[]>([])
  const [stmDt, setStmDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [stmRep, setStmRep] = useState<StmRepProp[]>([])
  const [repno, setRepno] = useState<string>('')
  const [statement, setStatement] = useState<string>('')
  const [amount, setAmount] = useState(0.0)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openDialog2, setOpenDialog2] = useState<boolean>(false)
  const [lastNo, setLastNo] = useState<number>(0)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)


  useEffect( () => {
    const result = async () => {
    try {           
        const response = await axios.get(`${apiUrl}/receipt` )
        const resp = response.data.data
        setReceipt(resp)
    
    } catch (error) {
      console.log('ERROR', error)
    }
  }  

  result()
   
  }, [isAdd])
  

  const columns: GridColDef[] = [
    // {
    //   field: 'stm_date',
    //   headerName: 'Date',
    //   width: 120,
    // },
    { field: 'statement', headerName: 'Statement No', width: 150 },
    { field: 'repno', headerName: 'Rep No', editable: true, width: 150 },
    { field: 'amount', headerName: 'จำนวนเงินชดเชย', editable: true, width: 150 },
    {
      field: '.',
      headerName: 'Action',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction={'row'}>
          <IconButton aria-label="edit" size="large" color="primary">
            <ModeEdit />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            color="error"
            onClick={() => onDeleteRep(row)}
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ]


  const columns2: GridColDef[] = [
  
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'receipt_no', headerName: 'Receipt No', width: 150 },
    { field: 'receipt_date', headerName: 'Receipt Date', width: 150 },
    { field: 'statement', headerName: 'Statement No', width: 150 },
    { field: 'repno', headerName: 'Rep No', editable: true, width: 150 },
    { field: 'amount', headerName: 'จำนวนเงินชดเชย', editable: true, width: 150 },
    {
      field: 'stm_date',
      headerName: 'Statement Date',
      width: 120,
    },
  ]

  

  const onSubmit = async () => {
    // const apiBackendUrl = import.meta.env.VITE_API_BACKEND_URL

    const statement_rep = stmRep
    console.log(statement_rep)

    try {
      const data = stmRep
      data.forEach(async (item) => {
        const { statement, repno, amount } = item
        console.log('item')
        console.log(item)
        console.log(statement)
        console.log(repno)
        console.log(amount)
        const response = await axios.post(`${apiUrl}/receipt/stmrep`, {
          statement,
          repno,
          amount,
        })
        const resp = response.data
        console.log(resp)
      })
    } catch (error) {
      console.log('ERROR', error)
    }

    setIsLoading(false)
    setStmRep([])
    setRepno('')
    setStatement('')
    setAmount(0)
    setIsAdd(!isAdd)

}  
   
  

  const onAddRep = async () => {
    // setIsAdd(true)
    // let receipt_Dt = receiptDt?.format('YYYY-MM-DD')

    const newItem = {
      statement: statement,
      repno: repno,
      stm_date: stmDt,
      amount: amount,
    }

    console.log(newItem)
    console.log(stmRep)
    setStmRep((prevRep) => [...prevRep, newItem])
    console.log(stmRep)

    setIsLoading(false)
    setOpenDialog(false)
  }

  const onDeleteRep = async (row: any) => {
    // setIsAdd(true)
    // let receipt_Dt = receiptDt?.format('YYYY-MM-DD')

    const newArray = stmRep.filter(item => item.repno !== row.repno);

    console.log(newArray);
    setStmRep(newArray)
    console.log(stmRep)
    setIsLoading(false)
    setOpenDialog2(false)
  }

  const handleRepNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepno(event.target.value)
  }

  const handleStatementChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatement(event.target.value)
  }

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value))
  }

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void
  }

  const CustomToolbar = (props: EditToolbarProps) => {
    return (
      <GridToolbarContainer>
        <Stack direction={'row'} gap={3} mt={2} mb={1} ml={2}>
          <GridToolbarExport />
          <Box>
            <GridToolbarQuickFilter
              quickFilterParser={(searchInput: string) =>
                searchInput
                  .split(',')
                  .map((value) => value.trim())
                  .filter((value) => value !== '')
              }
            />
          </Box>
        </Stack>
      </GridToolbarContainer>
    )
  }

  const [valueTab, setValueTab] = useState('1')

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue)
  }

  return (
    <>
      <Box sx={{ width: '100%', height: '500px', typography: 'body1' }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="statement rep">
              <Tab label="บันทึก Statement Rep" value="1" />
              <Tab label="statement-rep" value="2" />
              <Tab label="แก้ไข" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              paddingLeft={5}
            >
              <TextField
                type="text"
                margin="normal"
                required
                id="statement"
                label="Statement"
                name="statemenet"
                value={statement}
                onChange={handleStatementChange}
                color="secondary"
                autoFocus
              />

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="th"
                // adapterLocale="th"
              >
                <Stack direction={'column'} gap={2}>
                  <DatePicker
                    label="วันที่"
                    value={stmDt}
                    onChange={(newValue) => setStmDt(newValue)}
                  />
                </Stack>
              </LocalizationProvider>
              <Box flexGrow={1}/>
              <Button variant="contained" onClick={onSubmit} sx={{marginRight: '50px'}}>
                Save
              </Button>
            </Stack>{' '}
            <Card>
              <Stack direction={'row'} gap={2} paddingLeft={5}>
                <TextField
                  type="text"
                  margin="normal"
                  required
                  id="repno"
                  label="Repno หมายเลข REP"
                  name="repno"
                  value={repno}
                  onChange={handleRepNoChange}
                  color="secondary"
                  autoFocus
                />
                <TextField
                  type="number"
                  margin="normal"
                  required
                  id="amount"
                  label="จำนวนเงิน"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  color="secondary"
                  autoFocus
                />

                <Button
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => setOpenDialog(true)}
                >
                  Add Rep
                </Button>
                <Dialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Statement : {statement} repno : {repno} stm_date:
                      {stmDt?.format('YYYY-MM-DD')}
                      amount: {amount}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="error">
                      Cancel
                    </Button>
                    <Button onClick={onAddRep} autoFocus>
                      Add Rep
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>

              <Box style={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={stmRep}
                  columns={columns}
                  getRowId={(row) => row.repno}
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                />
              </Box>
            </Card>
           
          </TabPanel>
          <TabPanel value="2">
        
            <Card>
              <Box style={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={receipt}
                  columns={columns2}
                  getRowId={(row) => row.id}
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                />
              </Box>
            </Card>
           
          </TabPanel>

          <TabPanel value="3">
            <Stack direction={'row'} gap={2}>
              <Typography sx={{ marginBottom: '15px' }}></Typography>
            </Stack>{' '}
            <Card sx={{ padding: '20px' }}>
              <CardMedia
                component={'img'}
                sx={{ height: 140, width: '100%' }}
                image={CardHeader1}
                title="green iguana"
              />

              <CardContent>
                <Typography sx={{ fontSize: '1.1rem' }} color={'#1e77c5'}>
                  Mapping statement-rep
                </Typography>
                <Box
                  sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="form"
                    onSubmit={onSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="statement"
                      label="Statement No"
                      name="statement"
                      value={statement}
                      onChange={handleStatementChange}
                      autoFocus
                    />
                  </Box>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="th"
                    // adapterLocale="th"
                  >
                    <Stack direction={'column'} gap={2}>
                      <DatePicker
                        label="Start Date"
                        value={stmDt}
                        onChange={(newValue) => setStmDt(newValue)}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>

                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
