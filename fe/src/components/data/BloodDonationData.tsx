import { ListItem, Paper, List } from "@mui/material";
import { BloodDonationNode } from "../../interfaces/TreeNode";

export default function BloodDonationData({ value }: { value: BloodDonationNode }) {
  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <h3>{value.city} Kızılay Kan Bağış Noktası</h3>
      <List>
        <ListItem>{value.name}</ListItem>
        <ListItem>{value.address}</ListItem>
        <ListItem>{value.url}</ListItem>
        <ListItem>{value.phone_number}</ListItem>
        <ListItem>Sorumlu: {value.head} - {value.cell_phone_number}</ListItem>
      </List>
    </Paper>
  )
}
