import { Paper, Box, TableContainer, Table, TableRow, TableCell, CardContent, Card, TableHead, TableBody, useMediaQuery, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { EvacuationDataNode, TransportationDataNode } from "../../interfaces/TreeNode";

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
                <b>{t('description')}</b>: {item.description}<br/><br/>
                <b>{t('url')}</b> 
                <a href={item.url} target='_blank' rel='noreferrer'>
                  {t('Link')}
                </a>
                <b>{t('validationDate')}</b>: {item.validation_date}<br/><br/>
                <b>{t('validityDate')}</b>: {item.validity_date}<br/><br/>
              </CardContent>
            </Card>
          </ListItem>
        ))}
        </List> : <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('description')}</TableCell>
              <TableCell>{t('url')}</TableCell>
              <TableCell>{t('validationDate')}</TableCell>
              <TableCell>{t('validityDate')}</TableCell>
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
                  {item.validity_date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Box>
  );
}