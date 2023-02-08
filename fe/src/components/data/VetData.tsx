import { Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Vet, VetNode } from '../../interfaces/TreeNode';
import { Language } from '../../utils/types';

const VetLanguageHelper = ({ item, index }: { item: Vet; index: number }) => {
  const { i18n } = useTranslation();
  if (i18n.language === Language.TR) {
    return (
      <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
        <b>{item.name}</b> zarar gören hayvanlarla ücretsiz ilgileneceğini
        bildirdi.
        <br />
        <p>
          <a href={item.maps_url} target='_blank' rel='noreferrer'>
            {item.address}
          </a>
          <br />
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
    <Paper sx={{ p: 2, m: 2 }} key={`item-${index}`}>
      <b>{item.name}</b> stated that it will take care of the injured animals
      free of charge.
      <br />
      <p>
        <a href={item.maps_url} target='_blank' rel='noreferrer'>
          {item.address}
        </a>
        <br />
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

export default function VetData({ value }: { value: VetNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>{t('data.veterinary.title', { city: value.city })}</h3>

      <p>
        <b>{t('data.veterinary.subtitle')}</b>
      </p>

      {value.vets.map((item, i) => (
        <VetLanguageHelper item={item} index={i} key={i} />
      ))}
    </Box>
  );
}
