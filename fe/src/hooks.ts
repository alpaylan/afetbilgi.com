import axios from "axios";
import { useQuery } from "react-query";

export const useQuestionData = () => useQuery('data', async () => {
  const res = await axios.get('http://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/bagis.json');

  return res.data;
});
