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
  startDt: Date
  endDate: Date
  firstName: string
  category: string
  aboutYou: string
}

type FormValues = {
  startDt: Date
  endDate: Date
}

const dataDbopofcacc = {
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

export default function ReportOpOfcPage() {

  const [dataNull, setDataNull] = useState(dataNull0)
  const [dataNotNull, setDataNotNull] = useState(dataNotNull0)
  const [dataCaseNotNull, setDataCaseNotNull] = useState<GridRowsProp>([])
  const [dataCaseNull, setDataCaseNull] = useState<GridRowsProp>([])
  const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))
 



  const columns: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'visit_date', headerName: 'วันที่', width: 110 },
    { field: 'cln', headerName: 'clinic', width: 180 },
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'outstanding', headerName: 'คงเหลือ', width: 110 },
    { field: 'debtor', headerName: 'ลูกหนี้สิทธิ์', width: 110 },
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'total_summary', headerName: 'ได้รับจัดสรร', width: 110 },
    { field: 'diff', headerName: 'ส่วนต่าง', width: 110 },
  ]

  const onSubmit = async () => {

    console.log({ startDt, endDt })
    
    let startDate = startDt?.format('YYYY-MM-DD')
    let endDate = endDt?.format('YYYY-MM-DD')
    
    console.log(startDt)
    console.log(endDt)

    // Ofc Acc null
    try {
      const responseNull = await axios.post(`${apiUrl}/opofc/opofcaccnull`, {
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
        `${apiUrl}/opofc/opofcaccnotnull`,
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
      const responseCaseNull = await axios.post(`${apiUrl}/opofc/opofcnull`, {
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
        `${apiUrl}/opofc/opofcnotnull`,
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
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} marginTop={5}>
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
                    label="Outlined secondary"
                    color="secondary"
                    value={'ผู้ป่วยนอก จ่ายตรงกรมบัญชีกลาง'}
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
             
            </Typography>
            <Typography>
              สำเร็จ : {dataNotNull.all_notnullcase.toLocaleString('en-US')}
            </Typography>
          </Stack>

          <Stack direction={'column'} gap={2} padding={'10px'}>
            <Typography>
              ลูกหนี้ทั้งหมด :{' '}
              {(Number(dataNull.debit_null) + Number(dataNotNull.debit_notnull)).toLocaleString(
                'en-US'
              )}{' '}
              บาท
            </Typography>
            <Typography>
              ลูกหนี้ดำเนินการสำเร็จ :{' '}
              {Number(dataNotNull.debit_notnull) === null
                ? 0
                : Number(dataNotNull.debit_notnull).toLocaleString('en-US')}{' '}
              บาท
            </Typography>
            <Typography>
              ได้รับจัดสรร :{' '}
              {Number(dataNotNull.recieve).toLocaleString('en-US')} บาท
            </Typography>
            <Typography>
              ส่วนต่าง :{' '}
              {Number(dataNotNull.sum_diff) === null
                ? 0
                : Number(dataNotNull.sum_diff).toLocaleString('en-US')}{' '}
              บาท
            </Typography>
            <Divider />
            <Typography variant="h6">
              ลูกหนี้คงเหลือ : รอดำเนินการ :{' '}
              {dataNull.all_nullcase === null
                ? 0
                : dataNull.all_nullcase.toLocaleString('en-US')}{' '}
              ราย จำนวน : {/* {dataNull.debit_null.toLocaleString('en-US')} */}
              {Number(dataNull.debit_null) === null
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
                {Number(dataNull.debit_null) === null
                  ? 0
                  : Number(dataNull.debit_null).toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseNull}
                columns={columns}
                getRowId={(row) => row.hn}
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
                {Number(dataNotNull.debit_notnull) === null
                  ? 0
                  : Number(dataNotNull.debit_notnull).toLocaleString('en-US')}{' '}
                บาท
              </Typography>
              <Typography>
                ได้รับจัดสรร :{' '}
                {Number(dataNotNull.recieve).toLocaleString('en-US')} บาท
              </Typography>
              <Typography>
                ส่วนต่าง :{' '}
                {Number(dataNotNull.sum_diff) === null
                  ? 0
                  : Number(dataNotNull.sum_diff).toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseNotNull}
                columns={columns}
                getRowId={(row) => row.hn}
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
