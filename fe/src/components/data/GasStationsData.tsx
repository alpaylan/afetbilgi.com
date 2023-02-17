import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { GasStationsDataNode } from '../../interfaces/TreeNode';
import Title from '../Title';

export default function GasStationsData({
  value,
}: {
  value: GasStationsDataNode;
}) {
  const { t } = useTranslation();
  const isMinWidth = useMediaQuery('(max-width:600px)');
  return (
    <Box>
      <Title
        title={t('data.gas_stations.title', {
          city: value.city,
          county: value.county,
        })}
      />
      {isMinWidth ? (
        <List>
          {value.items.map((item, i) => (
            <ListItem key={i}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <b>{t('city')}</b>
                  :
                  {value.city}
                  {' '}
                  /
                  {value.county}
                  <br />
                  <br />
                  <b>{t('location')}</b>
                  :
                  {item.address}
                  <br />
                  <br />
                  {
                    item.maps_link
                      ? (
                        <>
                          <a href={item.maps_link} target="_blank" rel="noreferrer">
                            {t('map')}
                          </a>
                          <br />
                        </>
                      )
                      : <></>
                  }

                  {item.telephone && (
                    <Box sx={{ mt: 1 }}>
                      <div>
                        <a
                          href={`tel:${item.telephone
                            ?.replace(/^0/, '')
                            .replace(/ /g, '')}`}
                        >
                          {item.telephone}
                        </a>
                      </div>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
          <Table sx={{ maxWidth: 650, minWidth: 100 }}>
            <TableHead>
              <TableRow>
                <TableCell>{t('city')}</TableCell>
                <TableCell>{t('location')}</TableCell>
                <TableCell>{t('map')}</TableCell>
                <TableCell>{t('contact')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value.items.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {value.city}
                    {' '}
                    {value.county}
                  </TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    {
                      item.maps_link
                        ? (
                          <>
                            <a href={item.maps_link} target="_blank" rel="noreferrer">
                              {t('location')}
                            </a>
                          </>
                        )
                        : <></>
                    }
                  </TableCell>
                  <TableCell>
                    <div>
                      <a
                        style={{ whiteSpace: 'nowrap' }}
                        href={`tel:${item.telephone
                          ?.replace(/^0/, '')
                          .replace(/ /g, '')}`}
                      >
                        {item.telephone}
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
