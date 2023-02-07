import { Box, Paper } from "@mui/material";
import { CreditCardNode } from "../../interfaces/TreeNode";

export default function CreditCardData({ value }: { value: CreditCardNode }) {
  return (
    <Box>
        <Paper sx={{ p: 2, m: 2 }}>
          <b>{value.name}</b> kredi kartı yoluyla bağış yapılmasına izin vermektedir. <a href={value.url} target="_blank" rel="noreferrer">Bu linke</a> tıklayarak ilgili sayfaya ulaşabilir ve bağışınızı gerçekleştirebilirsiniz.
        </Paper>
    </Box>
  )
}
