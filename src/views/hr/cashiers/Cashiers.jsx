import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Pagination,
  Button,
  TextField,
  Grid,
  InputAdornment,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Tooltip,
} from '@mui/material';
import { Add, DeleteOutlineOutlined, Search, Visibility, VisibilityOff } from '@mui/icons-material';

import TableSkeletonLoader from '../../../ui-component/cards/Skeleton/TableSkeletonLoader';
import { deleteCashier, fetchCashiers, updateCashier } from '../../../store/actions/cashiers';
import { getAllListOutlets } from '../../../store/actions/popup';
import { userRegisters } from '../../../store/actions/auth';


export default function CashiersViews() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data = {}, loading = false, error = null, hasFetching = false } =
    useSelector((state) => state.cashiers || {});

  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openOutletDialog, setOpenOutletDialog] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [handlePreview, setHandlePreview] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateDialog, setUpdateDialog] = useState(false);

  const listOutlets = useSelector((state) => state.popup.popupData.outlets);

  const fileInputRef = useRef(null);

  const [cashiersForm, setCashiersForm] = useState({
    tempId: '',
    username: '',
    email: '',
    password: '',
    outletId: '',
    phone: '',
    role: 'kasir',
    image: null,
  });

  const itemsPerPage = 5;
  const totalPages = data?.pagination?.totalPages || 1;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!hasFetching) {
      dispatch(fetchCashiers(currentPage, itemsPerPage));
    }
  }, [dispatch, currentPage, hasFetching]);

  useEffect(() => {
    setTableData(data.cashiers || []);
  }, [data]);

  useEffect(() => {
    dispatch(getAllListOutlets());
  }, [dispatch]);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setSelectedOutlet(null);
    setCashiersForm({
      username: '',
      email: '',
      password: '',
      outletId: '',
      phone: '',
      role: 'kasir',
      image: null,
    });
    setShowPassword(false);
  };

  const handleOpenOutletDialog = () => {
    setOpenOutletDialog(true);
  };

  const handleCloseOutletDialog = () => {
    setOpenOutletDialog(false);
  };

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    setCashiersForm((prev) => ({ ...prev, outletId: outlet._id }));
    setOpenOutletDialog(false);
  };

  const handleFormChange = (field) => (event) => {
    setCashiersForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    setCashiersForm((prev) => ({ ...prev, image: file }));

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setHandlePreview((prev) => ({ ...prev, image: reader.result }));
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAddCashiers = () => {
    const formData = new FormData();
    formData.append('username', cashiersForm.username);
    formData.append('email', cashiersForm.email);
    formData.append('password', cashiersForm.password);
    formData.append('phone', cashiersForm.phone);
    formData.append('role', cashiersForm.role);
    formData.append('outletId', cashiersForm.outletId);

    if (cashiersForm.image) {
      formData.append('image', cashiersForm.image);
    }

    dispatch(userRegisters(formData)).then(() => {
      dispatch(fetchCashiers(currentPage, itemsPerPage));
    });

    handleCloseAddDialog();
  };

  // Buka dialog confirm dan simpan ID kasir yang ingin dihapus
  const handleOpenConfirmDialog = (id) => {
    setDeleteId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setDeleteId(null);
    setOpenConfirmDialog(false);
  };

  // Setelah confirm, panggil delete dan tutup dialog
  const handleConfirmDelete = () => {
    if (deleteId) {
      dispatch(deleteCashier(deleteId)).then(() => {
        dispatch(fetchCashiers(currentPage, itemsPerPage));
      });
    }
    handleCloseConfirmDialog();
  };


  const openUpdateDialog = (data) => {
    console.log(`data kasir : ${JSON.stringify(data)}`);

    console.log(`outlet : ${data.outletId}`);
    setCashiersForm({
      tempId: data._id,
      username: data.username || '',
      email: data.email || '',
      phone: data.phone || '',
      password: '',
      outletId: data.outletId._id || '',
      role: data.role || 'kasir',
      image: data.photo?.url || null,
    });
    setUpdateDialog(true);
  }

  const closeUpdateDialog = () => {
    setCashiersForm({
      tempId: '',
      username: '',
      email: '',
      password: '',
      outletId: '',
      phone: '',
      role: 'kasir',
      image: null,
    });
    setUpdateDialog(false);
  }


  const onUpdate = () => {


    // Validasi dasar
    if (!cashiersForm.username.trim()) {
      console.log('Username wajib diisi');
      return;
    }

    if (!cashiersForm.email.trim()) {
      console.log('Email wajib diisi');
      return;
    }

    if (!cashiersForm.phone.trim()) {
      console.log('Nomor telepon wajib diisi');
      return;
    }

    if (!cashiersForm.outletId) {
      console.log('Outlet wajib dipilih');
      return;
    }

    // Siapkan FormData
    const formData = new FormData();
    formData.append('username', cashiersForm.username);
    formData.append('email', cashiersForm.email);
    formData.append('password', cashiersForm.password); // Boleh kosong kalau gak update password
    formData.append('phone', cashiersForm.phone);
    formData.append('outletId', cashiersForm.outletId);

    if (cashiersForm.image && typeof cashiersForm.image !== 'string') {
      formData.append('image', cashiersForm.image);
    }

    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }



    dispatch(updateCashier(cashiersForm.tempId, formData)).then(() => {
      dispatch(fetchCashiers(currentPage, itemsPerPage));
    });

    closeUpdateDialog();
  }


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
                  List of cashiers
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  Manage orders easily. Search, filter, or add new ones.
                </Typography>
              </Grid>

              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  size="small"
                  placeholder="Search cashier name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton size="small" onClick={handleOpenAddDialog}>
                  <Add />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Table component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Outlet</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableSkeletonLoader rows={itemsPerPage} cols={6} />
                ) : tableData.length > 0 ? (
                  tableData.map((cashier) => (
                    <TableRow key={cashier._id}>
                      <TableCell>
                        <Avatar
                          src={cashier.photo?.url}
                          alt={cashier.username}
                          sx={{ width: 40, height: 40 }}
                        />
                      </TableCell>
                      <TableCell>{cashier.username}</TableCell>
                      <TableCell>{cashier.email}</TableCell>
                      <TableCell>{cashier.outletId?.name}</TableCell>
                      <TableCell>{cashier.outletId?.location?.address}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => openUpdateDialog(cashier)}
                            sx={{
                              mr: 1,
                              borderColor: '#ccc',
                              color: 'grey.700',
                              '&:hover': {
                                borderColor: 'grey.500',
                                backgroundColor: 'grey.200',
                              },
                            }}
                          >
                            Edit
                          </Button>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenConfirmDialog(cashier._id)}
                          >
                            <DeleteOutlineOutlined />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No cashiers found
                    </TableCell>
                  </TableRow>
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
                  '& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-previousNext)':
                  {
                    border: '1px solid',
                    borderColor: 'primary.main',
                  },
                }}
              />
            </Box>
          </Box>
        </Card>

        {/* Dialog tambah kasir */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
          <DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: -1 }}>
              <Avatar
                onClick={handleAvatarClick}
                src={handlePreview?.image || ''}
                alt="Cashier Avatar"
                sx={{
                  width: 96,
                  height: 96,
                  cursor: 'pointer',
                  bgcolor: cashiersForm.image ? 'transparent' : 'none',
                  border: cashiersForm.image ? 'none' : '2px dashed',
                  borderColor: 'grey.400',
                }}
              />
            </Box>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={cashiersForm.username}
              onChange={handleFormChange('username')}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={cashiersForm.email}
              onChange={handleFormChange('email')}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              value={cashiersForm.phone}
              onChange={handleFormChange('phone')}
              type="tel"
              placeholder="08123456789"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={cashiersForm.password}
              onChange={handleFormChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="outlined" onClick={handleOpenOutletDialog} sx={{ mt: 2 }}>
              {selectedOutlet ? `Outlet: ${selectedOutlet.name}` : 'Choose Outlet'}
            </Button>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Cancel</Button>
            <Button
              variant="contained"
              disabled={
                !cashiersForm.username ||
                !cashiersForm.email ||
                !cashiersForm.password ||
                !cashiersForm.phone ||
                !cashiersForm.outletId
              }
              onClick={handleAddCashiers}
            >
              Add Cashier
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog pilih outlet */}
        <Dialog open={openOutletDialog} onClose={handleCloseOutletDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Select Outlet</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {listOutlets?.map((outlet) => (
                <Box
                  key={outlet._id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 1,
                    cursor: 'pointer',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                  onClick={() => handleSelectOutlet(outlet)}
                >
                  <Avatar src={outlet.photo?.url} alt={outlet.name} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">{outlet.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {outlet.location?.address}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOutletDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog konfirmasi hapus kasir */}
        <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
          <DialogTitle>Delete Cashier</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this cashier?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
            <Button color="error" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={updateDialog} onClose={closeUpdateDialog} maxWidth="sm" fullWidth>
          <DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: -1 }}>
              <Avatar
                onClick={handleAvatarClick}
                src={handlePreview?.image || cashiersForm.image || ''}
                alt="Cashier Avatar"
                sx={{
                  width: 96,
                  height: 96,
                  cursor: 'pointer',
                  bgcolor: cashiersForm.image ? 'transparent' : 'none',
                  border: cashiersForm.image ? 'none' : '2px dashed',
                  borderColor: 'grey.400',
                }}
              />
            </Box>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={cashiersForm.username}
              onChange={handleFormChange('username')}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={cashiersForm.email}
              onChange={handleFormChange('email')}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              value={cashiersForm.phone}
              onChange={handleFormChange('phone')}
              type="tel"
              placeholder="08123456789"
            />

            <TextField
              fullWidth
              label="Password (kosongkan jika tidak diubah)"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={cashiersForm.password}
              onChange={handleFormChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="outlined" onClick={handleOpenOutletDialog} sx={{ mt: 2 }}>
              {selectedOutlet ? `Outlet: ${selectedOutlet.name}` : 'Pilih Outlet'}
            </Button>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeUpdateDialog}>Cancel</Button>
            <Button
              variant="contained"

              onClick={() => onUpdate()}
            >
              Update Cashier
            </Button>
          </DialogActions>
        </Dialog>

      </>
    );
  }