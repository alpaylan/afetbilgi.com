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

import { EmergencyAreasDataNode } from '../../interfaces/TreeNode';
import Title from '../Title';

export default function EmergencyAreasData({
  value,
}: {
  value: EmergencyAreasDataNode;
}) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Title
        title={t('data.emergency_areas.title', {
          city: value.city,
          county: value.county,
        })}
        severity='warning'
      />
      <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('map')}</TableCell>
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
                  {item.maps_url ? (
                    <>
                      <a href={item.maps_url} target='_blank' rel='noreferrer'>
                        {t('location')}
                      </a>
                    </>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
