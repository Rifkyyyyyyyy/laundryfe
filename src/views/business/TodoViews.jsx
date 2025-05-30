import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodo } from "../../store/actions/todo";
import { getAllTracking } from "../../store/actions/tracking";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DeleteOutlineOutlined } from "@mui/icons-material";

export default function TodoViews() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const outletId = user.outlet?._id;

  const {
    data = {},
    hasFetching = false,
    loading = false,
    error = null,
  } = useSelector((state) => state.todo || {});

  const {
    trackingData = {},
    trackingLoading = false,
    trackingError = null,
    trackingHasFetching = false,
  } = useSelector((state) => state.tracking || {});


  console.log(`data tracking : ${JSON.stringify(trackingData)}`);

  useEffect(() => {
    if (!hasFetching && outletId) {
      dispatch(getAllTodo(outletId));
    }
  }, [hasFetching, dispatch, outletId]);

  useEffect(() => {
    if (!trackingHasFetching && outletId) {
      dispatch(getAllTracking(page + 1, rowsPerPage, outletId));
    }
  }, [trackingHasFetching, dispatch, outletId, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const taskItems = [
    {
      label: "To Process",
      value: data.toProcess ?? 0,
      icon: <AccessTimeIcon />,
      color: "warning.main",
    },
    {
      label: "In Progress",
      value: data.inProgress ?? 0,
      icon: <DirectionsRunIcon />,
      color: "info.main",
    },
    {
      label: "Taken",
      value: data.taken ?? 0,
      icon: <CheckCircleIcon />,
      color: "success.main",
    },
  ];

  const userName = user?.username || "User";

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Hello, <Box component="span" color="primary.main">{userName}</Box>! Here are your tasks for today.
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {taskItems.map(({ label, value, icon, color }) => (
          <Grid item xs={12} sm={4} key={label}>
            <Paper elevation={3} sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 2 }}>
              <Avatar sx={{ bgcolor: color, mr: 2, width: 48, height: 48 }}>
                {React.cloneElement(icon, { sx: { color: "white" } })}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">{label}</Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary">{value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tracking Table */}
      <Box sx={{ mt: 4 }}>

        {trackingLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        ) : trackingError ? (
          <Alert severity="error">{trackingError}</Alert>
        ) : (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Code</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone</TableCell>

                    <TableCell>Status</TableCell>
                    <TableCell>Last Update</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(trackingData?.tracking || []).map((track) => (
                    <TableRow key={track._id}>
                      <TableCell>{track.orderId?.orderCode}</TableCell>
                      <TableCell>{track.orderId?.customerName}</TableCell>
                      <TableCell>{track.orderId?.customerPhone}</TableCell>

                      <TableCell>{track.logs.at(-1)?.status}</TableCell>
                      <TableCell>{new Date(track.logs.at(-1)?.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell>

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
                          Edit Status
                        </Button>


                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>
        )}
      </Box>
    </Box>
  );
}
