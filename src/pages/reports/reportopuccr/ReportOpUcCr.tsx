import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
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

const opReport = [
  {
    id: 1,
    service_name: 'AE นอกเขต',
    acc_code: '1102050101.216',
  },
  {
    id: 2,
    service_name: 'AE สิทธิว่าง',
    acc_code: '1102050101.216',
  },
  {
    id: 3,
    service_name: 'ANC',
    acc_code: '1102050101.209',
  },
  {
    id: 26,
    service_name: 'anc ทันตกรรม ปกส',
    acc_code: '1102050101.209',
  },
  

  {
    id: 4,
    service_name: 'CA anywhere',
    acc_code: '1102050101.216',
  },
  {
    id: 5,
    service_name: 'CA chemotherapy',
    acc_code: '1102050101.216',
  },
  {
    id: 6,
    service_name: 'DMISHD',
    acc_code: '1102050101.216',
  },
  {
    id: 7,
    service_name: 'DMISRC',
    acc_code: '1102050101.216',
  },
  {
    id: 8,
    service_name: 'ER-EXT',
    acc_code: '1102050101.216',
  },
  {
    id: 9,
    service_name: 'UCEP24',
    acc_code: '1102050101.216',
  },
  {
    id: 10,
    service_name: 'INST',
    acc_code: '1102050101.216',
  },
  {
    id: 11,
    service_name: 'Palliative',
    acc_code: '1102050101.216',
  },
  {
    id: 12,
    service_name: 'STP',
    acc_code: '1102050101.216',
  },
  {
    id: 13,
    service_name: 'Telemed',
    acc_code: '1102050101.216',
  },
  {
    id: 14,
    service_name: 'UCS ผู้พิการ',
    acc_code: '1102050101.216',
  },
  {
    id: 15,
    service_name: 'WALKIN',
    acc_code: '1102050101.216',
  },
  {
    id: 16,
    service_name: 'ANC ทันตกรรม',
    acc_code: '1102050101.209',
  },
  {
    id: 17,
    service_name: 'INST ฟันปลอม',
    acc_code: '1102050101.216',
  },
  {
    id: 18,
    service_name: 'INST รากฟันเทียม',
    acc_code: '1102050101.216',
  },
  {
    id: 19,
    service_name: 'เคลือบฟลูออไรด์',
    acc_code: '1102050101.209',
  },
  {
    id: 20,
    service_name: 'clopidogerl',
    acc_code: '1102050101.216',
  },
  {
    id: 21,
    service_name: 'ยา SK MI',
    acc_code: '1102050101.216',
  },
  {
    id: 22,
    service_name: 'ยา SK',
    acc_code: '1102050101.216',
  },
  {
    id: 23,
    service_name: 'ย้ายสิทธิเกิดทันที',
    acc_code: '1102050101.216',
  },
  {
    id: 24,
    service_name: 'ยาสมุนไพร',
    acc_code: '1102050101.216',
  },
  {
    id: 25,
    service_name: 'วางแผนครอบครัว ยาฝัง',
    acc_code: '1102050101.209',
  },
]

const stm_file = 'opuc_cr'

const apiUrl = import.meta.env.VITE_API_URL // localhost
// const apiUrl = import.meta.env.VITE_API_SERVER_URL // server HICM

