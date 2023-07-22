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
import { useState } from 'react'
import { Typography } from '@mui/material'
import CardHeader1 from '../../../assets/amy.jpg'
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
    // valueGetter: (params) => {
    //   if (!params.value) {
    //     return params.value
    //   }
    //   // Assuming the originalDate is a JavaScript Date object with the value '2023-01-01'
    //   const originalDate = new Date(params.value)

    //   // Extract day, month, and year components from the Date object
    //   const day = originalDate.getDate()
    //   const month = originalDate.getMonth() + 1 // JavaScript months are 0-based
    //   const year = originalDate.getFullYear()

    //   // Format the components into 'dd-mm-yy' format
    //   const formattedDateString = `${day < 10 ? '0' : ''}${day}-${
    //     month < 10 ? '0' : ''
    //   }${month}-${year.toString().slice(-2)}`

    //   // Create a new Date object using the formatted date string
    //   const formattedDate = new Date(formattedDateString)
    //   return formattedDate
    // },
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
  const [receiptNo, setreceiptNo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const apiBackendUrl = import.meta.env.VITE_API_BACKEND_URL

    const data = new FormData(event.currentTarget)
    const receiptData = {
      receipt_no: data.get('receipt') as string | null,
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

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void
  }

  const CustomToolbar = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props

    const handleAddClick = () => {
      setRows((oldRows) => [
        ...oldRows,
        { date: Date, receipt_no: '', repno: '' },
      ])
      setRowModesModel((oldModel) => ({
        ...oldModel,
      }))
    }
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
          <Button color="primary" startIcon={<Add />} onClick={handleAddClick}>
            Add record
          </Button>
        </Stack>
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Stack
        direction={'row'}
        maxWidth={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Card sx={{ maxWidth: 500, height: 600, padding: '30px' }}>
          <CardContent>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
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
                  label="receipt No"
                  name="receipt"
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
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
          </CardContent>
        </Card>
        <Card>
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
