import { Paper, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HelpItem, HelpItemNode } from '../../interfaces/TreeNode';
import { Language } from '../../utils/types';

const HelpItemLanguageHelper = ({
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
};

export default function HelpItemData({ value }: { value: HelpItemNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>
        {t('data.help_item.title', {
          city: value.city,
        })}
      </h3>
      {value.items.map((item, i) => (
        <HelpItemLanguageHelper key={i} item={item} index={i} />
      ))}
    </Box>
  );
}
