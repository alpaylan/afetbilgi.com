import axios from "axios";
import { useQuery } from "react-query";
// import { Theme, useMediaQuery } from '@mui/material'

import { QuestionNode } from "./interfaces/TreeNode";

const dataPoints = [
  { name: 'Geçici Barınma Alanları', path: 'barinma.json' },
  { name: 'Güvenli Toplanma Alanları', path: 'toplanma.json' },
  { name: 'Para Bağışı İmkanları', path: 'bagis.json' },
  { name: 'Eşya Bağışı İmkanları', path: 'yardim_toplama_merkezleri.json' },
];

export const useQuestionData = () => useQuery('questionData', async () => {
  const data = await Promise.all(dataPoints.map(async (dp) => {
    const res = await axios.get(`https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/${dp.path}?v=2`);
    console.log(res.data);
    return res.data;
  }));

  return {
    type: 'question',
    text: 'Lütfen bilgi almak istediğiniz konuyu seçiniz.',
    options: dataPoints.map((dp, i) => ({
      name: dp.name,
      value: data[i],
    })),
  } as QuestionNode;
});

// export const useMobile = () => {
//   const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

//   return isMobile;
// };
