import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLaundryService } from "../../store/actions/service";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import ListSkeletonLoader from "../../ui-component/cards/Skeleton/ServiceSkeleton";

export default function ServicesView() {
  const dispatch = useDispatch();
  const {
    data = [],
    loading = false,
    error = null,
    hasFetching = false
  } = useSelector((state) => state.laundryService || {});

  const [selectedService, setSelectedService] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if (!hasFetching) {
      dispatch(getAllLaundryService());
    }
  }, [dispatch, hasFetching]);

  const handleSelectService = (id) => {
    setSelectedService(id);
  };

  const handleDeleteClick = () => {
    if (selectedService) {
      setOpenConfirm(true);
    }
  };

  const handleConfirmDelete = () => {
    // Dispatch delete action here, contoh:
    // dispatch(deleteService(selectedService));
    setOpenConfirm(false);
    setSelectedService(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              List of Laundry Services
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Explore our range of laundry services designed to meet your needs quickly and efficiently.
            </Typography>
          </Grid>

          <Grid item>
            <Card
              sx={{
                display: "flex",
                gap: 1,
                padding: "4px 8px",
                alignItems: "center"
              }}
            >
              <Tooltip title="Delete Services">
                <IconButton onClick={handleDeleteClick} disabled={!selectedService}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Services">
                <IconButton disabled={!selectedService}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Services">
                <IconButton>
                  <Add />
                </IconButton>
              </Tooltip>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Loading State */}
      {loading && (
        <ListSkeletonLoader count={8}/>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Services List */}
      <Grid container spacing={3}>
        {data.map((service) => {
          const isSelected = selectedService === service._id;
          return (
            <Grid item xs={12} sm={6} md={4} key={service._id}>
              <Card
                onClick={() => handleSelectService(service._id)}
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                  border: isSelected ? "2px solid rgba(25, 118, 210, 0.6)" : "1px solid #e0e0e0",
                  boxShadow: isSelected
                    ? "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                    : "none"
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 180,
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5"
                  }}
                >
                  <CardMedia
                    component="img"
                    image={service.photo?.url}
                    alt={service.name}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirm} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this service? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
