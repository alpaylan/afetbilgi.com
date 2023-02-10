import { Paper, Box, TableContainer, Table, TableRow, TableCell, CardContent, Card, TableHead, TableBody, useMediaQuery, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { EvacuationDataNode } from "../../interfaces/TreeNode";

export default function EvacuationData({ value } : {value: EvacuationDataNode}) {
  const { t } = useTranslation();
  const isMinWidth = useMediaQuery('(max-width:600px)');
  value.items.sort((a, b) => a.city.localeCompare(b.city));
  return (
    <Box>
      <h3>{t('data.evacuation_points.title', { city: value.items[0].city })}</h3>
      {isMinWidth ? <List>
        {value.items.map((item) => (
          <ListItem>
            <Card sx={{width: "100%"}}>
              <CardContent>
                <b>{t('city')}</b>: {item.city} / {item.county}<br/><br/>
                <b>{t('location')}</b>: {item.address}<br/><br/>
                <a
                  href={item.map_link}
                  target="_blank"
                >
                  {t('map')}
                </a><br/>
                <Box sx={{ mt: 1 }}>
                  {item.contacts.map((contact) => (
                    <div>
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
        </List> : <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
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
                <TableCell component='th' scope='row'>{item.city} {item.county}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  <a
                    href={item.map_link}
                    target="_blank"
                  >
                    Konum
                  </a>
                </TableCell>
                <TableCell>
                  {item.contacts.map((contact) => (
                    <div>
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
      </TableContainer>}
    </Box>
  );
}