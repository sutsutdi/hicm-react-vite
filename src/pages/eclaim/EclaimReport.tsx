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
  GridValueFormatterParams,
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
// const data1 = [120, 78, 88, 92, 56, 112, 99, 79, 90, 162, 188]
// const data2 = [117, 98, 78, 87, 76, 122, 89, 69, 93, 123, 166]

export default function eclaimReportPage() {
  const [dataCase, setDataCase] = useState<GridRowsProp>([])
  const [label, setLabel] = useState<string[]>([])
  const [data1, setData1] = useState<number[]>([])
  const [data2, setData2] = useState<number[]>([])
  const [dataTable, setDataTable] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const columns: GridColDef[] = [
    { field: 'item', headerName: 'รายการ', width: 250 },
    {
      field: 'claim',
      headerName: 'เรียกเก็บ',
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return ''
        }
        return params.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
       
      }
    },
    { field: 'receive', headerName: 'ชดเชย', width: 200 ,valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return ''
      }
      return params.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
     
    }},
  ]

  const data = {
    labels: label,
    datasets: [
      {
        label: 'เรียกเก็บ',
        data: data1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'ชดเชย',
        data: data2,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(`${apiUrl}/eclaim/eclaimreport`)

        setDataCase(response.data.data)
        setDataTable(response.data.data)

        console.log(response.data.data)
        const items: string[] = []
        const data1: number[] = []
        const data2: number[] = []

        response.data.data.forEach((item: any) => {
          items.push(item.item)
          data1.push(item.claim)
          data2.push(item.receive)
        })

        setLabel(items)
        setData1(data1)
        setData2(data2)

        console.log(label)
        console.log(data1)
        console.log(data2)
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
              <Typography variant="h6">Eclaim Report</Typography>
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
              <Tab label="Eclaim Items" value="1" />
              <Tab label="Chart" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <DataGridTable rows={dataTable} columns={columns} />
          </TabPanel>
          <TabPanel value="2">
            <Box
              width={'100%'}
              height={500}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Bar options={options} data={data} />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
