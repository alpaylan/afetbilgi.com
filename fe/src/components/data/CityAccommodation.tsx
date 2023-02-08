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
      <h2>
        <b>
          <a href='https://www.hepsiemlak.com/emlak-yasam/genel/dostluk-catisi' target='_blank' rel='noreferrer'>
          </a>
        </b>
        {t('data.city_accommodation.general')}{' '}
      </h2>
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
              {t('data.city_accommodation.link_explanation_p1')}{' '}
              <a href={item.url} target='_blank' rel='noreferrer'>
              {t('data.city_accommodation.link_explanation_p2')}.
              </a>{' '}
              
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
              {t('data.phone_number.link_explanation_p1')}{' '}
              <b>
                <a
                  href={`tel:+90${item.phone_number
                    .replace(/^0/, '')
                    .replace(/ /g, '')}`}
                >
                  {item.phone_number}
                </a>
              </b>
              {t('data.phone_number.link_explanation_p2')}{' '}
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
