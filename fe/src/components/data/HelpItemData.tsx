import { Paper, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HelpItemNode } from '../../interfaces/TreeNode';

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
        <Paper key={`help-item-${i}`} sx={{ m: 2, p: 2 }}>
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
      ))}
    </Box>
  );
}
