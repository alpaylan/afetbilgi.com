import React from "react";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  Box, Button, Dialog, DialogContent, DialogTitle, Divider, TextField, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import cities from '../utils/locales/il_translate.json'

const upperCities = [
  "Kahramanmaraş",
  "Gaziantep",
  "Malatya",
  "Diyarbakır",
  "Kilis",
  "Şanlıurfa",
  "Adıyaman",
  "Hatay",
  "Osmaniye",
  "Adana"
]


export default function PDFDownloadDialog({open, onClose} : {open: boolean, onClose: () => void}) {
  const {i18n, t} = useTranslation();
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);
  
  const citiesDict = Object.entries(cities).reduce((acc, [key, value]) => {
    acc[key] = Object.entries(value).reduce((acc2, [key2, value2]) => {
      // eslint-disable-next-line no-param-reassign
      acc2[key2] = value2;
      return acc2;
    }, {} as Record<string, string>);
    return acc;
  }, {} as Record<string, Record<string, string>>);

  const handleDownload = () => {
    if (selectedCity) {
      const index = Object.keys(citiesDict).findIndex((key) => citiesDict[key][i18n.language] === selectedCity);
      const city = Object.keys(citiesDict)[index];
      window.open(`https://pdf.afetbilgi.com/${i18n.language}/${city}.pdf`, '_blank');
    }
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
    >
      <Box sx={{
        marginTop: 1.5,
        marginRight: 1.5,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      >
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </Box>
      <DialogTitle sx={{ textAlign: 'center' }}> {t('data.pdf.title')} </DialogTitle>
      <DialogContent>
        <Box>
          <div>
            <Box sx={{ textAlign: 'center', m: 2 }}>
              <Typography variant="body1" component="span" sx={{ mb: 1 }}>
                {t('data.pdf.description')}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Button variant="contained" color="success" onClick={() => {
                  window.open(`https://pdf.afetbilgi.com/${i18n.language}`, '_blank');
                }}>
                  <Typography variant="button" component="span">
                    {t('data.pdf.all')}
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 1 }}>
                {upperCities.map((city) => (
                  <Button
                    key={city}
                    variant="contained"
                    color="primary"
                    sx={{ width: 115, m: 1 }}
                    size="small"
                    onClick={() => {
                      window.open(`https://pdf.afetbilgi.com/${i18n.language}/${city}.pdf`, '_blank');
                    }}
                  >
                    <Typography variant="button" component="span" fontSize={12}>
                      {city}
                    </Typography>
                  </Button>
                ))}
              </Box>
              <Divider sx={{ m: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt : 1 }}>
                <Typography variant="h6" component="span">
                  {t('data.pdf.or')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt : 1 }}>
                <Typography component="span">
                  {t('data.pdf.select')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', m: 1}}>
                <Autocomplete
                  id="combo-box-demo"
                  options={Object.keys(citiesDict).map((key) => citiesDict[key][i18n.language])}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField {...params} label={t('data.pdf.citySelect')} />}
                  sx={{ width: 300, alignSelf: 'center', mt: 1 }}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSelectedCity(newValue);
                    } else {
                      setSelectedCity(null);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center', m: 2 }}>
              <Button variant="contained" color="primary" onClick={handleDownload} disabled={!selectedCity}>
                {t('data.pdf.download')}
              </Button>
            </Box>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}