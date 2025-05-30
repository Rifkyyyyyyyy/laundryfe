// components/OutletCardSkeleton.jsx
import React from "react";
import { Card, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";

export default function OutletCardSkeleton() {
  return (
    <Card sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" height={160} animation="wave" />
      <CardContent>
        <Typography variant="h6" component="div">
          <Skeleton width="60%" animation="wave" />
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <Skeleton width="80%" animation="wave" />
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Skeleton width="40%" animation="wave" />
        </Typography>
        <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
          <Skeleton width="30%" animation="wave" />
        </Typography>
      </CardContent>
    </Card>
  );
}
