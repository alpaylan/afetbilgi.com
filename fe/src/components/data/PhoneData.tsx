import { Box, Paper, Table, TableContainer, TableHead, TableRow,TableCell, TableBody } from "@mui/material";
import { TelephoneDataNode } from "../../interfaces/TreeNode";

export default function TelephoneData({ value }: { value: TelephoneDataNode }) {
    return (
        <Box>
            <h3>Önemli Telefon Numaraları</h3>
            <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Birim</TableCell>
                        <TableCell>Telefon&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {value.phones.map((item) => (
                        <TableRow
                        key={item.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell><a href={item.is_plain ? `tel:${item.phone_number}` : `tel:+90${item.phone_number.replace(/^0/, "").replace(/ /g, "")}`}>{item.phone_number}</a></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
      );
}
