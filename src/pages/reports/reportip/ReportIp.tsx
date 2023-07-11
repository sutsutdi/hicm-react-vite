import {
  Box,
  Button,
  Card,
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
import CardHeader1 from '../../../assets/amy.jpg'
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

const apiUrl = import.meta.env.VITE_API_URL

type ReportIp = {
  title: string,
  acctype: string
  
}



export default function ReportIpPage(props: ReportIp) {
  const [dataNull, setDataNull] = useState(dataNull0)
  const [dataNotNull, setDataNotNull] = useState(dataNotNull0)
  const [dataAll, setDataAll] = useState<string>('')
  const [dataByDate, setDataByDate] = useState<GridRowsProp>([])
  const [dataCaseNotNull, setDataCaseNotNull] = useState<GridRowsProp>([])
  const [dataCaseNull, setDataCaseNull] = useState<GridRowsProp>([])
  const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))

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
    { field: 'errorcode', headerName: 'error_code', width: 50 },
    { field: 'code_name', headerName: 'error', width: 200 },
    { field: 'remarkdata', headerName: 'remark', width: 200 },
    
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
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    resetValue()

    console.log({ startDt, endDt })

    let startDate = startDt?.format('YYYY-MM-DD')
    let endDate = endDt?.format('YYYY-MM-DD')

    console.log(startDt)
    console.log(endDt)

    setIsLoading(true)
 
    try {
      const responseNotNull = await axios.post(
        `${apiUrl}/${props.acctype}/${props.acctype}accnotnull`,
        { startDate, endDate }
      )

      console.log(`${apiUrl}/ipofc/ipofcaccnotnull`)
      console.log(`${startDate}`)
      console.log(`${endDate}`)

      console.log(responseNotNull.data[0])

      setDataNotNull(responseNotNull.data[0])

      console.log(dataNotNull)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Null Cases

    try {
      const responseCaseNull = await axios.post(`${apiUrl}/${props.acctype}/${props.acctype}null`, {
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
        `${apiUrl}/${props.acctype}/${props.acctype}notnull`,
        { startDate, endDate }
      )

      console.log(`${startDate}`)
      console.log(`${endDate}`)
      console.log(responseCaseNotNull.data)
      setDataCaseNotNull(responseCaseNotNull.data)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Ofc Acc null
    try {
      const responseNull = await axios.post(`${apiUrl}/${props.acctype}/${props.acctype}accnull`, {
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

    // Account  by date
    try {
      const responseByDate = await axios.post(
        `${apiUrl}/${props.acctype}/${props.acctype}accbydate`,
        {
          startDate,
          endDate,
        }
      )
      // setData(jsonData)
      console.log('acc by date')
      console.log(responseByDate.data)

      setDataByDate(responseByDate.data)

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
        data: [dataNull.all_nullcase, dataNotNull.all_notnullcase],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }

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
                    value={props.title}
                    sx={{fontWeight: 'bold'}}
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
                  ).toLocaleString('en-US')} values = {(
                    Number(dataNull.debit_null) +
                    Number(dataNotNull.debit_notnull)
                  ).toLocaleString('en-US')}
                />
                <ClaimCaseCard
                  cases={Number(dataNotNull.all_notnullcase).toLocaleString(
                    'en-US'
                  )} 
                  values =  {Number(dataNotNull.debit_notnull).toLocaleString(
                    'en-US'
                  )}
                  recieve =  {Number(dataNotNull.recieve).toLocaleString('en-US')}
                  percent = {(Number(dataNotNull.all_notnullcase) * 100) /
                  (Number(dataNull.all_nullcase) +
                    Number(dataNotNull.all_notnullcase))}
                />
                <UnClaimCaseCard
                  cases={Number(dataNull.all_nullcase).toLocaleString('en-US')}
                  values = {Number(dataNull.debit_null).toLocaleString(
                    'en-US'
                  )}
                  percent = {(Number(dataNull.all_nullcase) * 100) /
                  (Number(dataNull.all_nullcase) +
                    Number(dataNotNull.all_notnullcase))}
                />
              </Stack>
              <Stack direction={'column'} gap={2} marginTop={2}>
                <Stack direction={'row'}>
                  <Typography   flexGrow={1} fontWeight={'bold'} color={'primary'}>ส่วนต่าง ค่ารักษา : </Typography>
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
                    </Typography >
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
              {/* <Divider /> */}
              {/* <Typography variant="h4" marginTop={3} color= 'primary'> */}
                {/* ลูกหนี้คงเหลือ : รอดำเนินการ :{' '} */}
                {/* {dataNull.all_nullcase === null
                  ? 0
                  : Number(dataNull.all_nullcase).toLocaleString('en-US')}{' '}
                ราย จำนวน :{' '} */}
                {/* {dataNull.debit_null.toLocaleString('en-US')} */}
                {/* {dataNull.debit_null === null
                  ? 0
                  : Number(dataNull.debit_null).toLocaleString('en-US')}{' '}
                บาท */}
              {/* </Typography> */}
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
                จำนวน : {dataNotNull.all_notnullcase.toLocaleString('en-US')}{' '}
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
                  {(
                    Number(dataNull.all_nullcase) +
                    Number(dataNotNull.all_notnullcase)
                  ).toLocaleString('en-US')}{' '}
                  ราย
                </Typography>
                <Typography variant="body2">
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
                <Typography variant="body2">
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
              <Box>
                {' '}
                <Pie data={dataChart} />
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
