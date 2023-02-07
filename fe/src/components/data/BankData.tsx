import { Box, List, ListItem, Paper } from "@mui/material";
import { BankDataNode } from "../../interfaces/TreeNode";

export default function BankData({ value }: { value: BankDataNode }) {
  return (
    <Box>
      {value.accounts.map((account) => (
        <Paper sx={{ p: 2, m: 2 }}>
          <List>
            {account.name && <ListItem>{account.name}</ListItem>}
            {account.branch && <ListItem>{account.branch}</ListItem>}
            {account.tl && <ListItem>TL Hesabı: {account.tl}</ListItem>}
            {account.usd && <ListItem>USD Hesabı: {account.usd}</ListItem>}
            {account.eur && <ListItem>USD Hesabı: {account.eur}</ListItem>}
            {account.gbp && <ListItem>GBP Hesabı: {account.gbp}</ListItem>}
            {account.swift && <ListItem>Swift Hesabı: {account.swift}</ListItem>}
          </List>
        </Paper>
      ))}
    </Box>
  )
}
