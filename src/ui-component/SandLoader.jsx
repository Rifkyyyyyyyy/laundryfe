import React from "react";
import { Box, keyframes } from "@mui/material";

const rotateColor = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const morph = keyframes`
  0%, 100% {
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
  50% {
    border-radius: 10%;
    width: 100px;
    height: 100px;
  }
`;

export default function SandLoader() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.6)",
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          borderStyle: "solid",
          borderWidth: 8,
          borderColor: "transparent",
          borderTopColor: "#3A8DFF",    // biru terang
          borderRightColor: "#1E6FD9",  // biru medium
          borderBottomColor: "#71B7FF", // biru pastel
          borderLeftColor: "#185ABD",   // biru navy
          animation: `${rotateColor} 2s linear infinite, ${morph} 2s ease-in-out infinite`,
          width: 80,
          height: 80,
        }}
      />
    </Box>
  );
}
