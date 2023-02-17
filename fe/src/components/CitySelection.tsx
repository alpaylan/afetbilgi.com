import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CitySelection({ changeCityHandler, selectedCity, citiesDict, cities }: { changeCityHandler: (newValue: string | null) => void, selectedCity: string | null, citiesDict: Record<string, Record<string, string>>, cities: string[] | undefined }) {

  const { i18n, t } = useTranslation();
  
 return (
    <>
      {cities &&
          <Autocomplete
            id="city-combo-box"
            value={selectedCity}
            options={cities.map((key) => citiesDict[key].tr)}
            getOptionLabel={(option) => citiesDict?.[option]?.[i18n.language]}
            renderInput={(params) => <TextField {...params} label={t('data.pdf.citySelect')} />}
            sx={{ width: 300, alignSelf: 'center' }}
            onChange={(event, newValue) => changeCityHandler(newValue)}
          />
      }
    </>
  );

}