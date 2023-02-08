import { Box, Paper } from "@mui/material";
import { FoodDistributionDataNode } from "../../interfaces/TreeNode";


const detailedInfo = (phone_number?: string, url?: string) => {
  if (!phone_number && !url) {
    return null;
  }

  if (!url) {
    return (
      <div>
        <p>Detaylı bilgi için <b><a href={`tel:+90${phone_number?.replace(/^0/, "").replace(/ /g, "")}`}>{phone_number}</a></b>'i arayabilirsiniz.</p>
      </div>
    )
  }

  if (!phone_number) {
    return (
      <div>
        <p>Detaylı bilgi için <a href={url} target="_blank" rel="noreferrer">bu web sitesini</a> inceleyebilirsiniz</p>
      </div>
    )
  }

  return (<p>
    Detaylı bilgi için <b><a href={`tel:+90${phone_number.replace(/^0/, "").replace(/ /g, "")}`}>{phone_number}</a></b>'i arayabilirsiniz ya da <a href={url} target="_blank" rel="noreferrer">bu web sitesini</a> inceleyebilirsiniz.
  </p>)
}

export default function FoodDistributionData({ value }: { value: FoodDistributionDataNode }) {
  return (
    <Box>
      <h3>{value.city}, {value.county} Ücretsiz Yemek Dağıtım Yerleri</h3>

      <p><b>Bu sayfadaki tüm yerler telefonla doğrulanmıştır. Ancak günler, hatta saatler içerisinde bu bilgiler değişebildiğinden dolayı, kendi araştırmanızı yapmanız önemle rica edilir.</b></p>

      {value.items.map((item, i) => (
        <Paper sx={{ p: 2, m: 2 }} key={`item-${i}`}>
          <b>{item.name}</b> 
          <br />
            <p>
              <a href={item.maps_url} target="_blank" rel="noreferrer">Google Maps Linki</a>
              <br />
            </p>

          {detailedInfo(item.phone_number, item.url)}

        </Paper>
      ))}
    </Box>
  )
}
