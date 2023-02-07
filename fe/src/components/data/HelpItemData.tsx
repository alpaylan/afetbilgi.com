import { Paper, Box } from "@mui/material";
import { HelpItemNode } from "../../interfaces/TreeNode";

export default function HelpItemData({ value }: { value: HelpItemNode }) {
  return (
    <Box>
      <h4>{value.city}</h4>
      {value.items.map((item, i) => (
        <Paper key={`help-item-${i}`} sx={{ m: 2, p: 2 }}>
          <p><b>{item.name}</b>'in düzenlediği eşya yardımı kampanyasına yardım etmek için <a href="{item.url}">bu linke</a> tıklayınız.</p>
          (item.number && <p>Detaylı bilgi için <b>{item.phone_number}</b>'i arayabilirsiniz.</p>)
        </Paper>
      ))}
    </Box>
  );
}
