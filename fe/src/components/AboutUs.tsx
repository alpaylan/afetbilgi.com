import { Container, Typography, Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <Box sx={{paddingTop: 6}}>
      <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h3" align="center" sx={{mt: 4}}>
            {t('page.about.title')}
        </Typography>
        <Paper sx={{p: 2, mt: 2}}>
            <Typography variant="subtitle1" align="center" sx={{mt: 4}}>
                {t('page.about.body.1')}
                <br /> <br />
                {t('page.about.body.2')}
            </Typography>
            <Typography sx={{mt: 4}} variant="subtitle1" align="center">
                <b>{t('contact')}:</b> <a href="mailto:info@afetbilgi.com">info@afetbilgi.com</a>
                <a href="https://github.com/alpaylan/afetbilgi.com">Afet Bilgi - Github</a>
            </Typography>
        </Paper>
      </Container>
    </Box>
  );
};
