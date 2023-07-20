import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
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
import CardHeader1 from '../../assets/amy.jpg'
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

import { green } from '@mui/material/colors'
import logo from '../../assets/logo.png'
import Loading from '../../components/Loading'
import { ChartBarPage } from '../../components/ChartBar'

const dataStmIpOfcacc = {
  repno: '',
  all_case: 0,
  debit_all: 0,
  recieve: '',
  sum_diff: 0,
}

const dataAcc0 = {
  repno: '',
  all_case: 0,
  debt: 0,
  recieve: '',
  sum_diff: 0,
  diffloss: 0,
  diffgain: 0,
}

const apiUrl = import.meta.env.VITE_API_URL

export default function StmIpOfcPage() {
  const [dataAcc, setDataAcc] = useState(dataAcc0)
  const [dataByDate, setDataByDate] = useState<GridRowsProp>([])
  const [dataCase, setDataCase] = useState<GridRowsProp>([])
  const [rep, setRep] = useState<string>('')

  const columns: GridColDef[] = [
    { field: 'repno', headerName: 'Rep_no', width: 100 },
    { field: 'hn', headerName: 'HN', width: 100 },
    { field: 'an', headerName: 'AN', width: 120 },
    { field: 'pid', headerName: 'CID', width: 150 },
    { field: 'fullname', headerName: 'ชื่อ นามสสกุล', width: 250 },
    { field: 'admitdate', headerName: 'วันที่ admit', width: 110 },
    { field: 'dchdate', headerName: 'วันที่ DC', width: 110 },
    { field: 'debt', headerName: 'ค่าใช้จ่าย', width: 110 },
    { field: 'adjrw', headerName: 'Adjrw', width: 110 },
    { field: 'recieve', headerName: 'ได้รับชดเชย', width: 110 },
    { field: 'diff', headerName: 'ส่วนต่าง', width: 110 },
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
    setDataAcc(dataAcc0)
    setDataByDate([])
    setDataCase([])
  }

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    resetValue()
    const data = new FormData(event.currentTarget)
    const repno = data.get('repno') as string | null

    console.log({ rep })

    setIsLoading(true)

    // Ofc Acc
    try {
      const responseAcc = await axios.post(`${apiUrl}/stmipofc/stmipofcacc`, {
        repno,
      })
      setDataAcc(responseAcc.data[0])
    } catch (error) {
      console.log('ERROR', error)
    }

    //  Cases

    try {
      const responseCase = await axios.post(`${apiUrl}/stmipofc/stmipofccase`, {
        repno,
      })

      setDataCase(responseCase.data)
    } catch (error) {
      console.log('ERROR', error)
    }

    // Account  by date
    try {
      const responseByDate = await axios.post(
        `${apiUrl}/stmipofc/stmipofcaccbydate`,
        {
          repno,
        }
      )

      setDataByDate(responseByDate.data)
    } catch (error) {
      console.log('ERROR', error)
    }

    setIsLoading(false)
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

  //  const for Bar chart

  const chartTitle = 'Statement จ่ายตรง IP'
  const chartLabels = ['ค่าใช้จ่าย/รับชดเชย']
  const data1 = [dataAcc.debt]
  const data2 = [Number(dataAcc.recieve)]
  const label1 = "ค่าใช้จ่าย"
  const label2 = "ชดเชย"

  return (
    <>
      <Stack direction={'row'} gap={3} marginTop={5} paddingLeft={25}>
        <Card sx={{ maxWidth: 345 }}>
          <Typography variant="h4" color={'rgba(26, 138, 212, 1)'} mb={1} mt={1}>
            Statement จ่ายตรง ผู้ป่วยใน{' '}
          </Typography>

          <CardMedia
            component={'img'}
            sx={{ height: 140, width: '100%' }}
            image={CardHeader1}
            title="green iguana"
          />

          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="repno"
                label="Rep No."
                name="repno"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ width: 645, marginLeft: '50px' }}>
          {isLoading ? (
            <Box sx={{ m: 1, position: 'relative' }} height={90}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: green[500],
                }}
              >
                Please Wait !!
              </Button>
              {isLoading && (
                <CircularProgress
                  size={54}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          ) : (
            <Box>
              <Stack direction={'row'} gap={2} padding={'10px'}>
                <Typography>จำนวน : </Typography>
                <Typography>
                  {Number(dataAcc.all_case).toLocaleString('en-US')} ราย
                </Typography>
              </Stack>
              <Stack direction={'column'} gap={2} padding={'10px'}>
                <Stack direction={'row'}>
                  {' '}
                  <Typography flexGrow={1}>ลูกหนี้ทั้งหมด : </Typography>
                  <Typography mr={5}>
                    {Number(dataAcc.debt).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    บาท
                  </Typography>
                </Stack>

                <Stack direction={'row'}>
                  <Typography flexGrow={1}>ได้รับชดเชย : </Typography>
                  <Typography mr={5}>
                    {Number(dataAcc.recieve).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    บาท
                  </Typography>
                </Stack>

                <Stack direction={'column'} gap={2}>
                  <Stack direction={'row'}>
                    <Typography flexGrow={1}>ส่วนต่าง ค่ารักษา : </Typography>
                    <Typography mr={5}>
                      {dataAcc.sum_diff === null
                        ? 0
                        : Number(dataAcc.sum_diff).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                      บาท
                    </Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <Typography flexGrow={1}>
                      ส่วนต่างค่ารักษาที่ต่ำกว่าชดเชย :{' '}
                    </Typography>
                    <Typography mr={5}>
                      {dataAcc.diffloss === null
                        ? 0
                        : Number(dataAcc.diffloss).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                      บาท
                    </Typography>
                  </Stack>

                  <Stack direction={'row'}>
                    <Typography color={'red'} flexGrow={1}>
                      ส่วนต่างค่ารักษาที่สูงกว่าชดเชย :{' '}
                    </Typography>
                    <Typography color={'red'} mr={5}>
                      {dataAcc.diffgain === null
                        ? 0
                        : Number(dataAcc.diffgain).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                      บาท
                    </Typography>
                  </Stack>
                </Stack>
                <Divider />
              </Stack>
            </Box>
          )}
        </Card>
      </Stack>

      <Divider sx={{ marginY: '30px' }} />

      <Box sx={{ width: '100%', height: '500px', typography: 'body1' }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="Stm Ip Ofc">
              <Tab label="จำนวน Case ทั้งหมด" value="1" />
              <Tab label="Chart " value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={dataCase}
                columns={columns}
                getRowId={(row) => row.an}
                slots={{
                  toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <ChartBarPage
              title={chartTitle}
              labels={chartLabels}
              data1={data1} data2={data2} label1={label1} label2={label2}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
