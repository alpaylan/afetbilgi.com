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

import { ArticleDataNode } from '../../interfaces/TreeNode';
import Title from '../Title';

/* const ArticleLanguageHelper = ({
  item,
  index,
}: {
  item: Article;
  index: number;
}) => {
  const { i18n } = useTranslation();
  if (i18n.language === Language.TR) {
    return (
      <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
        <b>{item.title}</b>
        <br /> <br />
        <b>Yazar: </b> {item.author}
        <br />
        <br />
        {item.url && (
          <>
            Yazıya{' '}
            <a href={item.url} target='_blank' rel='noreferrer'>
              bu linkten
            </a>{' '}
            ulaşabilirsiniz.
            <br />
          </>
        )}
        <br />
      </Paper>
    );
  }
  return (
    <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
      <b>{item.title}</b>
      <br /> <br />
      <b>Author: </b> {item.author}
      <br />
      <br />
      {item.url && (
        <>
          You can reach the article from{' '}
          <a href={item.url} target='_blank' rel='noreferrer'>
            this link
          </a>
          <br />
        </>
      )}
      <br />
    </Paper>
  );
}; */

export default function ArticleData({ value }: { value: ArticleDataNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <Title
        title={t('data.important_articles.title')}
        subtitle={t('data.important_articles.subtitle') || ''}
        severity="info"
      />
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('data.important_articles.article_title')}</TableCell>
              <TableCell>{t('data.important_articles.article_author')}</TableCell>
              <TableCell>{t('website')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.articles.map((item, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell>
                  {item.author}
                </TableCell>
                <TableCell>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {t('Link')}
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
