import { Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Article, ArticleDataNode } from '../../interfaces/TreeNode';
import { Language } from '../../utils/types';

const ArticleLanguageHelper = ({
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
};

export default function ArticleData({ value }: { value: ArticleDataNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>{t('data.important_articles.title')}</h3>

      <p>
        <b>{t('data.important_articles.subtitle')}</b>
      </p>

      {value.articles.map((item, i) => (
        <ArticleLanguageHelper item={item} index={i} key={i} />
      ))}
    </Box>
  );
}
