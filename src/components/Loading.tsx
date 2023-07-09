import { Alert, Box, Button, CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'

type LoadingType = {
  isLoading: boolean
}
const Loading = ({ isLoading }: LoadingType) => {
  return (
    <>
   
        {isLoading && (
          <Box sx={{margin: '20px', padding:'20px' , position: 'relative' }} height={90}>
            <Alert severity="error">Please wait while loading data !</Alert>

            <CircularProgress
              size={54}
              sx={{
                color: green[500],
                position: 'relative',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          </Box>
        )}
     
    </>
  )
}

export default Loading
