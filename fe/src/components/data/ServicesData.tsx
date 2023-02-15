import {
    Box,
    CardContent,
    Card,
    List,
    ListItem,
  } from '@mui/material';
  import { useTranslation } from 'react-i18next';
  import { ServicesDataNode } from '../../interfaces/TreeNode';
  import Title from '../Title';
  
  export default function ServicesData({
    value,
  }: {
    value: ServicesDataNode;
  }) {
    const { t } = useTranslation();
    value.services.sort((a, b) => a.city.localeCompare(b.city));
    return (
      <Box>
        <Title
          title={t('data.services.title')}
        />
        <List>
            {value.services.map((item, i) => (
              <ListItem key={i}>
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <b>{t('city')}</b>: {item.city}
                    <br />
                    <br />
                    <b>{t('district')}</b>: {item.county}
                    <br />
                    <br />
                    <b>{t('location')}</b>: {item.location}
                    <br />
                    {
                      item.category ?
                      <>
                      <br />
                      <b>{t('service.category')}: </b>{' '}
                        {item.category}
                      <br />
                      </>
                      : ''
                    }
                    {
                      item.specificCategory ?
                      <>
                      <br />
                      <b>{t('service.specific')}: </b>{' '}
                        {item.specificCategory}
                      <br />
                      </>
                      : ''
                    }
                    {
                      item.source ?
                      <>
                      <br />
                      <b>{t('source')}: </b>{' '}
                      <a href={item.source} target='_blank'>
                        {t('Link')}
                      </a>
                      <br />
                      </>
                      : ''
                    }
                    {
                      item.locationLink ?
                      <>
                      <br />
                      <b>{t('map')}: </b>{' '}
                      <a href={item.locationLink} target='_blank'>
                        {t('map')}
                      </a>
                      <br />
                      </>
                      : ''
                    }
                    <br />
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
      </Box>
    );
  }
  