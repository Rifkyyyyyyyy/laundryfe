import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export default function PopularCard({ isLoading }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid size={12}>
                <Grid container sx={{ alignContent: 'center', justifyContent: 'space-between' }}>
                  <Grid>
                    <Typography variant="h4">Produk Laundry Terlaris</Typography>
                  </Grid>
                  <Grid>
                    <IconButton size="small" sx={{ mt: -0.625 }} onClick={handleClick}>
                      <MoreHorizOutlinedIcon
                        fontSize="small"
                        sx={{ cursor: 'pointer' }}
                        aria-controls="menu-popular-card"
                        aria-haspopup="true"
                      />
                    </IconButton>
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem onClick={handleClose}>Hari Ini</MenuItem>
                      <MenuItem onClick={handleClose}>Bulan Ini</MenuItem>
                      <MenuItem onClick={handleClose}>Tahun Ini</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={12} sx={{ mt: -1 }}>
                <BajajAreaChartCard />
              </Grid>

              {/* Daftar Produk Laundry */}
              {[
                { name: 'Cuci Kering Biasa', price: 15000, status: 'Naik', color: 'success' },
                { name: 'Cuci Setrika Express', price: 25000, status: 'Turun', color: 'orange' },
                { name: 'Setrika Saja', price: 12000, status: 'Naik', color: 'success' },
                { name: 'Cuci Bed Cover', price: 35000, status: 'Turun', color: 'orange' },
                { name: 'Dry Clean Jas', price: 50000, status: 'Turun', color: 'orange' }
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <Grid container direction="column">
                    <Grid>
                      <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                        <Grid item xs>
                          <Typography variant="subtitle1" color="inherit">
                            {item.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                Rp{item.price.toLocaleString('id-ID')}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: '5px',
                                  bgcolor: `${item.color}.light`,
                                  color: `${item.color}.dark`
                                }}
                              >
                                {item.status === 'Naik' ? (
                                  <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                ) : (
                                  <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                )}
                              </Avatar>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle2" sx={{ color: `${item.color}.dark` }}>
                        {item.status === 'Naik' ? 'Penjualan Naik' : 'Penjualan Turun'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                </React.Fragment>
              ))}
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              Lihat Semua
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
}

PopularCard.propTypes = { isLoading: PropTypes.bool };
