import { Box, List, ListItem, Paper } from "@mui/material";
import { ArticleDataNode } from "../../interfaces/TreeNode";

export default function ArticleData({ value }: { value: ArticleDataNode }) {
    return (
        <Box>
            <h3>Faydalı Yazılar</h3>

            <p><b>Deprem sonrası ile alakalı faydalı yazıları aşağıda bulabilirsiniz.</b></p>
    
            {value.articles.map((item, i) => (

            <Paper sx={{ p: 2, m: 2 }} key={`item-${i}`}>
                <List>
                    <ListItem><b>Başlık: </b>{item.title}</ListItem>
                    <ListItem><b>Yazar: </b>{item.author}</ListItem>
                    <ListItem><b>Link: </b><a href={item.url} target="_blank">{item.url}</a></ListItem>
                </List>
            </Paper>
            ))}
        </Box>
    );
}
