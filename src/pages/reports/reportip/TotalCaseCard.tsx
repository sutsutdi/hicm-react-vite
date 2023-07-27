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
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'

const AvatarError = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.primary.main};
        color: ${theme.palette.getContrastText(theme.colors.error.main)};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.primary};
  `
)

type Cases = {
  cases: string,
  values: string
}
function TotalCaseCard(props: Cases) {
  const { t }: { t: any } = useTranslation()

  return (
    <Card sx={{ padding: '10px' }}>
      {/* <CardContentWrapper> */}
      <Typography variant="overline" color="text.primary" fontSize={'1rem'}>
        {t('จำนวน ผู้ป่วยทั้งหมด')}
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
              <Box fontWeight="bold" fontSize={'1rem'}>
                {t(`จำนวน ${props.values} บาท`)}
              </Box>
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
      {/* </CardContentWrapper> */}
    </Card>
  )
}

export default TotalCaseCard
