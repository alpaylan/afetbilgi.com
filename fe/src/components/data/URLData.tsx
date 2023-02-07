import { Box, Paper } from "@mui/material";
import { URLDataNode } from "../../interfaces/TreeNode";

export default function URLData({ value }: { value: URLDataNode }) {
  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <a href={value.url} target="_blank" rel="noreferrer">{value.url}</a>
      </Paper>
    </Box>
  )
}
