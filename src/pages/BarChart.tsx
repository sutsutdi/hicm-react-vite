import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Box } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const data1 = [120, 78, 88, 92, 56, 112, 99, 79, 90, 162, 188]
const data2 = [117, 98, 78, 87, 76, 122, 89, 69, 93, 123, 166]

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: data1,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: data2,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export function BarChartPage() {
  return (
    <Box
      width={'100%'}
      height={500}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Bar options={options} data={data} />
    </Box>
  )
}
