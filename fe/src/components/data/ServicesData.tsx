import {
    Box,
    CardContent,
    Card,
    List,
    ListItem,
    Typography,
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

    return (
      <Box>
        <Title
          title={t('data.services.title')}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t('service.category')}: {value.category}
        </Typography>
        <List>
            {value.items.map((item, i) => (
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
  