import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SahraDataNode } from '../../interfaces/TreeNode';

/* const detailedInfo = (t: TFunction, phone_number?: string, url?: string) => {
  if (!phone_number && !url) {
    return null;
  }

  if (!url) {
    return (
      <div>
        <p>
          {t('data.health_services.detail_main')}
          <b>
            <a
              href={`tel:+90${phone_number
                ?.replace(/^0/, '')
                .replace(/ /g, '')}`}
            >
              {phone_number}
            </a>
          </b>
          {t('data.health_services.detail_call')}
        </p>
      </div>
    );
  }

  if (!phone_number) {
    return (
      <div>
        <p>
          {t('data.health_services.detail_main')}
          <a href={url} target='_blank' rel='noreferrer'>
            {t('data.health_services.detail_website')}
          </a>{' '}
          {t('data.health_services.detail_inspect')}
        </p>
      </div>
    );
  }

  return (
    <p>
      {t('data.health_services.detail_main')}
      <b>
        <a href={`tel:+90${phone_number.replace(/^0/, '').replace(/ /g, '')}`}>
          {phone_number}
        </a>
      </b>
      {t('data.health_services.detail_mix')}
      <a href={url} target='_blank' rel='noreferrer'>
        {t('data.health_services.detail_website')}
      </a>{' '}
      {t('data.health_services.detail_inspect')}
    </p>
  );
}; */

export default function SahraDistributionData({
  value,
}: {
  value: SahraDataNode;
}) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>
        {t('data.health_services.title', {
          city: value.city,
        })}
      </h3>
      <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('district')}</TableCell>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('map')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {item.district}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {item.name}
                </TableCell>
                <TableCell>
                  {
                    item.maps_url ?
                    <>
                    <a href={item.maps_url} target='_blank'>
                      {t('location')}
                    </a>
                    </>
                    : <></>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
