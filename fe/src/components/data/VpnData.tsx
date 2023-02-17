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

import { VpnDataNode } from '../../interfaces/TreeNode';

export default function VpnData({ value }: { value: VpnDataNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>{t('data.vpn.title')}</h3>
      <p>
        <b>{t('data.vpn.subtitle')}</b>
      </p>
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
