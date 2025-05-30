import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { createOutlet, fetchOutlets } from "../../store/actions/outlet";
import { AccessTimeFilled, Add, CalendarToday, Delete, Edit, FilterList, LocationOn } from "@mui/icons-material";
import { Map, Marker } from "pigeon-maps";
import OutletCardSkeleton from "../../ui-component/cards/Skeleton/OutletSkeleton";
import SandLoader from '../../ui-component/SandLoader';



export default function OutletViews() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [openPicker, setOpenPicker] = useState(false);
  const [position, setPosition] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [selectedOutletId, setSelectedOutletId] = useState(null);

  const limit = 8;
  const observer = useRef();

  const { user } = useSelector((state) => state.auth || {});
  const isOwner = user?.role === "owner";

  const {
    data = {},
    hasFetching = false,
    loading = false,
    error = null,
  } = useSelector((state) => state.outlets || {});

  const outlets = data.outlets || [];
  const totalPages = data.pagination?.totalPages || 1;

  const defaultCenter = [-6.200000, 106.816666];
  const [outletForm, setOutletForm] = useState({
    name: "",
    address: "",
    lat: 0,
    long: 0,
    openingTime: "",
    closingTime: "",
    contactNumber: "",
    openingDays: [],
    image: null,
  });

  useEffect(() => {
    if (!hasFetching) {
      dispatch(fetchOutlets(page, limit));
    }
  }, [dispatch, hasFetching]);

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchOutlets(page, limit));
    }
  }, [dispatch, page]);

  const lastOutletRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  const onAddNewOutlet = () => {
    setOpenForm(true);
    setOpenPicker(false);
  };

  const fetchAddressFromCoords = async (lat, long) => {
    try {
      setLoadingAddress(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
      );
      const data = await response.json();
      return data.display_name || "";
    } catch (error) {
      console.error("Failed to fetch address:", error);
      return "";
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleMapClick = async ({ latLng }) => {
    const [lat, lng] = latLng;
    setPosition([lat, lng]);
    setLat(lat);
    setLong(lng);

    const address = await fetchAddressFromCoords(lat, lng);
    setOutletForm((prev) => ({
      ...prev,
      lat: lat,
      long: lng,
      address: address || prev.address,
    }));
  };

  const handleSaveLocation = () => {
    setOpenPicker(false);
  };

  const handleAddOutlet = () => {
    const orderDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    const sortedOpeningDays = outletForm.openingDays.slice().sort(
      (a, b) => orderDays.indexOf(a) - orderDays.indexOf(b)
    );

    const formData = new FormData();
    formData.append("name", outletForm.name);
    formData.append("address", outletForm.address);
    formData.append("lat", outletForm.lat);
    formData.append("long", outletForm.long);
    formData.append("openingTime", outletForm.openingTime);
    formData.append("closingTime", outletForm.closingTime);
    formData.append("contactNumber", outletForm.contactNumber);
    formData.append("openingDays", JSON.stringify(sortedOpeningDays));
    if (outletForm.image) {
      formData.append("image", outletForm.image);
    }

    dispatch(createOutlet(formData));

    setOutletForm({
      name: "",
      address: "",
      lat: 0,
      long: 0,
      openingTime: "",
      closingTime: "",
      contactNumber: "",
      openingDays: [],
      image: null,
    });
    setOpenForm(false);
    setPosition(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutletForm(prev => ({
      ...prev,
      [name]: name === "lat" || name === "long" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setOutletForm((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    }
  };

  const handleOpeningDaysChange = (e) => {
    setOutletForm((prev) => ({
      ...prev,
      openingDays: e.target.value,
    }));
  };

  const handleSelectOutlet = (id) => {
    setSelectedOutletId(id);
  };

  return (
    <Box>
      <Box mb={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h2" sx={{ fontWeight: 600 }}>
              List of Outlets
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Find all our outlet locations where you can access our services
              conveniently.
            </Typography>
          </Grid>
          <Grid item>
            <Card sx={{ display: "flex", gap: 2, padding: "4px" }}>

              <Tooltip title="Delete Outlet">
                <IconButton disabled={!isOwner || !selectedOutletId}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Outlet">
                <IconButton disabled={!isOwner || !selectedOutletId}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Outlet">
                <IconButton disabled={!isOwner} onClick={onAddNewOutlet}>
                  <Add />
                </IconButton>
              </Tooltip>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        {outlets.map((outlet, index) => {
          const isLast = index === outlets.length - 1;
          const isSelected = selectedOutletId === outlet._id;

          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={outlet._id}
              ref={isLast ? lastOutletRef : null}
            >
              <Card
                onClick={() => handleSelectOutlet(outlet._id)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                  border: isSelected ? "2px solid rgba(25, 118, 210, 0.6)" : "1px solid #e0e0e0",
                  boxShadow: isSelected
                    ? "rgba(0, 0, 0, 0.1) 0px 4px 12px"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                  borderRadius: 3,
                  overflow: "hidden",
                  backgroundColor: "#fff"
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={outlet.photo?.url}
                  alt={outlet.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom noWrap>
                    {outlet.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    <AccessTimeFilled sx={{ fontSize: 16, mr: 0.5 }} />
                    {outlet.openingTime} - {outlet.closingTime}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
                    {outlet.openingDays?.join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {loading && outlets.length === 0 && (
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <OutletCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {loading && outlets.length > 0 && (
        <Box display="flex" justifyContent="center" my={4}>
          <SandLoader />
        </Box>
      )}


      {/* Picker Map Dialog */}
      <Dialog open={openPicker} onClose={() => setOpenPicker(false)} maxWidth="md" fullWidth>
        <DialogTitle>Pilih Lokasi Outlet</DialogTitle>
        <DialogContent>
          <div style={{ height: "400px" }}>
            <Map
              height={400}
              defaultCenter={defaultCenter}
              defaultZoom={13}
              onClick={handleMapClick}
            >
              {position && <Marker anchor={position} />}
            </Map>
          </div>
          {position && (
            <Box mt={2}>
              <Typography variant="body2">
                <strong>Latitude:</strong> {lat.toFixed(6)} <br />
                <strong>Longitude:</strong> {long.toFixed(6)}
              </Typography>
              {loadingAddress && (
                <Typography variant="caption" color="text.secondary">
                  Memuat alamat...
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPicker(false)}>Batal</Button>
          <Button onClick={handleSaveLocation} variant="contained" disabled={!position}>
            Simpan Lokasi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Form Tambah Outlet */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Outlet Baru</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Nama Outlet"
              name="name"
              value={outletForm.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Alamat"
              name="address"
              value={outletForm.address}
              onChange={handleChange}
              fullWidth
              multiline
              maxRows={4}
              required
            />
            <TextField
              label="Nomor Kontak"
              name="contactNumber"
              value={outletForm.contactNumber}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Jam Buka"
              name="openingTime"
              type="time"
              value={outletForm.openingTime || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Jam Tutup"
              name="closingTime"
              type="time"
              value={outletForm.closingTime || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Hari Buka</InputLabel>
              <Select
                multiple
                value={outletForm.openingDays}
                onChange={handleOpeningDaysChange}
                label="Hari Buka"
              >
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={() => setOpenPicker(true)}>
              Pilih Lokasi di Peta
            </Button>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Batal</Button>
          <Button onClick={handleAddOutlet} variant="contained">
            Simpan Outlet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
