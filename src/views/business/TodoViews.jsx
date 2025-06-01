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
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  DialogActions,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DeleteOutlineOutlined } from "@mui/icons-material";


export default function TodoViews() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const outletId = user.outlet?._id;



  const trackingData = useSelector((state) => state.tracking.data || {});

  const { data = {}, hasFetching = false, loading = false, error = null } =
    useSelector((state) => state.todo || {});



  useEffect(() => {
    if (!hasFetching && outletId) {
      dispatch(getAllTodo(outletId));
      dispatch(getAllTracking(page, 5, outletId));
    }
  }, [hasFetching, dispatch, outletId]);



  const handleChangePage = (event, newPage) => {
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
    console.log("track id:", selectedTrackId );
    console.log("status" , selectedStatus);
    dispatch(updateTrackingById(selectedTrackId, selectedStatus));
    handleCloseDialog();
  };

  const userName = user?.username || "User";

  return (
    <Box >

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress size={48} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 3, fontWeight: "medium" }}>
          {error}
        </Alert>
      )}

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

      {/* Tracking Table */}
      <Box sx={{ mt: 5 }}>

     
          <Paper elevation={4} sx={{ borderRadius: 3, overflowX: "auto" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "primary.light",
                    }}
                  >
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
                      <TableRow
                        key={track._id}
                        hover
                        sx={{ cursor: "pointer" }}
                      >
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
            </TableContainer>
          </Paper>
        
      </Box>

      {/* Edit Status Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold", pb: 0 }}>Ubah Status Pesanan</DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Silakan pilih status baru untuk pesanan ini:
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={selectedStatus}
              label="Status"
              onChange={handleStatusChange}
              sx={{ minWidth: 120 }}
            >
              {statusOptions
                .filter((status) => status !== "Order Created")
                .map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit" variant="outlined">
            Batal
          </Button>
          <Button
            onClick={handleSaveStatus}
            variant="contained"
            color="primary"
            disabled={!selectedStatus}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
