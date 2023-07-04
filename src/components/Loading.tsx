import { Box, Button, CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'

const Loading = (isLoading: boolean) => {
  return (
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
  )
}

export default Loading
