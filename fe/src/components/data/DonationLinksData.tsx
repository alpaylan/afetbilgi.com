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

import { DonationLinksDataNode } from '../../interfaces/TreeNode';
import Title from '../Title';

export default function DonationLinksData({ value }: { value: DonationLinksDataNode }) {
  const { t } = useTranslation();

  return (
    <Box>
      <Title
        title={t('data.donation.title')}
        subtitle={t('data.donation.subtitle') || ''}
        severity="success"
      />
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('website')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map(item => (
              <TableRow
                className={item.added_last_day ? 'new-data-item' : ''}
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  <a href={item.url}>Link</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
