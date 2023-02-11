import {
  Paper,
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  CardContent,
  Card,
  TableHead,
  TableBody,
  useMediaQuery,
  List,
  ListItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GasStationsDataNode } from '../../interfaces/TreeNode';

export default function GasStationsData({
  value,
}: {
  value: GasStationsDataNode;
}) {
  const { t } = useTranslation();
  const isMinWidth = useMediaQuery('(max-width:600px)');
  return (
    <Box>
      <h3>
        {t('data.gas_stations.title', {
          city: value.city,
          county: value.county,
        })}
      </h3>
      {isMinWidth ? (
        <List>
          {value.items.map((item) => (
            <ListItem>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <b>{t('city')}</b>: {value.city} / {value.county}
                  <br />
                  <br />
                  <b>{t('location')}</b>: {item.address}
                  <br />
                  <br />
                  <a href={item.maps_link} target='_blank'>
                    {t('map')}
                  </a>
                  <br />
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
                  <TableCell component='th' scope='row'>
                    {value.city} {value.county}
                  </TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    <a href={item.maps_link} target='_blank'>
                      {t('location')}
                    </a>
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
