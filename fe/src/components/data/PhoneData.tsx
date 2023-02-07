import { ListItem, Box, List } from "@mui/material";
import { TelephoneDataNode } from "../../interfaces/TreeNode";

export default function TelephoneData({ value }: { value: TelephoneDataNode }) {
  return (
    <Box>
      <h3>Önemli Telefon Numaraları</h3>
      <List>
        {value.phones.map((v, i)=> <ListItem key={`item-${i}`}>{v.name}: <b><a href={v.is_plain ? `tel:${v.phone_number}` : `tel:+90${v.phone_number.replace(/^0/, "").replace(/ /g, "")}`}>{v.phone_number}</a></b></ListItem>)}
      </List>
    </Box>
  )
}
