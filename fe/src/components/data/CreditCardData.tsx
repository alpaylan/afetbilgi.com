import { Box, Paper } from "@mui/material";
import { CreditCardNode } from "../../interfaces/TreeNode";

export default function CreditCardData({ value }: { value: CreditCardNode }) {
  return (
    <Box>
      {value.items.map((item) => (
        <Paper sx={{ p: 2, m: 2 }}>
          <Box>{item.name}</Box>
          <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
        </Paper>
      ))}
    </Box>
  )
}
