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
  Tab,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/th'
import dayjs, { Dayjs } from 'dayjs'
import CardHeader1 from '../../assets/anc.jpg'
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

import { Pie, Bar } from 'react-chartjs-2'
import Loading from '../../components/Loading'
import DataGridTable from '../../components/DataGridTable'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'

const apiUrl = import.meta.env.VITE_API_URL

export default function eclaimReportPage() {
  const [dataCase, setDataCase] = useState<GridRowsProp>([])

  const [dataTable, setDataTable] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const columns: GridColDef[] = [
    { field: 'item', headerName: 'รายการ', width: 250 },
    { field: 'claim', headerName: 'เรียกเก็บ', width: 200 },
    { field: 'receive2', headerName: 'ชดเชย', width: 200 },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(`${apiUrl}/eclaim/eclaimreport`)

        setDataCase(response.data.data)
        setDataTable(response.data.data)
      } catch (error) {
        console.log('ERROR', error)
      }
    }

    fetchData()
    console.log(dataCase)

    setIsLoading(false)
  }, [])

  const [valueTab, setValueTab] = useState('1')

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue)
  }


  // const dataChart = {
  //   labels: ['เรียกเก็บ', 'ชดเชย'],
  //   datasets: [
  //     {
  //       // label: ['เรียกเก็บ', 'ชดเชย'],
  //       data: [dataNull.all_nullcase, Number(dataNotNull.all_notnullcase)],
  //       backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
  //       borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
  //       borderWidth: 1,
  //     },
  //   ],
  // }

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginTop={5}
      >
        <Divider />

        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <Card sx={{ width: 645, marginLeft: '50px' }}>
            <Stack direction={'row'} gap={2} padding={'10px'}>
              <Typography variant="h6">Case PPFS ANC</Typography>
            </Stack>
            <Divider />
          </Card>
        )}
      </Box>

      <Divider sx={{ marginY: '30px' }} />

      <Box sx={{ width: '100%', height: '500px', typography: 'body1' }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Case ANC" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <DataGridTable rows={dataTable} columns={columns} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
