import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Divider
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Add, DeleteOutlineOutlined, FilterList, Search } from '@mui/icons-material';

import { fetchAllMember, fetchMemberByOutletId, onCreateMember, searchMember } from '../../store/actions/member';
import { getLevelColor } from '../../utils/baseFuncs';
import TableSkeletonLoader from '../../ui-component/cards/Skeleton/TableSkeletonLoader';
import SandLoader from '../../ui-component/SandLoader';

export default function MemberViews() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data = {}, loading = false, error = null, hasFetching = false } = useSelector((state) => state.members || {});
  const { user } = useSelector((state) => state.auth || {});
  const outletId = user?.outlet?._id;

  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const itemsPerPage = 5;
  const totalPages = data?.pagination?.totalPages || 1;

  // Form Add Member states
  const [userIdInput, setUserIdInput] = useState('');
  const [membershipLevel, setMembershipLevel] = useState('silver');
  const [membershipDuration, setMembershipDuration] = useState(1);

  // Handlers for filter menu
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Dialog open/close
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
    // Reset form
    setUserIdInput('');
    setMembershipLevel('silver');
    setMembershipDuration(1);
  };

  // Fetch member data on mount and page/outlet changes
  useEffect(() => {
    if (!hasFetching) {
      if (user.role != 'owner') {
        dispatch(fetchMemberByOutletId(currentPage, itemsPerPage, outletId));
      } else {
        dispatch(fetchAllMember(currentPage, itemsPerPage))
      }
    }
  }, [dispatch, currentPage, hasFetching]);

  // Update table data on data change
  useEffect(() => {
    setTableData(data.members || []);
  }, [data]);

  // Pagination page change handler
  const handlePageChange = (event, page) => {
    setCurrentPage(page);

    const action = user.role !== 'owner'
      ? fetchMemberByOutletId(page, itemsPerPage, outletId)
      : fetchAllMember(page, itemsPerPage);

    if (searchTerm.trim() !== '') {
      dispatch(action);
    }
  };


  // Search input handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);

    if (value.trim() !== '') {
      dispatch(searchMember(value, 1, itemsPerPage, outletId));
    } else {
      dispatch(fetchMemberByOutletId(1, itemsPerPage, outletId));
    }
  };

  // Submit Add Member form
  const handleAddMemberSubmit = () => {
    if (!userIdInput.trim()) {
      alert('User ID is required');
      return;
    }

    console.log(`data : uid : ${userIdInput} outlet : ${outletId} level : ${membershipLevel} duration : ${membershipDuration}`);
    dispatch(onCreateMember(
      userIdInput,
      outletId,
      membershipLevel,
      membershipDuration
    ));
    handleDialogClose();
  };

  return (
    <>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      <Card>
        <Box p={3}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={3}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Membership Customers
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                Customers with active membership plans. Search, filter, or add new members here.
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                size="small"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <Box border="1px solid #ccc" borderRadius="4px" height={40} display="flex" alignItems="center">
                <IconButton size="small" onClick={handleClick}>
                  <FilterList />
                </IconButton>
              </Box>

              <Box border="1px solid #ccc" borderRadius="4px" height={40} display="flex" alignItems="center">
                <IconButton size="small" onClick={handleDialogOpen}>
                  <Add />
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                slotProps={{
                  paper: { sx: { mt: '10px' } }
                }}
              >
                <MenuItem onClick={handleClose}>Option 1</MenuItem>
                <MenuItem onClick={handleClose}>Option 2</MenuItem>
                <MenuItem onClick={handleClose}>Option 3</MenuItem>
              </Menu>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Table component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Membership</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Expired</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableSkeletonLoader rows={itemsPerPage} cols={8} />
              ) : tableData.length > 0 ? (
                tableData.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      <Avatar
                        src={member.userId?.photo?.url}
                        alt={member.userId?.username}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                    <TableCell>{member.userId?.username || '-'}</TableCell>
                    <TableCell>{member.userId?.email || '-'}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor: getLevelColor(member.membershipLevel),
                          width: '80px',
                          padding: '6px',
                          borderRadius: '4px',
                          textAlign: 'center',
                          color: 'white',
                          fontWeight: 500,
                        }}
                      >
                        {member.membershipLevel}
                      </Box>
                    </TableCell>
                    <TableCell>{member.points}</TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(member.expiredDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => null}
                          sx={{
                            mr: 1,
                            borderColor: '#ccc',
                            color: 'grey.700',
                            '&:hover': {
                              borderColor: 'grey.500',
                              backgroundColor: 'grey.200',
                            },
                          }}
                        >
                          Edit
                        </Button>
                        <IconButton size="small" onClick={() => null}>
                          <DeleteOutlineOutlined />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No members available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              disabled={loading}
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '4px',
                  margin: '0 2px',
                },
                '& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-previousNext)': {
                  border: '1px solid',
                  borderColor: 'primary.main',
                },
              }}
            />
          </Box>
        </Box>
      </Card>

      {/* Dialog Add Member */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="User ID"
            margin="normal"
            value={userIdInput}
            onChange={(e) => setUserIdInput(e.target.value)}
            placeholder="Enter User ID"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="membership-level-label">Membership Level</InputLabel>
            <Select
              labelId="membership-level-label"
              value={membershipLevel}
              label="Membership Level"
              onChange={(e) => setMembershipLevel(e.target.value)}
            >
              <MenuItem value="silver">Silver</MenuItem>
              <MenuItem value="gold">Gold</MenuItem>
              <MenuItem value="platinum">Platinum</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="membership-duration-label">Membership Duration (months)</InputLabel>
            <Select
              labelId="membership-duration-label"
              value={membershipDuration}
              label="Membership Duration (months)"
              onChange={(e) => setMembershipDuration(Number(e.target.value))}
            >
              {[1, 3, 6, 12].map((duration) => (
                <MenuItem key={duration} value={duration}>
                  {duration}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddMemberSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
