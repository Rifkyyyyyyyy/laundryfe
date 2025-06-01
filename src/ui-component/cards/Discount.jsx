/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import s from '../../assets/images/icons/logo.png'

export default function DiscountCard({ discount }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const copyIt = () => {
    navigator.clipboard
      .writeText(discount.code)
      .then(() => setSnackbarOpen(true))
      .catch(() => alert("Gagal menyalin"));
  };

  // Format tanggal dengan locale id-ID supaya dd/mm/yyyy
  const validUntilDate = new Date(discount.validUntil).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const product = discount.applicableProductIds[0];

  const cardStyle = css`
    position: relative;
    overflow: visible;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgb(235, 241, 242);
      top: 50%;
      transform: translateY(-50%);
      z-index: 0;
    }

    &::before {
      left: -20px;
    }

    &::after {
      right: -20px;
    }
  `;

  return (
    <>
      <Card
        css={cardStyle}
        sx={{
          borderRadius: 3,
          p: 2,
          bgcolor: "background.paper",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          maxWidth: 600,      // Lebarkan card maksimal 600px
          width: "100%",      // Responsive penuh sesuai parent container
          mx: "auto",         // Center horizontally
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Box
            component="img"
            src={s}
            alt="Discount Icon"
            sx={{ width: 90, height: 90, borderRadius: 2, objectFit: "cover" }}
          />

          {/* Vertical Dotted Divider tipis */}
          <Box
            sx={{
              height: "90px",
              borderLeft: "2px dotted black",
              mx: 1,
            }}
          />

          <Box sx={{ color: "text.secondary", flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              textTransform="uppercase"
            >
              {product.name}
            </Typography>
            <Typography variant="h3" fontWeight={700} lineHeight={1}>
              {discount.discountAmount}%{" "}
              <Typography component="span" fontSize="1rem" fontWeight={600}>
                OFF
              </Typography>
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              Berlaku hingga {validUntilDate}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={discount.code}
            InputProps={{
              readOnly: true,
              sx: { fontWeight: 600, userSelect: "all" },
            }}
            onFocus={(e) => e.target.select()}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={copyIt}
            sx={{ fontWeight: 600, whiteSpace: "nowrap", minWidth: 100 }}
          >
            Salin
          </Button>
        </Stack>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Kode berhasil disalin!
        </Alert>
      </Snackbar>
    </>
  );
}
