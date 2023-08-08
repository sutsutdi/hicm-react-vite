import React, { useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  TextField,
  Card,
  CardActions,
  CardContent,
  Grid,
  Icon,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material'
import { CameraAlt, Label, LockOutlined } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios'

type AcciInsure = {
  id: number
  hn: string
  an: string
  date_serv: string
  time: string
  date_regist: string
  claim_no: string
  date_claim: string
  bill: string
  fullname: string
  claim: number
  recieve: number
  ins_company_id: number
  ins_company: string
  cid: string
  policy_number: string
  date_recieve: string
}

type Pt1 = {
  hn: string
  an: string
  cid: string
  fullname: string
  date_serv: string
  time_serv: string
}
const pt0 = {
  hn: '',
  an: '',
  cid: '',
  fullname: '',
  date_serv: '',
  time_serv: '',
}

const initialValues: AcciInsure = {
  id: 0,
  hn: '',
  an: '',
  date_serv: new Date().toLocaleDateString('th'),
  time: '',
  date_regist: new Date().toLocaleDateString('en-US'),
  claim_no: '',
  date_claim: new Date().toLocaleDateString('en-US'),
  bill: '',
  fullname: '',
  claim: 0,
  recieve: 0,
  ins_company_id: 0,
  ins_company: '',
  cid: '',
  policy_number: '',
  date_recieve: new Date().toLocaleDateString('th'),
}

const apiUrl = import.meta.env.VITE_API_HI_URL // localhost
// const apiUrl = import.meta.env.VITE_API_SERVER_URL // server HICM

const AcciInsureIpAddPage: React.FC<any> = () => {
  const [dateServ, setDateServ] = useState<Dayjs | null>(dayjs(new Date()))
  const [dateClaim, setDateClaim] = useState<Dayjs | null>(dayjs(new Date()))
  const [pt1, setPt1] = useState<Pt1>(pt0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // let servDate = dateServ?.format('YYYY-MM-DD')
    const dataReturn = {
      hn: data.get('hn'),
      fullname: data.get('fullname'),
      date_serv: data.get('date_serv'),
    }

    console.log(dataReturn)

    alert(JSON.stringify(dataReturn))
  }

  const handlePtSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const an1 = {
      an: data.get('an1'),
    }

    const ptFromAcci = async () => {
      try {
        const responsePt = await axios.post(`${apiUrl}/pt/ptbyan`, an1)

        setPt1(responsePt.data[0])
      } catch (error) {
        console.log('ERROR', error)
      }
    }

    ptFromAcci()
    console.log(pt1)
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      paddingLeft={8}
      paddingRight={8}
    >
      <Stack direction={'column'} gap={2}>
        <Card sx={{ width: '800px', height: '100px' }}>
          <Box
            component="form"
            display={'flex'}
            paddingX={2}
            gap={1}
            noValidate
            onSubmit={handlePtSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              id="an1"
              label="AN"
              name="an1"
              autoFocus
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleSubmit}
            >
              ค้นหา AN
            </Button>
          </Box>
        </Card>

        <Grid item xs={8} sm={6} md={4} component={Paper} elevation={6} square>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              my: 8,
              mx: 4,
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlined />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              display={'flex'}
              gap={1}                    
              sx={{ mt: 1 }}
            >
              <Card>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="hn"
                  name="hn"
                  label="HN"
                  value={pt1.hn}                  
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cid"
                  name="cid"
                  label="CID"
                  value={pt1.cid}                  
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="fullname"
                  label="fullname"
                  id="fullname"
                  value={pt1.fullname}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="date_serv"
                  label="Service Date"
                  id="date_serv"
                  value={pt1.date_serv}
                />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="th"
                >
                  <DatePicker
                    label="Controlled picker"
                    value={dateServ}
                    onChange={(newValue) => setDateServ(newValue)}
                  />
                </LocalizationProvider>
              </Card>
              <Card>
              {/* id: number
  hn: string
  an: string
  date_serv: string
  time: string
  date_regist: string
  claim_no: string
  date_claim: string
  bill: string
  fullname: string
  claim: number
  recieve: number
  ins_company_id: number
  ins_company: string
  cid: string
  policy_number: string
  date_recieve: string */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="claim_no"
                  name="claim_no"
                  label="Claim_No"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bill"
                  label="Bill"
                  id="bill"
                 
                />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="th"
                >
                  <DatePicker
                    label="Claim Date"
                    value={dateClaim}
                    onChange={(newValue) => setDateClaim(newValue)}
                  />
                </LocalizationProvider>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="claim"
                  label="เรียกเก็บ"
                  id="claim"
                 
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="recieve"
                  label="ได้รับทั้งหมด"
                  id="recieve"
                  
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="ins_company_id"
                  label="ระหัส บริษัทประกัน"
                  id="ins_company_id"
                  disabled
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="ins_company"
                  label="บริษัทประกัน"
                  id="ins_company"                
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="date_serv"
                  label="Service Date"
                  id="date_serv"
                  value={pt1.date_serv}
                  
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="date_serv"
                  label="Service Date"
                  id="date_serv"
                  value={pt1.date_serv}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="date_serv"
                  label="Service Date"
                  id="date_serv"
                  value={pt1.date_serv}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="date_serv"
                  label="Service Date"
                  id="date_serv"
                  value={pt1.date_serv}
                />
               
              </Card>
            
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={handleSubmit}
              >
                Sign In
              </Button>
          </Box>
        </Grid>
      </Stack>
    </Box>
  )
}

export default AcciInsureIpAddPage
