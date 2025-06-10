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
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Popper,
    Paper,
} from "@mui/material";
import { FilterList, Delete, Edit, Add, LocationOnOutlined } from "@mui/icons-material";
import {
    fetchProductByOutletId,
    deleteProduct,
    createProduct,
    fetchAllProduct,
} from "../../store/actions/product";
import { getAllLaundryPopup } from "../../store/actions/popup";
import SandLoader from "../../ui-component/SandLoader";
import ProductSkeletonGrid from "../../ui-component/cards/Skeleton/ProductLoader";
import EmptyProductState from "../../ui-component/emptyState/NoProduct";

export default function ProductViews() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [selectedUpdateProduct, setSelectedUpdateProduct] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperProduct, setPopperProduct] = useState(null);

    const { user } = useSelector((state) => state.auth || {});
    const { data = {}, hasFetching = false, loading = false, error = null } = useSelector(
        (state) => state.products || {}
    );
    const productService = useSelector(
        (state) => state.popup.popupData.service || {}
    );


    const outletId = user.outlet?._id;


    const formatNumberWithDot = (number) => {
        if (!number) return "";
        const str = number.toString().replace(/\./g, "").replace(/\D/g, "");
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const parseNumberFromString = (str) => {
        if (!str) return 0;
        return Number(str.replace(/\./g, ""));
    };

    const [productForm, setProductForm] = useState({
        name: "",
        price: "",
        unit: "",
        category: "",
        outletId: outletId,
        image: null,
        description: "",
    });

    const limit = 10;
    const observer = useRef();


    const products = data.products || [];
    const totalPages = data.pagination?.totalPages || 1;

    useEffect(() => {
        if (!hasFetching) {
            if (user.role === 'owner') {
                dispatch(fetchAllProduct(page, limit));
            } else {
                dispatch(fetchProductByOutletId(page, limit, outletId));
                dispatch(getAllLaundryPopup());
            }

        }

    }, [dispatch, hasFetching, page, outletId]);

    useEffect(() => {
        if (page > 1) {
            dispatch(fetchProductByOutletId(page, limit, outletId));
        }
    }, [dispatch, page, limit, outletId]);

    const lastProductRef = useCallback(
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

    const handleSelectedCard = (productId) => {
        setSelectedProduct(productId);
    };

    const handleOpenConfirm = () => {
        if (selectedProduct) setOpenConfirm(true);
    };

    const handleCloseConfirm = () => setOpenConfirm(false);

    const handleConfirmDelete = () => {
        if (selectedProduct) {
            dispatch(deleteProduct(selectedProduct));
            setOpenConfirm(false);
            setSelectedProduct(null);
        }
    };

    const handleOpenAddDialog = () => {
        setProductForm({
            name: "",
            price: "",
            unit: "",
            category: "",
            outletId: outletId,
            image: null,
            description: "",
        });

        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => setOpenAddDialog(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "price") {
            // Hapus selain angka
            const numericOnly = value.replace(/\D/g, "");
            // Format dengan titik
            const formatted = formatNumberWithDot(numericOnly);
            setProductForm((prev) => ({ ...prev, price: formatted }));
        } else {
            setProductForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setProductForm((prev) => ({ ...prev, image: file }));
    };

    const handleSubmitAddProduct = () => {
        const priceNumber = parseNumberFromString(productForm.price);
        if (
            !productForm.name ||
            productForm.price === "" ||
            priceNumber < 0 ||
            !productForm.unit ||
            !productForm.category
        ) {
            alert("Mohon lengkapi semua field wajib dan pastikan harga tidak negatif.");
            return;
        }

        const formData = new FormData();
        formData.append("name", productForm.name);
        formData.append("price", priceNumber);
        formData.append("unit", productForm.unit);
        formData.append("category", productForm.category);
        formData.append("outletId", productForm.outletId);
        formData.append("description", productForm.description);
        if (productForm.image) {
            formData.append("image", productForm.image);
        }

        dispatch(createProduct(formData));
        setOpenAddDialog(false);
    };

    const handleMouseEnter = (event, product) => {
        setAnchorEl(event.currentTarget);
        setPopperProduct(product);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setPopperProduct(null);
    };


    const onOpenUpdateDialog = (product) => {
        console.log(`data : ${JSON.stringify(product)}`);
        setSelectedUpdateProduct(product);
        setProductForm({
            name: product.name || "",
            price: formatNumberWithDot(product.price || 0),
            unit: product.unit || "",
            category: product.category || "",
            outletId: product.outletId?._id || outletId,
            image: product.photo?.url || null,
            description: product.description || "",
        });
        setOpenUpdateDialog(true);
    };



    const handleSubmitUpdateProduct = () => {
        const priceNumber = parseNumberFromString(productForm.price);
        if (
            !productForm.name ||
            productForm.price === "" ||
            priceNumber < 0 ||
            !productForm.unit ||
            !productForm.category
        ) {
            alert("Mohon lengkapi semua field wajib dan pastikan harga tidak negatif.");
            return;
        }

        const formData = new FormData();
        formData.append("name", productForm.name);
        formData.append("price", priceNumber);
        formData.append("unit", productForm.unit);
        formData.append("category", productForm.category);
        formData.append("outletId", productForm.outletId);
        formData.append("description", productForm.description);
        if (productForm.image && typeof productForm.image !== "string") {
            formData.append("image", productForm.image);
        }

        dispatch(updateProduct(selectedUpdateProduct._id, formData));
        setOpenUpdateDialog(false);
    };


    return (
        <Box>

            <Box mb={4}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            Product List
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mt={1}>
                            {user.role === 'kasir'
                                ? 'Here is a list of products you can use for customer transactions.'
                                : 'Here is a complete list of all available products that you can manage or update as needed.'}
                        </Typography>

                    </Grid>

                    <Grid item>
                        <Card sx={{ display: "flex", gap: 2, padding: "4px" }}>
                            <Tooltip title="Filter Discount">
                                <IconButton color="primary">
                                    <FilterList />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Discount">
                                <IconButton onClick={handleOpenConfirm} disabled={!selectedProduct}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Update Product">
                                <IconButton
                                    onClick={() => {
                                        const selected = products.find(p => p._id === selectedProduct);
                                        if (selected) {
                                            onOpenUpdateDialog(selected);
                                        }
                                    }}
                                    disabled={!selectedProduct}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Add Product">
                                <IconButton onClick={handleOpenAddDialog} disabled={user.role === 'owner'}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                {products.length === 0 && !loading ? (
                    <Grid item xs={12}>
                        <EmptyProductState />
                    </Grid>
                ) : (
                    products.map((product, index) => {
                        const isLast = index === products.length - 1;
                        const isSelected = selectedProduct === product._id;

                        return (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={product._id}
                                ref={isLast ? lastProductRef : null}
                            >
                                {/* Card produk */}
                                <Card
                                    onClick={() => handleSelectedCard(product._id)}
                                    onMouseEnter={(e) => handleMouseEnter(e, product)}
                                    onMouseLeave={handleMouseLeave}
                                    sx={{
                                        height: 300,
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        backgroundColor: "#fff",
                                        border: isSelected
                                            ? "2px solid rgba(25, 118, 210, 0.5)"
                                            : "1px solid rgba(0, 0, 0, 0.05)",
                                        boxShadow: isSelected ? "0 2px 6px rgba(0,0,0,0.12)" : "none",
                                        transform: isSelected ? "scale(1.01)" : "scale(1)",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            transform: "scale(1.01)",
                                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.photo?.url}
                                        alt={product.name}
                                        sx={{
                                            height: 150,
                                            width: "100%",
                                            objectFit: "cover",
                                            transition: "filter 0.3s ease",
                                            filter: isSelected ? "brightness(1)" : "brightness(0.97)",
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            p: 1.5,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={600}
                                            color="text.primary"
                                            sx={{
                                                mb: 0.5,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                minHeight: 40,
                                            }}
                                        >
                                            {product.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="primary"
                                            fontWeight={500}
                                            sx={{ mb: 0.5 }}
                                        >
                                            Rp.{formatNumberWithDot(product.price)} / {product.unit}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                                fontSize: 13,
                                                color: "text.secondary",
                                            }}
                                        >
                                            <LocationOnOutlined fontSize="small" color="action" />
                                            <Typography variant="caption" noWrap>
                                                {product.outletId?.location?.address || "-"}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                )}
            </Grid>

            {loading && products.length === 0 && <ProductSkeletonGrid />}
            {loading && products.length > 0 && <SandLoader />}


            {/* Confirm Delete Dialog */}
            <Dialog open={openConfirm} onClose={handleCloseConfirm}>
                <DialogTitle>Konfirmasi Hapus Produk</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Apakah kamu yakin ingin menghapus produk ini? Aksi ini tidak dapat dibatalkan.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Batal</Button>
                    <Button color="error" onClick={handleConfirmDelete} autoFocus>
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Product Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
                <DialogTitle
                    sx={{ fontWeight: "bold", fontSize: 24, textAlign: "center", mb: 1 }}
                >
                    Tambah Produk Baru
                </DialogTitle>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1, px: 1 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="Nama Produk"
                            name="name"
                            required
                            fullWidth
                            value={productForm.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Harga Produk"
                            name="price"
                            required
                            fullWidth
                            value={productForm.price}
                            onChange={handleInputChange}
                            placeholder="e.g. 10.000"
                            inputProps={{ inputMode: "numeric" }}
                        />
                        <FormControl fullWidth required>
                            <InputLabel id="unit-label">Satuan</InputLabel>
                            <Select
                                labelId="unit-label"
                                label="Satuan"
                                name="unit"
                                value={productForm.unit}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="kg">kg</MenuItem>
                                <MenuItem value="item">item</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth required>
                            <InputLabel>Kategori</InputLabel>
                            <Select
                                label="Kategori"
                                name="category"
                                value={productForm.category}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {productService?.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Deskripsi"
                            name="description"
                            multiline
                            rows={3}
                            fullWidth
                            value={productForm.description}
                            onChange={handleInputChange}
                        />
                        <Button variant="contained" component="label">
                            Upload Gambar Produk
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                        {productForm.image && (
                            <Typography variant="caption" color="text.secondary">
                                File: {productForm.image.name}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleCloseAddDialog}>Batal</Button>
                    <Button variant="contained" onClick={handleSubmitAddProduct}>
                        Simpan Produk
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Update Product Dialog */}
            <Dialog
                open={openUpdateDialog}
                onClose={() => setOpenUpdateDialog(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Update Produk</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nama Produk"
                                name="name"
                                fullWidth
                                value={productForm.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Harga"
                                name="price"
                                fullWidth
                                value={productForm.price}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Satuan"
                                name="unit"
                                fullWidth
                                value={productForm.unit}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Kategori"
                                name="category"
                                fullWidth
                                value={productForm.category}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Deskripsi"
                                name="description"
                                fullWidth
                                multiline
                                minRows={2}
                                value={productForm.description}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label">
                                Upload Gambar
                                <input type="file" hidden onChange={handleImageChange} />
                            </Button>
                            {productForm.image && (
                                <Typography variant="caption" sx={{ ml: 2 }}>
                                    {typeof productForm.image === 'string'
                                        ? 'Gambar sebelumnya'
                                        : productForm.image.name}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateDialog(false)}>Batal</Button>
                    <Button variant="contained" onClick={handleSubmitUpdateProduct}>
                        Simpan
                    </Button>
                </DialogActions>
            </Dialog>


            <Popper
                open={Boolean(anchorEl && popperProduct)}
                anchorEl={anchorEl}
                placement="bottom-start"  // pastikan posisi di bawah dan mulai dari kiri anchor
                modifiers={[
                    {
                        name: 'offset',
                        options: { offset: [0, 10] },
                    },
                    {
                        name: 'flip',
                        enabled: false,    // matikan flip supaya Popper gak pindah posisi
                    },
                ]}
            >


                <Paper
                    sx={{
                        p: 2,
                        maxWidth: 250,
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                    onMouseEnter={() => setAnchorEl(anchorEl)}
                    onMouseLeave={handleMouseLeave}
                >
                    {popperProduct && (
                        <>
                            <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                                {popperProduct.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {popperProduct.description || "-"}
                            </Typography>
                            <Typography variant="subtitle2" color="primary" sx={{ mt: 1 }}>
                                Rp{formatNumberWithDot(popperProduct.price)} / {popperProduct.unit}
                            </Typography>
                        </>
                    )}
                </Paper>
            </Popper>
        </Box >
    );
}
