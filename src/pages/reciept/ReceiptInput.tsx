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

import { Delete, Add, ModeEdit, Troubleshoot } from '@mui/icons-material'
import CardHeader1 from '../../assets/account.jpg'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

const apiUrl = import.meta.env.VITE_API_URL // localhost
// const apiUrl = import.meta.env.VITE_API_SERVER_URL // server HICM
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'statement', headerName: 'statement', width: 150 },
  { field: 'receipt_no', headerName: 'receipt No', width: 150 },
  { field: 'receipt_date', headerName: 'receipt Date', width: 150 },
  { field: 'repno', headerName: 'Rep No', editable: true, width: 150 },
  {
    field: 'amount',
    headerName: 'ยอดชดเชย',
    width: 120,
    renderCell: (params) => {
      if (isNaN(params.value)) {
        return ''
      }

      const formattedNumber = Number(params.value).toLocaleString('en-US')

      return `${formattedNumber} ฿`
    },
  },
]

const columns2: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 150 },
  { field: 'receipt_no', headerName: 'Receipt No', width: 200 },
  { field: 'receiptdt', headerName: 'Receipt Date', width: 150 },
  { field: 'statement', headerName: 'Statement No', width: 150 },
  { field: 'repno', headerName: 'Rep No', editable: true, width: 150 },
  {
    field: 'amount',
    headerName: 'จำนวนเงินชดเชย',
    width: 110,
    renderCell: (params) => {
      if (isNaN(params.value)) {
        return ''
      }

      const formattedNumber = Number(params.value).toLocaleString('en-US')

      return `${formattedNumber} ฿`
    },
  },
  {
    field: 'stm_date',
    headerName: 'Statement Date',
    width: 120,
  },
]

type Repx = {
  id: number
  receipt_no: string
  repno: string
  receipt_date: Dayjs | null
  statement: string
  amount: number
}

const repx = {
  id: 0,
  receiptno: '',
  repno: '',
  receipt_date: '',
}

export default function receiptPage() {
  const [receiptDt, setReceiptDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [rep, setRep] = useState<Repx[]>([])
  const [receipt, setReceipt] = useState<GridRowsProp>([])
  const [statement, setStatement] = useState<string>('')
  const [repno, setRepno] = useState<string>('')
  const [receiptNo, setReceiptNo] = useState('')
  const [amount, setAmount] = useState(0.0)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openDialog2, setOpenDialog2] = useState<boolean>(false)
  const [lastNo, setLastNo] = useState<number>(0)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [visibleStm, setVisibleStm] = useState(true)
  const [visibleReceiptNo, setVisibleReceiptNo] = useState(false)
  const [visibleSave, setVisibleSave] = useState(false)

  const onSubmit = async () => {
    console.log(rep)

    const receiptData = {
      receipt_no: receiptNo,
      receipt_date: receiptDt,
      statement: statement,
    }

    console.log(receiptData)

    try {
      const response = await axios.put(
        `${apiUrl}/receipt/receiptupdreceiptno`,
        receiptData
      )
      // setReceiptDt(response.data[0].receipt_date)
      console.log(response.data.data)
      toast.success(
        (t) => (
          <>
            <span>
              <Box>Successfully Add Recept No: {receiptNo}</Box>
              <Button
                onClick={() => toast.dismiss(t.id)}
                sx={{ marginLeft: '3px', marginTop: '3px' }}
              >
                Dismiss
              </Button>
            </span>
          </>
        ),
        {
          duration: 4000,
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#0ce445',
            secondary: '#FFFAEE',
          },
        }
      )
    } catch (error) {
      console.log('ERROR', error)
      toast.error(`Not Successfully Recept No: ${receiptNo}`)
    }

    getReceipt()

    // setIsLoading(false)
    setOpenDialog2(false)
    setVisibleSave(false)
    setVisibleStm(true)
    setVisibleReceiptNo(false)
  }

  const getReceipt = async () => {
    try {
      const response = await axios.get(`${apiUrl}/receipt`)
      // setReceiptDt(response.data[0].receipt_date)
      console.log(response.data.data)
      setReceipt(response.data.data)
    } catch (error) {
      console.log('ERROR', error)
    }

    // setIsLoading(false)
  }

  const handleReceiptNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReceiptNo(event.target.value)
  }

  const handleStatementChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatement(event.target.value)
    console.log(statement)
  }

  const onGetData = async () => {
    console.log('statement')
    console.log(statement)
    try {
      const response = await axios.post(`${apiUrl}/receipt/receiptbystm`, {
        statement: statement,
      })

      // setReceiptDt(response.data[0].receipt_date)
      setRep(response.data.data)
      console.log(rep)
      setVisibleReceiptNo(true)
      setVisibleStm(false)
      setVisibleSave(false)
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  const onAddReceiptNo = () => {
    const array = rep
    console.log(array)
    for (let i = 0; i < array.length; i++) {
      if (array[i].statement === statement) {
        array[i].receipt_no = receiptNo
        array[i].receipt_date = receiptDt
      }
    }

    setRep(array)

    console.log(rep)
    setVisibleSave(true)
    setOpenDialog(false)
  }

  const notify = () =>
    toast.success(
      (t) => (
        <>
          <span>
            <Box>Successfully Add Recept No: {receiptNo}</Box>
            <Button
              onClick={() => toast.dismiss(t.id)}
              sx={{ marginLeft: '3px', marginTop: '3px' }}
            >
              Dismiss
            </Button>
          </span>
        </>
      ),
      {
        duration: 4000,
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#0ce445',
          secondary: '#FFFAEE',
        },
      }
    )

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
        {/* Toast */}
        <Box>
          <Toaster position="top-right" reverseOrder={false} />
        </Box>
        <Button onClick={notify}>Notify</Button>;
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="ออกใบเสร็จ" value="1" />
              <Tab label="รายการใบเสร็จ" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            {visibleReceiptNo && (
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
                <Button
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => setOpenDialog(true)}
                >
                  ลงหมายเลขใบเสร็จ Map statement
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
                      Add Receipt No : {receiptNo}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="error">
                      Cancel
                    </Button>
                    <Button onClick={onAddReceiptNo} autoFocus>
                      Add Receipt No
                    </Button>
                  </DialogActions>
                </Dialog>
                <Box flexGrow={1} />
                <Button
                  variant="contained"
                  onClick={() => setOpenDialog2(true)}
                >
                  Save
                </Button>
                <Dialog
                  open={openDialog2}
                  onClose={() => setOpenDialog2(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Save Receipt No : {receiptNo} to Statement : {statement}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog2(false)} color="error">
                      Cancel
                    </Button>
                    <Button onClick={onSubmit} autoFocus>
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            )}
            <Card>
              {visibleStm && (
                <Stack direction={'row'} gap={2} paddingLeft={5}>
                  <TextField
                    type="text"
                    margin="normal"
                    required
                    id="statement"
                    label="statement"
                    name="statement"
                    value={statement}
                    onChange={handleStatementChange}
                    color="secondary"
                    autoFocus
                  />

                  <Button
                    color="primary"
                    startIcon={<Troubleshoot />}
                    onClick={() => onGetData()}
                  >
                    Get Data
                  </Button>
                </Stack>
              )}
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
        </TabContext>
      </Box>
    </>
  )
}
