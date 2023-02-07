import { Box, Paper } from "@mui/material";
import { CreditCardNode } from "../../interfaces/TreeNode";

export default function CreditCardData({ value }: { value: CreditCardNode }) {
  return (
    <Box>
        <Paper sx={{ p: 2, m: 2 }}>
          <Box>{value.name}</Box>
          <a href={value.url} target="_blank" rel="noreferrer">{value.url}</a>
        </Paper>
    </Box>
  )
}
