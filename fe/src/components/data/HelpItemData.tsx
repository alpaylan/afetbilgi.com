import { Paper, Box } from "@mui/material";
import { HelpItemNode } from "../../interfaces/TreeNode";

export default function HelpItemData({ value }: { value: HelpItemNode }) {
  return (
    <Box>
      <h3>{value.city} Eşya Yardım Alanları</h3>
      {value.items.map((item, i) => (
        <Paper key={`help-item-${i}`} sx={{ m: 2, p: 2 }}>
          <p><b>{item.name}</b>'in {(item.location && <span><b>{item.location}</b>'de</span>)} düzenlediği eşya yardımı kampanyasına yardım etmek için <a href={item.url} target="_blank" rel="noreferrer">bu linke</a> tıklayınız.</p>
          {(item.phone_number && <p>Detaylı bilgi için <b><a href={`tel:+90${item.phone_number.replace(/^0/, "").replace(/ /g, "")}`}>{item.phone_number}</a></b>'i arayabilirsiniz.</p>)}
        </Paper>
      ))}
    </Box>
  );
}
