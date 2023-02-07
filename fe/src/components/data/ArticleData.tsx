import { Box, List, ListItem, Paper } from "@mui/material";
import { ArticleDataNode } from "../../interfaces/TreeNode";

export default function ArticleData({ value }: { value: ArticleDataNode }) {
    return (
        <Box>
            <h3>Depremle İlgili Yazılar</h3>
    
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
    )
}
