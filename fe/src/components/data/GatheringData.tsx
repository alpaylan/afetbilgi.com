import { useTranslation } from 'react-i18next';
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

import { GatheringDataNode } from '../../interfaces/TreeNode';

export default function GatheringData({ value }: { value: GatheringDataNode }) {
  const { t } = useTranslation();

  return (
    <Box>
      <h3>
        {t('data.gathering.title', {
          city: value.city,
        })}
      </h3>

      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('address')}</TableCell>
              <TableCell>{t('website')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {item.name}
                </TableCell>
                <TableCell>
                  <a href={item.url} target='_blank' rel='noreferrer'>
                    {t('map')}
                  </a>
                </TableCell>
                <TableCell>
                  <a href={item.source} target='_blank' rel='noreferrer'>
                    {t('source')}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
