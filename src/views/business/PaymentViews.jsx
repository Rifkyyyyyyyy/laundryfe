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
    CircularProgress,
    Typography,

} from "@mui/material";
import { getAllPaymentByOutlet } from "../../store/actions/payment";

export default function PaymentView() {
    const dispatch = useDispatch();
    const { data = {}, loading = false, error = null, hasFetching = false } = useSelector((state) => state.payments || {});
    const { user } = useSelector((state) => state.auth || {});
    const outletId = user?.outlet?._id;

    const [page, setPage] = useState(1); 

    const limit = 5;


    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (!hasFetching) {
            dispatch(getAllPaymentByOutlet(page, limit, outletId));
        }
    }, [dispatch, outletId, page, limit]);

    const paymentList = data?.data || [];
    const pagination = data?.metadata || {};

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Payment View
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">Error: {error}</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell>Invoice</TableCell>
                                    <TableCell>Order Code</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Paid At</TableCell>
                                    <TableCell>Cashiers</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paymentList.map((payment, index) => (
                                    <TableRow key={payment._id}>

                                        <TableCell>{payment.invoiceNumber}</TableCell>
                                        <TableCell>{payment.orderCode}</TableCell>
                                        <TableCell>
                                            {payment.customer?.name}
                                        </TableCell>
                                        <TableCell>Rp {payment.amountPaid.toLocaleString()}</TableCell>
                                        <TableCell>{new Date(payment.paidAt).toLocaleString()}</TableCell>

                                        <TableCell>{payment.processedBy?.username}</TableCell>
                                        <TableCell>{payment.paymentStatus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </>
            )}
        </Paper>
    );
}
