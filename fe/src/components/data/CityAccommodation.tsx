import { Box, Paper } from "@mui/material";
import { CityAccommodationNode } from "../../interfaces/TreeNode";

export default function CityAccommodation({ value }: { value: CityAccommodationNode }) {
  return (
    <Box>
      <h3>{value.city} Şehrine Kalabileceğiniz Yerler</h3>
      {value.items.map((item) => (
        <Paper sx={{ p: 2, m: 2 }}>
          <Box>{item.name}</Box>
          <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
        </Paper>
      ))}
    </Box>
  )
}
