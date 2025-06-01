import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  MenuItem,
  Tooltip,
  Divider,
  Pagination,
} from '@mui/material';

import { Search, FilterList, Add, Close, Download } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderByOutletId, createOrder } from '../../../store/actions/order';
import { calculateOrder } from '../../../store/actions/calculate';
import { getSimplyProductsByOutletThunk } from '../../../store/actions/popup';
import TableSkeletonLoader from '../../../ui-component/cards/Skeleton/TableSkeletonLoader';
import DatePicker from "react-datepicker";


import ProductDialog from './ProductDialog';
import QuantityDialog from './QuanityDialog';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from './Invoice';




export default function OrderView() {
  const dispatch = useDispatch();

  const { data = {}, loading = false, error = null, hasFetching = false } = useSelector(
    (state) => state.orders || {}
  );
  const { user } = useSelector((state) => state.auth || {});
  const outletId = user?.outlet?._id;
  const cashiers = user?.id;
  const orders = data?.orders || [];
  const productList = useSelector(
    (state) => state.popup.popupData.products || {}
  );

  const totalPrice = useSelector((state) => state.calculate.total ?? 0);




  const [searchTerm, setSearchTerm] = useState("");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [member, setMember] = useState("");
  const [serviceType, setServiceType] = useState('regular');
  const [pickup, setPickup] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [openAddOrder, setOpenAddOrder] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openQuantityDialog, setOpenQuantityDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = data?.pagination?.totalPages || 1;


  console.log(JSON.stringify(productList));


  useEffect(() => {
    if (!hasFetching) {
      dispatch(fetchOrderByOutletId(currentPage, itemsPerPage, outletId));
    }
  }, [dispatch, outletId, hasFetching]);

  useEffect(() => {
    if (outletId) {
      console.log('cihuy');
      dispatch(getSimplyProductsByOutletThunk(outletId));
    }
  }, [dispatch, outletId]);

  // Open/close dialogs
  const handleOpenAddOrder = () => setOpenAddOrder(true);
  const handleCloseAddOrder = () => {
    setOpenAddOrder(false);
    setSelectedProducts([]);
  };

  const handleOpenProductDialog = () => setOpenProductDialog(true);
  const handleCloseProductDialog = () => setOpenProductDialog(false);


  const handleSelectProduct = (product) => {
    setCurrentProduct(product);
    setOpenQuantityDialog(true);

  };

  const handleAddProductWithQuantity = (quantity) => {
    const productId = currentProduct._id;
    const exists = selectedProducts.find((p) => p.id === productId);

    if (exists) {
      setSelectedProducts((prev) => {
        const updated = prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + quantity } : p
        );

        return updated;
      });
    } else {
      setSelectedProducts((prev) => {
        const updated = [...prev, { id: productId, quantity }];

        return updated;
      });
    }

    setOpenQuantityDialog(false);
    setCurrentProduct(null);
  };


  const handleCancelQuantity = () => {
    setOpenQuantityDialog(false);
    setCurrentProduct(null);
  };


  useEffect(() => {
    if (selectedProducts.length === 0) return;
    dispatch(
      calculateOrder({
        items: selectedProducts,
        serviceType,
        memberLevel: member.length === 16 ? member : null,
      })
    );
  }, [selectedProducts, dispatch, serviceType, member]);


  const handleAddOrders = () => {

    dispatch(
      createOrder(
        {
          processedBy: cashiers,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          outletId,
          items: selectedProducts,
          pickupDate: pickup,
          note,
          serviceType
        }
      )
    );

    // Tutup dialog
    setOpenAddOrder(false);

    // Reset semua field input ke default
    setName("");
    setPhone("");
    setEmail("");
    setMember("");
    setNote("");
    setServiceType("regular");
    setPickup(null);
    setSelectedProducts([]);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);

    if (searchTerm.trim() !== '') {

    } else {

    }
  };




  return (
    <>
      <Card>
        <Box p={3}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            mb={3}
          >
            <Grid item>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                List of Orders
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                Manage orders easily. Search, filter, or add new ones.
              </Typography>

            </Grid>

            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                size="small"
                placeholder="Search by customer name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <IconButton size="small">
                <FilterList />
              </IconButton>

              <IconButton size="small" onClick={handleOpenAddOrder} disabled={user.role === 'owner'}>
                <Add />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Code</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Pickup Date</TableCell>
                <TableCell>Invoice</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableSkeletonLoader cols={9} rows={5} />
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Tidak ada data order
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderCode}</TableCell>
                    <TableCell>{order.customerName || "-"}</TableCell>
                    <TableCell>{order.customerPhone || "-"}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.paymentStatus || "-"}</TableCell>
                    <TableCell>{order.paymentType || "-"}</TableCell>
                    <TableCell>{order.serviceType || "-"}</TableCell>
                    <TableCell>
                      {order.pickupDate
                        ? new Date(order.pickupDate).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {order.paymentStatus === 'unpaid' ? (
                        <Tooltip title="Bayar dulu untuk download kwitansi">
                          <span>
                            <IconButton color="primary" disabled>
                              <Download />
                            </IconButton>
                          </span>
                        </Tooltip>
                      ) : (
                        <PDFDownloadLink
                          document={<Invoice order={order} />}
                          fileName={`${order.orderCode}-invoice.pdf`}
                          style={{ textDecoration: 'none' }}
                        >
                          {({ loading }) =>
                            loading ? (
                              'Loading...'
                            ) : (
                              <Tooltip title="Download Kwitansi">
                                <IconButton color="primary" aria-label="download kwitansi">
                                  <Download />
                                </IconButton>
                              </Tooltip>
                            )
                          }
                        </PDFDownloadLink>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              disabled={loading}
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '4px',
                  margin: '0 2px',
                },
                '& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-previousNext)': {
                  border: '1px solid',
                  borderColor: 'primary.main',
                },
              }}
            />
          </Box>
        </Box>
      </Card>

      {/* Dialog Add Order */}
      <Dialog
        open={openAddOrder}
        onClose={handleCloseAddOrder}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, p: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: 22, mb: 1 }}>
          Add New Order
        </DialogTitle>
        <DialogContent dividers sx={{ pb: 0 }}>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
            <TextField
              label="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size="small"
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
            />
            <TextField
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              size="small"
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size="small"
              sx={{ gridColumn: "span 2", "& .MuiInputBase-root": { height: 40 } }}
            />
            <TextField
              label="Member Code"
              value={member}
              onChange={(e) => setMember(e.target.value)}
              fullWidth
              size="small"
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
            />
            <TextField
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
            />
          </Box>

          <Box display="flex" gap={2} mb={2} alignItems="center">
            <Box flex={1}>
              <Typography variant="subtitle2" mb={1}>
                Pickup Date
              </Typography>
              <DatePicker
                selected={pickup}
                onChange={(date) => setPickup(date)}
                dateFormat="yyyy-MM-dd"
                customInput={
                  <TextField
                    fullWidth
                    size="small"
                    sx={{ "& .MuiInputBase-root": { height: 40 } }}
                  />
                }
              />
            </Box>

            <Box flex={1}>
              <TextField
                select
                label="Service Type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                fullWidth
                size="small"
                sx={{ "& .MuiInputBase-root": { height: 40 } }}
              >
                <MenuItem value="regular">Regular</MenuItem>
                <MenuItem value="express">Express</MenuItem>
                <MenuItem value="super_express">Super Express</MenuItem>
              </TextField>
            </Box>
          </Box>

          <Button variant="outlined" onClick={handleOpenProductDialog} fullWidth sx={{ mb: 2 }}>
            See Product
          </Button>

          <Box display="flex" flexWrap="wrap" gap={1} minHeight={40} alignItems="center" mb={2}>
            {selectedProducts.length === 0 ? (
              <Typography color="text.secondary" fontStyle="italic">
                No products selected
              </Typography>
            ) : (
              selectedProducts.map((p) => {
                const prod = productList.find((prod) => prod._id === p.id);
                return (
                  <Chip
                    key={p.id}
                    label={`${prod?.name || "Unknown"} x ${p.quantity}`}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: "medium", cursor: 'pointer' }}
                    onClick={() =>
                      setSelectedProducts((prev) => prev.filter((item) => item.id !== p.id))
                    }
                  />
                );
              })
            )}
          </Box>

          <Typography variant="h6" fontWeight="bold" textAlign="right">
            Total: {selectedProducts.length > 0 ? totalPrice : 0}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ pt: 2 }}>
          <Button onClick={handleCloseAddOrder} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddOrders}>
            Save Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Product */}
      <ProductDialog
        open={openProductDialog}
        onClose={handleCloseProductDialog}
        products={productList}
        selectedProducts={selectedProducts}
        onSelectProduct={(product) => {
          handleSelectProduct(product);
          handleCloseProductDialog();
        }}
      />

      {/* Dialog Quantity */}
      <QuantityDialog
        open={openQuantityDialog}
        product={currentProduct}
        onClose={handleCancelQuantity}
        onConfirm={handleAddProductWithQuantity}
      />
    </>
  );
}  