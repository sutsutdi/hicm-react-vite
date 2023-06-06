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
import { DataGrid, GridRowsProp, GridColDef  } from '@mui/x-data-grid';




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
  
    hn: string,
    an: string,
    cid: string,
    fname: string,
    admitdate: string,
    dchdate: string,
    charge: string,
    paid: string,
    outstanding: string,
    repno: string,
    total_summary: string,
    diff: number
  
}

type DataDabitNull = {
  
  hn: string,
  an: string,
  cid: string,
  fname: string,
  admitdate: string,
  dchdate: string,
  charge: string,
  paid: string,
  outstanding: string,
  repno: string,
  total_summary: string,
  diff: 0

}


export default function ReportPage() {
  const [dataResponse, setDataResponse] = useState(dataDbipofcacc)
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
    { field: 'charge', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'paid', headerName: 'ชำระ', width: 110 },
    { field: 'outstanding', headerName: 'คงเหลือ', width: 110 },
    { field: 'repno', headerName: 'RepNo', width: 110 },
    { field: 'total_summary', headerName: 'ได้รับจัดสรร', width: 110 },
    { field: 'diff', headerName: 'ส่วนต่าง', width: 110 },
  ];

  const onSubmit = async () => {
    console.log({ startDate, endDate })
   
    try {
      const response = await axios.post(`http://localhost:8085/dbipstofcacc`, {
        startDate,
        endDate,
      })

      // setData(jsonData)
      console.log(response.data[0])
      setDataResponse(response.data[0])
      console.log(dataResponse)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Ofc Acc null
    try {
      const responsenull = await axios.post(
        `http://localhost:8085/dbipstofcaccnull`,
        {
          startDate,
          endDate,
        }
      )

      // setData(jsonData)
      console.log(responsenull.data[0])
      setDataNull(responsenull.data[0])
      console.log(dataNull)
    } catch (error) {
      console.log('ERROR', error)
    }


    // Ofc Acc Not Null
    try {
      const responseNotNull = await axios.post(
        `http://localhost:8085/dbipstofcaccnotnull`,
        {
          startDate,
          endDate,
        }
      )
      console.log(responseNotNull.data[0])
      
      
      setDataNotNull(responseNotNull.data[0])
      console.log(dataNotNull)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Null Cases
    
    try {
      const responseCaseNull = await axios.post(
        `http://localhost:8085/dbipstofcnull`,
        {
          startDate,
          endDate,
        }
      )
      console.log(responseCaseNull.data)
      setDataCaseNull(responseCaseNull.data)
     
      console.log(dataCaseNull)
    } catch (error) {
      console.log('ERROR', error)
    }

     // Not Null Cases
    
     try {
      const responseCaseNotNull = await axios.post(
        `http://localhost:8085/dbipstofcnotnull`,
        {
          startDate,
          endDate,
        }
      )
      console.log(responseCaseNotNull.data)
      setDataCaseNotNull(responseCaseNotNull.data)
    
    } catch (error) {
      console.log('ERROR', error)
    }


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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
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
        <Box padding={4}>
          <Typography>ลูกหนี้ ผู้ป่วยใน จ่ายตรง</Typography>
        </Box>
        <Stack direction={'row'} gap={2} padding={'10px'}>
          <Typography>
            จำนวน : 
            {(dataNull.all_nullcase + dataNotNull.all_notnullcase).toLocaleString('en-US')}{' '}
          </Typography>
          <Typography>
            รอดำเนินการ : {dataNull.all_nullcase.toLocaleString('en-US')}
          </Typography>
          <Typography>
            สำเร็จ : {dataNotNull.all_notnullcase.toLocaleString('en-US')}
          </Typography>
        </Stack>

        <Stack direction={'column'} gap={2} padding={'10px'}>
          <Typography>
            ลูกหนี้ทั้งหมด :
            {(dataNull.debit_null + dataNotNull.debit_notnull).toLocaleString(
              'en-US'
            )} บาท
          </Typography>
          <Typography>
            ลูกหนี้ดำเนินการสำเร็จ :{' '}
            {dataNotNull.debit_notnull.toLocaleString('en-US')} บาท
          </Typography>
          <Typography>
            ได้รับจัดสรร : {Number(dataNotNull.recieve).toLocaleString('en-US')}{' '}
            บาท
          </Typography>
          <Typography>
            ส่วนต่าง : {dataNotNull.sum_diff.toLocaleString('en-US')} บาท
          </Typography>
          <Divider />
          <Typography>
            ลูกหนี้คงเหลือ : รอดำเนินการ : {dataNull.all_nullcase} ราย จำนวน :{' '}
            {dataNull.debit_null.toLocaleString('en-US')}
            บาท
          </Typography>
        </Stack>
      </Card>
    </Box> 
    <Divider sx={{marginY: '30px'}}/>
    <Typography> บัญชีลูกหนี้ ที่ยังดำเนินการเบิกไม่เสร็จ </Typography>
    <Box style={{ height: 300, width: '100%' }}>
      <DataGrid rows={dataCaseNull} columns={columns} getRowId={(row) => row.an} />
    </Box>
    <Divider sx={{marginY: '30px'}}/>
    <Typography> บัญชีลูกหนี้ ที่ดำเนินการเสร็จสิ้นแล้ว </Typography>
    <Box style={{ height: 300, width: '100%' }}>
      <DataGrid rows={dataCaseNotNull} columns={columns} getRowId={(row) => row.an} />
    </Box>
    </>
   
    
  )
}
