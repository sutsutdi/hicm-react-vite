import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { Typography } from '@mui/material'

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridRenderCellParams,
  GridRowModesModel,
  GridRowModes,
} from '@mui/x-data-grid'

import {
  Delete,
  KeyboardArrowDownTwoTone,
  Add,
  ModeEdit,
} from '@mui/icons-material'
import CardHeader1 from '../../assets/account.jpg'

import Loading from '../../components/Loading'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

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
  const [repno,setRepno] = useState<string>('')
  const [receiptNo, setReceiptNo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

 const onAddRep = async ()=>{
  const receiptData = {
    receipt_date: receiptDt,
    receipt_no: receiptNo,   
    repno: repno
  }

  console.log(receiptData)
  try {
    const response1 = await axios.post(
      `${apiUrl}/receipt/receiptAddRep`,
      receiptData
    )
    // setReceiptDt(response.data[0].receipt_date)
    setRep(response1.data)
  } catch (error) {
    console.log('ERROR', error)
  }

  try {
    const response2 = await axios.post(
      `${apiUrl}/receipt/receiptByNo`,
      { receiptNo }
    )
    // setReceiptDt(response.data[0].receipt_date)
    setRep(response2.data)
  } catch (error) {
    console.log('ERROR', error)
  }

  setIsLoading(false)

 }

  const handleRepNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepno(event.target.value);
  };
  const handleReceiptNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReceiptNo(event.target.value);
  };


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

  return (
    <>
      <Stack
        direction={'row'}
        maxWidth={'100%'}
        height={'500px'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={3}
      >
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
        <Card>
          <Stack direction={'row'} gap={2} sx={{ paddingLeft: '15px' }}>
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
            <Button color="primary" startIcon={<Add />} onClick={onAddRep}>
              Add Rep
            </Button>
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
      </Stack>
    </>
  )
}
