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
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Typography } from '@mui/material'
import { DatePicker, LocalizationProvider, deDE } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/th'
import dayjs, { Dayjs } from 'dayjs'
import CardHeader1 from '../assets/amy.jpg';

type DataType = {
  startDate: Date
  endDate: Date
  firstName: string
  category: string
  aboutYou: string
}

// useEffect(() => {
//   const fecthData = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8085/dbipstofcacc`,
//         dataSubmit
//       )

//       // setData(jsonData)
//       console.log(response)
//     } catch (error) {
//       console.log('ERROR', error)
//     }
//   }
//   fecthData()
// }, [])

type FormValues = {
  startDate: Date
  endDate: Date
  firstName: string
  lastName: string
  email: string
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

export default function ReportPage() {
  const [dataResponse, setDataResponse] = useState(dataDbipofcacc)
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()))

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
  }
  


  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component={'img'}
            sx={{ height: 140 , width:'100%'}}
            image = {CardHeader1}
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
      <Card sx={{ width: 445, marginLeft: '50px' }}>
        <Box padding={4}>
          <Typography>ลูกหนี้ ผู้ป่วยใน จ่ายตรง</Typography>
        </Box>
        <Stack direction={'row'} gap={2} padding={'10px'}>
          <Typography>จำนวน : {dataResponse.all_case}</Typography>
          <Typography>รอดำเนินการ : {dataResponse.null_case}</Typography>
          <Typography>สำเร็จ : {dataResponse.notnull_case}</Typography>
        </Stack>

        <Stack direction={'column'} gap={2} padding={'10px'}>
          <Typography>
            ลูกหนี้ทั้งหมด : {dataResponse.debit_all.toLocaleString('en-US')}{' '}
            บาท
          </Typography>
          <Typography>
            ลูกหนี้ดำเนินการสำเร็จ :{' '}
            {dataResponse.debit_notnull.toLocaleString('en-US')} บาท
          </Typography>
          <Typography>
            ได้รับจัดสรร :{' '}
            {Number(dataResponse.recieve).toLocaleString('en-US')} บาท
          </Typography>
          <Typography>
            ส่วนต่าง : {dataResponse.sum_diff.toLocaleString('en-US')} บาท
          </Typography>
          <Divider />
          <Typography>
            ลูกหนี้คงเหลือ : รอดำเนินการ : {dataResponse.null_case} ราย จำนวน :{' '}
            {(
              dataResponse.debit_all -
              (Number(dataResponse.recieve) + dataResponse.sum_diff)
            ).toLocaleString('en-US')}
            {' : '}
            {dataResponse.debit_null.toLocaleString('en-US')}
            บาท
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}
