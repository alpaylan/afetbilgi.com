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

import { GatheringDataNode } from '../../interfaces/TreeNode';
import Title from '../Title';

export default function GatheringData({ value }: { value: GatheringDataNode }) {
  const { t } = useTranslation();

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
                  {
                    item.url
                      ? (
                        <>
                          <a href={item.url} target="_blank" rel="noreferrer">
                            {t('map')}
                          </a>
                        </>
                      )
                      : <></>
                  }

                </TableCell>
                <TableCell>
                  {
                    item.source
                      ? (
                        <>
                          <a href={item.source} target="_blank" rel="noreferrer">
                            {t('source')}
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
