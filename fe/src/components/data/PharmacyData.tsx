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

import { PharmacyDataNode } from '../../interfaces/TreeNode';

export default function PharmacyData({
  value,
}: {
  value: PharmacyDataNode;
}) {
  const { t } = useTranslation();
  const isMinWidth = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h3>
        {t('data.pharmacy.title', {
          city: value.city,
          county: value.county,
        })}
      </h3>
      <p>
        <b>
          {t('data.pharmacy.subtitle', {
            date: value.date,
          })}
        </b>
      </p>
      {
        isMinWidth ? (
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
                      item.locationLink
                        ? (
                          <>
                            <a href={item.locationLink} target="_blank" rel="noreferrer">
                              {t('map')}
                            </a>
                            <br />
                          </>
                        )
                        : <></>
                    }

                    <Box sx={{ mt: 1 }}>
                      {item.phones.map((phone, idx) => (
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
                    </Box>
                    <br />
                    <b>{t('details')}</b>
                    :
                    {item.details}
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
                  <TableCell>{t('name')}</TableCell>
                  <TableCell>{t('address')}</TableCell>
                  <TableCell>{t('map')}</TableCell>
                  <TableCell>{t('contact')}</TableCell>
                  <TableCell>{t('details')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.items.map((item, index) => (
                  <TableRow
                    className={item.added_last_day ? 'new-data-item' : ''}
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>
                      { item.address }
                    </TableCell>
                    <TableCell>
                      {
                        item.locationLink
                          ? (
                            <>
                              <a href={item.locationLink} target="_blank" rel="noreferrer">
                                {t('map')}
                              </a>
                            </>
                          )
                          : <></>
                      }
                    </TableCell>
                    <TableCell>
                      {item.phones.map((phone, idx) => (
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
                    <TableCell>
                      {item.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </Box>
  );
}
