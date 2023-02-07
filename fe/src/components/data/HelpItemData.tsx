import { ListItem, List, Paper, Box } from "@mui/material";
import { HelpItemNode } from "../../interfaces/TreeNode";

export default function HelpItemData({ value }: { value: HelpItemNode }) {
  return (
    <Box>
      {value.items.map((item, i) => (
        <Paper key={`help-item-${i}`} sx={{ m: 2, p: 2 }}>
          <List>
            <ListItem>{item.name}</ListItem>
            <ListItem>{item.phone_number}</ListItem>
          </List>
        </Paper>
      ))}
    </Box>
  );
}
