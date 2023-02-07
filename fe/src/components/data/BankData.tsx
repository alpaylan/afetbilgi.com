import { Box, IconButton, List, ListItem, Paper } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { BankDataNode } from "../../interfaces/TreeNode";

export default function BankData({ value }: { value: BankDataNode }) {
  return (
    <Box>
      {value.accounts.map((account, i) => (
        <Paper sx={{ p: 2, m: 2 }} key={`account-${i}`}>
          <List>
            {account.name && <ListItem><b>Banka: </b>{account.name}</ListItem>}
            {account.branch && <ListItem><b>Şube: </b>{account.branch}</ListItem>}
            {account.ownerName && <ListItem><b>Hesap Sahibi: </b>{account.ownerName}</ListItem>}

            {account.tl && <ListItem><b>TL IBAN: </b>{account.tl} <CopyToClipboard text={account.tl}>
              <IconButton size="small"><ContentCopyIcon /></IconButton>
            </CopyToClipboard></ListItem>}

            {account.usd && <ListItem><b>USD IBAN: </b>{account.usd} <CopyToClipboard text={account.usd}>
              <IconButton size="small"><ContentCopyIcon /></IconButton>
            </CopyToClipboard></ListItem>}

            {account.eur && <ListItem><b>EUR IBAN: </b>{account.eur} <CopyToClipboard text={account.eur}>
              <IconButton size="small"><ContentCopyIcon /></IconButton>
            </CopyToClipboard></ListItem>}

            {account.gbp && <ListItem><b>GBP IBAN: </b>{account.gbp} <CopyToClipboard text={account.gbp}>
              <IconButton size="small"><ContentCopyIcon /></IconButton>
            </CopyToClipboard></ListItem>}

            {account.swift && <ListItem><b>Swift Kodu: </b>{account.swift} <CopyToClipboard text={account.swift}>
              <IconButton size="small"><ContentCopyIcon /></IconButton>
            </CopyToClipboard></ListItem>}
          </List>
        </Paper>
      ))}
    </Box>
  )
}
