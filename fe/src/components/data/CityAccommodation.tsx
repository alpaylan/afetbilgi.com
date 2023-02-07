import { Box, Paper } from "@mui/material";
import { CityAccommodationNode } from "../../interfaces/TreeNode";

export default function CityAccommodation({ value }: { value: CityAccommodationNode }) {
  return (
    <Box>
      <h3>{value.city} Şehrinde Kalabileceğiniz Yerler</h3>

      <p><b>Bu sayfada, içerisinde belirtilenler hariç tüm yerler telefonla doğrulanmıştır. Ancak günler, hatta saatler içerisinde bu bilgiler değişebildiğinden dolayı, kendi araştırmanızı yapmanız önemle rica edilir.</b></p>

      {value.items.map((item) => (
        <Paper sx={{ p: 2, m: 2 }}>
          <b>{item.name}</b> depremzedelere kalacak yer sağladığını bildirdi. 
          Detaylı bilgiye <a href={item.url} target="_blank" rel="noreferrer">bu linkten</a> ulaşabilirsiniz.
          {(!item.is_validated && <p><b>Not: Bu bilgiyi telefonla doğrulayamadık.</b></p>)}
        </Paper>
      ))}
    </Box>
  )
}
