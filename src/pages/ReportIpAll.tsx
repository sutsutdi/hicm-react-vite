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
import CardHeader1 from '../assets/amy.jpg'
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
import { Pie } from 'react-chartjs-2'

const dataIp = {
  allCase: 0,
  allDebit: 0,
  ofcCase: 0,
  ofcDebit: 0,
  ucsInCase: 0,
  ucsInDebit: 0,
  ucsOutCase: 0,
  ucsOutDebit: 0,
  sssInCase: 0,
  sssInDebit: 0,
  sssOutCase: 0,
  sssOutDebit: 0,
  accInsCase: 0,
  accInsDebit: 0,
  lgoCase: 0,
  lgoDebit: 0,
  ucAeCase: 0,
  ucAEDebit: 0,
  ucHcCase: 0,
  ucHcDebit: 0,
  payCase: 0,
  payDebit: 0,
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ReportIpAllPage() {
  const [dataAccIp, setDataAccIp] = useState(dataIp)
  const [dataCaseIp, setDataCaseIp] = useState<GridRowsProp>([])
  const [dataCaseIpOfc, setDataCaseIpOfc] = useState<GridRowsProp>([])
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()))

  const columns: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'an', headerName: 'AN', width: 120 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'admitdate', headerName: 'วันที่ admit', width: 110 },
    { field: 'dchdate', headerName: 'วันที่ DC', width: 110 },
    { field: 'l_stay', headerName: 'วันนอน', width: 110 },
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'outstanding', headerName: 'คงเหลือ', width: 110 },
    { field: 'acctype', headerName: 'ลูกหนี้สิทธิ์', width: 110 },
    { field: 'ward', headerName: 'แผนก', width: 110 },
    { field: 'adjrw', headerName: 'AdjRw', width: 110 },
  ]

  const onSubmit = async () => {
    console.log({ startDate, endDate })

    // IP Acc
    try {
      const responseIpAcc = await axios.post(`${apiUrl}/debitip/ipacc`, {
        startDate,
        endDate,
      })
      // setData(jsonData)
      console.log(responseIpAcc.data[0])

      setDataAccIp(responseIpAcc.data[0])

      console.log(dataAccIp)
    } catch (error) {
      console.log('ERROR', error)
    }

    // IP Case
    try {
      const responseIp = await axios.post(`${apiUrl}/debitip/debitipall`, {
        startDate,
        endDate,
      })
      // setData(jsonData)
      console.log(responseIp.data)

      setDataCaseIp(responseIp.data)

      console.log(dataCaseIp)
    } catch (error) {
      console.log('ERROR', error)
    }

    // OFC IP Case
    try {
      const responseIpOfc = await axios.post(`${apiUrl}/debitip/debitipofc`, {
        startDate,
        endDate,
      })
      // setData(jsonData)
      console.log(responseIpOfc.data)

      setDataCaseIpOfc(responseIpOfc.data)

      console.log(dataCaseIpOfc)
    } catch (error) {
      console.log('ERROR', error)
    }
  }

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

  const dataChart = {
    labels: ['รอดำเนินการ', 'สำเร็จ'],
    datasets: [
      {
        // label: ['รอดำเนินการ', 'สำเร็จ'],
        data: [
          dataIp.ofcCase,
          dataIp.ucsInCase,
          dataIp.ucsOutCase,
          dataIp.sssInCase,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(10, 163, 61, 0.2)',
          'rgba(146, 192, 30,0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(10, 163, 61)',
          'rgba(146, 192, 30)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
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
              >
                <Stack direction={'column'} gap={2}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                  <TextField
                    label="Outlined secondary"
                    color="secondary"
                    value={'บัญชีลูกหนี้ ผู้ป่วยใน '}
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
          <Typography variant="h6">ลูกหนี้ผู้ป่วยใน Debit IP</Typography>
          <Stack direction={'column'} gap={2} padding={'10px'}>
            <Stack direction={'row'} gap={2} padding={'2px'}>
              <Typography>
                จ่ายตรง จำนวน :{' '}
                {dataAccIp.ofcCase === null
                  ? 0
                  : dataAccIp.ofcCase.toLocaleString('en-US')}{' '}
                ราย
              </Typography>
              <Typography>
                รวมค่าใช้จ่าย :{' '}
                {dataAccIp.ofcDebit === null
                  ? 0
                  : dataAccIp.ofcDebit.toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>
            <Stack direction={'row'} gap={2} padding={'2px'}>
              <Typography>
                UCS ในเขต จำนวน :{' '}
                {dataAccIp.ucsInCase === null ? 0 : dataAccIp.ucsInCase.toLocaleString('en-US')} ราย
              </Typography>
              <Typography>
                รวมค่าใช้จ่าย : {dataAccIp.ucsInDebit === null? 0 : dataAccIp.ucsInDebit.toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>
            <Stack direction={'row'} gap={2} padding={'2px'}>
              <Typography>
                UCS นอกเขต จำนวน :{' '}
                {dataAccIp.ucsOutCase === null ? 0 : dataAccIp.ucsOutCase.toLocaleString('en-US')} ราย
              </Typography>
              <Typography>
                รวมค่าใช้จ่าย : {dataAccIp.ucsOutDebit === null? 0 : dataAccIp.ucsOutDebit.toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>
            <Stack direction={'row'} gap={2} padding={'2px'}>
              <Typography>
                ประกันสังคมในเขต จำนวน :{' '}
                {dataAccIp.sssInCase === null ? 0 : dataAccIp.sssInCase.toLocaleString('en-US')} ราย
              </Typography>
              <Typography>
                รวมค่าใช้จ่าย : {dataAccIp.sssInDebit === null? 0 : dataAccIp.sssInDebit.toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>
            <Stack direction={'row'} gap={2} padding={'2px'}>
              <Typography>
                ประกันสังคมนอกเขต จำนวน :{' '}
                {dataAccIp.sssOutCase === null ? 0 : dataAccIp.sssOutCase.toLocaleString('en-US')} ราย
              </Typography>
              <Typography>
                รวมค่าใช้จ่าย : {dataAccIp.sssOutDebit === null ? 0 : dataAccIp.sssOutDebit.toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>
          </Stack>

          <Divider />
          <Stack direction={'row'} gap={2} padding={'10px'}>
            <Typography variant="h6">
              ลูกหนี้ทั้งหมด จำนวน :{' '}{dataAccIp.allCase === null ? 0 : dataAccIp.allCase.toLocaleString('en-US')}{' '} ราย
            </Typography>
            <Typography variant="h6">
              รวมค่าใช้จ่าย :{' '} {dataAccIp.allDebit === null ? 0 : dataAccIp.allDebit.toLocaleString('en-US')}{' '} บาท
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
              <Tab label="บัญชีลูกหนี้ ทั้งหมด" value="1" />
              <Tab label="บัญชีลูกหนี้ จ่ายตรง" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack direction={'row'} gap={2}>
              <Typography sx={{ marginBottom: '15px' }}>
                {' '}
                บัญชีลูกหนี้ ทั้งหมด{' '}
              </Typography>
              <Typography>
                จำนวน :{' '}
                {dataAccIp.allCase === null
                  ? 0
                  : dataAccIp.allCase.toLocaleString('en-US')}{' '}
                ราย
              </Typography>
              <Typography>
                ทั้งหมด :{' '}
                {dataAccIp.allDebit === null
                  ? 0
                  : dataAccIp.allDebit.toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              {/* <DataGrid
                rows={dataCaseIp}
                columns={columns}
                getRowId={(row) => row.an}
                slots={{
                  toolbar: CustomToolbar,
                }}
              /> */}
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Stack direction={'row'} gap={2}>
              {/* <Typography sx={{ marginBottom: '15px' }}>
                {' '}
                บัญชีลูกหนี้ ที่ดำเนินการเสร็จสิ้นแล้ว{' '}
              </Typography>
              <Typography>
                จำนวน : {dataIp.ofcCase.toLocaleString('en-US')} ราย
              </Typography>
              <Typography>
                ทั้งหมด :{' '}
                {dataIp.ofcDebit === null
                  ? 0
                  : dataIp.ofcDebit.toLocaleString('en-US')}{' '}
                บาท
              </Typography> */}
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              {/* <DataGrid
                rows={dataCaseIpOfc}
                columns={columns}
                getRowId={(row) => row.an}
                slots={{
                  toolbar: CustomToolbar,
                }}
              /> */}
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box
              width={'100%'}
              height={500}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Pie data={dataChart} />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
