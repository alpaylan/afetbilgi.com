import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CityAccommodationNode } from '../../interfaces/TreeNode';

export default function CityAccommodation({
  value,
}: {
  value: CityAccommodationNode;
}) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>
        {t('data.city_accommodation.title', {
          city: value.city,
        })}
      </h3>
      <p>
        <b>{t('data.city_accommodation.subtitle')}</b>
      </p>
      {/* // TO-DO: https://react.i18next.com/latest/trans-component */}
      <TableContainer component={Paper} >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>{t('location')}</TableCell>
              <TableCell>{t('map')}</TableCell>
              <TableCell>{t('details')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {value.items.map((item, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {item.name}
              </TableCell>
              <TableCell>
                <a href={item.address}>{t('location')}</a>
              </TableCell>
              <TableCell>
                {item.url ? <>
                  {t('data.city_accommodation.link_explanation_p1')}{' '}
                  <a href={item.url} target='_blank' rel='noreferrer'>
                  {t('data.city_accommodation.link_explanation_p2')}.
                  </a>{' '}

                  <br />
                </> : <></>}
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
