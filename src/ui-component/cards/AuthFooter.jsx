import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

export default function AuthFooter() {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', padding: 2 }}>
      <Typography variant="body2">
        © 2025 Laundry Service - All Rights Reserved
      </Typography>
      <Typography variant="body2">
        Powered by Laundry
      </Typography>
    </Stack>
  );
}
