import { Box, Paper } from "@mui/material";
import { CityAccommodationNode } from "../../interfaces/TreeNode";

export default function CityAccommodation({ value }: { value: CityAccommodationNode }) {
  return (
    <Box>
      <h3>{value.city} Şehrinde Kalabileceğiniz Yerler</h3>

      <p><b>Bu sayfada, içerisinde belirtilenler hariç tüm yerler telefonla doğrulanmıştır. Ancak günler, hatta saatler içerisinde bu bilgiler değişebildiğinden dolayı, kendi araştırmanızı yapmanız önemle rica edilir.</b></p>

      {value.items.map((item, i) => (
        <Paper sx={{ p: 2, m: 2 }} key={`item-${i}`}>
          <b>{item.name}</b> depremzedelere kalacak yer sağladığını bildirdi.

          {item.url && (
            <>
              Detaylı bilgiye <a href={item.url} target="_blank" rel="noreferrer">bu linkten</a> ulaşabilirsiniz.
             <br />
            </>
          )}
          <br />
          {item.phone_number && (Telefon Numarası: <b>{item.phone_number}</b>)}
          <br />
          {item.address && (
            <p>
              <a href={item.address} target="_blank" rel="noreferrer">Harita</a>
              <br />
            </p>
          )}
          {(item.phone_number && <p>Detaylı bilgi için <b><a href={`tel:+90${item.phone_number.replace(/^0/, "").replace(/ /g, "")}`}>{item.phone_number}</a></b>'i arayabilirsiniz.</p>)}
          {(!item.is_validated && <p><b>Not: Bu bilgiyi telefonla doğrulayamadık.</b></p>)}
        </Paper>
      ))}
    </Box>
  )
}
