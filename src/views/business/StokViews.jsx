import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../../store/actions/stock";

import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Pagination,
    Snackbar,
    Card,
    Grid
} from "@mui/material";

export default function StockViews() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1); // start from 1 for API compatibility
    const limit = 5;

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const outletId = user.outlet?._id;

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
        if (!hasFetching && outletId) {
            dispatch(getAllStock(page, limit, outletId));
        }
    }, [hasFetching, dispatch, outletId, page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(getAllStock(newPage, limit, outletId));
    };

    return (
        <>

            {error && (
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity="error" variant="filled">
                        {error}
                    </Alert>
                </Snackbar>
            )}

            <Card>
                <Box p={3}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={3}>
                        <Grid item>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                List of Laundry Services
                            </Typography>
                            <Typography variant="body1" color="text.secondary" mt={1}>
                                Explore our range of laundry services designed to meet your needs quickly and efficiently.
                            </Typography>
                        </Grid>
                    </Box>
                    <Table component={Paper}>

                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700 }}>Name</TableCell>
                                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700 }}>Unit</TableCell>
                                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700 }}>Stock</TableCell>
                                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700 }}>Min Stock</TableCell>
                                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700 }}>Price</TableCell>
                                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700 }}>Category</TableCell>
                                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stockList.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell sx={{ py: 1.5, px: 2 }}>{item.name}</TableCell>
                                    <TableCell sx={{ py: 1.5, px: 2 }}>{item.satuan}</TableCell>
                                    <TableCell sx={{ py: 1.5, px: 2 }}>{item.stock}</TableCell>
                                    <TableCell sx={{ py: 1.5, px: 2 }}>{item.minStock}</TableCell>
                                    <TableCell sx={{ py: 1.5, px: 2 }}>{item.pricePerUnit}</TableCell>
                                    <TableCell sx={{ py: 1.5, px: 2 }}>{item.category}</TableCell>
                                    <TableCell sx={{ py: 1.5, px: 2 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => null}
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
                                            Edit Stock
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {stockList.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 2 }}>
                                        No stock data available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </Box>
            </Card>




        </>


    );
}
