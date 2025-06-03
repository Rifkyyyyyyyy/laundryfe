import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodo } from "../../store/actions/todo";
import { getAllTracking, updateTrackingById } from "../../store/actions/tracking";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  DialogActions,
  Pagination,
  Card,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TableSkeletonLoader from "../../ui-component/cards/Skeleton/TableSkeletonLoader";
import { FilterList, Search } from "@mui/icons-material";

export default function TodoViews() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useSelector((state) => state.auth || {});
  const outletId = user?.outlet?._id;

  const trackingData = useSelector((state) => state.tracking.data || {});
  const trackingLoading = useSelector((state) => state.tracking.loading || false)
  const { data = {}, hasFetching = false, loading = false, error = null } =
    useSelector((state) => state.todo || {});

  const totalPages = trackingData?.pagination?.totalPages || 1;

  useEffect(() => {
    if (!hasFetching && outletId) {
      dispatch(getAllTodo(outletId));
      dispatch(getAllTracking(page, itemsPerPage, outletId));
    }
  }, [hasFetching, dispatch, outletId, page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const taskItems = [
    {
      label: "Pending",
      value: data.pending ?? 0,
      icon: <AccessTimeIcon />,
      color: "grey.600",
      bgColor: "grey.100",
    },
    {
      label: "To Process",
      value: data.toProcess ?? 0,
      icon: <AccessTimeIcon />,
      color: "warning.main",
      bgColor: "warning.light",
    },
    {
      label: "In Progress",
      value: data.inProgress ?? 0,
      icon: <DirectionsRunIcon />,
      color: "info.main",
      bgColor: "info.light",
    },
    {
      label: "Taken",
      value: data.taken ?? 0,
      icon: <CheckCircleIcon />,
      color: "success.main",
      bgColor: "success.light",
    },
  ];

  const statusOptions = [
    "Order Pending",
    "In Progress",
    "Completed",
    "Taken",
  ];

  const handleEditClick = (track) => {
    setSelectedTrackId(track._id);
    setSelectedStatus(track.logs.at(-1)?.status || "");
    setOpenEditDialog(true);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setSelectedStatus("");
    setSelectedTrackId(null);
  };

  const handleSaveStatus = () => {
    dispatch(updateTrackingById(selectedTrackId, selectedStatus));
    handleCloseDialog();
  };

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {taskItems.map(({ label, value, icon, color, bgColor }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Paper
              elevation={6}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                bgcolor: bgColor,
                transition: "transform 0.2s ease",
                cursor: "default",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Avatar sx={{ bgcolor: color, mr: 3, width: 56, height: 56 }}>
                {React.cloneElement(icon, { sx: { color: "white", fontSize: 30 } })}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ letterSpacing: 0.5, mb: 0.5 }}
                >
                  {label}
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  {value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 5 }}>
        {error && (
          <Alert severity="error" sx={{ my: 3, fontWeight: "medium" }}>
            {error}
          </Alert>
        )}


        {trackingLoading ? (
          <TableSkeletonLoader cols={7} row={5} />
        ) : (
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
                    Cashier Task List
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={1}>
                    Easily monitor customer order statuses. Search, filter, and update order progress as needed.
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


                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "primary.light" }}>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                      Order Code
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                      Phone
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                      Last Update
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.dark" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(trackingData?.tracking || []).map((track) => {
                    const lastLog = track.logs.at(-1);
                    return (
                      <TableRow key={track._id} hover sx={{ cursor: "pointer" }}>
                        <TableCell>{track.orderId?.orderCode}</TableCell>
                        <TableCell>{track.orderId?.customerName}</TableCell>
                        <TableCell>{track.orderId?.customerPhone}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "medium",
                              color:
                                lastLog?.status === "Taken"
                                  ? "success.main"
                                  : lastLog?.status === "In Progress"
                                    ? "info.main"
                                    : lastLog?.status === "Order Pending"
                                      ? "warning.main"
                                      : "text.primary",
                            }}
                          >
                            {lastLog?.status}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {lastLog?.timestamp
                            ? new Date(lastLog.timestamp).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleEditClick(track)}
                            sx={{
                              borderColor: "#bbb",
                              color: "text.secondary",
                              textTransform: "none",
                              fontWeight: "medium",
                              "&:hover": {
                                borderColor: "primary.main",
                                backgroundColor: "primary.lighter",
                                color: "primary.main",
                              },
                            }}
                          >
                            Edit Status
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {(!trackingData?.tracking || trackingData.tracking.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        No tracking data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  disabled={loading}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: "4px",
                      margin: "0 2px",
                    },
                    "& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-previousNext)":
                    {
                      border: "1px solid",
                      borderColor: "primary.main",
                    },
                  }}
                />
              </Box>
            </Box>
          </Card>

        )}
      </Box>

      {/* Edit Status Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>Edit Tracking Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal" variant="outlined" size="small">
            <InputLabel>Status</InputLabel>
            <Select value={selectedStatus} label="Status" onChange={handleStatusChange}>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveStatus} disabled={!selectedStatus}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>



  );
}
