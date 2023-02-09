import { Paper, Box, TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContainerPharmacyDataNode } from '../../interfaces/TreeNode';

export default function ContainerPharmacyData({
  value,
}: {
  value: ContainerPharmacyDataNode;
}) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>{t('data.container_pharmacy')}</h3>
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('city')}</TableCell>
              <TableCell>{t('district')}</TableCell>
              <TableCell>{t('location')}</TableCell>
              <TableCell>{t('map')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map((item) => (
              <TableRow
                key={item.location + item.city}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>{item.city}</TableCell>
                <TableCell>{item.district}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <a
                    href={`https://maps.google.com/?q=${item.locationLink
                      .replace('(', '')
                      .replace(')', '')} ${item.city}`}
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
