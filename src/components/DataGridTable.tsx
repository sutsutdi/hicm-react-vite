import { Box, Stack } from '@mui/material'
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarQuickFilter,
  } from '@mui/x-data-grid'

type Props = {
    rows: GridRowsProp[],
    columns: GridColDef[],
}

const DataGridTable = (props: Props) => {
  const {rows , columns  }   = props

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
  
// Generate unique identifiers for each row
const rowsWithIds = rows.map((row, index) => ({ ...row, id: index + 1 }));

// Define the getRowId function
const getRowId = (row: any) => row.id;


  return (
    <Box style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rowsWithIds}
        columns={columns}
        getRowId={getRowId}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </Box>
  )
}

export default DataGridTable
