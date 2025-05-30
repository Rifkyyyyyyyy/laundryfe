// TableSkeletonLoader.js
import React from 'react';
import { TableRow, TableCell, Skeleton } from '@mui/material';

export default function TableSkeletonLoader({ rows = 5, cols = 7 }) {
  return (
    <>
      {[...Array(rows)].map((_, rowIdx) => (
        <TableRow key={rowIdx}>
          {[...Array(cols)].map((__, colIdx) => (
            <TableCell key={colIdx}>
              <Skeleton variant="text" width="100%" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
