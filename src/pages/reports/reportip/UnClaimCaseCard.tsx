import {
  Link,
  CardContent,
  Avatar,
  Box,
  Typography,
  ListItemAvatar,
  Card,
  ListItemText,
  ListItem,
  styled,
  circularProgressClasses,
  CircularProgress,
  Grid,
  Stack,
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'
import { theme } from '../../../theme/theme'
import { orange } from '@mui/material/colors'

const AvatarError = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.error.main};
        color: ${theme.palette.getContrastText(theme.colors.error.main)};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.error};
  `
)

type UnClaim = {
  cases: string
  values: string
  percent: number
}

function UnClaimCaseCard(props: UnClaim) {
  const { t }: { t: any } = useTranslation()

  return (
    <Card sx={{ padding: '10px' }}>
      {/* <CardContentWrapper> */}
      <Stack direction={'row'} gap={2}>
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="overline" color="text.primary">
            {t('รอดำเนินการ')}
          </Typography>

          <ListItem
            disableGutters
            sx={{
              my: 1,
            }}
            component="div"
          >
            <ListItemAvatar>
              <AvatarError variant="rounded">
                <BusinessTwoToneIcon fontSize="large" />
              </AvatarError>
            </ListItemAvatar>

            <ListItemText
              primary={props.cases}
              primaryTypographyProps={{
                variant: 'h1',
                sx: {
                  ml: 2,
                },
                noWrap: true,
              }}
            />
          </ListItem>
          <ListItem
            disableGutters
            sx={{
              mt: 0.5,
              mb: 1.5,
            }}
            component="div"
          >
            <ListItemText
              primary={
                <>
                  <Box fontWeight="bold" fontSize={16} color={'#e87d47'}>{t(`จำนวน ${props.values} บาท`)}</Box>
                  <Box
                    component="span"
                    sx={{
                      pl: 0.5,
                    }}
                  >
                    {t('')}
                  </Box>
                </>
              }
              primaryTypographyProps={{ variant: 'body2', noWrap: true }}
            />
          </ListItem>
        </Box>
        <Box mr={2} mt={5}>
          <Box display="inline-flex" position="relative">
            <Box
              sx={{
                animationDuration: '550ms',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  color: `${theme.colors.error.main}`,
                }}
                variant="h4"
              >
                {props.percent.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <CircularProgress
              variant="determinate"
              sx={{
                color: theme.colors.error.lighter,
              }}
              size={80}
              thickness={2}
              value={100}
            />
            <CircularProgress
              size={80}
              sx={{
                animationDuration: '550ms',
                position: 'absolute',
                left: 0,
                color: theme.colors.error.main,
                top: 0,
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
              }}
              thickness={2}
              variant="determinate"
              value={props.percent}
            />
          </Box>
        </Box>
      </Stack>
    </Card>
  )
}

export default UnClaimCaseCard
