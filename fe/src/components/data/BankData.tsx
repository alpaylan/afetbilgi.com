import { Box, IconButton, List, ListItem, Paper } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { BankDataNode } from "../../interfaces/TreeNode";

function BankDataClipboardItem({label, value}: { label: string, value: string }) {
  return (<ListItem><b>{label}: </b> <span style={{ wordBreak: "break-all"}}>{value}</span> <CopyToClipboard text={value} >
    <IconButton size="small"><ContentCopyIcon/></IconButton>
  </CopyToClipboard></ListItem>);
}

export default function BankData({ value }: { value: BankDataNode }) {
  return (
    <Box>
      {value.accounts.map((account, i) => (
        <Paper sx={{ p: 2, m: 2 }} key={`account-${i}`}>
          <List>
            {account.name && <ListItem><b>Banka: </b>{account.name}</ListItem>}
            {account.branch && <ListItem><b>Şube: </b>{account.branch}</ListItem>}
            {account.ownerName && <ListItem><b>Hesap Sahibi: </b>{account.ownerName}</ListItem>}
            {account.tl && <BankDataClipboardItem label="TL IBAN" value={account.tl} />}
            {account.usd && <BankDataClipboardItem label="USD IBAN" value={account.usd} />}
            {account.eur && <BankDataClipboardItem label="EUR IBAN" value={account.eur} />}
            {account.gbp && <BankDataClipboardItem label="GBP IBAN" value={account.gbp} />}
            {account.swift && <BankDataClipboardItem label="Swift Kodu" value={account.swift} />}
            {account.bep && <BankDataClipboardItem label="BEP20" value={account.bep} />}
            {account.erc && <BankDataClipboardItem label="ERC20" value={account.erc} />}
            {account.avalanche && <BankDataClipboardItem label="Avalanche" value={account.avalanche} />}
            {account.url && <ListItem><b>URL: </b><a href={account.url} target="_blank" style={{ wordBreak: "break-word"}}>{account.url}</a></ListItem>}
          </List>
        </Paper>
      ))}
    </Box>
  )
}
