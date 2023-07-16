import {
  Box,
  Fab,
  IconButton,
  InputBase,
  InputBaseProps,
  Paper,
  Popper,
  Stack,
  Tab,
  Tooltip,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import 'dayjs/locale/th'
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridRenderCellParams,
  useGridApiContext,
  GridRenderEditCellParams,
  GridColTypeDef,
  GridCellEditStopReasons,
} from '@mui/x-data-grid'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { ModeEdit, Delete, LibraryAdd } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React from 'react'

type EclaimItems = {
  id: number
  service_name: string
  acc_code: string
  acc_name: string
  adp_code: string
  department: string
  fund: string
  right: string
  TMT: string
  'ICD-10': string
  'ICD-9': string
  service_type: string
}

const apiUrl = import.meta.env.VITE_API_URL

function isKeyboardEvent(event: any): event is React.KeyboardEvent {
  return !!event.key
}

export default function EclaimItemsPage() {
  const [eclaimItems, setEclaimItems] = useState<EclaimItems[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/eclaim/items`)
        console.log(response.data)

        setEclaimItems(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  function EditTextarea(props: GridRenderEditCellParams<any, string>) {
    const { id, field, value, colDef, hasFocus } = props
    const [valueState, setValueState] = React.useState(value)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>()
    const [inputRef, setInputRef] = React.useState<HTMLInputElement | null>(
      null
    )
    const apiRef = useGridApiContext()

    React.useLayoutEffect(() => {
      if (hasFocus && inputRef) {
        inputRef.focus()
      }
    }, [hasFocus, inputRef])

    const handleRef = React.useCallback((el: HTMLElement | null) => {
      setAnchorEl(el)
    }, [])

    const handleChange = React.useCallback<
      NonNullable<InputBaseProps['onChange']>
    >(
      (event) => {
        const newValue = event.target.value
        setValueState(newValue)
        apiRef.current.setEditCellValue(
          { id, field, value: newValue, debounceMs: 200 },
          event
        )
      },
      [apiRef, field, id]
    )

    return (
      <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
        <div
          ref={handleRef}
          style={{
            height: 1,
            width: colDef.computedWidth,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        {anchorEl && (
          <Popper open anchorEl={anchorEl} placement="bottom-start">
            <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth }}>
              <InputBase
                multiline
                rows={4}
                value={valueState}
                sx={{ textarea: { resize: 'both' }, width: '100%' }}
                onChange={handleChange}
                inputRef={(ref) => setInputRef(ref)}
              />
            </Paper>
          </Popper>
        )}
      </div>
    )
  }

  const multilineColumn: GridColTypeDef = {
    type: 'string',
    renderEditCell: (params) => <EditTextarea {...params} />,
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 30 },
    {
      field: 'service_name',
      headerName: 'Service Name',
      width: 200,
      editable: true,
    },
    { field: 'adp_code', headerName: 'Adp_code', width: 150, editable: true },
    { field: 'acc_code', headerName: 'Acc_code', width: 150, editable: true },
    { field: 'acc_name', headerName: 'Acc_name', width: 200, editable: true ,
    ...multilineColumn,},
    {
      field: 'department',
      headerName: 'Department',
      width: 110,
      editable: true,
    },
    { field: 'fund', headerName: 'กองทุน', width: 110, editable: true },
    { field: 'right', headerName: 'สิทธิ์', width: 200, editable: true ,
    ...multilineColumn,},
    { field: 'TMT', headerName: 'TMT', width: 200, editable: true ,
    ...multilineColumn,},
    { field: 'ICD-10', headerName: 'ICD-10', width: 200, editable: true,
    ...multilineColumn,},
    { field: 'ICD-9', headerName: 'ICD-9', width: 200, editable: true ,
    ...multilineColumn,},
    {
      field: 'service_type',
      headerName: 'service_type',
      width: 50,
      editable: true,
    },
    {
      field: '.',
      headerName: 'Action',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction={'row'}>
          <IconButton aria-label="edit" size="large" color="primary">
            <ModeEdit />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            color="error"
            onClick={() => alert(JSON.stringify(row))}
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ]

  const [isLoading, setIsLoading] = useState(false)

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <Stack direction={'row'} gap={3} mt={2} mb={3} ml={2} mr={4}>
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

        <Tooltip title="Add Product">
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            component={Link}
            to={'/stock/create'}
            sx={{ marginTop: '5px', marginRight: '25px' }}
          >
            <LibraryAdd />
          </Fab>
        </Tooltip>
      </GridToolbarContainer>
    )
  }

  const [valueTab, setValueTab] = useState('1')

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue)
  }

  return (
    <>
      <Box sx={{ width: '100%', height: '500px', typography: 'body1' }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="Ip Ofc">
              <Tab label="Eclaim Items" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={eclaimItems}
                columns={columns}
                getRowId={(row) => row.id}
                slots={{
                  toolbar: CustomToolbar,
                }}
                onCellEditStop={(params, event) => {
                  if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
                    return
                  }
                  if (
                    isKeyboardEvent(event) &&
                    !event.ctrlKey &&
                    !event.metaKey
                  ) {
                    event.defaultMuiPrevented = true
                  }
                }}
              />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
