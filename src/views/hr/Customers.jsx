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
    Avatar,
    Paper,
    TextField,
    InputAdornment,
    Pagination
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import TableSkeletonLoader from '../../ui-component/cards/Skeleton/TableSkeletonLoader';
import { fetchCustomers, searchCustomers } from '../../store/actions/customers';

export default function CustomersViews() {
    const dispatch = useDispatch();
    const {
        data = {},
        loading = false,
        error = null,
        hasFetching = false
    } = useSelector((state) => state.customers || {});

    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const itemsPerPage = 5;
    const totalPages = data?.pagination?.totalPages || 1;

    useEffect(() => {
        if (!hasFetching) {
            dispatch(fetchCustomers(currentPage, itemsPerPage));
        }
    }, [dispatch, currentPage, hasFetching]);

    useEffect(() => {
        setTableData(data.customers || []);
    }, [data]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1);

        if (value.trim() !== '') {
            dispatch(searchCustomers(value, 1, itemsPerPage));
        } else {
            dispatch(fetchCustomers(1, itemsPerPage));
        }
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        if (searchTerm.trim() !== '') {
            dispatch(searchCustomers(searchTerm, page, itemsPerPage));
        } else {
            dispatch(fetchCustomers(page, itemsPerPage));
        }
    };

    return (
        <>
            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    Error: {error}
                </Typography>
            )}

            <Card>
                <Box p={3}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4">Customer List</Typography>
                        <TextField
                            size="small"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Table component={Paper}>
                        <TableHead>
                            <TableRow>

                                <TableCell>Avatar</TableCell>
                                <TableCell>UID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableSkeletonLoader rows={5} cols={6} />
                            ) : tableData.length > 0 ? (
                                tableData.map((customer) => (

                                    <TableRow key={customer._id}>

                                        <TableCell>
                                            <Avatar
                                                src={customer.photo?.url}
                                                alt={customer.username}
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </TableCell>
                                        <TableCell>{customer._id}</TableCell>
                                        <TableCell>{customer.username}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>{customer.address.address}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No customers available
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
                                '& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-previousNext)': {
                                    border: '1px solid',
                                    borderColor: 'primary.main',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Card>
        </>
    );
}
