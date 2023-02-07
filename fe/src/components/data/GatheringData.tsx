import { ListItem, Box, List } from "@mui/material";
import { GatheringDataNode } from "../../interfaces/TreeNode";

export default function ItemData({ value }: { value: GatheringDataNode }) {
  <h3>{value.city} Şehrinde Toplanma Alanları</h3>
  return (
    <Box>
      <List>
        {value.items.map((v)=> <ListItem>{v}</ListItem>)}
      </List>
    </Box>
  )
}
