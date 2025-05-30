import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Typography,
  Box
} from '@mui/material';

export default function ProductDialog({
  open,
  onClose,
  products = [],
  selectedProducts = [],
  onSelectProduct
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Select Products</DialogTitle>
      <DialogContent dividers>
        {products.length === 0 ? (
          <Typography color="text.secondary">No products available</Typography>
        ) : (
          <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            maxHeight={400}
            sx={{ overflowY: 'auto' }}
          >
            {products.map((product) => {
              const isSelected = selectedProducts.some(
                (p) => p.id === product._id || p._id === product._id
              );
              return (
                <Chip
                  key={product._id}
                  label={product.name || 'Unnamed Product'}
                  clickable
                  color={isSelected ? 'primary' : 'default'}
                  onClick={() => onSelectProduct(product)}
                />
              );
            })}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
