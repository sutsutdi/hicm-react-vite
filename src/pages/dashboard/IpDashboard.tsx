import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/th'
import dayjs, { Dayjs } from 'dayjs'
import CardHeader1 from '../../assets/amy.jpg'

import TotalCaseCard from '../reports/reportip/TotalCaseCard'
import ClaimCaseCard from '../reports/reportip/ClaimCaseCard'
import UnClaimCaseCard from '../reports/reportip/UnClaimCaseCard'
import Loading from '../../components/Loading'

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

const apiUrl = import.meta.env.VITE_API_URL



export default function IpDashboardPage() {
  const [dataNull, setDataNull] = useState(dataNull0)
  const [dataOfcNotNull, setDataOfcNotNull] = useState(dataNotNull0)
  const [dataOfcNull, setDataOfcNull] = useState(dataNull0)
  const [dataUcsNotNull, setDataUcsNotNull] = useState(dataNotNull0)
  const [dataUcsNull, setDataUcsNull] = useState(dataNull0)
  const [allUcsData, setAllUcsData] = useState('')
  const [allOfcData, setAllOfcData] = useState('')

  const [startDt, setStartDt] = useState<Dayjs | null>(dayjs(new Date()))
  const [endDt, setEndDt] = useState<Dayjs | null>(dayjs(new Date()))

  const resetValue = () => {
    setDataOfcNull(dataNull0)
    setDataOfcNotNull(dataNotNull0)
    setDataUcsNull(dataNull0)
    setDataUcsNotNull(dataNotNull0)
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

    // Ofc Acc not null
    try {
      const responseNotNull = await axios.post(
        `${apiUrl}/ipofc/ipofcaccnotnull`,
        { startDate, endDate }
      )

      console.log(responseNotNull.data[0])

      setDataOfcNotNull(responseNotNull.data[0])

      console.log(dataOfcNotNull)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Ofc Acc null
    try {
      const responseNull = await axios.post(
        `${apiUrl}/ipofc/ipofcaccnull`,
        {
          startDate,
          endDate,
        }
      )
      // setData(jsonData)


      setDataOfcNull(responseNull.data[0])

    } catch (error) {
      console.log('ERROR', error)
    }

    // ucs Acc not null
    try {
      const responseNotNull = await axios.post(
        `${apiUrl}/ipuc/ipucaccnotnull`,
        { startDate, endDate }
      )

      console.log(responseNotNull.data[0])

      setDataUcsNotNull(responseNotNull.data[0])

      console.log(dataUcsNotNull)
    } catch (error) {
      console.log('ERROR', error)
    }

    // ucs Acc null
    try {
      const responseNull = await axios.post(`${apiUrl}/ipuc/ipucaccnull`, {
        startDate,
        endDate,
      })
      // setData(jsonData)

      console.log(responseNull.data[0])

      setDataUcsNull(responseNull.data[0])
    } catch (error) {
      console.log('ERROR', error)
    }

    setIsLoading(false)

    const allOfc =
      Number(dataOfcNull.all_nullcase) + Number(dataOfcNotNull.all_notnullcase)
    const allOfcCase = allOfc.toLocaleString('en-US')
    setAllOfcData(allOfcCase)

    const allUcs =
      Number(dataOfcNull.all_nullcase) + Number(dataOfcNotNull.all_notnullcase)
    const allUcsCase = allUcs.toLocaleString('en-US')
    setAllUcsData(allUcsCase)
  }




 

  return (
    <>
      <Stack direction={'column'} gap={1} marginTop={2} paddingLeft={10}>
        <Card sx={{ width: '40%' , marginLeft: '50px'}} >
          {/* <CardMedia
            component={'img'}
            sx={{ height: 140, width: '100%' }}
            image={CardHeader1}
            title="green iguana"
          /> */}

          <CardContent>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="th"
              // adapterLocale="th"
            >
              <Stack direction={'row'} gap={2}>
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
                  value={'Select Date'}
                  sx={{ fontWeight: 'bold' }}
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
            <Stack direction={'column'} gap={2}>
              <Typography variant='h4' >ผู้ป่วยใน จ่ายตรงกรมบัญชีกลาง</Typography>
              <Box>
                <Stack direction={'row'} gap={2}>
                  <TotalCaseCard
                    cases={(
                      Number(dataOfcNull.all_nullcase) +
                      Number(dataOfcNotNull.all_notnullcase)
                    ).toLocaleString('en-US')}
                    values={(
                      Number(dataOfcNull.debit_null) +
                      Number(dataOfcNotNull.debit_notnull)
                    ).toLocaleString('en-US')}
                  />
                  <ClaimCaseCard
                    cases={Number(
                      dataOfcNotNull.all_notnullcase
                    ).toLocaleString('en-US')}
                    values={Number(dataOfcNotNull.debit_notnull).toLocaleString(
                      'en-US'
                    )}
                    recieve={Number(dataOfcNotNull.recieve).toLocaleString(
                      'en-US'
                    )}
                    percent={
                      (Number(dataOfcNotNull.all_notnullcase) * 100) /
                      (Number(dataOfcNull.all_nullcase) +
                        Number(dataOfcNotNull.all_notnullcase))
                    }
                  />
                  <UnClaimCaseCard
                    cases={Number(dataOfcNull.all_nullcase).toLocaleString(
                      'en-US'
                    )}
                    values={Number(dataOfcNull.debit_null).toLocaleString(
                      'en-US'
                    )}
                    percent={
                      (Number(dataOfcNull.all_nullcase) * 100) /
                      (Number(dataOfcNull.all_nullcase) +
                        Number(dataOfcNotNull.all_notnullcase))
                    }
                  />
                </Stack>
              </Box>
              <Typography variant='h4' >ผู้ป่วยใน UCS</Typography>
              <Box>
                <Stack direction={'row'} gap={2}>
                  <TotalCaseCard
                    cases={(
                      Number(dataUcsNull.all_nullcase) +
                      Number(dataUcsNotNull.all_notnullcase)
                    ).toLocaleString('en-US')}
                    values={(
                      Number(dataUcsNull.debit_null) +
                      Number(dataUcsNotNull.debit_notnull)
                    ).toLocaleString('en-US')}
                  />
                  <ClaimCaseCard
                    cases={Number(
                      dataUcsNotNull.all_notnullcase
                    ).toLocaleString('en-US')}
                    values={Number(dataUcsNotNull.debit_notnull).toLocaleString(
                      'en-US'
                    )}
                    recieve={Number(dataUcsNotNull.recieve).toLocaleString(
                      'en-US'
                    )}
                    percent={
                      (Number(dataUcsNotNull.all_notnullcase) * 100) /
                      (Number(dataUcsNull.all_nullcase) +
                        Number(dataUcsNotNull.all_notnullcase))
                    }
                  />
                  <UnClaimCaseCard
                    cases={Number(dataUcsNull.all_nullcase).toLocaleString(
                      'en-US'
                    )}
                    values={Number(dataUcsNull.debit_null).toLocaleString(
                      'en-US'
                    )}
                    percent={
                      (Number(dataUcsNull.all_nullcase) * 100) /
                      (Number(dataUcsNull.all_nullcase) +
                        Number(dataUcsNotNull.all_notnullcase))
                    }
                  />
                </Stack>
              </Box>
            </Stack>
          )}
        </Card>
      </Stack>
    </>
  )
}
