import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';import { useTranslation } from 'react-i18next';
import { VetNode } from '../../interfaces/TreeNode';
import Title from '../Title';

/* const VetLanguageHelper = ({ item, index }: { item: Vet; index: number }) => {
  const { i18n } = useTranslation();
  if (i18n.language === Language.TR) {
    return (
      <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
        <b>{item.name}</b> zarar gören hayvanlarla ücretsiz ilgileneceğini
        bildirdi.
        <br />
        <p>
          <a href={item.maps_url} target='_blank' rel='noreferrer'>
            {item.address}
          </a>
          <br />
        </p>
        {item.phone_number && (
          <p>
            Detaylı bilgi için{' '}
            <b>
              <a
                href={`tel:+90${item.phone_number
                  .replace(/^0/, '')
                  .replace(/ /g, '')}`}
              >
                {item.phone_number}
              </a>
            </b>
            'i arayabilirsiniz.
          </p>
        )}
      </Paper>
    );
  }
  return (
    <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
      <b>{item.name}</b> stated that it will take care of the injured animals
      free of charge.
      <br />
      <p>
        <a href={item.maps_url} target='_blank' rel='noreferrer'>
          {item.address}
        </a>
        <br />
      </p>
      {item.phone_number && (
        <p>
          For detailed information you can call{' '}
          <b>
            <a
              href={`tel:+90${item.phone_number
                .replace(/^0/, '')
                .replace(/ /g, '')}`}
            >
              {item.phone_number}
            </a>
          </b>
        </p>
      )}
    </Paper>
  );
}; */

export default function VetData({ value }: { value: VetNode }) {
  const { t } = useTranslation();

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Title
        title={t('data.veterinary.title', {
          city: value.city,
        })}
        subtitle={t('data.veterinary.subtitle') || ""}
      />
      <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('map')}</TableCell>
              <TableCell>{t('contact')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.vets.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>{item.name}</TableCell>
                <TableCell>
                  {item.maps_link ? (
                    <a
                      href={item.maps_link}
                      target="_blank"
                    >
                      {item.address || '-'}
                    </a>
                    ) : (
                      '-'
                  )}
                </TableCell>
                <TableCell>
                {item.phone_number.map((phone, idx) => (
                        <div key={idx}>
                          <a
                            href={`tel:${phone
                              ?.replace(/^0/, '')
                              .replace(/ /g, '')}`}
                          >
                            {phone}
                          </a>
                        </div>
                      ))}
                </TableCell>      
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
