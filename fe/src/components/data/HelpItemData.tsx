import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { HelpItemNode } from '../../interfaces/TreeNode';
import Title from '../Title';

/* const HelpItemLanguageHelper = ({
  item,
  index,
}: {
  item: HelpItem;
  index: number;
}) => {
  const { i18n } = useTranslation();
  if (i18n.language === Language.TR) {
    return (
      <Paper key={`help-item-${index}`} sx={{ m: 2, p: 2 }}>
        <p>
          <b>{item.name}</b>'in{' '}
          {item.location && (
            <span>
              <b>{item.location}</b>'de
            </span>
          )}{' '}
          düzenlediği eşya yardımı kampanyasına yardım etmek için{' '}
          <a href={item.url} target='_blank' rel='noreferrer'>
            bu linke
          </a>{' '}
          tıklayınız.
        </p>
        {item.phone_number && (
          <p>
            Detaylı bilgi için{' '}
            <b>
              <a
                href={`tel:+90${item.phone_number
                  .replace(/^0/, '')
                  .replace(/ /g, '')}`}
              >
                {item.phone_number}
              </a>
            </b>
            'i arayabilirsiniz.
          </p>
        )}
      </Paper>
    );
  }
  return (
    <Paper key={`help-item-${index}`} sx={{ m: 2, p: 2 }}>
      <p>
        Click on{' '}
        <a href={item.url} target='_blank' rel='noreferrer'>
          this link
        </a>{' '}
        to help the item donation campaigns of <b>{item.name}</b>
        {item.location && (
          <span>
            {' '}
            in <b>{item.location}</b>
          </span>
        )}{' '}
      </p>
      {item.phone_number && (
        <p>
          For detailed information you can call{' '}
          <b>
            <a
              href={`tel:+90${item.phone_number
                .replace(/^0/, '')
                .replace(/ /g, '')}`}
            >
              {item.phone_number}
            </a>
          </b>
        </p>
      )}
    </Paper>
  );
} */

export default function HelpItemData({ value }: { value: HelpItemNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <Title
        title={t('data.help_item.title', {
          city: value.city,
        })}
      />
      <TableContainer component={Paper} sx={{ maxWidth: 650, minWidth: 100 }}>
        <Table sx={{ maxWidth: 650, minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('source')}</TableCell>
              <TableCell>{t('contact')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.items.map((item, index) => (
              <TableRow
                className={item.added_last_day ? 'new-data-item' : ''}
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{item.name}</TableCell>
                <TableCell>
                  {
                    item.url
                      ? (
                        <>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t('source')}
                          </a>
                        </>
                      )
                      : <></>
                  }

                </TableCell>
                <TableCell>
                  <a
                    href={`tel:+90${item.phone_number ? item.phone_number.replace(/^0/, '').replace(/ /g, '') : ''}`}
                    target="_blank"
                    rel="noreferrer"
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
