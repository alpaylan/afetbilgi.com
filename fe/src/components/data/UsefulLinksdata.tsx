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
import { UsefulLinksDataNode } from '../../interfaces/TreeNode';
import { Language } from '../../utils/types';

// const UsefulLinksLanguageHelper = ({
//   item,
//   index,
// }: {
//   item: UsefulLink;
//   index: number;
// }) => {
//   const { i18n } = useTranslation();
//   if (i18n.language === Language.TR) {
//     return (
//       <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
//         <b>{item.name}</b>
//         <br />

//         {item.url && (
//           <>
//             Sayfaya{' '}
//             <a href={item.url} target='_blank' rel='noreferrer'>
//               bu linkten
//             </a>{' '}
//             ulaşabilirsiniz.
//             <br />
//           </>
//         )}

//         <br />
//       </Paper>
//     );
//   }
//   return (
//     <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
//       <b>{item.name}</b>
//       <br />

//       {item.url && (
//         <>
//           You can reach the page from{' '}
//           <a href={item.url} target='_blank' rel='noreferrer'>
//             this link
//           </a>
//           <br />
//         </>
//       )}

//       <br />
//     </Paper>
//   );
// };

export default function UsefulLinksData({
  value,
  noTitle,
}: {
  value: UsefulLinksDataNode;
  noTitle?: boolean;
}) {
  const { t, i18n} = useTranslation();

  
  return (
    <Box>
      {!noTitle && (
        <>
          <h3>{t('data.important_web_sites.title')}</h3>

          <p>
            <b>{t('data.important_web_sites.subtitle')}</b>
          </p>
        </>
      )}
      <TableContainer component={Paper} >
        <Table >
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
              <TableCell component='th' scope='row'>
                {item.name}
              </TableCell>
              <TableCell>
                <>
                  {i18n.language !== Language.TR &&  item.url && (
                    <>
                      You can reach the page from{' '}
                      <a href={item.url} target='_blank' rel='noreferrer'>
                        this link
                      </a>
                      <br />
                    </>
                  )}
                  {i18n.language === Language.TR && item.url && (
                    <>
                      Sayfaya{' '}
                      <a href={item.url} target='_blank' rel='noreferrer'>
                        bu linkten
                      </a>{' '}
                      ulaşabilirsiniz.
                      <br />
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
