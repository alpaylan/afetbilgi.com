import {
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { UsefulLinksDataNode } from '../../interfaces/TreeNode';

export default function DigitalPlatformData({
  value,
  noTitle,
}: {
  value: UsefulLinksDataNode;
  noTitle?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Box>
      {!noTitle && (
        <>
          <Typography variant="h5">
            {t('data.digital_platforms.title')}
          </Typography>
          <Alert severity="info" sx={{ mt: 2, mb: 2, textAlign: 'start' }}>
            {t('data.digital_platforms.subtitle')}
          </Alert>
        </>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('details')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.usefulLinks.map((item, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  <>
                    {item.url && (
                      <>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          Link
                        </a>
                      </>
                    )}
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
