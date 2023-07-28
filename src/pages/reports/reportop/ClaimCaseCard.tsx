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
  Stack,
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { theme } from '../../../theme/theme'

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.primary.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
)

const AvatarWarning = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.warning.main};
        color: ${theme.palette.warning.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.warning};
  `
)

type Claim = {
  cases: string
  values: string
  recieve: string
  percent: number
  caserep: string
  percentrep:number
  totalrepdebt: string
}

function ClaimCaseCard(props: Claim) {
  const { t }: { t: any } = useTranslation()

  return (
    <Card sx={{ padding: '10px' }}>
      <Stack direction={'row'} gap={2}>
        <Box ml={2}>
          <Typography variant="overline" color="text.primary" fontSize={'1rem'}>
            {t('ดำเนินการเสร็จ มี Statement')}
          </Typography>

          <ListItem
            disableGutters
            sx={{
              my: 1,
            }}
            component="div"
          >
            <ListItemAvatar>
              <AvatarSuccess variant="rounded">
                <AssessmentTwoToneIcon fontSize="large" />
              </AvatarSuccess>
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
                  <Box fontWeight="bold" fontSize={'1rem'}>
                    {t(`ทั้งหมด ${props.values} บาท`)}
                  </Box>

                  <Box
                    component="div"
                    sx={{
                      pl: 0.5,
                      fontWeight: 'bold',
                      color: 'primary',
                      fontSize: '1rem'
                    }}
                  >
                    {t(`ชดเชย ${props.recieve}  บาท`)}
                  </Box>
                </>
              }
              primaryTypographyProps={{ variant: 'body2', noWrap: true }}
            />
          </ListItem>
        </Box>
        <Box mt={5} mr={2}>
          <Box
            display="inline-flex"
            position="relative"
           
          >
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
                  color: `${theme.colors.success.main}`,
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
                color: theme.colors.success.lighter,
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
                color: theme.colors.success.main,
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
      <Stack direction={'row'} gap={2}>
        <Box ml={2}>
          <Typography variant="overline" color="text.warning" fontSize={'1rem'}>
            {t('ดำเนินการเสร็จ มี RepNo รอ Statement')}
          </Typography>

          <ListItem
            disableGutters
            sx={{
              my: 1,
            }}
            component="div"
          >
            <ListItemAvatar>
              <AvatarWarning variant="rounded">
                <BeenhereIcon fontSize="large" />
              </AvatarWarning>
            </ListItemAvatar>

            <ListItemText
              primary={props.caserep}
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
                  <Box fontWeight="bold">
                    {t(`ทั้งหมด ${props.totalrepdebt} บาท`)}
                  </Box>

                  
                </>
              }
              primaryTypographyProps={{ variant: 'body2', noWrap: true }}
            />
          </ListItem>
        </Box>
        <Box mt={5} mr={2}>
          <Box
            display="inline-flex"
            position="relative"
           
          >
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
                  color: `${theme.colors.warning.main}`,
                }}
                variant="h4"
              >
                {props.percentrep.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <CircularProgress
              variant="determinate"
              sx={{
                color: theme.colors.warning.lighter,
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
                color: theme.colors.warning.main,
                top: 0,
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
              }}
              thickness={2}
              variant="determinate"
              value={props.percentrep}
            />
          </Box>
        </Box>
      </Stack>
    </Card>
  )
}

export default ClaimCaseCard
