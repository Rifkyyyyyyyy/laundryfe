import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Add, DeleteOutlineOutlined, Search } from '@mui/icons-material';

import TableSkeletonLoader from '../../ui-component/cards/Skeleton/TableSkeletonLoader';
import { fetchCashiers } from '../../store/actions/cashiers';

export default function CashiersViews() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { data = {}, loading = false, error = null, hasFetching = false } = useSelector((state) => state.cashiers || {});
    const { popupData = [] } = useSelector((state) => state.popup);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState([]);

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

                          
                            <IconButton size="small" >
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
                                            <Avatar src={cashier.photo?.url} alt={cashier.username} sx={{ width: 40, height: 40 }} />
                                        </TableCell>
                                        <TableCell>{cashier.username}</TableCell>
                                        <TableCell>{cashier.email}</TableCell>
                                        <TableCell>{cashier.outletId?.name}</TableCell>
                                        <TableCell>{cashier.outletId?.location.address}</TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
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
                                                    Edit
                                                </Button>
                                                <IconButton size="small" onClick={() => null}>
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
