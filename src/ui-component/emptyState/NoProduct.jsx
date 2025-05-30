import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import boxImage from '../../assets/images/state/box.png';

export default function EmptyProductState() {
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid item>
        <Box
          component="img"
          src={boxImage}
          alt="Empty Box"
          sx={{ width: 200, height: 200, objectFit: 'contain', display: 'block' }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h2" align="center">
          No Products Available
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 300 }}>
          There are no products available yet. Please add some products first.
        </Typography>
      </Grid>
    </Grid>
  );
}
