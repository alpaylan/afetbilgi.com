import { ListItem, Paper, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BloodDonationNode } from '../../interfaces/TreeNode';

export default function BloodDonationData({
  value,
}: {
  value: BloodDonationNode;
}) {
  const { t } = useTranslation();
  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <h3>
        {value.city} Kızılay {t('data_blood_donation')}
      </h3>
      <List>
        <ListItem>{value.name}</ListItem>
        <ListItem>{value.address}</ListItem>
        <ListItem>{value.url}</ListItem>
        <ListItem>{value.phone_number}</ListItem>
        <ListItem>
          {t('in_charge')}: {value.head} - {value.cell_phone_number}
        </ListItem>
      </List>
    </Paper>
  );
}
