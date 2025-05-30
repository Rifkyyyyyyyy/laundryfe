import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Box, Skeleton } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";

export default function ProductSkeletonGrid({ count = 8 }) {
  // count = jumlah skeleton card yang ditampilkan

  return (
    <Grid container spacing={3}>
      {[...Array(count)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            sx={{
              height: 300,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#fff",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "none",
            }}
          >
            {/* Skeleton image */}
            <Skeleton variant="rectangular" height={150} animation="wave" />

            <CardContent
              sx={{
                flexGrow: 1,
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Skeleton title */}
              <Skeleton
                variant="text"
                height={24}
                width="80%"
                sx={{ mb: 0.5, borderRadius: 1 }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                height={24}
                width="60%"
                sx={{ mb: 1, borderRadius: 1 }}
                animation="wave"
              />

              {/* Skeleton price */}
              <Skeleton
                variant="text"
                height={20}
                width="40%"
                sx={{ mb: 0.5, borderRadius: 1 }}
                animation="wave"
              />

              {/* Skeleton location (icon + text) */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Skeleton variant="circular" width={20} height={20} animation="wave" />
                <Skeleton variant="text" height={16} width="70%" animation="wave" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
