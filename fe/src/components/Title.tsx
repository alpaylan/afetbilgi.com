import { Alert, Typography } from '@mui/material';

export default function Title(
  { title, subtitle, severity = 'warning' }: { title: string, subtitle?: string, severity?: 'info' | 'warning' | 'error' | 'success' },
) {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Alert severity={severity} sx={{ mb: 2, textAlign: 'start' }}>
          {subtitle}
        </Alert>
      )}
    </>
  );
}
