import { ListItem, Box, List } from "@mui/material";
import { GatheringDataNode } from "../../interfaces/TreeNode";

export default function GatheringData({ value }: { value: GatheringDataNode }) {

  return (
    <Box>
      <h3>{value.city} Şehrinde Güvenli Toplanma Alanları</h3>
      <List>
        {value.items.map((v, i)=> <ListItem key={`item-${i}`}>{v}</ListItem>)}
      </List>
    </Box>
  )
}
