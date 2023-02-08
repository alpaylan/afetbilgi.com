import { Box, Paper } from "@mui/material";
import { VetNode } from "../../interfaces/TreeNode";

export default function Vet({ value }: { value: VetNode }) {
  return (
    <Box>
      <h3>{value.city} Şehrinde Ücretsiz Yardım Alabileceğiniz Veterinerler</h3>

      <p><b>Bu sayfadaki tüm veterinerler telefonla doğrulanmıştır. Ancak günler, hatta saatler içerisinde bu bilgiler değişebildiğinden dolayı, kendi araştırmanızı yapmanız önemle rica edilir.</b></p>

      {value.vets.map((item, i) => (
        <Paper sx={{ p: 2, m: 2 }} key={`item-${i}`}>
          <b>{item.name}</b> zarar gören hayvanlarla ücretsiz ilgileneceğini bildirdi.
          <br />
            <p>
              <a href={item.maps_url} target="_blank" rel="noreferrer">{item.address}</a>
              <br />
            </p>
          {(item.phone_number && <p>Detaylı bilgi için <b><a href={`tel:+90${item.phone_number.replace(/^0/, "").replace(/ /g, "")}`}>{item.phone_number}</a></b>'i arayabilirsiniz.</p>)}
        </Paper>
      ))}
    </Box>
  )
}
