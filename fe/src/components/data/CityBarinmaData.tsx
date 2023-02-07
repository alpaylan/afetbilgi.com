import { Box, Paper } from "@mui/material";
import { CityBarinmaNode } from "../../interfaces/TreeNode";

export default function CityBarinma({ value }: { value: CityBarinmaNode }) {
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
