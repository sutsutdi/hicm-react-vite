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

const dataNull0 = {
  all_nullcase: 0,
  debit_null: 0,
}

const dataNotNull0 = {
  dchdate: '2023-01-01',
  all_notnullcase: 0,
  debit_notnull: 0,
  recieve: '',
  sum_diff: 0,
  diffloss: 0,
  diffgain: 0,
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ReportIpUcPage() {
  const [dataNull, setDataNull] = useState(dataNull0)
  const [dataNotNull, setDataNotNull] = useState(dataNotNull0)
  const [dataCaseNotNull, setDataCaseNotNull] = useState<GridRowsProp>([])
  const [dataCaseNull, setDataCaseNull] = useState<GridRowsProp>([])
  const [dataByDate, setDataByDate] = useState<GridRowsProp>([])
  const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))

  const columns: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'an', headerName: 'AN', width: 120 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'admitdate', headerName: 'วันที่ admit', width: 110 },
    { field: 'dchdate', headerName: 'วันที่ DC', width: 110 },
    { field: 'l_stay', headerName: 'วันนอน', width: 110 },
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'debt', headerName: 'คงเหลือ', width: 110 },
    { field: 'acc_name', headerName: 'ลูกหนี้สิทธิ์', width: 260 },
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'adjrw', headerName: 'AdjRw', width: 110 },
    { field: 'total_summary', headerName: 'ได้รับชดเชย', width: 110 },
    { field: 'diff', headerName: 'ส่วนต่าง', width: 110 },
  ]

  const columns2: GridColDef[] = [
    { field: 'dchdate', headerName: 'วันที่ DC', width: 110 },
    { field: 'allcase', headerName: 'จำนวนผู้ป่วย', width: 110 },
    { field: 'debit', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'nullcase', headerName: 'รอดำเนินการ', width: 110 },
    { field: 'nulldebit', headerName: 'หนี้คงค้าง', width: 110 },
    { field: 'notnullcase', headerName: 'ดำเนินการสำเร็จ', width: 110 },
    { field: 'notnulldebit', headerName: 'ตัดหนี้รับชำระ', width: 110 },
    { field: 'recieve', headerName: 'ยอดรวมชดเชย', width: 110 },
    { field: 'diff', headerName: 'ผลรวมส่วนต่าง', width: 110 },
  ]

  const onSubmit = async () => {
    let startDate = startDt?.format('YYYY-MM-DD')
    let endDate = endDt?.format('YYYY-MM-DD')
    // Uc Acc Null
    try {
      const responseNull = await axios.post(`${apiUrl}/ipuc/ipucaccnull`, {
        startDate,
        endDate,
      })
      // setData(jsonData)
      console.log(responseNull.data[0])

      setDataNull(responseNull.data[0])

      console.log(dataNull)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Uc Acc Not Null
    try {
      const responseNotNull = await axios.post(
        `${apiUrl}/ipuc/ipucaccnotnull`,
        { startDate, endDate }
      )

      console.log(responseNotNull.data[0])

      setDataNotNull(responseNotNull.data[0])

      console.log(dataNotNull)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Null Cases

    try {
      const responseCaseNull = await axios.post(`${apiUrl}/ipuc/ipucnull`, {
        startDate,
        endDate,
      })

      console.log(responseCaseNull.data)
      setDataCaseNull(responseCaseNull.data)

      console.log(dataCaseNull)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Not Null Cases

    try {
      const responseCaseNotNull = await axios.post(
        `${apiUrl}/ipuc/ipucnotnull`,
        { startDate, endDate }
      )

      console.log(responseCaseNotNull.data)
      setDataCaseNotNull(responseCaseNotNull.data)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Account  by date
    try {
      const responseByDate = await axios.post(`${apiUrl}/ipuc/ipucaccbydate`, {
        startDate,
        endDate,
      })
      // setData(jsonData)
      console.log('acc by date')
      console.log(responseByDate.data)

      setDataByDate(responseByDate.data)

      console.log(dataByDate)
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
        data: [dataNull.all_nullcase, dataNotNull.all_notnullcase],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
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
              // src ="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
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
                    value={startDt}
                    onChange={(newValue) => setStartDt(newValue)}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDt}
                    onChange={(newValue) => setEndDt(newValue)}
                  />
                  <TextField
                    label="Outlined secondary"
                    color="secondary"
                    value={'ผู้ป่วยใน ประกันสุขภาพถ้วนหน้า UCS'}
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
          {/* <Box padding={4}>
              <Typography>ลูกหนี้ ผู้ป่วยใน จ่ายตรง</Typography>
            </Box> */}
          <Stack direction={'row'} gap={2} padding={'10px'}>
            <Typography>
              จำนวน :{' '}
              {(
                Number(dataNull.all_nullcase) +
                Number(dataNotNull.all_notnullcase)
              ).toLocaleString('en-US')}{' '}
              ราย
            </Typography>
            <Typography>
              รอดำเนินการ :{' '}
              {Number(dataNull.all_nullcase).toLocaleString('en-US')} ราย [{''}
              {(
                (Number(dataNull.all_nullcase) * 100) /
                (Number(dataNull.all_nullcase) +
                  Number(dataNotNull.all_notnullcase))
              ).toLocaleString('en-US', {
                minimumIntegerDigits: 1,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {''}%]
              {/* รอดำเนินการ : {dataNull.all_nullcase.toLocaleString('en-US')} */}
            </Typography>
            <Typography>
              สำเร็จ :{' '}
              {Number(dataNotNull.all_notnullcase).toLocaleString('en-US')} ราย{' '}
              [{''}
              {(
                (Number(dataNotNull.all_notnullcase) * 100) /
                (Number(dataNull.all_nullcase) +
                  Number(dataNotNull.all_notnullcase))
              ).toLocaleString('en-US', {
                minimumIntegerDigits: 1,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {''}%]
            </Typography>
          </Stack>

          <Stack direction={'column'} gap={2} padding={'10px'}>
            <Typography>
              ลูกหนี้ทั้งหมด :{' '}
              {(
                Number(dataNull.debit_null) + Number(dataNotNull.debit_notnull)
              ).toLocaleString('en-US')}{' '}
              บาท
            </Typography>
            <Typography>
              ลูกหนี้ดำเนินการสำเร็จ :{' '}
              {dataNotNull.debit_notnull === null
                ? 0
                : Number(dataNotNull.debit_notnull).toLocaleString(
                    'en-US'
                  )}{' '}
              บาท
            </Typography>
            <Typography>
              ได้รับชดเชย :{' '}
              {Number(dataNotNull.recieve).toLocaleString('en-US')} บาท
            </Typography>
            <Stack direction={'column'} gap={2}>
              <Typography>
                ส่วนต่าง ค่ารักษา :{' '}
                {dataNotNull.sum_diff === null
                  ? 0
                  : Number(dataNotNull.sum_diff).toLocaleString('en-US')}{' '}
                บาท
              </Typography>
              <Typography>
                ส่วนต่างค่ารักษาที่ต่ำกว่าชดเชย :{' '}
                {dataNotNull.diffloss === null
                  ? 0
                  : Number(dataNotNull.diffloss).toLocaleString('en-US')}{' '}
                บาท
              </Typography>
              <Typography color={'red'}>
                ส่วนต่างค่ารักษาที่สูงกว่าชดเชย :{' '}
                {dataNotNull.diffgain === null
                  ? 0
                  : Number(dataNotNull.diffgain).toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>
            <Divider />
            <Typography variant="h6">
              ลูกหนี้คงเหลือ : รอดำเนินการ :{' '}
              {dataNull.all_nullcase === null
                ? 0
                : Number(dataNull.all_nullcase).toLocaleString('en-US')}{' '}
              ราย จำนวน : {/* {dataNull.debit_null.toLocaleString('en-US')} */}
              {dataNull.debit_null === null
                ? 0
                : Number(dataNull.debit_null).toLocaleString('en-US')}{' '}
              บาท
            </Typography>
          </Stack>
        </Card>
      </Box>

      <Divider sx={{ marginY: '30px' }} />

      <Box sx={{ width: '100%', height: '500px', typography: 'body1' }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="Ip Ofc">
              <Tab label="บัญชีลูกหนี้ ระหว่างดำเนินการ" value="1" />
              <Tab label="บัญชีลูกหนี้ ที่ดำเนินการเสร็จสิ้นแล้ว" value="2" />
              <Tab label="สรุปการตัดหนี้รายวัน" value="3" />
              <Tab label="Chart " value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack direction={'row'} gap={2}>
              <Typography sx={{ marginBottom: '15px' }}>
                {' '}
                บัญชีลูกหนี้ ระหว่างดำเนินการ{' '}
              </Typography>
              <Typography>
                จำนวน :{' '}
                {dataNull.all_nullcase === null
                  ? 0
                  : Number(dataNull.all_nullcase).toLocaleString('en-US')}{' '}
                ราย
                {/* จำนวน : {dataNull.all_nullcase.toLocaleString('en-US')} ราย */}
              </Typography>
              <Typography>
                ทั้งหมด :{' '}
                {dataNull.debit_null === null
                  ? 0
                  : Number(dataNull.debit_null).toLocaleString('en-US')}{' '}
                บาท
                {/* ทั้งหมด : {dataNull.debit_null.toLocaleString('en-US')} บาท */}
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseNull}
                columns={columns}
                getRowId={(row) => row.an}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Stack direction={'row'} gap={2}>
              <Typography sx={{ marginBottom: '15px' }}>
                {' '}
                บัญชีลูกหนี้ ที่ดำเนินการเสร็จสิ้นแล้ว{' '}
              </Typography>
              <Typography>
                จำนวน :{' '}
                {Number(dataNotNull.all_notnullcase).toLocaleString('en-US')}{' '}
                ราย
              </Typography>
              <Typography>
                ทั้งหมด :{' '}
                {dataNotNull.debit_notnull === null
                  ? 0
                  : Number(dataNotNull.debit_notnull).toLocaleString(
                      'en-US'
                    )}{' '}
                บาท
              </Typography>
              <Typography>
                ได้รับชดเชย :{' '}
                {Number(dataNotNull.recieve).toLocaleString('en-US')} บาท
              </Typography>
              <Typography>
                ส่วนต่าง :{' '}
                {dataNotNull.sum_diff === null
                  ? 0
                  : Number(dataNotNull.sum_diff).toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseNotNull}
                columns={columns}
                getRowId={(row) => row.an}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataByDate}
                columns={columns2}
                getRowId={(row) => row.dchdate}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value="4">
            <Box
              width={'100%'}
              height={500}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
             
              <Stack direction={'column'} gap={2} padding={'10px'}>
                <Typography variant='body2'>
                  จำนวน :{' '}
                  {(
                    Number(dataNull.all_nullcase) +
                    Number(dataNotNull.all_notnullcase)
                  ).toLocaleString('en-US')}{' '}
                  ราย
                </Typography >
                <Typography variant='body2'>
                  รอดำเนินการ :{' '}
                  {Number(dataNull.all_nullcase).toLocaleString('en-US')} ราย [
                  {''}
                  {(
                    (Number(dataNull.all_nullcase) * 100) /
                    (Number(dataNull.all_nullcase) +
                      Number(dataNotNull.all_notnullcase))
                  ).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  {''}%]
                  {/* รอดำเนินการ : {dataNull.all_nullcase.toLocaleString('en-US')} */}
                </Typography>
                <Typography variant='body2'>
                  สำเร็จ :{' '}
                  {Number(dataNotNull.all_notnullcase).toLocaleString('en-US')}{' '}
                  ราย [{''}
                  {(
                    (Number(dataNotNull.all_notnullcase) * 100) /
                    (Number(dataNull.all_nullcase) +
                      Number(dataNotNull.all_notnullcase))
                  ).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  {''}%]
                </Typography>
              </Stack>
              <Box> <Pie data={dataChart}/></Box>
             
             
             
              
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
