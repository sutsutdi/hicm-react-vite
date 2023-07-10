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
    styled
  } from '@mui/material';
  
  import { useTranslation } from 'react-i18next';
  import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
  
  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.primary.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
  );
  
  type Claim = {
    cases: string,
    values: string,
    recieve: string
  }
  
  function ClaimCaseCard(props: Claim) {
    const { t }: { t: any } = useTranslation();
  
    return (
      <Card sx={{ padding: '10px' }}>
          <Typography variant="overline" color="text.primary">
            {t('ดำเนินการเสร็จ')}
          </Typography>
  
          <ListItem
            disableGutters
            sx={{
              my: 1
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
                  ml: 2
                },
                noWrap: true
              }}
            />
          </ListItem>
          <ListItem
            disableGutters
            sx={{
              mt: 0.5,
              mb: 1.5
            }}
            component="div"
          >
            <ListItemText
               primary={
                <>
                  <Box fontWeight="bold">
                    {t(`ทั้งหมด ${props.values} บาท` )}
                    
                  </Box>
                 
                  <Box
                    component="div"
                    sx={{
                      pl: 0.5,
                      fontWeight:"bold",
                      color: 'primary'
                    }}
                  >
                    {t(`ชดเชย ${props.recieve}  บาท` )}
                  </Box>
                </>
              }
              primaryTypographyProps={{ variant: 'body2', noWrap: true }}
            />
          </ListItem>
       
      </Card>
    );
  }
  
  export default ClaimCaseCard;
  