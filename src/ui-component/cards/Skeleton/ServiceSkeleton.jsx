// ListSkeletonLoader.js
import React from "react";
import { Box, Grid, Card, Skeleton, CardContent } from "@mui/material";

export default function ListSkeletonLoader({ count = 6 }) {
  return (
    <Grid container spacing={3}>
      {[...Array(count)].map((_, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Card sx={{ height: "100%" }}>
            <Box
              sx={{
                height: 180,
                backgroundColor: "#f5f5f5",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ position: "absolute", top: 0, left: 0 }}
              />
            </Box>
            <CardContent>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="80%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
