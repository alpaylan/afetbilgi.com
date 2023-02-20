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

import { CityAccommodationNode } from '../../interfaces/TreeNode';
import Title from '../Title';

export default function CityAccommodation({
  value,
}: {
  value: CityAccommodationNode;
}) {
  const { t } = useTranslation();
  const items = value.items.slice().sort((a, b) => {
    if (a.address && !b.address) return -1;
    return 0;
  });

  return (
    <Box>
      <Title
        title={t('data.city_accommodation.title', {
          city: value.city,
        })}
        subtitle={t('data.city_accommodation.subtitle') || ''}
      />
      {/* // TO-DO: https://react.i18next.com/latest/trans-component */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('location')}</TableCell>
              <TableCell>{t('map')}</TableCell>
              <TableCell>{t('details')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  {
                    item.address
                      ? (
                        <>
                          <a href={item.address}>{t('location')}</a>
                        </>
                      )
                      : <></>
                  }

                </TableCell>
                <TableCell>
                  {item.url ? (
                    <>
                      {t('data.city_accommodation.link_explanation_p1')}
                      {' '}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {t('data.city_accommodation.link_explanation_p2')}
                        .
                      </a>
                      {' '}

                      <br />
                    </>
                  ) : <></>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
