import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Tab,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { useRef, useState } from 'react'
import { Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/th'
import dayjs, { Dayjs } from 'dayjs'
import CardHeader1 from '../../../assets/amy.jpg'
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'

import { KeyboardArrowDownTwoTone } from '@mui/icons-material'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Pie } from 'react-chartjs-2'
import TotalCaseCard from './TotalCaseCard'
import ClaimCaseCard from './ClaimCaseCard'
import UnClaimCaseCard from './UnClaimCaseCard'
import Loading from '../../../components/Loading'

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
  debit_null: '',
}

const dataNotNull0 = { 
  all_notnullcase: 0,
  debit_notnull: 0,
  recieve: 0,
  sum_diff: 0,
  diffloss: 0,
  diffgain: 0,
}

const dataBydate0 = {
  allcase: 0,
  debit: 0,
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

// const apiUrl = import.meta.env.VITE_API_URL  // localhost
const apiUrl = import.meta.env.VITE_API_SERVER_URL // server HICM

export default function ReportIpPage() {
  const [dataNull, setDataNull] = useState(dataNull0)
  const [dataNotNull, setDataNotNull] = useState(dataNotNull0)
  const [dataAll, setDataAll] = useState<string>('')
  const [dataByDate, setDataByDate] = useState<GridRowsProp>([])
  const [dataCaseNotNull, setDataCaseNotNull] = useState<GridRowsProp>([])
  const [dataCaseNull, setDataCaseNull] = useState<GridRowsProp>([])
  const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [title, setTitle] = useState<string>('')
  const [accCode, setAccCode] = useState<string>('')
  const [stmFile,setStmFile] = useState<string>('')
  const [getRep, setGetRep] = useState(0)
  const [getCRep, setGetCRep] = useState(0)


  const columns: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'an', headerName: 'AN', width: 120 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'admitdate', headerName: 'วันที่ admit', width: 110 },
    { field: 'dchdate', headerName: 'วันที่ DC', width: 110 },
    { field: 'l_stay', headerName: 'วันนอน', width: 70 },
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'debt', headerName: 'คงเหลือ', width: 110 },
    // { field: 'acc_name', headerName: 'ลูกหนี้สิทธิ์', width: 260 },
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'adjrw', headerName: 'AdjRw', width: 110 },
    { field: 'total_summary', headerName: 'ได้รับชดเชย', width: 110 },
    { field: 'diff', headerName: 'ส่วนต่าง', width: 110 },
    { field: '', headerName: 'เลขใบเสร็จ', width: 110 },
  ]

  const columns_0: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'an', headerName: 'AN', width: 120 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'admitdate', headerName: 'วันที่ admit', width: 110 },
    { field: 'dchdate', headerName: 'วันที่ DC', width: 110 },
    { field: 'l_stay', headerName: 'วันนอน', width: 70 },
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'debt', headerName: 'คงเหลือ', width: 110 },
    { field: 'acc_name', headerName: 'ลูกหนี้สิทธิ์', width: 260 },
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'error_code', headerName: 'error_code', width: 100 },
    { field: 'error_name', headerName: 'error', width: 200 },
    { field: 'remark_data', headerName: 'remark', width: 200 },
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

  const resetValue = () => {
    setDataNull(dataNull0)
    setDataNotNull(dataNotNull0)
    setDataAll('')
    setDataByDate([])
    setDataCaseNotNull([])
    setDataCaseNull([])
    setGetRep(0)
    setGetCRep(0)
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    resetValue()

    console.log({ startDt, endDt })

    let startDate = startDt?.format('YYYY-MM-DD')
    let endDate = endDt?.format('YYYY-MM-DD')
    let stm_file = stmFile
    let acc_code = accCode
   

    setIsLoading(true)

    
    // Null Cases

    try {
      const responseCaseNull = await axios.post(`${apiUrl}/ipofc/ipofcnull`, { stm_file,acc_code, startDate, endDate })

      console.log(responseCaseNull.data.data)
      setDataCaseNull(responseCaseNull.data.data)
      console.log('dataCaseNull')
      console.log(dataCaseNull)

      let count1 = 0
      for (const item of responseCaseNull.data) {
        if (item.repno !== null) {
          count1++
        }
      }

      let count2 = 0
      for (const item of responseCaseNull.data) {
        if (item.repno !== null && item.error_code !== '-') {
          count2++
        }
      }

      setGetRep(count1)
      setGetCRep(count2)

    } catch (error) {
      console.log('ERROR', error)
    }

    // Not Null Cases

    try {
      const responseCaseNotNull = await axios.post(
        `${apiUrl}/ipofc/ipofcnotnull`,
        { stm_file,acc_code, startDate, endDate }
      )

      console.log(`${startDate}`)
      console.log(`${endDate}`)
      console.log(responseCaseNotNull.data.data)
      setDataCaseNotNull(responseCaseNotNull.data.data)
      console.log('dataCaseNotNull')
      console.log(dataCaseNotNull)
     
    } catch (error) {
      console.log('ERROR', error)
    }


// Acc Not Null
 
try {
  const responseNotNull = await axios.post(
    `${apiUrl}/ipofc/ipofcaccnotnull`,
    { stm_file,acc_code, startDate, endDate }
  )  
  console.log('dataNotNull')
  console.log(responseNotNull.data.data[0])

  setDataNotNull(responseNotNull.data.data[0])
  console.log('dataNotNull')
      console.log(dataNotNull)
 
} catch (error) {
  console.log('ERROR', error)
}



    // Ofc Acc null
    try {
      const responseNull = await axios.post(`${apiUrl}/ipofc/ipofcaccnull`, { stm_file,acc_code, startDate, endDate })
      // setData(jsonData)

      console.log(responseNull.data.data[0])

      setDataNull(responseNull.data.data[0])
      console.log('dataNull')
      console.log(dataNull)
     
    } catch (error) {
      console.log('ERROR', error)
    }

    // Account  by date
    try {
      const responseByDate = await axios.post(
        `${apiUrl}/ipofc/ipofcaccbydate`,
        { stm_file,acc_code, startDate, endDate }
      )
      // setData(jsonData)
      console.log('acc by date')
      console.log(responseByDate.data.data)

      setDataByDate(responseByDate.data.data)
      console.log('dataByDate')
      console.log(dataByDate)
    } catch (error) {
      console.log('ERROR', error)
    }

    setIsLoading(false)
 


    const all =
      Number(dataNull.all_nullcase) + Number(dataNotNull.all_notnullcase)
    const allCase = all.toLocaleString('en-US')
    setDataAll(allCase)
  }
  const CustomToolbar = () => {
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

  const dataChart = {
    labels: ['รอดำเนินการ', 'สำเร็จ'],
    datasets: [
      {
        // label: ['รอดำเนินการ', 'สำเร็จ'],
        data: [dataNull.all_nullcase, Number(dataNotNull.all_notnullcase)],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const ipOfcReport = [
    {
      id: 1,
      stmFile: 'stm_ip_ofc',
      accCode: '1102050101.402',
      text: 'ผู้ป่วยใน จ่ายตรงกรมบัญชีกลาง',
    },
    {
      id: 2,
      stmFile: 'stm_ip_ucs',
      accCode: '1102050101.202',
      text: 'ผู้ป่วยใน บัตรทอง [UCS]',
      query: '',
    },
    {
      id: 3,
      stmFile: 'stm_ip_lgo',
      accCode: '1102050101.203',
      text: 'ผู้ป่วยใน จ่ายตรง อปท',
      query: '',
    },
    {
      id: 4,
      stmFile: 'stm_ip_stp',
      accCode: '1102050101.204',
      text: 'ผู้ป่วยใน STP',
      query: '',
    },
  ]

  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false)
  const [period, setPeriod] = useState<string>(ipOfcReport[0].text)
  const actionRef1 = useRef<any>(null)

  return (
    <>
      <Stack direction={'row'} gap={1} marginTop={2} paddingLeft={10}>
        <Card sx={{ width: '20%' }}>
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
                  label="ประเภทลูกหนี้"
                  color="secondary"
                  value={`${title} ${accCode}`}
                  sx={{ fontWeight: 'bold' }}
                  focused
                />
              </Stack>
            </LocalizationProvider>

            <Box sx={{ marginTop: '4px' }}>
              <Button
                variant="outlined"
                ref={actionRef1}
                onClick={() => setOpenMenuPeriod(true)}
                fullWidth
                sx={{
                  mr: 1,
                }}
                endIcon={<KeyboardArrowDownTwoTone fontSize="small" />}
              >
                {period}
              </Button>
              <Menu
                disableScrollLock
                anchorEl={actionRef1.current}
                onClose={() => setOpenMenuPeriod(false)}
                open={openPeriod}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {ipOfcReport.map((_period) => (
                  <MenuItem
                    key={_period.id}
                    onClick={() => {
                      setPeriod(_period.text)
                      setTitle(_period.text)
                      setAccCode(_period.accCode)
                      setStmFile(_period.stmFile)
                      setOpenMenuPeriod(false)
                      console.log(_period)
                    }}
                  >
                    {_period.text}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <CardActions>
              <Box flexGrow={1} />
              <Button
                variant="outlined"
                onClick={onSubmit}
                size="small"
                color="primary"
              >
                Submit
              </Button>
            </CardActions>
          </CardContent>
        </Card>

        <Card sx={{ width: '1000px', marginLeft: '50px', padding: '10px' }}>
          {isLoading ? (
            <Loading isLoading />
          ) : (
            <Box>
              <Stack direction={'row'} gap={2}>
                <TotalCaseCard
                  cases={(
                    Number(dataNull.all_nullcase) +
                    Number(dataNotNull.all_notnullcase)
                  ).toLocaleString('en-US')}
                  values={(
                    Number(dataNull.debit_null) +
                    Number(dataNotNull.debit_notnull)
                  ).toLocaleString('en-US')}
                />
                <ClaimCaseCard
                  cases={Number(dataNotNull.all_notnullcase).toLocaleString(
                    'en-US'
                  )}
                  values={Number(dataNotNull.debit_notnull).toLocaleString(
                    'en-US'
                  )}
                  recieve={Number(dataNotNull.recieve).toLocaleString('en-US')}
                  percent={
                    (Number(dataNotNull.all_notnullcase) * 100) /
                    (Number(dataNull.all_nullcase) +
                      Number(dataNotNull.all_notnullcase))
                  }
                />
                <UnClaimCaseCard
                  cases={Number(dataNull.all_nullcase).toLocaleString('en-US')}
                  values={Number(dataNull.debit_null).toLocaleString('en-US')}
                  percent={
                    (Number(dataNull.all_nullcase) * 100) /
                    (Number(dataNull.all_nullcase) +
                      Number(dataNotNull.all_notnullcase))
                  }
                />
              </Stack>
              <Stack direction={'column'} gap={2} marginTop={2}>
                <Stack direction={'row'}>
                  <Typography
                    flexGrow={1}
                    fontWeight={'bold'}
                    color={'primary'}
                  >
                    ส่วนต่าง ค่ารักษา :{' '}
                  </Typography>
                  <Typography mr={5} fontWeight={'bold'}>
                    {dataNotNull.sum_diff === null
                      ? 0
                      : Number(dataNotNull.sum_diff).toLocaleString(
                          'en-US'
                        )}{' '}
                    บาท
                  </Typography>
                </Stack>

                <Stack direction={'row'}>
                  <Typography flexGrow={1} fontWeight={'bold'}>
                    ส่วนต่างค่ารักษาที่ต่ำกว่าชดเชย :{' '}
                  </Typography>
                  <Typography mr={5} fontWeight={'bold'}>
                    {dataNotNull.diffloss === null
                      ? 0
                      : Number(dataNotNull.diffloss).toLocaleString(
                          'en-US'
                        )}{' '}
                    บาท
                  </Typography>
                </Stack>

                <Stack direction={'row'}>
                  <Typography color={'error'} flexGrow={1} fontWeight={'bold'}>
                    ส่วนต่างค่ารักษาที่สูงกว่าชดเชย :{' '}
                  </Typography>
                  <Typography color={'error'} mr={5} fontWeight={'bold'}>
                    {dataNotNull.diffgain === null
                      ? 0
                      : Number(dataNotNull.diffgain).toLocaleString(
                          'en-US'
                        )}{' '}
                    บาท
                  </Typography>
                </Stack>
              </Stack>
            <Divider/>
                <Stack direction={'row'} gap={2}>
                  <Typography sx={{ marginBottom: '15px' }} fontWeight={'bold'}>
                    {' '}
                    บัญชีลูกหนี้ ระหว่างดำเนินการ{' '}
                  </Typography>
                  <Typography fontWeight={'bold'}>
                    จำนวน :{' '}
                    {dataNull.all_nullcase === null
                      ? 0
                      : dataNull.all_nullcase.toLocaleString('en-US')}{' '}
                    ราย
                  </Typography>
                  <Typography fontWeight={'bold'}>
                    ทั้งหมด :{' '}
                    {dataNull.debit_null === null
                      ? 0
                      : Number(dataNull.debit_null).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{' '}
                    บาท
                  </Typography>
                  <Typography fontWeight={'bold'}>
                    มี rep แล้ว : {getRep} ราย
                  </Typography>
                  <Typography fontWeight={'bold'}>
                    ติด C : {getCRep} ราย
                  </Typography>
                  <Typography fontWeight={'bold'} color={'error'} fontSize={'1rem'}>
                    ยังไม่ได้ดำเนินการ : {dataNull.all_nullcase - getRep} ราย
                  </Typography>
                </Stack>{' '}
            </Box>
          )}
        </Card>
      </Stack>

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
                  : dataNull.all_nullcase.toLocaleString('en-US')}{' '}
                ราย
              </Typography>
              <Typography>
                ทั้งหมด :{' '}
                {dataNull.debit_null === null
                  ? 0
                  : Number(dataNull.debit_null).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                บาท
              </Typography>
              <Typography>มี rep แล้ว : {getRep} ราย</Typography>
              <Typography>ติด C : {getCRep} ราย</Typography>
              <Typography>
                ยังไม่ได้ดำเนินการ : {dataNull.all_nullcase - getRep} ราย
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseNull}
                columns={columns_0}
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
                {/* จำนวน : {dataNotNull.all_notnullcase.toLocaleString('en-US')}{' '} */}
                ราย
              </Typography>
              <Typography>
                ทั้งหมด :{' '}
                {dataNotNull.debit_notnull === null
                  ? 0
                  : Number(dataNotNull.debit_notnull).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                บาท
              </Typography>
              <Typography>
                ได้รับชดเชย :{' '}
                {Number(dataNotNull.recieve).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                บาท
              </Typography>

              <Stack direction={'row'} gap={2}>
                <Typography>
                  ส่วนต่าง :{' '}
                  {dataNotNull.sum_diff === null
                    ? 0
                    : dataNotNull.sum_diff.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                  บาท
                </Typography>
                <Typography>
                  ส่วนต่างค่ารักษาที่ต่ำกว่าชดเชย :{' '}
                  {dataNotNull.diffloss === null
                    ? 0
                    : dataNotNull.diffloss.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                  บาท
                </Typography>
                <Typography>
                  ส่วนต่างค่ารักษาที่สูงกว่าชดเชย :{' '}
                  {dataNotNull.diffgain === null
                    ? 0
                    : dataNotNull.diffgain.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                  บาท
                </Typography>
              </Stack>
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
                <Typography variant="body2">
                  จำนวน :{' '}
                  {/* {(
                    Number(dataNull.all_nullcase) +
                    Number(dataNotNull.all_notnullcase)
                  ).toLocaleString('en-US')}{' '} */}
                  ราย
                </Typography>
                <Typography variant="body2">
                  รอดำเนินการ :{' '}
                  {/* {Number(dataNull.all_nullcase).toLocaleString('en-US')} ราย [ */}
                  {''}
                  {/* {(
                    (Number(dataNull.all_nullcase) * 100) /
                    (Number(dataNull.all_nullcase) +
                      Number(dataNotNull.all_notnullcase))
                  ).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} */}
                  {/* {''}%] */}
                  {/* รอดำเนินการ : {dataNull.all_nullcase.toLocaleString('en-US')} */}
                </Typography>
                <Typography variant="body2">
                  สำเร็จ :{' '}
                  {/* {Number(dataNotNull.all_notnullcase).toLocaleString('en-US')}{' '}
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
                  {''}%] */}
                </Typography>
              </Stack>
              <Box>
                {/* {' '}
                <Pie data={dataChart} /> */}
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
