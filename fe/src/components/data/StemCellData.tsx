import { Box, Paper, Table, TableContainer, TableHead, TableRow,TableCell, TableBody } from "@mui/material";
import { StemCellDataNode } from "../../interfaces/TreeNode";

export default function StemCellData({ value }: { value: StemCellDataNode }) {
    return (
        <Box>
            <h3>Kök Hücre Bağış Noktaları</h3>
            <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                <Table sx={{ maxWidth: 650 }}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Bölge</TableCell>
                        <TableCell>Şehir</TableCell>
                        <TableCell>Adres</TableCell>
                        <TableCell>Telefon</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {value.items.map((item) => (
                        <TableRow
                        key={item.address+item.city}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {item.area}
                        </TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell><a href={item.address}>Konum</a></TableCell>
                        <TableCell><a href={`tel:+90${item.phone.replace(/^0/, "").replace(/ /g, "")}`}>{item.phone}</a></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
      );
}
