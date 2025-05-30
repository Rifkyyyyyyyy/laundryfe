import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

function QuantityDialog({ open, product, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) setQuantity(1);
  }, [open]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleConfirm = () => {
    if (quantity >= 1) {
      onConfirm(quantity);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Quantity for {product.name}</DialogTitle>
      <DialogContent>
        <TextField
          type="number"
          fullWidth
          autoFocus
          inputProps={{ min: 1 }}
          value={quantity}
          onChange={handleChange}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuantityDialog;
