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
// import { type } from './../../store/store';

type dataCaseIpProp = {
  hn: string
  an: string
  cid: string
  fullname: string
  admitdate1: string
  dchdate1: string
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

export default function DebitIpPage() {
  const [dataAccIp, setDataAccIp] = useState(dataIp)
  const [dataCaseIp, setDataCaseIp] = useState<dataCaseIpProp[]>([])
  const [dataCaseIpOfc, setDataCaseIpOfc] = useState<GridRowsProp>([])
  const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [lastestIpd, setLastestIpd] = useState<string>('')

  const columns: GridColDef[] = [
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'an', headerName: 'AN', width: 120 },
    { field: 'cid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 150 },
    { field: 'admitdate1', headerName: 'วันที่ admit', width: 110 },
    { field: 'dchdate1', headerName: 'วันที่ DC', width: 110 },
    { field: 'l_stay', headerName: 'วันนอน', width: 70 },
    { field: 'cln', headerName: 'แผนก', width: 130 },
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

    // IP Acc
    // try {
    //   const responseIpAcc = await axios.post(`${apiUrl}/debitip/ipacc`, {
    //     startDate,
    //     endDate,
    //   })

    //   // setData(jsonData)
    //   console.log(responseIpAcc.data[0])

    //   setDataAccIp(responseIpAcc.data[0])

    //   console.log(dataAccIp)
    // } catch (error) {
    //   console.log('ERROR', error)
    // }

    // lastetst case

    try {
      const response = await axios.get(`${apiUrl}/ip/iplastest`)

      // Convert the date to Thai date format
      const thaiDateFormat = response.data.data[0].dchdate1

      setLastestIpd(thaiDateFormat)

      // console.log(lastestIpd)
    } catch (error) {
      console.log('ERROR', error)
    }

    // IP Case
    try {
      const responseIp = await axios.post(`${apiUrl}/debitip`, {
        startDate,
        endDate,
      })
      // setData(jsonData)

      console.log(responseIp.data.data)

      setDataCaseIp(responseIp.data.data)

      console.log(dataCaseIp)
    } catch (error) {
      console.log('ERROR', error)
    }

    // OFC IP Case
    //   try {
    //     const responseIpOfc = await axios.post(`${apiUrl}/debitip/ipofccase`, {
    //       startDate,
    //       endDate,
    //     })
    //     // setData(jsonData)

    //     console.log(responseIpOfc.data)

    //     setDataCaseIpOfc(responseIpOfc.data)

    //     console.log(dataCaseIpOfc)
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
          dataAccIp.ofcCase,
          dataAccIp.ucsInCase,
          dataAccIp.ucsOutCase,
          dataAccIp.sssInCase,
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
    const formattedData = dataCaseIp.map((row) => ({
      hn: row.hn,
      an: row.an,
      cid: row.cid,
      fullname: row.fullname,
      admitdate: row.admitdate1,
      dchdate: row.dchdate1,
      l_stay: row.l_stay,
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
                  value={'บัญชีลูกหนี้ ผู้ป่วยใน '}
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
              <Typography>{`last update : ${lastestIpd} `}</Typography>
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
                rows={dataCaseIp}
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
            </Stack>{' '}
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCaseIpOfc}
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
