import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FoodDistributionDataNode } from '../../interfaces/TreeNode';

/* const detailedInfo = (t: TFunction, phone_number?: string, url?: string) => {
  if (!phone_number && !url) {
    return null;
  }

  if (!url) {
    return (
      <div>
        <p>
          {t('data.food_distribution.detail_main')}
          <b>
            <a
              href={`tel:+90${phone_number
                ?.replace(/^0/, '')
                .replace(/ /g, '')}`}
            >
              {phone_number}
            </a>
          </b>
          {t('data.food_distribution.detail_call')}
        </p>
      </div>
    );
  }

  if (!phone_number) {
    return (
      <div>
        <p>
          {t('data.food_distribution.detail_main')}
          <a href={url} target='_blank' rel='noreferrer'>
            {t('data.food_distribution.detail_website')}
          </a>{' '}
          {t('data.food_distribution.detail_inspect')}
        </p>
      </div>
    );
  }

  return (
    <p>
      {t('data.food_distribution.detail_main')}
      <b>
        <a href={`tel:+90${phone_number.replace(/^0/, '').replace(/ /g, '')}`}>
          {phone_number}
        </a>
      </b>
      {t('data.food_distribution.detail_mix')}
      <a href={url} target='_blank' rel='noreferrer'>
        {t('data.food_distribution.detail_website')}
      </a>{' '}
      {t('data.food_distribution.detail_inspect')}
    </p>
  );
}; */

export default function FoodDistributionData({
  value,
}: {
  value: FoodDistributionDataNode;
}) {

  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>
        {t('data.food_distribution.title', {
          city: value.city,
          county: value.county,
        })}
      </h3>

      <p>
        <b>{t('data.food_distribution.subtitle')}</b>
      </p>
      <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('map')}</TableCell>
              <TableCell>{t('details')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>{item.name}</TableCell>
                <TableCell>
                  <a
                    href={item.maps_url}
                    target="_blank"
                  >
                    Konum
                  </a>
                </TableCell>
                <TableCell>
                <a
                    href={item.url}
                    target="_blank"
                  >
                    {t('details')}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
