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

type DataType = {
  startDate: Date
  endDate: Date
  firstName: string
  category: string
  aboutYou: string
}

type FormValues = {
  startDate: Date
  endDate: Date
}

const dataDbipofcacc = {
  all_case: 0,
  debit_all: 0,
  notnull_case: 0,
  null_case: 0,
  debit_null: 0,
  debit_notnull: 0,
  recieve: '',
  sum_diff: 0,
}

const dataNull0 = {
  all_nullcase: 0,
  debit_null: 0,
}

const dataNotNull0 = {
  all_notnullcase: 0,
  debit_notnull: 0,
  recieve: '',
  sum_diff: 0,
}

type DataDabitNotNull = {
  hn: string
  an: string
  cid: string
  fname: string
  admitdate: string
  dchdate: string
  charge: string
  paid: string
  outstanding: string
  repno: string
  total_summary: string
  diff: number
}

type DataDabitNull = {
  hn: string
  an: string
  cid: string
  fname: string
  admitdate: string
  dchdate: string
  charge: string
  paid: string
  outstanding: string
  repno: string
  total_summary: string
  diff: 0
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ReportPage() {
  const [dataNull, setDataNull] = useState(dataNull0)
  const [dataNotNull, setDataNotNull] = useState(dataNotNull0)
  const [dataCaseNotNull, setDataCaseNotNull] = useState<GridRowsProp>([])
  const [dataCaseNull, setDataCaseNull] = useState<GridRowsProp>([])
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
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'adjrw', headerName: 'AdjRw', width: 110 },
    { field: 'total_summary', headerName: 'ได้รับจัดสรร', width: 110 },
    { field: 'diff', headerName: 'ส่วนต่าง', width: 110 },
  ]

  const onSubmit = async () => {
    console.log({ startDate, endDate })

    // Ofc Acc null
    try {
      const responseNull = await axios.post(`${apiUrl}/ipofc/ipofcaccnull`, {
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

    // Ofc Acc Not Null
    try {
      const responseNotNull = await axios.post(
        `${apiUrl}/ipofc/ipofcaccnotnull`,
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
      const responseCaseNull = await axios.post(`${apiUrl}/ipofc/ipofcnull`, {
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
        `${apiUrl}/ipofc/ipofcnotnull`,
        { startDate, endDate }
      )

      console.log(responseCaseNotNull.data)
      setDataCaseNotNull(responseCaseNotNull.data)
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
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
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
                    value={'ผู้ป่วยใน จ่ายตรงกรมบัญชีกลาง'}
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
            <Typography>
              จำนวน :
              {(
                dataNull.all_nullcase + dataNotNull.all_notnullcase
              ).toLocaleString('en-US')}{' '}
            </Typography>
            <Typography>
              รอดำเนินการ : {dataNull.all_nullcase}
              {/* รอดำเนินการ : {dataNull.all_nullcase.toLocaleString('en-US')} */}
            </Typography>
            <Typography>
              สำเร็จ : {dataNotNull.all_notnullcase.toLocaleString('en-US')}
            </Typography>
          </Stack>

          <Stack direction={'column'} gap={2} padding={'10px'}>
            <Typography>
              ลูกหนี้ทั้งหมด :{' '}
              {(dataNull.debit_null + dataNotNull.debit_notnull).toLocaleString(
                'en-US'
              )}{' '}
              บาท
            </Typography>
            <Typography>
              ลูกหนี้ดำเนินการสำเร็จ :{' '}
              {dataNotNull.debit_notnull === null
                ? 0
                : dataNotNull.debit_notnull.toLocaleString('en-US')}{' '}
              บาท
            </Typography>
            <Typography>
              ได้รับจัดสรร :{' '}
              {Number(dataNotNull.recieve).toLocaleString('en-US')} บาท
            </Typography>
            <Typography>
              ส่วนต่าง :{' '}
              {dataNotNull.sum_diff === null
                ? 0
                : dataNotNull.sum_diff.toLocaleString('en-US')}{' '}
              บาท
            </Typography>
            <Divider />
            <Typography variant="h6">
              ลูกหนี้คงเหลือ : รอดำเนินการ :{' '}
              {dataNull.all_nullcase === null
                ? 0
                : dataNull.all_nullcase.toLocaleString('en-US')}{' '}
              ราย จำนวน : {/* {dataNull.debit_null.toLocaleString('en-US')} */}
              {dataNull.debit_null === null
                ? 0
                : dataNull.debit_null.toLocaleString('en-US')}{' '}
              บาท
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
              <Tab label="บัญชีลูกหนี้ ระหว่างดำเนินการ" value="1" />
              <Tab label="บัญชีลูกหนี้ ที่ดำเนินการเสร็จสิ้นแล้ว" value="2" />
              <Tab label="Item Three" value="3" />
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
                  : dataNull.all_nullcase.toLocaleString('en-US')}{' '}
                ราย
              </Typography>
              <Typography>
                ทั้งหมด :{' '}
                {dataNull.debit_null === null
                  ? 0
                  : dataNull.debit_null.toLocaleString('en-US')}{' '}
                บาท
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
                จำนวน : {dataNotNull.all_notnullcase.toLocaleString('en-US')}{' '}
                ราย
              </Typography>
              <Typography>
                ทั้งหมด :{' '}
                {dataNotNull.debit_notnull === null
                  ? 0
                  : dataNotNull.debit_notnull.toLocaleString('en-US')}{' '}
                บาท
              </Typography>
              <Typography>
                ได้รับจัดสรร :{' '}
                {Number(dataNotNull.recieve).toLocaleString('en-US')} บาท
              </Typography>
              <Typography>
                ส่วนต่าง :{' '}
                {dataNotNull.sum_diff === null
                  ? 0
                  : dataNotNull.sum_diff.toLocaleString('en-US')}{' '}
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
