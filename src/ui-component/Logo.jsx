import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import logo from '../assets/images/appLogo.png';

export default function Logo() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center', // opsional: biar sejajar tengah secara vertikal
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="App Logo"
        sx={{
          height: 52,
          width: 140,
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}
