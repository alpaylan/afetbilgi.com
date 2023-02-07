import { Box, Paper } from "@mui/material";
import { UsefulLinksDataNode } from "../../interfaces/TreeNode";

export default function UsefulLinksData({ value }: { value: UsefulLinksDataNode }) {
    return (
        <Box>
            <h3>Önemli Websiteleri</h3>

            <p><b>İhtiyacınız olabilecek linklere buradan ulaşabilirsiniz.</b></p>

            {value.usefulLinks.map((item, i) => (
                <Paper sx={{ p: 2, m: 2 }} key={`item-${i}`}>
                <b>{item.name}</b>
                <br />

                {item.url && (
                    <>
                    Sayfaya <a href={item.url} target="_blank" rel="noreferrer">bu linkten</a> ulaşabilirsiniz.
                    <br />
                    </>
                )}

                <br />
                </Paper>
            ))}
        </Box>
      );
}
