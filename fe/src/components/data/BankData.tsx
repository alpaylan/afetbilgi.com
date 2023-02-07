import { Box, List, ListItem, Paper } from "@mui/material";
import { BankDataNode } from "../../interfaces/TreeNode";

export default function BankData({ value }: { value: BankDataNode }) {
  return (
    <Box>
      {value.accounts.map((account) => (
        <Paper sx={{ p: 2, m: 2 }}>
          <List>
            {account.name && <ListItem><b>Banka: </b>{account.name}</ListItem>}
            {account.branch && <ListItem><b>Şube: </b>{account.branch}</ListItem>}
            {account.ownerName && <ListItem><b>Hesap Sahibi: </b>{account.ownerName}</ListItem>}
            {account.tl && <ListItem><b>TL IBAN: </b>{account.tl}</ListItem>}
            {account.usd && <ListItem><b>USD IBAN: </b>{account.usd}</ListItem>}
            {account.eur && <ListItem><b>EUR IBAN: </b>{account.eur}</ListItem>}
            {account.gbp && <ListItem><b>GBP IBAN: </b>{account.gbp}</ListItem>}
            {account.swift && <ListItem><b>Swift Kodu: </b>{account.swift}</ListItem>}
          </List>
        </Paper>
      ))}
    </Box>
  )
}