export default function ReportOpUcCrPage() {
  const [dataNull, setDataNull] = useState(dataNull0)
  const [dataNotNull, setDataNotNull] = useState(dataNotNull0)
  const [dataAll, setDataAll] = useState<string>('')
  const [dataByDate, setDataByDate] = useState<GridRowsProp>([])
  const [dataCaseNotNull, setDataCaseNotNull] = useState<GridRowsProp>([])
  const [dataCaseNull, setDataCaseNull] = useState<GridRowsProp>([])
  const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [accStName, setAccStName] = useState<string>('OP-OFC')
  const [getRep, setGetRep] = useState<number>(0)
  const [totalRepDebt, setTotalRepDebt] = useState<number>(0)
  const [getCRep, setGetCRep] = useState<number>(0)
  const [caseNoRep, setCaseNoRep] = useState<GridRowsProp>([])
  const [caseRepNotC, setCaseRepNotC] = useState<GridRowsProp>([])
  const [caseRepC, setCaseRepC] = useState<GridRowsProp>([])
  const [receipt, setReceipt] = useState<number>(0)
  const [title, setTitle] = useState<string>(opReport[0].service_name)
  const [accCode, setAccCode] = useState<string>(opReport[0].acc_code)
  const [stmFile, setStmFile] = useState<string>(stm_file)
  // const [repFile, setRepFile] = useState<string>(opReport[0].repFile)
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false)
  const [period, setPeriod] = useState<string>(opReport[0].service_name)
  const [lastestIpd, setLastestIpd] = useState<string>('')
  const actionRef1 = useRef<any>(null)

  const columns: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'vn', headerName: 'VN', width: 120 },
    { field: 'pid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'dateserv', headerName: 'วันที่รับบริการ', width: 110 },
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'charge', headerName: 'คงเหลือ', width: 110 },
    {
      field: 'customField', // Use a custom field name for the constant value
      headerName: 'ลูกหนี้สิทธิ์ย่อ',
      width: 120,
      renderCell: (params) => <strong>{accStName}</strong>, // Replace the field with a constant value
    },
    {
      field: 'acc_code',
      headerName: 'ลูกหนี้สิทธิ์',
      width: 300,
      renderCell: (params) => <strong>{accCode}</strong>,
    },
    // { field: 'pttype_code', headerName: 'ระหัสสิทธิ์', width: 60 },
    // { field: 'pttype_name', headerName: 'สิทธิ์', width: 300 },
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'total_summary', headerName: 'ได้รับชดเชย', width: 110 },
    { field: 'diff', headerName: 'ส่วนต่าง', width: 110 },
    { field: 'receipt_no', headerName: 'เลขใบเสร็จ', width: 110 },
  ]

  const columns_0: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'vn', headerName: 'VN', width: 120 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'visit_date', headerName: 'วันที่รับบริการ', width: 110 },
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'debt', headerName: 'คงเหลือ', width: 110 },
    {
      field: 'customField', // Use a custom field name for the constant value
      headerName: 'ลูกหนี้สิทธิ์ย่อ',
      width: 120,
      renderCell: (params) => <strong>{accStName}</strong>, // Replace the field with a constant value
    },
    { field: 'acc_name', headerName: 'ลูกหนี้สิทธิ์', width: 300 },
    { field: 'pttype_code', headerName: 'ระหัสสิทธิ์', width: 60 },
    { field: 'pttype_name', headerName: 'สิทธิ์', width: 300 },
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'error_code', headerName: 'error_code', width: 100 },
    { field: 'error_name', headerName: 'error', width: 280 },
    { field: 'remark_data', headerName: 'remark', width: 280 },
  ]

  const columns_1: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'vn', headerName: 'VN', width: 120 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'visit_date', headerName: 'วันที่รับบริการ', width: 110 },
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'charge', headerName: 'คงเหลือ', width: 110 },
    { field: 'total_paid', headerName: 'ชดเชย_rep', width: 110 },
    { field: 'rep_diff', headerName: 'ส่วนต่างชดเชย', width: 110 },
    { field: 'rest_debt', headerName: 'หนี้คงเหลือหลังชดเชย', width: 150 },
    {
      field: 'customField', // Use a custom field name for the constant value
      headerName: 'สิทธิ์',
      width: 120,
      renderCell: (params) => <strong>{accStName}</strong>, // Replace the field with a constant value
    },
    { field: 'acc_name', headerName: 'ลูกหนี้สิทธิ์', width: 300 },
    { field: 'pttype_code', headerName: 'ระหัสสิทธิ์', width: 60 },
    { field: 'pttype_name', headerName: 'สิทธิ์', width: 300 },
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'error_code', headerName: 'error_code', width: 100 },
  ]

  const columns2: GridColDef[] = [
    { field: 'visit_date', headerName: 'วันที่', width: 110 },
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
    setReceipt(0)
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    resetValue()

    console.log({ startDt, endDt })

    let startDate = startDt?.format('YYYY-MM-DD')
    let endDate = endDt?.format('YYYY-MM-DD')
    let serviceName = title

    setIsLoading(true)

    // lastetst case

    try {
      const response = await axios.get(`${apiUrl}/opuccr/opuccrlastest`)

      const options = {
        year: 'numeric', // Full year (e.g., "2566" for 2023)
        month: 'long', // Long month name (e.g., "June")
        day: 'numeric', // Numeric day (e.g., "30")
      }

      // Convert the date to Thai date format
      const thaiDateFormat = response.data.data[0].dateserv.toLocaleString()

      setLastestIpd(thaiDateFormat)

      console.log(lastestIpd)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Null Cases

    try {
      const responseCaseNull = await axios.post(`${apiUrl}/opuccr/opuccrnull`, {
        serviceName,
        startDate,
        endDate,
      })

      console.log(responseCaseNull.data.data)
      setDataCaseNull(responseCaseNull.data.data)
      console.log('dataCaseNull')
      console.log(dataCaseNull)

      let rep = 0
      for (const item of responseCaseNull.data.data) {
        if (item.repno !== null) {
          rep++
        }
      }

      let repc = 0
      for (const item of responseCaseNull.data.data) {
        if (item.repno !== null && item.error_code !== '-') {
          repc++
        }
      }

      setGetRep(rep) // มี rep แล้ว
      setGetCRep(repc) // ติด C

      const caseRepNotC = responseCaseNull.data.data.filter(
        (row: any) => row.repno !== null && row.error_code === '-'
      )
      const caseRepC = responseCaseNull.data.data.filter(
        (row: any) => row.repno !== null && row.error_code !== '-'
      )
      const caseNoRep = responseCaseNull.data.data.filter(
        (row: any) => row.repno === null
      )

      setCaseRepNotC(caseRepNotC)
      setCaseRepC(caseRepC)
      setCaseNoRep(caseNoRep)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Not Null Cases

    try {
      const responseCaseNotNull = await axios.post(
        `${apiUrl}/opuccr/opuccrnotnull`,
        { serviceName, startDate, endDate }
      )

      console.log(`${startDate}`)
      console.log(`${endDate}`)
      console.log(responseCaseNotNull.data.data)
      setDataCaseNotNull(responseCaseNotNull.data.data)
      console.log('dataCaseNotNull')
      console.log(dataCaseNotNull)

      let count = 0
      for (const item of responseCaseNotNull.data.data) {
        if (item.receipt_no !== null) {
          count++
        }
      }

      setReceipt(count)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Acc Not Null

    try {
      const responseNotNull = await axios.post(
        `${apiUrl}/opuccr/opuccraccnotnull`,
        { serviceName, startDate, endDate }
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
      const responseNull = await axios.post(`${apiUrl}/opuccr/opuccraccnull`, {
        serviceName,
        startDate,
        endDate,
      })
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
        `${apiUrl}/opuccr/opuccraccbydate`,
        { serviceName, startDate, endDate }
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

  return (
    <>
      {/* <Stack direction={'row'} gap={1} marginTop={2} paddingLeft={10}> */}
      <Box width={1500} marginLeft={6}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Card sx={{ padding: '10px' }}>
              <Typography
                fontSize={'1.2rem'}
                color={'rgba(26, 138, 212, 1)'}
                mb={1}
                mt={1.5}
                ml={1.5}
              >
                {`${title}`}
              </Typography>
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
                    {opReport.map((_period) => (
                      <MenuItem
                        key={_period.id}
                        onClick={() => {
                          setPeriod(_period.service_name)
                          setTitle(_period.service_name)
                          setAccCode(_period.acc_code)
                          setStmFile(stmFile)
                          setAccStName(_period.service_name)
                          setOpenMenuPeriod(false)
                          console.log(_period)
                        }}
                      >
                        {_period.service_name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                <CardActions>
                  <Box flexGrow={1} />
                  <Button
                    variant="contained"
                    onClick={onSubmit}
                    size="small"
                    color="primary"
                  >
                    Submit
                  </Button>
                </CardActions>
                <Stack direction={'row'} gap={2} mt={2}>
                  <Box flexGrow={1} />
                  <Typography>{`update : ${lastestIpd} `}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Card sx={{ padding: '25px' }}>
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
                      recieve={Number(dataNotNull.recieve).toLocaleString(
                        'en-US'
                      )}
                      percent={
                        (Number(dataNotNull.all_notnullcase) * 100) /
                        (Number(dataNull.all_nullcase) +
                          Number(dataNotNull.all_notnullcase))
                      }
                      caserep={(getRep - getCRep).toLocaleString('en-US')}
                      percentrep={
                        ((getRep - getCRep) * 100) /
                        (Number(dataNull.all_nullcase) +
                          Number(dataNotNull.all_notnullcase))
                      }
                      totalrepdebt={totalRepDebt.toLocaleString('en-US')}
                    />
                    <UnClaimCaseCard
                      cases={Number(dataNull.all_nullcase).toLocaleString(
                        'en-US'
                      )}
                      values={Number(dataNull.debit_null).toLocaleString(
                        'en-US'
                      )}
                      percent={
                        ((getCRep + Number(dataNull.all_nullcase) - getRep) *
                          100) /
                        (Number(dataNull.all_nullcase) +
                          Number(dataNotNull.all_notnullcase))
                      }
                      caserep={(getRep - getCRep).toLocaleString('en-US')}
                      caseerror={getCRep.toLocaleString('en-US')}
                      caseuncalim={(
                        Number(dataNull.all_nullcase) - getRep
                      ).toLocaleString('en-US')}
                      caseerrorunclaim={(
                        getCRep +
                        Number(dataNull.all_nullcase) -
                        getRep
                      ).toLocaleString('en-US')}
                    />
                  </Stack>
                  <Stack direction={'column'} gap={2} marginTop={2}>
                    <Stack direction={'row'}>
                      <Typography
                        // flexGrow={1}
                        fontWeight={'bold'}
                        color={'primary'}
                      >
                        ส่วนต่าง ค่ารักษา :{' '}
                        {dataNotNull.sum_diff === null
                          ? 0
                          : Number(dataNotNull.sum_diff).toLocaleString(
                              'en-US'
                            )}{' '}
                        บาท{'   '}
                      </Typography>
                      <Typography
                        flexGrow={1}
                        fontWeight={'bold'}
                        paddingLeft={2}
                      >
                        {'  '} ส่วนต่างค่ารักษาที่ต่ำกว่าชดเชย :{' '}
                        {dataNotNull.diffloss === null
                          ? 0
                          : Number(dataNotNull.diffloss).toLocaleString(
                              'en-US'
                            )}{' '}
                        บาท{'   '}
                      </Typography>
                      <Typography
                        color={'error'}
                        // flexGrow={1}
                        fontWeight={'bold'}
                      >
                        ส่วนต่างค่ารักษาที่สูงกว่าชดเชย :{' '}
                      </Typography>
                      <Typography
                        color={'error'}
                        mr={5}
                        fontWeight={'bold'}
                        marginLeft={1}
                      >
                        {dataNotNull.diffgain === null
                          ? 0
                          : Number(dataNotNull.diffgain).toLocaleString(
                              'en-US'
                            )}{' '}
                        บาท{'  '}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* </Stack> */}

      <Divider sx={{ marginY: '30px' }} />

      <Box sx={{ width: '100%', height: '500px', typography: 'body1' }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="Ip Ofc">
              <Tab label="บัญชีลูกหนี้ รอดำเนินการ" value="1" />
              <Tab label="บัญชีลูกหนี้ ส่งมี Rep รอ statement" value="2" />
              <Tab label="บัญชีลูกหนี้ ส่งมี Rep ติด C" value="3" />
              <Tab label="บัญชีลูกหนี้ ที่ดำเนินการเสร็จสิ้นแล้ว" value="4" />
              {/* <Tab label="สรุปการตัดหนี้รายวัน" value="5" /> */}
              {/* <Tab label="Chart " value="6" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack direction={'row'} gap={2}>
              <Typography
                fontStyle={'bold'}
                fontSize={'1.1rem'}
                color={'error'}
                mb={1}
              >
                ยังไม่ได้ดำเนินการ :{' '}
                {(dataNull.all_nullcase - getRep).toLocaleString('en-US')} ราย
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={caseNoRep}
                columns={columns_0}
                getRowId={(row) => row.hn + row.dateserv}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Stack direction={'row'} gap={2}>
              <Typography
                fontStyle={'bold'}
                fontSize={'1.1rem'}
                color={'#3c48ee'}
                mb={1}
              >
                ส่งแล้ว มี rep รอ statement :{' '}
                {(getRep - getCRep).toLocaleString('en-US')} ราย
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={caseRepNotC}
                columns={columns_1}
                getRowId={(row) => row.vn}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Stack direction={'row'} gap={2}>
              <Typography
                fontStyle={'bold'}
                fontSize={'1.1rem'}
                color={'#df3f3f'}
                mb={1}
              >
                ติด C ทั้งหมด : {getCRep} ราย
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={caseRepC}
                columns={columns_0}
                getRowId={(row) => row.vn}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value="4">
            <Stack direction={'row'} gap={2}>
              <Typography
                fontStyle={'bold'}
                fontSize={'1.1rem'}
                color={'#2e4ad8'}
                mb={1}
              >
                {' '}
                บัญชีลูกหนี้ ที่ดำเนินการเสร็จสิ้นแล้ว{' '}
              </Typography>
              <Typography
                fontStyle={'bold'}
                fontSize={'1.1rem'}
                color={'#2e4ad8'}
                mb={1}
              >
                จำนวน : {dataNotNull.all_notnullcase.toLocaleString('en-US')}{' '}
                ราย
              </Typography>
              <Typography
                fontStyle={'bold'}
                fontSize={'1.1rem'}
                color={'#098f51'}
                mb={1}
              >
                จำนวน ที่ออกใบเสร็จแล้ว : {receipt.toLocaleString('en-US')} ราย
              </Typography>
            </Stack>

            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseNotNull}
                columns={columns}
                getRowId={(row) => row.pid + row.dateserv}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          {/* <TabPanel value="5">
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataByDate}
                columns={columns2}
                getRowId={(row) => row.visit_date}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel> */}
          {/* <TabPanel value="6">
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
                 
                  ราย
                </Typography>
                <Typography variant="body2">
                  รอดำเนินการ :{' '}
                  
                </Typography>
                <Typography variant="body2">
                  สำเร็จ :{' '}
                
                </Typography>
              </Stack>
              <Box>
                {' '}
                <Pie data={dataChart} />
              </Box>
            </Box>
          </TabPanel> */}
        </TabContext>
      </Box>
    </>
  )
}
