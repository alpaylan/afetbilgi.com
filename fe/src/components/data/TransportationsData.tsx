import { Paper, Box, TableContainer, Table, TableRow, TableCell, CardContent, Card, TableHead, TableBody, useMediaQuery, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TransportationDataNode } from "../../interfaces/TreeNode";

export default function TransportationsData({ value } : {value: TransportationDataNode}) {
  const { t } = useTranslation();
  const isMinWidth = useMediaQuery('(max-width:600px)');

  return (
    <Box>
      <h3>{t('data.transportation.title')}</h3>
      {isMinWidth ? <List>
        {value.transportations.map((item) => (
          <ListItem>
            <Card sx={{width: "100%"}}>
              <CardContent>
                <b>{t('name')}</b>: {item.name}<br/><br/>
                {item.description}<br/><br/>
                <b><a href={item.url} target='_blank' rel='noreferrer'>
                  {t('website')}
                </a></b><br/><br/>
                <b>{t('data.transportation.validationDate')}</b>: {item.validation_date}<br/><br/>
                <b>{t('data.transportation.validityDate')}</b>: {t('data.transportation.validityDate.explanation', { date: item.validity_date })}
              </CardContent>
            </Card>
          </ListItem>
        ))}
        </List> : <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('details')}</TableCell>
              <TableCell>{t('website')}</TableCell>
              <TableCell>{t('data.transportation.validationDate')}</TableCell>
              <TableCell>{t('data.transportation.validityDate')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.transportations.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <a
                    href={item.url}
                    target="_blank"
                  >
                    Link
                  </a>
                </TableCell>
                <TableCell>
                  {item.validation_date}
                </TableCell>
                <TableCell>
                  {t('data.transportation.validityDate.explanation', { date: item.validity_date })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Box>
  );
}