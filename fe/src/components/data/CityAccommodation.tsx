import { Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CityAccommodationNode } from '../../interfaces/TreeNode';

export default function CityAccommodation({
  value,
}: {
  value: CityAccommodationNode;
}) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>
        {t('data.city_accommodation.title', {
          city: value.city,
        })}
      </h3>
      <p>
        <b>{t('data.city_accommodation.subtitle')}</b>
      </p>
      {/* // TO-DO: https://react.i18next.com/latest/trans-component */}
      {value.items.map((item, i) => (
        <Paper sx={{ p: 2, m: 2 }} key={`item-${i}`}>
          <b>{item.name}</b> {t('data.city_accommodation.explanation')}
          {item.url && (
            <>
              Detaylı bilgiye{' '}
              <a href={item.url} target='_blank' rel='noreferrer'>
                bu linkten
              </a>{' '}
              ulaşabilirsiniz.
              <br />
            </>
          )}
          <br />
          {item.address && (
            <p>
              <a href={item.address} target='_blank' rel='noreferrer'>
                {t('map')}
              </a>
              <br />
            </p>
          )}
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
          {!item.is_validated && (
            <p>
              <b>{t('data.city_accommodation.not_validated')}</b>
            </p>
          )}
        </Paper>
      ))}
    </Box>
  );
}
