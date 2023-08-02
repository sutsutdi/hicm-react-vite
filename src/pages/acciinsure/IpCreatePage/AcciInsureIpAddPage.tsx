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
import { CameraAlt, LockOutlined } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'

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

const AcciInsureIpAddPage: React.FC<any> = () => {
  const [dateServ, setDateServ] = useState<Dayjs | null>(dayjs(new Date()))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    let servDate = dateServ?.format('YYYY-MM-DD')
    const dataReturn = {
      email: data.get('email'),
      password: data.get('password'),
      date_serv: servDate,
    }
    console.log(dataReturn)

    alert(JSON.stringify(dataReturn))
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      paddingLeft={8}
      paddingRight={8}
    >
      <Grid item xs={8} sm={6} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="date_serv"
              label="Service Date"
              id="date_serv"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
              <DatePicker
                label="Controlled picker"
                value={dateServ}
                onChange={(newValue) => setDateServ(newValue)}
              />
            </LocalizationProvider>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

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
        </Box>
      </Grid>
    </Box>
  )
}

export default AcciInsureIpAddPage
