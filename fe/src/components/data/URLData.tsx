import { Box, Paper } from "@mui/material";
import { URLDataNode } from "../../interfaces/TreeNode";

export default function URLData({ value }: { value: URLDataNode }) {
  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <b>{value.name}</b> yurt dışı merkezli, güvenilir bir yardım platformudur. 
        <a href={value.url} target="_blank" rel="noreferrer">Bu linke</a> tıklayarak ilgili sayfaya ulaşabilir ve bağışınızı gerçekleştirebilirsiniz.
      </Paper>
    </Box>
  )
}
