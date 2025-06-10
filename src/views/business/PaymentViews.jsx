import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Card,
    Box,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Divider,
    Pagination,
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import { getAllPayment, getAllPaymentByOutlet } from "../../store/actions/payment";
import TableSkeletonLoader from "../../ui-component/cards/Skeleton/TableSkeletonLoader";

export default function PaymentView() {
    const dispatch = useDispatch();
    const { data = {}, loading = false, hasFetching = false } = useSelector((state) => state.payments || {});
    const { user } = useSelector((state) => state.auth || {});

    const outletId = user?.outlet?._id;
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);

        const action = user.role !== 'owner' ? getAllPaymentByOutlet(newPage, limit, outletId) : getAllPayment(newPage, limit);

        dispatch(action);

    };

    // Debounce search

    useEffect(() => {
        if (!hasFetching) {
            if (user.role !== 'owner') {
                dispatch(getAllPaymentByOutlet(page, limit, outletId));
            } else {
                dispatch(getAllPayment(page, limit));
            }
        }
    }, [dispatch, outletId, page, limit, user.role, hasFetching]);

    const paymentList = data?.data || [];
    const pagination = data?.metadata || {};
    const totalPages = pagination.totalPages || 1;
    const currentPage = pagination.page || page;

    return (
        <Card>
            <Box p={3}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                >
                    <Grid item>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            List of Payments
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mt={1}>
                            Manage payments easily. Search, filter, or add new ones.
                        </Typography>
                    </Grid>

                    <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                            size="small"
                            placeholder="Search by customer name"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1); // Reset ke halaman pertama saat search
                            }}
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
                    </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Invoice</TableCell>
                                <TableCell>Order Code</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Paid At</TableCell>
                                <TableCell>Cashier</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableSkeletonLoader cols={7} rows={5} />
                            ) : paymentList.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        Tidak ada data pembayaran
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paymentList.map((payment) => (
                                    <TableRow key={payment._id}>
                                        <TableCell>{payment.invoiceNumber}</TableCell>
                                        <TableCell>{payment.orderCode}</TableCell>
                                        <TableCell>{payment.customer?.name}</TableCell>
                                        <TableCell>Rp {payment.amountPaid.toLocaleString()}</TableCell>
                                        <TableCell>{new Date(payment.paidAt).toLocaleString()}</TableCell>
                                        <TableCell>{payment.processedBy?.username ?? 'online'}</TableCell>
                                        <TableCell>{payment.paymentStatus}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
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
    );
}
