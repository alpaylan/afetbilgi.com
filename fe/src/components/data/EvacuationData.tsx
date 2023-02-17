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

import { EvacuationDataNode } from '../../interfaces/TreeNode';
import Title from '../Title';

export default function EvacuationData({
  value,
}: {
  value: EvacuationDataNode;
}) {
  const { t } = useTranslation();
  const isMinWidth = useMediaQuery('(max-width:600px)');
  value.items.sort((a, b) => a.city.localeCompare(b.city));
  return (
    <Box>
      <Title
        title={t('data.evacuation_points.title', { city: value.items[0].city })}
      />
      {isMinWidth ? (
        <List>
          {value.items.map((item, i) => (
            <ListItem key={i}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <b>{t('city')}</b>
                  :
                  {item.city}
                  {' '}
                  /
                  {item.county}
                  <br />
                  <br />
                  <b>{t('location')}</b>
                  :
                  {item.address}
                  <br />
                  <br />
                  {
                    item.map_link
                      ? (
                        <>
                          <a href={item.map_link} target="_blank" rel="noreferrer">
                            {t('map')}
                          </a>
                          <br />
                        </>
                      )
                      : <></>
                  }

                  <Box sx={{ mt: 1 }}>
                    {item.contacts.map((contact, idx) => (
                      <div key={idx}>
                        <a
                          href={`tel:${contact
                            ?.replace(/^0/, '')
                            .replace(/ /g, '')}`}
                        >
                          {contact}
                        </a>
                      </div>
                    ))}
                  </Box>
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
                    {item.city}
                    {' '}
                    {item.county}
                  </TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    {
                      item.map_link
                        ? (
                          <>
                            <a href={item.map_link} target="_blank" rel="noreferrer">
                              {t('map')}
                            </a>
                          </>
                        )
                        : <></>
                    }
                  </TableCell>
                  <TableCell>
                    {item.contacts.map((contact, idx) => (
                      <div key={idx}>
                        <a
                          style={{ whiteSpace: 'nowrap' }}
                          href={`tel:${contact
                            ?.replace(/^0/, '')
                            .replace(/ /g, '')}`}
                        >
                          {contact}
                        </a>
                      </div>
                    ))}
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
