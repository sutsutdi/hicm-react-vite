import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
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
import CardHeader1 from '../../assets/amy.jpg'
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
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx' // for exporting to Excel
import { SystemUpdateAlt } from '@mui/icons-material'

const dataOp = {
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
// import { type } from './../../store/store';

type dataCaseOpProp = {
  hn: string
  an: string
  cid: string
  fullname: string
  visit_date: string
  visit_time: string
  l_stay: number
  cls: string
  charge: string
  paid: string
  debt: string
  prostasis_price: string
  icd9: string
  icd10: string
  pttype_code: string
  pttype_name: string
  acc_code: string
  acc_name: string
  acc_shortname: string
  hospcode: string
  hospmain: string
  remark: string
}

export default function DebitOpPage() {
  const [dataAccOp, setDataAccOp] = useState(dataOp)
  const [dataCaseOp, setDataCaseOp] = useState<dataCaseOpProp[]>([])
  const [dataCaseOpOfc, setDataCaseOpOfc] = useState<GridRowsProp>([])
  const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [lastestOpd, setLastestOpd] = useState<string>('')

  const columns: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'vn', headerName: 'VN', width: 120 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'visit_date', headerName: 'วันที่รักษา', width: 110 },
    { field: 'visit_time', headerName: 'เวลา', width: 110 },
       
    {
      field: 'charge',
      headerName: 'ค่าใช้จ่าย',
      width: 110,
      renderCell: (params) => {
        if (isNaN(params.value)) {
          return ''
        }

        const formattedNumber = Number(params.value).toLocaleString('en-US')

        return `${formattedNumber} ฿`
      },
    },
    {
      field: 'paid',
      headerName: 'ชำระ',
      width: 110,
      renderCell: (params) => {
        if (isNaN(params.value)) {
          return ''
        }

        const formattedNumber = Number(params.value).toLocaleString('en-US')

        return `${formattedNumber} ฿`
      },
    },
    {
      field: 'debt',
      headerName: 'คงเหลือ',
      width: 110,
      renderCell: (params) => {
        if (isNaN(params.value)) {
          return ''
        }

        const formattedNumber = Number(params.value).toLocaleString('en-US')

        return `${formattedNumber} ฿`
      },
    },
    {
      field: 'prostasis_price',
      headerName: 'instrument',
      width: 110,
      renderCell: (params) => {
        if (isNaN(params.value)) {
          return ''
        }

        const formattedNumber = Number(params.value).toLocaleString('en-US')

        return `${formattedNumber} ฿`
      },
    },
    { field: 'icd9', headerName: 'icd9', width: 180 },
    { field: 'icd10', headerName: 'icd10', width: 200 },
    { field: 'cln', headerName: 'Clinic', width: 200 },
    { field: 'pttype_code', headerName: 'pttype', width: 110 },
    { field: 'pttype_name', headerName: 'pttype_name', width: 200 },
    { field: 'acc_code', headerName: 'acc_code', width: 160 },
    { field: 'acc_name', headerName: 'acc_name', width: 280 },
    { field: 'acc_shortname', headerName: 'acc_st_name', width: 150 },
    { field: 'hospcode', headerName: 'hospcode', width: 110 },
    { field: 'hospmain', headerName: 'hospname', width: 260 },
    { field: 'remark', headerName: 'remark', width: 110 },
  ]

  const onSubmit = async () => {
    console.log({ startDt, endDt })

    let startDate = startDt?.format('YYYY-MM-DD')
    let endDate = endDt?.format('YYYY-MM-DD')

    // Op Acc
    // try {
    //   const responseOpAcc = await axios.post(`${apiUrl}/debitOp/Opacc`, {
    //     startDate,
    //     endDate,
    //   })

    //   // setData(jsonData)
    //   console.log(responseOpAcc.data[0])

    //   setDataAccOp(responseOpAcc.data[0])

    //   console.log(dataAccOp)
    // } catch (error) {
    //   console.log('ERROR', error)
    // }

    // lastetst case

    try {
      const response = await axios.get(`${apiUrl}/op/oplastest`)

      // Convert the date to Thai date format
      const thaiDateFormat = response.data.data[0].lastdate

      setLastestOpd(thaiDateFormat)

      // console.log(lastestOpd)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Op Case
    try {
      const responseOp = await axios.post(`${apiUrl}/debitop`, {
        startDate,
        endDate,
      })
      // setData(jsonData)

      console.log(responseOp.data.data)

      setDataCaseOp(responseOp.data.data)

      console.log(dataCaseOp)
    } catch (error) {
      console.log('ERROR', error)
    }

    // OFC Op Case
    //   try {
    //     const responseOpOfc = await axios.post(`${apiUrl}/debitOp/Opofccase`, {
    //       startDate,
    //       endDate,
    //     })
    //     // setData(jsonData)

    //     console.log(responseOpOfc.data)

    //     setDataCaseOpOfc(responseOpOfc.data)

    //     console.log(dataCaseOpOfc)
    //   } catch (error) {
    //     console.log('ERROR', error)
    //   }
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
    labels: ['จ่ายตรง', 'UC ในเขต', 'UC นอกเขต', 'ปกส ในเขต'],
    datasets: [
      {
        data: [
          dataAccOp.ofcCase,
          dataAccOp.ucsInCase,
          dataAccOp.ucsOutCase,
          dataAccOp.sssInCase,
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

  const exportCaseToExcel = () => {
    const formattedData = dataCaseOp.map((row) => ({
      hn: row.hn,
      cid: row.cid,
      fullname: row.fullname,
      visit_date: row.visit_date,
      visit_time: row.visit_time,      
      charge: parseFloat(row.charge),
      paid: parseFloat(row.paid),
      debt: parseFloat(row.debt),
      prostasis_price: parseFloat(row.prostasis_price),
      icd9: row.icd9,
      icd10: row.icd10,
      pttype_code: row.pttype_code,
      pttype_name: row.pttype_name,
      acc_code: row.acc_code,
      acc_name: row.acc_name,
      acc_shortname: row.acc_shortname,
      hospcode: row.hospcode,
      hospmain: row.hospmain,
      remark: row.remark,
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    })

    saveAs(new Blob([excelBuffer]), 'data.xlsx')
  }

  return (
    <>
      <Stack direction={'row'} gap={2} height={560} sx={{ paddingLeft: 60 }}>
        <Card sx={{ width: '500px' }}>
          <CardMedia
            component={'img'}
            sx={{ height: 200, width: '100%' }}
            image={CardHeader1}
            title="green iguana"
          />

          <CardContent>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
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
                  value={'บัญชีลูกหนี้ ผู้ป่วยนอก '}
                  focused
                />
              </Stack>
            </LocalizationProvider>

            <CardActions>
              <Box flexGrow={1} />
              <Stack mt={4}>
                <Button onClick={onSubmit} color="primary" variant="contained">
                  Submit
                </Button>
              </Stack>
            </CardActions>

            <Stack direction={'row'} gap={2} mt={2}>
              <Typography>{`last update : ${lastestOpd} `}</Typography>
            </Stack>
          </CardContent>
        </Card>

       
      </Stack>

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
            <Box>
              <Stack direction={'row'} gap={2} marginTop={0}>
                <Typography
                  fontStyle={'bold'}
                  fontSize={'1.1rem'}
                  color={'#2e4ad8'}
                  mb={1}
                >
                  export Exel
                </Typography>
                <IconButton
                  aria-label="export"
                  color="primary"
                  onClick={exportCaseToExcel}
                >
                  <SystemUpdateAlt />
                </IconButton>
              </Stack>
            </Box>
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseOp}
                columns={columns}
                getRowId={(row) => row.vn}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Stack direction={'row'} gap={2}>
              <Typography sx={{ marginBottom: '15px' }}>
                จ่ายตรง จำนวน :{' '}
                {dataAccOp.ofcCase === null
                  ? 0
                  : dataAccOp.ofcCase.toLocaleString('en-US')}{' '}
                ราย
              </Typography>
              <Typography>
                รวมค่าใช้จ่าย :{' '}
                {dataAccOp.ofcDebit === null
                  ? 0
                  : dataAccOp.ofcDebit.toLocaleString('en-US')}{' '}
                บาท
              </Typography>
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseOpOfc}
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
