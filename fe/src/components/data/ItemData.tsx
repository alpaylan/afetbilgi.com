import { ListItem, Box, List } from "@mui/material";
import { ItemDataNode } from "../../interfaces/TreeNode";

export default function ItemData({ value }: { value: ItemDataNode }) {
  return (
    <Box>
      <List>
        {value.items.map((v)=> <ListItem>{v}</ListItem>)}
      </List>
    </Box>
  )
}
