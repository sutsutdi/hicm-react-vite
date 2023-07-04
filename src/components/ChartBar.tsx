import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar  } from 'react-chartjs-2'
import { Box } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type DatasetProps = ({ label: string; data: number; backgroundColor: string; } | { label: string; data: string; backgroundColor: string; })

type BarChartProps = {
  title: string
  labels: string[]
  data1: number[]
  data2: number[]
  label1: string
  label2: string
}


export function ChartBarPage(chartParams: BarChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: chartParams.title,
      },
    },
  }

  const labels = chartParams.labels
  const data1 = chartParams.data1
  const data2 = chartParams.data2
  const label1 = chartParams.label1
  const label2 = chartParams.label2
  
  const data = {
    labels,
    datasets: [
        {
          label: label1,
          data: data1,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: label2,
          data: data2,
          backgroundColor: 'rgba(192, 75, 180, 0.2)',
          borderColor: 'rgba(192, 75, 93, 1)',
          borderWidth: 1,
        },
      ],
  }


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
