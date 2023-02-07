import { Box, Paper } from "@mui/material";
import { ArticleDataNode } from "../../interfaces/TreeNode";

export default function ArticleData({ value }: { value: ArticleDataNode }) {
    return (
        <Box>
            <h3>Faydalı Yazılar</h3>

            <p><b>Deprem sonrası ile alakalı faydalı yazıları aşağıda bulabilirsiniz.</b></p>

            {value.articles.map((item, i) => (
                <Paper sx={{ p: 2, m: 2 }} key={`item-${i}`}>
                <b>{item.title}</b>
                <br /> <br />
                <b>Yazar: </b> {item.author}
                <br /><br />

                {item.url && (
                    <>
                    Yazıya <a href={item.url} target="_blank" rel="noreferrer">bu linkten</a> ulaşabilirsiniz.
                    <br />
                    </>
                )}

                <br />
                </Paper>
            ))}
        </Box>
      );
}
