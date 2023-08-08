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
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 100 },
  {
    field: 'date',
    headerName: 'Date',
    width: 120,
  },
  { field: 'receipt_no', headerName: 'receipt No', width: 150 },
  { field: 'repno', headerName: 'Rep No', editable: true, width: 150 },
  { field: 'amount', headerName: 'amount', editable: true, width: 150 },
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
          onClick={() => alert(JSON.stringify(row))}
        >
          <Delete />
        </IconButton>
      </Stack>
    ),
  },
]

export default function receiptPage() {
  const [receiptDt, setReceiptDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [rep, setRep] = useState<GridRowsProp>([])
  const [receipt, setReceipt] = useState<GridRowsProp>([])
  const [repno, setRepno] = useState<string>('')
  const [receiptNo, setReceiptNo] = useState('')
  const [amount, setAmount] = useState(0.0)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [lastNo, setLastNo] = useState<number>(0)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/receipt`);
        // const arrayData = response.data.data.sort((a: any, b: any) => b.id - a.id);
        const ls = response.data.data[0].id + 1;
        setLastNo(ls);
        setReceipt(response.data.data)
        console.log(ls);
        console.log(receipt)
        setIsAdd(false)
      } catch (error) {
        console.log('ERROR', error);
      }
    };

    fetchData();
  }, [isAdd]); // Empty dependency array to run this effect only once on mount

  useEffect(() => {
    console.log('lastNo updated:', lastNo);
  }, [lastNo]); 



  const onSubmit = async () => {
    // const apiBackendUrl = import.meta.env.VITE_API_BACKEND_URL

    // const data = new FormData(event.currentTarget)
    const receiptData = {
      receipt_no: receiptNo,
      // receipt_no: data.get('receipt') as string | null,
      receipt_date: receiptDt,
    }

    console.log(receiptData)

    try {
      const response = await axios.post(
        `${apiUrl}/receipt/receiptByNo`,
        receiptData
      )
      // setReceiptDt(response.data[0].receipt_date)
      setRep(response.data)
    } catch (error) {
      console.log('ERROR', error)
    }

    setIsLoading(false)
  }



  const onAddRep = async () => {
    
    setIsAdd(true)
    // let receipt_Dt = receiptDt?.format('YYYY-MM-DD')
    let receipt_No = receiptNo.toString()

    try {
      const receiptData = {
        id: lastNo,
        receiptdate: receiptDt,
        receiptno: receipt_No,
        rep_no: repno,
        amount: amount,
      }

      console.log(receiptData)
      const response1 = await axios.post(
        `${apiUrl}/receipt/receiptaddrep`,
        receiptData
      )
      // setReceiptDt(response.data[0].receipt_date)
      setRep(response1.data.data)
    } catch (error) {
      console.log('ERROR', error)
    }

    try {
      const response2 = await axios.post(`${apiUrl}/receipt/receiptByNo`, {
        receiptNo,
      })
      // setReceiptDt(response.data[0].receipt_date)
      setRep(response2.data.data)
    } catch (error) {
      console.log('ERROR', error)
    }

    setIsLoading(false)
    setOpenDialog(false)
  }

  const handleRepNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepno(event.target.value)
  }
  const handleReceiptNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReceiptNo(event.target.value)
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
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="ออกใบเสร็จ" value="1" />
              <Tab label="แก้ไขใบเสร็จ" value="2" />
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
                id="receiptno"
                label="หมายเลขใบเสร็จ"
                name="receiptno"
                value={receiptNo}
                onChange={handleReceiptNoChange}
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
                    label="วันที่ออกใบเสร็จ"
                    value={receiptDt}
                    onChange={(newValue) => setReceiptDt(newValue)}
                  />
                </Stack>
              </LocalizationProvider>
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
                  name="repno"
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
                      receipt NO : {receiptNo} repno : {repno} receipt_date:{' '}
                      {receiptDt?.format('YYYY-MM-DD')}
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
                  rows={rep}
                  columns={columns}
                  getRowId={(row) => row.id}
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                />
              </Box>
            </Card>
          </TabPanel>

          <TabPanel value="2">
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
                  ออกใบเสร็จ สำหรับ statement-rep
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
                      id="receipt"
                      label="receipt No เลขที่ใบเสร็จ"
                      name="receipt"
                      value={receiptNo}
                      onChange={handleReceiptNoChange}
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
                        value={receiptDt}
                        onChange={(newValue) => setReceiptDt(newValue)}
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
