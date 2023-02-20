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
              <TableCell>{t('category')}</TableCell>
              <TableCell>{t('unit')}</TableCell>
              <TableCell>
                {t('telephone')}
&nbsp;(g)
              </TableCell>
              <TableCell>
                {t('details')}
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {value.phones.map(item => (
              <TableRow
                className={item.added_last_day ? 'new-data-item' : ''}
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {item.category}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.phones.map((phone, idx) => (
                    <div key={idx}>
                      <a
                        href={`tel:${phone
                          ?.replace(/^0/, '')
                          .replace(/ /g, '')}`}
                      >
                        {phone}
                      </a>
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {item.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
