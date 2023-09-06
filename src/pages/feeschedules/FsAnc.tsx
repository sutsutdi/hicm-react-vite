import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Stack,
    Tab,
    TextField,
  } from '@mui/material'
  import axios from 'axios'
  import { useState } from 'react'
  import { Typography } from '@mui/material'
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
  import 'dayjs/locale/th'
  import dayjs, { Dayjs } from 'dayjs'
  import CardHeader1 from '../../assets/anc.jpg'
  import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarQuickFilter,
  } from '@mui/x-data-grid'
  
  import TabContext from '@mui/lab/TabContext'
  import TabList from '@mui/lab/TabList'
  import TabPanel from '@mui/lab/TabPanel'
  
  import { Pie, Bar } from 'react-chartjs-2'
  import Loading from '../../components/Loading'
  import DataGridTable from '../../components/DataGridTable'
  import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from 'chart.js'
  
  const apiHiUrl = import.meta.env.VITE_API_HI_URL
  
  export default function FsAncPage() {
    const [dataCase, setDataCase] = useState<GridRowsProp>([])
  
    const [dataTable, setDataTable] = useState([])
    const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
    const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))
    const [isLoading, setIsLoading] = useState(false)
  
    const columns: GridColDef[] = [
      { field: 'vn', headerName: 'VN', width: 100 },
      { field: 'hn', headerName: 'HN', width: 100 },
      { field: 'pop_id', headerName: 'CID', width: 100 },
      { field: 'fname', headerName: 'ชื่อ', width: 150 },
      { field: 'lname', headerName: 'นามสกุล', width: 150 },
      { field: 'dateserv', headerName: 'วันที่', width: 110 },
      { field: 'timeserv', headerName: 'เวลา', width: 110 },
      { field: 'pttype', headerName: 'pttype', width: 80 },
      { field: 'namepttype', headerName: 'สิทธิ์', width: 200 },
      { field: 'inscl', headerName: 'inscl', width: 80 },
      { field: 'new', headerName: 'new', width: 50 },
      { field: 'lmp', headerName: 'LMP', width: 110 },
      { field: 'g', headerName: 'G', width: 50 },
      { field: 'p', headerName: 'P', width: 50 },
      { field: 'a', headerName: 'A', width: 50 },
      { field: 'l', headerName: 'L', width: 50 },
      { field: 'ga', headerName: 'GA', width: 80 },
  
    ]
  
    const onSubmit = async () => {
     
  
      let startDate = startDt?.format('YYYYMMDD')
      let endDate = endDt?.format('YYYYMMDD')
  
      setIsLoading(true)
  
      try {
        const response = await axios.post(`${apiHiUrl}/fs/anc`, {
          startDate,
          endDate,
        })
       
        setDataCase(response.data.data)
        setDataTable(response.data.data)
        
      } catch (error) {
        console.log('ERROR', error)
      }
  
     
      
      console.log(dataCase)
      
      setIsLoading(false)
    }
  
    const totalCases = dataCase.length
    const totalClaim = dataCase.length * 150
  
  
  
    const [valueTab, setValueTab] = useState('1')
  
    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setValueTab(newValue)
    }
  

  
  
  
    return (
      <>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          marginTop={5}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component={'img'}
              sx={{ height: 140, width: '100%' }}
              image={CardHeader1}
              title="green iguana"
            />
  
            <CardContent>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="th"
                // adapterLocale="th"
              >
                <Stack direction={'column'} gap={2}>
                  <DatePicker
                    label="Start Date"
                    value={startDt}
                    onChange={(newValue) => setStartDt(newValue)}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDt}
                    onChange={(newValue) => setEndDt(newValue)}
                  />
                  <TextField
                    label="Fee Schedule"
                    color="secondary"
                    value={'PPFS ANC'}
                    focused
                  />
                </Stack>
              </LocalizationProvider>
  
              <CardActions>
                <Button onClick={onSubmit} size="small" color="primary">
                  Submit
                </Button>
              </CardActions>
            </CardContent>
          </Card>
  
          <Divider />
  
          {isLoading ? (
            <Loading isLoading={isLoading} />
          ) : (
            <Card sx={{ width: 645, marginLeft: '50px' }}>
              <Stack direction={'row'} gap={2} padding={'10px'}>
                <Typography variant="h6">
                  Case PPFS ANC
                </Typography>
              </Stack>
              <Divider />
              <Stack direction={'row'} gap={2} padding={'10px'}>
                <Typography variant="h6">จำนวนทั้งหมด : </Typography>
                <Typography variant="h6">
                  {totalCases.toLocaleString('en-US')} ราย
                </Typography>
               
              </Stack>
            </Card>
          )}
        </Box>
  
        <Divider sx={{ marginY: '30px' }} />
  
        <Box sx={{ width: '100%', height: '500px', typography: 'body1' }}>
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tab label="Case ANC" value="1" />
               
              </TabList>
            </Box>
            <TabPanel value="1">
              <Stack direction={'row'} gap={2}>
                <Typography sx={{ marginBottom: '15px' }}>
                  Total Cases :{''} {totalCases.toLocaleString('en-US')} ราย
                </Typography>
               
              </Stack>{' '}
              
              <DataGridTable rows={dataTable} columns={columns} />
            </TabPanel>
  
          
          </TabContext>
        </Box>
      </>
    )
  }
  