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

import { TelephoneDataNode } from '../../interfaces/TreeNode';
import Title from '../Title';

export default function TelephoneData({ value }: { value: TelephoneDataNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <Title
        title={t('data.important_phone_numbers.title')}
      />
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('unit')}</TableCell>
              <TableCell>
                {t('telephone')}
&nbsp;(g)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.phones.map(item => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  <a
                    href={
                      item.is_plain
                        ? `tel:${item.phone_number}`
                        : `tel:+90${item.phone_number
                          .replace(/^0/, '')
                          .replace(/ /g, '')}`
                    }
                  >
                    {item.phone_number}
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
