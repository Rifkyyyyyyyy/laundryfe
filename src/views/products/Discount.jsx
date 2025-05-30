import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDiscounts } from "../../store/actions/discount";
import { Box, Typography, CircularProgress, Grid2, Button, IconButton, Card, Tooltip } from "@mui/material";
import { useTheme } from "@emotion/react";
import MainCard from 'ui-component/cards/MainCard';
import { FilterList, Add, Delete, Edit } from '@mui/icons-material';

export default function DiscountViews() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDiscountId, setSelectedDiscountId] = useState(null); // Track selected discount
  const [page, setPage] = useState(1);
  const limit = 8;
  const observer = useRef();



  const {
    data = {},
    loading = false,
    error = null,
    hasFetching = false
  } = useSelector((state) => state.discounts || {});

  const discounts = data.discounts || [];
  const totalPages = data.pagination?.totalPages || 1;




  useEffect(() => {
    if (!hasFetching) {
      dispatch(fetchAllDiscounts());
    }

  }, [dispatch]);

  const handleCardSelect = (id) => {
    setSelectedDiscountId(id);
  };

  const lastDiscountsRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );


  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress sx={{ color: 'secondary.main' }} />
        </Box>
      ) : error ? (
        <Box sx={{ padding: 2 }}>
          <Typography color="error">Error loading discounts: {error.message}</Typography>
        </Box>
      ) : (
        <Box>
          {/* Header Section */}
          <Box mb={4}>
            <Grid2 container justifyContent="space-between" alignItems="center" >
              <Grid2 item>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  List of Discounts
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  Here is the list of current discounts. Use the controls to add, update, or remove discounts as needed.
                </Typography>
              </Grid2>

              <Grid2 item>
                <Card sx={{ display: 'flex', gap: 2, padding: '4px' }}>
                  <Tooltip title="Filter Discount">
                    <IconButton color="primary">
                      <FilterList />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Discount">
                    <IconButton >
                      <Delete />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Update Discount">
                    <IconButton >
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Add Discount">
                    <IconButton >
                      <Add />
                    </IconButton>
                  </Tooltip>


                </Card>
              </Grid2>
            </Grid2>
          </Box>

          {/* Main Grid for Discounts */}
          <Grid2 container spacing={3}>
            {discounts.length > 0 ? (
              discounts.map((discount, index) => {
                const isLast = index === discounts.length - 1;

                return (
                  <Grid2
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    key={discount._id}
                    ref={isLast ? lastDiscountsRef : null} // Optional, kalau mau infinite scroll
                  >
                    <MainCard
                      border={selectedDiscountId === discount._id}
                      content={false}
                      sx={{
                        position: 'relative',
                        width: '300px',
                        overflow: 'hidden',
                        bgcolor: theme.palette.secondary.dark,
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          width: 210,
                          height: 210,
                          background: theme.palette.secondary[800],
                          borderRadius: '50%',
                          top: { xs: -85 },
                          right: { xs: -95 },
                          zIndex: 0,
                        },
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          width: 210,
                          height: 210,
                          background: theme.palette.secondary[800],
                          borderRadius: '50%',
                          top: { xs: -125 },
                          right: { xs: -15 },
                          opacity: 0.5,
                          zIndex: 0,
                        },
                      }}
                      onClick={() => handleCardSelect(discount._id)}
                    >
                      <Box sx={{ p: 2.25, position: 'relative', zIndex: 1 }}>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                          {discount.code}
                        </Typography>
                        <Typography variant="body2" color="secondary.200">
                          Discount: {discount.discountAmount}% off
                        </Typography>
                        <Typography variant="body2" color="secondary.200">
                          Valid From: {new Date(discount.validFrom).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="secondary.200">
                          Valid Until: {new Date(discount.validUntil).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                          <Typography variant="body2" color="secondary.200">
                            Max Usage: {discount.maxUsage}
                          </Typography>
                        </Box>
                      </Box>
                    </MainCard>
                  </Grid2>
                );
              })
            ) : (
              <Typography color="secondary.200">No discounts available.</Typography>
            )}
          </Grid2>

        </Box>
      )}
    </Box>
  );
}
