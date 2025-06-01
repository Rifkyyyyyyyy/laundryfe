import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDiscounts, fetchAllDiscounts, fetchAllDiscountsByOutlets } from "../../store/actions/discount";
import { Box, Typography, CircularProgress, Grid2, Button, IconButton, Card, Tooltip, Dialog, DialogContent, InputLabel, Select, TextField, FormControl, MenuItem, Chip, Avatar, Stack, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import MainCard from 'ui-component/cards/MainCard';
import { FilterList, Add, Delete, Edit } from '@mui/icons-material';
import DatePicker from "react-datepicker";
import { getAllListOutlets, getSimplyProducts } from "../../store/actions/popup";
import DiscountCard from "../../ui-component/cards/Discount";
import { createOrder } from "../../store/actions/order";

export default function DiscountViews() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [discountForm, setDiscountForm] = useState({
    code: '',
    discountAmount: 0,
    validFrom: null,
    validUntil: null,
    statusDiscount: 'active',
    applicableProductIds: [],
    maxUsage: 0

  })
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [showAddPopup, setShowAddPopoup] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { user } = useSelector((state) => state.auth || {});
  const [page, setPage] = useState(1);
  const limit = 8;
  const observer = useRef();


  const listProducts = useSelector(
    (state) => state.popup.popupData.products || []
  );



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
      if (user.role == 'owner') {
        dispatch(fetchAllDiscounts());
      } else if (user.role == 'kasir') {
        dispatch(fetchAllDiscountsByOutlets(page, limit, user.outlet?._id))
      }
    }

  }, [dispatch]);



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

  const handleOpenAddDialog = () => {
    setDiscountForm({
      code: '',
      discountAmount: 0,
      validFrom: null,
      validUntil: null,
      statusDiscount: 'active',
      applicableProductIds: [],
      maxUsage: 0
    });
    setShowAddPopoup(true);
  };

  const handleCloseAddDialog = () => {
    setShowAddPopoup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscountForm((prev) => ({
      ...prev,
      [name]: name === 'discountAmount' || name === 'maxUsage' ? Number(value) : value,
    }));
  };

  const handleDateChange = (name, date) => {
    setDiscountForm((prev) => ({
      ...prev,
      [name]: date,
    }));
  };


  const handleSubmit = () => {
    dispatch(createDiscounts(discountForm));

    // Reset produk terpilih dan applicableProductIds di form
    setSelectedProduct([]);
    setDiscountForm(prev => ({
      ...prev,
      applicableProductIds: [],
    }));

    setShowAddPopup(false);
  };



  const handleOpenProductPopup = () => setShowProductPopup(true);
  const handleCloseProductPopup = () => {
    const productIds = selectedProduct.map(p => p._id || p.id); // sesuaikan key id-nya

    // Update discountForm
    setDiscountForm(prev => ({
      ...prev,
      applicableProductIds: productIds
    }));

    setShowProductPopup(false);
  };




  const handleToggleProduct = (product) => {
    setSelectedProduct((prevSelected) => {
      const isSelected = prevSelected.some(p => p.name === product.name);
      if (isSelected) {
        return prevSelected.filter(p => p.name !== product.name);
      } else {
        return [...prevSelected, product];
      }
    });
  };



  useEffect(() => {
    dispatch(getSimplyProducts())

  }, [dispatch])



  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // lebih baik height fullscreen agar spinner di tengah layar
          }}
        >
          <CircularProgress sx={{ color: 'secondary.main' }} />
        </Box>
      ) : error ? (
        <Box sx={{ padding: 2 }}>
          <Typography color="error">
            Error loading discounts: {error.message}
          </Typography>
        </Box>
      ) : (
        <Box>
          {/* Header Section */}
          <Box mb={4}>
            <Grid2 container justifyContent="space-between" alignItems="center">
              <Grid2 item>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  List of Discounts
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  Here is the list of current discounts. Use the controls to add,
                  update, or remove discounts as needed.
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
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Update Discount">
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Add Discount">
                    <IconButton onClick={handleOpenAddDialog} disabled={user.role != 'owner'}>
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
                  <Grid2 item xs={12} sm={12} md={6} key={discount._id} ref={isLast ? lastDiscountsRef : null}>
                    <DiscountCard discount={discount} />
                  </Grid2>

                );
              })
            ) : (
              <Typography color="secondary.200">No discounts available.</Typography>
            )}
          </Grid2>
        </Box>
      )}

      <Dialog open={showAddPopup} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h5" gutterBottom>
            Add New Discount
          </Typography>

          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
            noValidate
            autoComplete="off"
          >


            <TextField
              label="Discount Code"
              name="code"
              value={discountForm.code.toUpperCase()}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />

            <TextField
              label="Discount Amount (%)"
              name="discountAmount"
              type="number"
              value={discountForm.discountAmount}
              onChange={(e) => {
                let value = e.target.value;

                // Batasi panjang maksimal 3 karakter
                if (value.length > 3) return;

                // Jika kosong, update biar bisa hapus angka
                if (value === '') {
                  setDiscountForm(prev => ({
                    ...prev,
                    discountAmount: ''
                  }));
                  return;
                }

                // Cek apakah angka dan dalam range 1-100
                const numericValue = Number(value);
                if (numericValue >= 1 && numericValue <= 100) {
                  setDiscountForm(prev => ({
                    ...prev,
                    discountAmount: value
                  }));
                }
              }}
              variant="outlined"
              fullWidth
              inputProps={{ min: 1, max: 100 }}
            />

            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" onClick={handleOpenProductPopup}>
                Select Product
              </Button>

              {selectedProduct.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    {selectedProduct.map((prod, idx) => (
                      <Grid item xs={6} sm={4} md={3} key={idx}>
                        <Chip label={prod.name} sx={{ width: '100%' }} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>


            <Stack spacing={2}>
              <Box>
                <label
                  style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#666' }}
                  htmlFor="validFrom"
                >
                  Valid From
                </label>
                <input
                  id="validFrom"
                  type="date"
                  value={discountForm.validFrom || ''}
                  onChange={(e) => handleDateChange('validFrom', e.target.value)}
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    padding: '0 12px',
                    fontSize: 14,
                  }}
                  placeholder="Pilih tanggal mulai"
                />
              </Box>

              <Box>
                <label
                  style={{ display: 'block', marginBottom: 4, fontWeight: 500, color: '#666' }}
                  htmlFor="validUntil"
                >
                  Valid Until
                </label>
                <input
                  id="validUntil"
                  type="date"
                  value={discountForm.validUntil || ''}
                  onChange={(e) => handleDateChange('validUntil', e.target.value)}
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    padding: '0 12px',
                    fontSize: 14,
                  }}
                  placeholder="Pilih tanggal akhir"
                />
              </Box>
            </Stack>

            <TextField
              label="Max Usage"
              name="maxUsage"
              type="number"
              value={discountForm.maxUsage}
              onChange={(e) => {
                let value = e.target.value;

                // Batasi agar maxUsage tidak negatif dan maksimal 9999 (contoh)
                if (value === '') {
                  setDiscountForm(prev => ({ ...prev, maxUsage: '' }));
                  return;
                }

                const numericValue = Number(value);
                if (numericValue >= 0 && numericValue <= 9999) {
                  setDiscountForm(prev => ({ ...prev, maxUsage: numericValue }));
                }
              }}
              variant="outlined"
              fullWidth
              inputProps={{ min: 0, max: 9999 }}
            />




            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-discount-label">Status</InputLabel>
              <Select
                labelId="status-discount-label"
                id="statusDiscount"
                name="statusDiscount"
                value={discountForm.statusDiscount}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>



            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleCloseAddDialog} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={showProductPopup} onClose={handleCloseProductPopup} maxWidth="xs" fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Select Product
          </Typography>


          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 1,
            }}
          >
            {listProducts.map((product, index) => {
              const isSelected = selectedProduct.some(p => p.name === product.name);
              return (
                <Chip
                  key={index}
                  avatar={<Avatar alt={product.name} src={product.url} />}
                  label={product.name}
                  variant={isSelected ? 'filled' : 'outlined'}
                  color={isSelected ? 'primary' : 'default'}
                  clickable
                  onClick={() => handleToggleProduct(product)}
                />
              );
            })}
          </Box>


          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleCloseProductPopup}>Close</Button>
          </Box>
        </DialogContent>
      </Dialog>



    </Box>
  )
};
