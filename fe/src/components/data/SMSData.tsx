import { Box, Paper } from "@mui/material";
import { SMSDataNode } from "../../interfaces/TreeNode";

export default function SMSData({ value }: { value: SMSDataNode }) {
  return (
    <Box>
      <Paper sx={{ p: 2, m: 2 }}>
          <p> <b>{value.number}</b>'ya <b>{value.sms}</b> yaz, <b>{value.amount}₺</b> bağışta bulun. </p>
      </Paper>
    </Box>
  )
}

