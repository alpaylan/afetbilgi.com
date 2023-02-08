import { ListItem, Box, List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GatheringDataNode } from '../../interfaces/TreeNode';

export default function GatheringData({ value }: { value: GatheringDataNode }) {
  const { t } = useTranslation();
  return (
    <Box>
      <h3>
        {t('data.gathering.title', {
          city: value.city,
        })}
      </h3>
      <List>
        {value.items.map((v, i) => (
          <ListItem key={`item-${i}`}>{v}</ListItem>
        ))}
      </List>
    </Box>
  );
}
