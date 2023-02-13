import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StemCellDataNode } from '../../interfaces/TreeNode';

export default function StemCellData({ value }: { value: StemCellDataNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>{t('data.stem_cell.title')}</h3>
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('region')}</TableCell>
              <TableCell>{t('address')}</TableCell>
              <TableCell>{t('telephone')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map((item) => (
              <TableRow
                key={item.address + item.city}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {item.area} / <b> {item.city}</b>
                </TableCell>
                <TableCell>
                  {
                    item.address ?
                    <>
                      <a href={item.address}>{t('location')}</a>
                    </>
                    : <></>
                  }
                </TableCell>
                <TableCell>
                  <a
                    href={`tel:+90${item.phone
                      .replace(/^0/, '')
                      .replace(/ /g, '')}`}
                  >
                    {item.phone}
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
