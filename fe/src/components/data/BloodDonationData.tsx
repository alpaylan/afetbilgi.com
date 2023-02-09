import { ListItem, Paper, List, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BloodDonationNode } from '../../interfaces/TreeNode';

export default function BloodDonationData({
  value,
}: {
  value: BloodDonationNode;
}) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>
        {value.items[0].city} Kızılay {t('data_blood_donation')}
      </h3>
      {value.items.map((item) => (
        <Paper sx={{ m: 2, p: 2 }}>
          <List>
            <ListItem>{item.name}</ListItem>
            <ListItem>{item.address}</ListItem>
            <ListItem>{item.url}</ListItem>
            <ListItem>{item.phone_number}</ListItem>
            <ListItem>
              {t('in_charge')}: {item.head} - {item.cell_phone_number}
            </ListItem>
            {item.address && (
              <ListItem>
                <a
                  href={`https://maps.google.com/?q=${item.address
                    .replace('(', '')
                    .replace(')', '')} ${item.city}`}
                >
                  Konum
                </a>
              </ListItem>
            )}
          </List>
        </Paper>
      ))}
    </Box>
  );
}
