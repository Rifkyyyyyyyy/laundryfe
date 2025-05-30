import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllReports,
  getAllReportsByOutlet,
  onAnswerReports,
  onMarkReportAsResolved,
  onCreateReports,
} from "../../store/actions/reports";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Avatar,
  Chip,
  Stack,
  Tooltip,
  Button,
  Card,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Add, Delete, Edit, FilterList , Close } from "@mui/icons-material";

export default function ReportsView() {
  const dispatch = useDispatch();
  const observer = useRef();

  const limit = 5;
  const [page, setPage] = useState(1);
  const [openComments, setOpenComments] = useState({});
  const [selectedReports , setSelectedReports] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  const { user } = useSelector((state) => state.auth || {});
  const outletId = user.outlet?._id;

  const { data = {}, loading = false, error = null } = useSelector(
    (state) => state.reports || {}
  );

  const reports = data.data || [];
  const totalPages = data.pagination?.totalPages || 1;

  // Form state for new report
  const [reportsForm, setReportsForm] = useState({
    outletId: outletId,
    createdBy: user.id,   // <=== ini typo, harusnya createdBy
    category: "",
    title: "",
    description: "",
    image: null,
  });
  
  // Dialog open state
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReportsForm({
      outletId: outletId,
      createdBy: user.id,
      category: "",
      title: "",
      description: "",
      image: null,
    });
  };

  const lastReportRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  useEffect(() => {
    if (user.role === "kasir" && outletId) {
      dispatch(getAllReportsByOutlet(page, limit, outletId));
    } else if (user.role === "owner") {
      dispatch(fetchAllReports(page, limit));
    }
  }, [dispatch, page, limit, outletId, user.role]);

  const toggleComment = (reportId) => {
    setOpenComments((prev) => ({
      ...prev,
      [reportId]: !prev[reportId],
    }));
  };

  const handleComment = (e, reportId) => {
    e.preventDefault();
    const comment = commentInputs[reportId]?.trim();
    if (!comment || user.role === "kasir") return;
    dispatch(onAnswerReports(reportId, user.id, comment));
    setCommentInputs((prev) => ({ ...prev, [reportId]: "" }));
  };

  const handleReportAsDone = (reportId) => {
    if (user.role !== "owner") return;
    dispatch(onMarkReportAsResolved(reportId));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportsForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReportsForm((prev) => ({ ...prev, image: file }));
  };

  // Handle form submit to create report
  const handleSubmitReport = (e) => {
    e.preventDefault();

    if (
      !reportsForm.category ||
      !reportsForm.title.trim() ||
      !reportsForm.description.trim()
    ) {
      alert("Mohon isi semua field yang wajib.");
      return;
    }

    // Buat FormData untuk kirim file image kalau ada
    const formData = new FormData();
    formData.append("outletId", reportsForm.outletId);
    formData.append("createdBy", reportsForm.createdBy);
    formData.append("category", reportsForm.category);
    formData.append("title", reportsForm.title.trim());
    formData.append("description", reportsForm.description.trim());
    if (reportsForm.image) formData.append("image", reportsForm.image);

    dispatch(onCreateReports(formData));

    // Tutup dialog dan reset form
    handleCloseDialog();
  };

  const handleSelectReport = (reportId) => {
    setSelectedReports((prev) => (prev === reportId ? null : reportId));
  };
  

  return (
    <Box>
      <Box mb={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Reports
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Review incoming issue reports and mark them as resolved when
              appropriate.
            </Typography>
          </Grid>

          <Grid item>
            <Card sx={{ display: "flex", gap: 2, padding: "4px" }}>
              <Tooltip title="Filter">
                <IconButton color="primary">
                  <FilterList />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton disabled={user.role === "owner"}>
                  <Delete />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton disabled={user.role === "owner"}>
                  <Edit />
                </IconButton>
              </Tooltip>

              <Tooltip title="Add">
                <IconButton
                  disabled={user.role === "owner"}
                  onClick={handleOpenDialog}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {reports.length === 0 && !loading && (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          No reports found.
        </Typography>
      )}

      {reports.map((report, index) => {
        const isLast = index === reports.length - 1;
        const resolved = report.isResolved;

        return (
          <Paper
            key={report._id}
            ref={isLast ? lastReportRef : null} 
            onClick={() => handleSelectReport(report._id)}
            elevation={4}
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 3,
              cursor: 'pointer',
              border: selectedReports === report._id ? "2px solid #1976d2" : "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              transition: "box-shadow 0.3s",
              "&:hover": { boxShadow: "0 12px 24px rgba(0,0,0,0.2)" },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <Avatar
                src={report.createdBy.photo?.url}
                alt={report.createdBy.role}
                sx={{ width: 48, height: 48 }}
              />
              <Box flexGrow={1}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {report.createdBy.username}
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {report.createdBy.role}
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {report.createdBy.outletId.name}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {new Date(report.createdAt).toLocaleString()}
                </Typography>
              </Box>

              <Tooltip
                title={resolved ? "Report resolved" : "Mark as resolved"}
              >
                <IconButton
                  color={resolved ? "success" : "default"}
                  disabled={resolved || user.role !== "owner"}
                  onClick={() => handleReportAsDone(report._id)}
                >
                  <CheckCircleIcon />
                </IconButton>
              </Tooltip>
            </Stack>

            {report.photo?.url && (
              <Box
                component="img"
                src={report.photo.url}
                alt="Report"
                sx={{
                  width: "100%",
                  maxHeight: 280,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                  userSelect: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            )}

            <Typography variant="h5" fontWeight="700" mb={1}>
              {report.title}
            </Typography>

            <Chip
              label={report.category}
              size="small"
              color="primary"
              sx={{ mb: 2, fontWeight: "bold" }}
            />

            <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 2 }}>
              {report.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                size="small"
                variant={openComments[report._id] ? "contained" : "outlined"}
                onClick={() => toggleComment(report._id)}
              >
                {openComments[report._id] ? "Hide Comments" : "Show Comments"}
              </Button>
            </Box>

            {openComments[report._id] && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Comments:
                </Typography>

                {report.feedback.length === 0 ? (
                  <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
                    <Typography variant="body2">Belum ada komentar.</Typography>
                  </Paper>
                ) : (
                  report.feedback.map((fb, idx) => (
                    <Paper
                      key={idx}
                      variant="outlined"
                      sx={{ p: 2, mb: 1, backgroundColor: "#f9f9f9" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        {fb.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(fb.timestamp).toLocaleString()}
                      </Typography>
                    </Paper>
                  ))
                )}

                {user.role !== "kasir" ? (
                  <Box
                    component="form"
                    onSubmit={(e) => handleComment(e, report._id)}
                    sx={{ mt: 2 }}
                  >
                    <Stack direction="row" spacing={1}>
                      <input
                        type="text"
                        placeholder="Tulis komentar..."
                        value={commentInputs[report._id] || ""}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [report._id]: e.target.value,
                          }))
                        }
                        style={{
                          flexGrow: 1,
                          padding: "10px 12px",
                          borderRadius: 8,
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Kirim
                      </Button>
                    </Stack>
                  </Box>
                ) : null}
              </Box>
            )}
          </Paper>
        );
      })}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Dialog Form Tambah Laporan */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Buat Laporan Baru
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitReport}
            sx={{ mt: 1 }}
          >
            <TextField
              select
              label="Kategori"
              name="category"
              value={reportsForm.category}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Mesin Rusak">Mesin Rusak</MenuItem>
              <MenuItem value="Kebersihan">Kebersihan</MenuItem>
              <MenuItem value="Air Mati">Air Mati</MenuItem>
              <MenuItem value="Listrik">Listrik</MenuItem>
              <MenuItem value="Lainnya">Lainnya</MenuItem>
            </TextField>

            <TextField
              label="Judul"
              name="title"
              value={reportsForm.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Deskripsi"
              name="description"
              value={reportsForm.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              required
            />

            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
              Upload Gambar
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {reportsForm.image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                File: {reportsForm.image.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleSubmitReport} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
