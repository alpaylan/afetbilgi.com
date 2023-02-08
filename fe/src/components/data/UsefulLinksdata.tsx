import { Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UsefulLink, UsefulLinksDataNode } from '../../interfaces/TreeNode';
import { Language } from '../../utils/types';

const UsefulLinksLanguageHelper = ({
  item,
  index,
}: {
  item: UsefulLink;
  index: number;
}) => {
  const { i18n } = useTranslation();
  if (i18n.language === Language.TR) {
    return (
      <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
        <b>{item.name}</b>
        <br />

        {item.url && (
          <>
            Sayfaya{' '}
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
      <b>{item.name}</b>
      <br />

      {item.url && (
        <>
          You can reach the page from{' '}
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

export default function UsefulLinksData({
  value,
}: {
  value: UsefulLinksDataNode;
}) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>{t('data.important_web_sites.title')}</h3>

      <p>
        <b>{t('data.important_web_sites.subtitle')}</b>
      </p>

      {value.usefulLinks.map((item, i) => (
        <UsefulLinksLanguageHelper key={i} item={item} index={i} />
      ))}
    </Box>
  );
}
