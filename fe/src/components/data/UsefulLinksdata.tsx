import { Box, Paper, Table, TableContainer, TableHead, TableRow,TableCell, TableBody } from "@mui/material";
import { UsefulLinksDataNode } from "../../interfaces/TreeNode";

export default function UsefulLinksData({ value }: { value: UsefulLinksDataNode }) {
    return (
        <Box>
            <h3>Önemli Websiteleri</h3>
            <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Birim</TableCell>
                        <TableCell>Website</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {value.usefulLinks.map((item) => (
                        <TableRow
                        key={item.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell><a href={item.url}>{item.url}</a></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
      );
}
