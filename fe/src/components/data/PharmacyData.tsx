import {
  Paper,
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PharmacyDataNode } from '../../interfaces/TreeNode';

export default function PharmacyData({
  value,
}: {
  value: PharmacyDataNode;
}) {

  const { t } = useTranslation();

  return (
    <Box>
      <h3>
        {t('data.pharmacy.title', {
          city: value.city,
          county: value.county,
        })}
      </h3>
      <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('address')} / {t('map')}</TableCell>
              <TableCell>{t('contact')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {item.name}
                </TableCell>
                <TableCell>
                  {
                    item.locationLink ?
                    <>
                    <a href={item.locationLink} target='_blank'>
                      {item.address}
                    </a>
                    </>
                    : item.address
                  }
                </TableCell>
                <TableCell>
                  <div>
                    <a
                      style={{ whiteSpace: 'nowrap' }}
                      href={`tel:${item.phone
                        ?.replace(/^0/, '')
                        .replace(/ /g, '')}`}
                    >
                      {item.phone}
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
