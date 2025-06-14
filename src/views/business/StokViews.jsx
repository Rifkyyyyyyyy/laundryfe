import React, { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Alert, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Button, Snackbar, Card, Grid, Divider, IconButton, TextField, InputAdornment,
    Dialog, DialogTitle, DialogContent, DialogActions, Avatar, CircularProgress,
    MenuItem,
    Pagination
} from "@mui/material";
import { Add, DeleteOutlineOutlined, FilterList, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createStock, deleteStockByIdThunk, getAllStockByOutlet, getStock, updateStock } from "../../store/actions/stock";
import { getAllListOutlets } from "../../store/actions/popup";

import TableSkeletonLoader from "../../ui-component/cards/Skeleton/TableSkeletonLoader";


export default function StockViews() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const limit = 5;

    const [inventoryForm, setInventoryForm] = useState({
        name: '',
        stock: 0,
        satuan: 'pcs',
        outletId: '',
        createdBy: '',
        description: '',
        category: '',
        minStock: 0,
        pricePerUnit: 0
    });

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openOutletDialog, setOpenOutletDialog] = useState(false);
    const [selectedOutlet, setSelectedOutlet] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedStockIndex, setSelectedStockIndex] = useState(null);
    const [updatedStock, setUpdatedStock] = useState(0);
    const [updateStockDialog, setUpdateStockDialog] = useState(false);
    const [openDeletedPopup, setOpenDeletePopup] = useState(false);
    const [deleteId, setDeletedId] = useState(null);


    const { user } = useSelector((state) => state.auth || {});
    const isOwner = user?.role === "owner";
    const outletId = user.outlet?._id;

    const listOutlets = useSelector((state) => state.popup.popupData.outlets);
    const {
        data = {},
        hasFetching = false,
        loading = false,
        error = null,
    } = useSelector((state) => state.stock || {});

    const stockList = data.stock || [];
    const pagination = data.pagination || {};
    const totalPages = pagination.totalPages || 1;

    useEffect(() => {
        if (!hasFetching) {
            if (isOwner) {
                dispatch(getStock(page, limit));
            } else {
                dispatch(getAllStockByOutlet(page, limit, outletId));
            }
        }
    }, [hasFetching, dispatch, outletId, page]);

    useEffect(() => {
        dispatch(getAllListOutlets());
    }, [dispatch]);


    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const handleOpenAddDialog = () => setOpenAddDialog(true);
    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setInventoryForm({
            name: '',
            stock: 0,
            satuan: 'pcs',
            outletId: '',
            createdBy: user?.id || '',
            description: '',
            category: '',
            minStock: 0,
            pricePerUnit: 0
        });
        setSelectedOutlet(null);
    };


    const handleOpenOutletDialog = () => setOpenOutletDialog(true);
    const handleCloseOutletDialog = () => setOpenOutletDialog(false);

    const handleSelectOutlet = (outlet) => {
        setSelectedOutlet(outlet);
        setInventoryForm({ ...inventoryForm, outletId: outlet._id });
        setOpenOutletDialog(false);
    };

    const handleChangeInventory = (e) => {
        const { name, value } = e.target;
        setInventoryForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    useEffect(() => {
        if (user?.id) {
            setInventoryForm((prev) => ({
                ...prev,
                createdBy: user.id
            }));
        }
    }, [user]);

    const handleSubmitInventory = () => {

        dispatch(createStock(inventoryForm))
        handleCloseAddDialog();
        setOpenSnackbar(true);
        // dispatch action here if needed
    };


    console.log(`stock : ${JSON.stringify(data)}`);

    const handleOpenUpdateStockDialog = (index) => {
        setSelectedStockIndex(index);
        setUpdatedStock(stockList[index].stock); // nilai awal
        setUpdateStockDialog(true);
    };

    const handleCloseUpdateStockDialog = () => {
        setUpdateStockDialog(false);
        setSelectedStockIndex(null);
    };


    const handleUpdateStockSubmit = () => {
        const selectedStock = stockList[selectedStockIndex];
        const updatedStockInt = parseInt(updatedStock, 10);

        if (isNaN(updatedStockInt)) {

            return;
        }


        dispatch(updateStock(selectedStock._id, updatedStockInt));

        setUpdateStockDialog(false);
        setSelectedStockIndex(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const action = user.role != 'owner' ? dispatch(getAllStockByOutlet(page, limit, outletId)) : dispatch(getStock(page, limit))
    }


    const deleteStock = (id) => {
        dispatch(deleteStockByIdThunk(id))
    }

    const handleOpenDeleteDialog = (id) => {
        setDeletedId(id)
        setOpenDeletePopup(true);
    }


    const handleCloseDeletePopup = () => {
        setDeletedId(null)
        setOpenDeletePopup(false);
    }



    return (
        <>
            {error && (
                <Snackbar open={true} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            )}

            <Card>
                <Box p={3}>
                    <Box display="flex" justifyContent="space-between" mb={3}>
                        <Grid item>
                            <Typography variant="h4" fontWeight={600}>Inventory</Typography>
                            <Typography color="text.secondary" mt={1}>Manage and monitor inventory stock</Typography>
                        </Grid>
                        <Box display="flex" alignItems="center" gap={1}>
                            <TextField
                                size="small"
                                placeholder="Search inventory"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
                                }}
                            />
                            <IconButton size="small"><FilterList /></IconButton>
                            <IconButton size="small" disabled={!isOwner} onClick={handleOpenAddDialog}><Add /></IconButton>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {["Name", "Unit", "Stock", "Price", "Category", "Outlet", "Action"].map((head) => (
                                        <TableCell key={head} sx={{ fontWeight: 700 }}>{head}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableSkeletonLoader cols={9} rows={5} />
                                ) : stockList.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            Tidak ada data stock
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <>
                                        {stockList.map((item, index) => (
                                            <TableRow key={item._id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.satuan}</TableCell>
                                                <TableCell>{item.stock}</TableCell>
                                                {/* <TableCell>{item.minStock}</TableCell> */}
                                                <TableCell>{item.pricePerUnit}</TableCell>
                                                <TableCell>{item.category}</TableCell>
                                                <TableCell>{item.outletId?.name || "-"}</TableCell>
                                                <TableCell>
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => handleOpenUpdateStockDialog(index)}
                                                            size="small"
                                                            sx={{ minWidth: 80 }} // <-- lebar tombol diatur di sini
                                                        >
                                                            Edit Stock
                                                        </Button>
                                                        <IconButton size="small" onClick={() => handleOpenDeleteDialog(item._id)} disabled={user.role != 'owner'}>
                                                            <DeleteOutlineOutlined />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </>
                                )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, newPage) => handleChangePage(null, newPage)}
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

            {/* Dialog: List Outlet */}
            <Dialog open={openOutletDialog} onClose={handleCloseOutletDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Select Outlet</DialogTitle>
                <DialogContent>
                    <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                        {listOutlets?.map((outlet) => (
                            <Box
                                key={outlet._id}
                                onClick={() => handleSelectOutlet(outlet)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 1,
                                    borderRadius: 1,
                                    cursor: "pointer",
                                    "&:hover": { bgcolor: "grey.100" }
                                }}
                            >
                                <Avatar src={outlet.photo?.url} alt={outlet.name} sx={{ mr: 2 }} />
                                <Box>
                                    <Typography>{outlet.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{outlet.location?.address}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOutletDialog}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog: Add Inventory */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Add Inventory</DialogTitle>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <TextField name="name" label="Name" value={inventoryForm.name} onChange={handleChangeInventory} fullWidth />
                        <TextField name="stock" label="Stock" type="number" value={inventoryForm.stock} onChange={handleChangeInventory} fullWidth />
                        <TextField
                            name="satuan"
                            label="Satuan"
                            value={inventoryForm.satuan}
                            onChange={handleChangeInventory}
                            fullWidth
                            select
                        >
                            {[
                                'pcs',
                                'liter',
                                'paket',
                                'lembar',
                                'kg',
                                'meter',
                                'box',
                                'botol',
                                'kaleng',
                                'bungkus',
                                'buah',
                                'roll',
                                'lusin',
                                'rim',
                                'karung',
                                'sak',
                                'set',
                                'unit',
                                'pasang'
                            ].map((satuan) => (
                                <MenuItem key={satuan} value={satuan}>
                                    {satuan}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField name="minStock" label="Min Stock" type="number" value={inventoryForm.minStock} onChange={handleChangeInventory} fullWidth />
                        <TextField name="pricePerUnit" label="Price Per Unit" type="number" value={inventoryForm.pricePerUnit} onChange={handleChangeInventory} fullWidth />
                        <TextField
                            name="description"
                            label="Description"
                            value={inventoryForm.description}
                            onChange={handleChangeInventory}
                            fullWidth
                            multiline
                            maxRows={4}
                            InputProps={{
                                style: {
                                    minHeight: 96,  // kira-kira tinggi 4 baris (24px per baris x 4)
                                    maxHeight: 96,
                                    overflow: 'auto'
                                }
                            }}
                        />

                        <TextField
                            select
                            label="Kategori"
                            value={inventoryForm.category}
                            onChange={(e) =>
                                setInventoryForm({ ...inventoryForm, category: e.target.value })
                            }
                            fullWidth
                            margin="normal"
                        >
                            {['Sabun', 'Plastik', 'Pewangi', 'Deterjen', 'Lainnya'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button variant="outlined" onClick={handleOpenOutletDialog}>
                            Select Outlet
                        </Button>
                        {selectedOutlet && (
                            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                Outlet terpilih: {selectedOutlet.name}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmitInventory}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={updateStockDialog} onClose={handleCloseUpdateStockDialog} maxWidth="xs" fullWidth>
                <DialogTitle>Update Stock</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Stock"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={updatedStock}
                        onChange={(e) => setUpdatedStock(Number(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdateStockDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdateStockSubmit}>Update</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeletedPopup} onClose={handleCloseDeletePopup}>
                <DialogTitle>Delete Stock</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this stock?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeletePopup}>Cancel</Button>
                    <Button color="error" >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
