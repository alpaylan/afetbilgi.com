import { Container, Typography, Box, Paper, Stack, Divider, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <Box>
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
              <br />
          </Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{
              mt: 4,
              justifyContent: 'center',
            }}
          >
            <Link href="https://github.com/alpaylan/afetbilgi.com" target="_blank" rel="noreferrer">
              <Avatar sx={{ width: 40, height: 40 }} src="/icons/github-icon.svg" />
            </Link>
            <Link href="https://www.instagram.com/afetbilgicom" target="_blank" rel="noreferrer">
              <Avatar sx={{ width: 40, height: 40 }} src="/icons/instagram-icon.svg" />
            </Link>
            <Link href="https://twitter.com/afetbilgicom" target="_blank" rel="noreferrer">
              <Avatar sx={{ width: 40, height: 40 }} src="/icons/twitter-icon.svg" />
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
