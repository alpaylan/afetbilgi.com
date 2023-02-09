import { Paper, Box, TableContainer, Table, TableRow, TableCell, CardContent, Card, TableHead, TableBody, useMediaQuery, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContainerPharmacyDataNode } from '../../interfaces/TreeNode';

export default function ContainerPharmacyData({
  value,
}: {
  value: ContainerPharmacyDataNode;
}) {
  const { t } = useTranslation();
  const isMinWidth = useMediaQuery('(max-width:600px)');
  value.items.sort((a, b) => a.city.localeCompare(b.city));
  return (
    <Box>
      <h3>{t('data.container_pharmacy')}</h3>
      {isMinWidth ? <List>
        {value.items.map((item) => (
          <ListItem>
            <Card sx={{width: "100%"}}>
              <CardContent>
                <b>{t('city')}</b>: {item.city}<br/><br/>
                <b>{t('district')}</b>: {item.district}<br/><br/>
                <b>{t('location')}</b>: {item.location}<br/><br/>
                <b>{t('map')}</b>: <a
                        href={item.locationLink}
                        target="_blank"
                      >
                        {t('map')}
                      </a><br/>
              </CardContent>
            </Card>
          </ListItem>
        ))}
        </List> : <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('city')}</TableCell>
              <TableCell>{t('district')}</TableCell>
              <TableCell>{t('location')}</TableCell>
              <TableCell>{t('map')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map((item) => (
              <TableRow
                key={item.location + item.city}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>{item.city}</TableCell>
                <TableCell>{item.district}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <a
                    href={item.locationLink}
                    target="_blank"
                  >
                    Konum
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Box>
  );
}
