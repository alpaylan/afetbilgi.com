import { Box, Paper } from '@mui/material';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { FoodDistributionDataNode } from '../../interfaces/TreeNode';

const detailedInfo = (t: TFunction, phone_number?: string, url?: string) => {
  if (!phone_number && !url) {
    return null;
  }

  if (!url) {
    return (
      <div>
        <p>
          {t('data.food_distribution.detail_main')}
          <b>
            <a
              href={`tel:+90${phone_number
                ?.replace(/^0/, '')
                .replace(/ /g, '')}`}
            >
              {phone_number}
            </a>
          </b>
          {t('data.food_distribution.detail_call')}
        </p>
      </div>
    );
  }

  if (!phone_number) {
    return (
      <div>
        <p>
          {t('data.food_distribution.detail_main')}
          <a href={url} target='_blank' rel='noreferrer'>
            {t('data.food_distribution.detail_website')}
          </a>{' '}
          {t('data.food_distribution.detail_inspect')}
        </p>
      </div>
    );
  }

  return (
    <p>
      {t('data.food_distribution.detail_main')}
      <b>
        <a href={`tel:+90${phone_number.replace(/^0/, '').replace(/ /g, '')}`}>
          {phone_number}
        </a>
      </b>
      {t('data.food_distribution.detail_mix')}
      <a href={url} target='_blank' rel='noreferrer'>
        {t('data.food_distribution.detail_website')}
      </a>{' '}
      {t('data.food_distribution.detail_inspect')}
    </p>
  );
};

export default function FoodDistributionData({
  value,
}: {
  value: FoodDistributionDataNode;
}) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>
        {t('data.food_distribution.title', {
          city: value.city,
          county: value.county,
        })}
      </h3>

      <p>
        <b>{t('data.food_distribution.subtitle')}</b>
      </p>

      {value.items.map((item, i) => (
        <Paper sx={{ p: 2, m: 2 }} key={`item-${i}`}>
          <b>{item.name}</b>
          <br />
          <p>
            {item.maps_url && <a href={item.maps_url} target='_blank' rel='noreferrer'>
              {t('button.google_maps')}
            </a>}
            <br />
          </p>

          {detailedInfo(t, item.phone_number, item.url)}
        </Paper>
      ))}
    </Box>
  );
}
