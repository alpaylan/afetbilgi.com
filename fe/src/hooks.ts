import axios from "axios";
import { useQuery } from "react-query";

import { QuestionNode } from "./interfaces/TreeNode";

const dataPoints = [
  { name: 'Barınmak istiyorum', path: 'bagis.json' },
  { name: 'Toplanmak istiyorum', path: 'toplanma.json' },
  { name: 'Bağış istiyorum', path: 'bagis.json' },
  { name: 'Yardım istiyorum', path: 'yardim_toplama_merkezleri.json' },
];

export const useQuestionData = () => useQuery('questionData', async () => {
  const data = await Promise.all(dataPoints.map(async (dp) => {
    const res = await axios.get(`http://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/${dp.path}`);

    return res.data;
  }));

  return {
    type: 'question',
    text: 'Ne yapmak istiyorsunuz?',
    options: dataPoints.map((dp, i) => ({
      name: dp.name,
      value: data[i],
    })),
  } as QuestionNode;
});
