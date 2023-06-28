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
    Tabs,
    TextField,
  } from '@mui/material'
  import axios from 'axios'
  import { useState } from 'react'
  import { Typography } from '@mui/material'
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
  import 'dayjs/locale/th'
  import dayjs, { Dayjs } from 'dayjs'
  import CardHeader1 from '../assets/telemed.webp'
  import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
  } from '@mui/x-data-grid'
  
  import TabContext from '@mui/lab/TabContext'
  import TabList from '@mui/lab/TabList'
  import TabPanel from '@mui/lab/TabPanel'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { Pie, Bar } from 'react-chartjs-2'
  
  const apiHiUrl = import.meta.env.VITE_API_HI_URL
  
  export default function FsTelemedPage() {
    const [dataCase, setDataCase] = useState<GridRowsProp>([])
    const [dataGroup, setDataGroup] = useState<GridRowsProp>([])
    const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
    const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))
  
    const columns: GridColDef[] = [
      { field: 'vn', headerName: 'VN', width: 100 },
      { field: 'hn', headerName: 'HN', width: 100 },
      { field: 'fname', headerName: 'ชื่อ', width: 150 },
      { field: 'lname', headerName: 'นามสกุล', width: 150 },
      { field: 'date_serv', headerName: 'วันที่', width: 110 },
      { field: 'time_serv', headerName: 'เวลา', width: 110 },
      { field: 'pttype', headerName: 'pttype', width: 80 },
      { field: 'namepttype', headerName: 'สิทธิ์', width: 200 },
      { field: 'inscl', headerName: 'inscl', width: 80 },
      { field: 'cln', headerName: 'cln', width: 110 },
      { field: 'namecln', headerName: 'clinic', width: 200 },
      { field: 'icd10', headerName: 'icd10', width: 80 },
      { field: 'service', headerName: 'service', width: 80 },
      { field: 'provider', headerName: 'dct', width: 110 },
    ]
  
    const onSubmit = async () => {
      console.log({ startDt, endDt })
  
      let startDate = startDt?.format('YYYYMMDD')
      let endDate = endDt?.format('YYYYMMDD')
  
      console.log(startDt)
      console.log(endDt)
  
      try {
        const response = await axios.post(`${apiHiUrl}/fs/telemed`, {
          startDate,
          endDate,
        })
        // setData(jsonData)
  
        setDataCase(response.data)
  
        console.log(dataCase)
      } catch (error) {
        console.log('ERROR', error)
      }
  
      try {
        const response = await axios.get(`${apiHiUrl}/fs/telemedsum`, )
        // setData(jsonData)
  
        setDataGroup(response.data)
  
        console.log(dataGroup)
      } catch (error) {
        console.log('ERROR', error)
      }
  
      console.log(dataGroup)
    }
  
    const totalCases = dataCase.length
    const totalClaim = dataCase.length * 50
  
    const CustomToolbar = () => {
      return (
        <GridToolbarContainer>
          <GridToolbarExport />
        </GridToolbarContainer>
      )
    }
  
    const [valueTab, setValueTab] = useState('1')
  
    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setValueTab(newValue)
    }
  
  
      const months = dataGroup.map((item) => item.month)
      const counts = dataGroup.map((item) => item.case_count)
       
      
      ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      )
  
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      }
  
      const dataChart = {
        datasets: [
          {
            labels: months,
            data: counts,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
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
            <CardActionArea>
              <CardMedia
                component={'img'}
                sx={{ height: 140, width: '100%' }}
                image={CardHeader1}
                title="telemedicine"
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
                      value={'Fee Schedule Telemedicine'}
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
            </CardActionArea>
          </Card>
  
          <Divider />
          <Card sx={{ width: 645, marginLeft: '50px' }}>
            <Stack direction={'row'} gap={2} padding={'10px'}>
              <Typography variant="h6">Case Telemedicine</Typography>
            </Stack>
            <Divider />
            <Stack direction={'row'} gap={2} padding={'10px'}>
              <Typography variant="h6">จำนวนทั้งหมด : </Typography>
              <Typography variant="h6">
                {totalCases.toLocaleString('en-US')} ราย
              </Typography>
              <Typography variant="h6">
                Estimate Claim : {totalClaim.toLocaleString('en-US')} บาท
              </Typography>
            </Stack>
          </Card>
        </Box>
  
        <Divider sx={{ marginY: '30px' }} />
  
        <Box sx={{ width: '100%', height: '500px', typography: 'body1' }}>
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tab label="Case Telemedicine" value="1" />
                <Tab label="Chart" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Stack direction={'row'} gap={2}>
                <Typography sx={{ marginBottom: '15px' }}>
                  Total Cases :{''} {totalCases.toLocaleString('en-US')} ราย
                </Typography>
                <Typography sx={{ marginBottom: '15px' }}>
                  Total Estimat :{''} {totalClaim.toLocaleString('en-US')} บาท
                </Typography>
              </Stack>{' '}
              <Box style={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={dataCase}
                  columns={columns}
                  getRowId={(row) => row.vn}
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                />
              </Box>
            </TabPanel>
  
            <TabPanel value="2">
              <Box
                width={'100%'}
                height={500}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Bar options={options} data={dataChart} />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </>
    )
  }
  