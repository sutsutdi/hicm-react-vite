import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import axios from 'axios'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material'
import { imageUrl } from '../../../constants/constants'
import {
  ModeEdit,
  Delete,
  LibraryAdd,
  SettingsAccessibility,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

type AcciInsure = {
  id: number
  hn: string
  an: string
  date_serv: string
  time: string
  date_regist: string
  claim_no: string
  date_claim: string
  bill: string
  fullname: string
  claim: number
  recieve: number
  ins_company_id: number
  ins_company: string
  cid: string
  policy_number: string
  date_recieve: string
}

const acciinsbody = {
  id: 0,
  hn: '',
  an: '',
  date_serv: Date(),
  time: '',
  date_regist: Date(),
  claim_no: '',
  date_claim: Date(),
  bill: '',
  fullname: '',
  claim: 0,
  recieve: 0,
  ins_company_id: 0,
  ins_company: '',
  cid: '',
  policy_number: '',
  date_recieve: Date(),
}

const apiUrl = import.meta.env.VITE_API_URL

export default function AcciInsurePage() {
  const [selectedAcci, setSelectedAcci] = React.useState<AcciInsure[]>([
    acciinsbody,
  ])
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/acciinsip`)

        setSelectedAcci(response.data.data)

        // console.log(lastestIpd)
      } catch (error) {
        console.log('ERROR', error)
      }
    }

    fetchData()
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'hn', headerName: 'HN', width: 130 },
    { field: 'an', headerName: 'AN', width: 130 },

    { field: 'cid', headerName: 'CID', width: 130 },
    { field: 'fullname', headerName: 'ชื่อ-นามสกุล', width: 130 },
    {
      field: 'date_serv',
      headerName: 'วันที่บริการ',
      width: 130,
      valueGetter: ({ value }) => {
        const date = new Date(value)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      },
    },
    { field: 'time', headerName: 'เวลา', width: 130 },
    {
      field: 'date_regist',
      headerName: 'วันที่ลงทะเบียน',
      width: 130,
      valueGetter: ({ value }) => {
        const date = new Date(value)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      },
    },
  
    {
      field: 'date_claim',
      headerName: 'วันที่ส่ง Claim',
      width: 130,
      valueGetter: ({ value }) => {
        const date = new Date(value)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      },
    },
    { field: 'bill', headerName: 'Bill', width: 130 },
    {
      field: 'claim', // Use a custom field name for the constant value
      headerName: 'claim',
      width: 120,
      valueGetter: ({ value }) => {
        const formattedValue = Number(value).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        return formattedValue
      },
    },

    {
      field: 'recieve',
      headerName: 'ได้รับ',
      width: 130,
      valueGetter: ({ value }) => {
        const formattedValue = Number(value).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        return formattedValue
      },
    },
    { field: 'ins_company_id', headerName: 'company_no', width: 130 },
    { field: 'ins_company', headerName: 'Company', width: 130 },

    { field: 'policy_number', headerName: 'เลขประกัน', width: 130 },
    {
      field: 'date_recieve',
      headerName: 'วันที่รับชดเชย',
      width: 130,
      valueGetter: ({ value }) => {
        const date = new Date(value)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      },
    },
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
            onClick={() => {
              setSelectedAcci(row)
              setOpenDialog(true)
            }}
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ]

  const handleDelete = async () => {
    await axios.delete(`${apiUrl}/acciinsip/${selectedAcci[0].id}`)
    await axios.get(`${apiUrl}/acciinsip`)
    setOpenDialog(false)
  }

  function QuickSearchToolbar() {
    return (
      <Stack direction={'row'} gap={2}>
        <Box
          sx={{
            p: 1,
            pb: 0,
            height: '50px',
            marginTop: '20px',
          }}
        >
          <GridToolbarQuickFilter
            quickFilterParser={(searchInput: string) =>
              searchInput
                .split(',')
                .map((value) => value.trim())
                .filter((value) => value !== '')
            }
          />
        </Box>
        <Box flexGrow={1} />
        <Tooltip title="Add Product">
          <Fab
            color="primary"
            aria-label="add"
            component={Link}
            to={'/stock/create'}
            sx={{ marginTop: '15px', marginRight: '25px' }}
          >
            <LibraryAdd />
          </Fab>
        </Tooltip>
      </Stack>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={selectedAcci}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{ height: '70vh' }}
        slots={{ toolbar: QuickSearchToolbar }}
      />
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false)
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
