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

import { EmergencyGatheringDataNode } from '../../interfaces/TreeNode';
import Title from '../Title';

export default function EmergencyGatheringData({ value }: { value: EmergencyGatheringDataNode }) {
  const { t } = useTranslation();

  const items = value.items.slice().sort((a, b) => {
    if (a.maps_link && !b.maps_link) return -1;
    return 0;
  });

  return (
    <Box>
      <Title
        title={t('data.gathering.title', {
          city: value.city,
        })}
      />

      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('address')}</TableCell>
              <TableCell>{t('map')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.address}
                </TableCell>
                <TableCell>
                  {
                    item.maps_link
                      ? (
                        <>
                          <a href={item.maps_link} target="_blank" rel="noreferrer">
                            {t('map')}
                          </a>
                        </>
                      )
                      : <></>
                  }

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
