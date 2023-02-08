import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GatheringDataNode } from '../../interfaces/TreeNode';

export default function GatheringData({ value }: { value: GatheringDataNode }) {
  const { t } = useTranslation();
  return (
    <Box>
        <h3>{t('data.gathering.title', {
          city: value.city,
        })}</h3>
        <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
          <Table sx={{ maxWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Toplanma Alanı</TableCell>
                <TableCell>Konum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value.items.map((v) => (
                <TableRow
                  key={v}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {v}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`https://maps.google.com/?q=${v
                        .replace('(', '')
                        .replace(')', '')} ${value.city}`}
                    >
                      Konum
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
