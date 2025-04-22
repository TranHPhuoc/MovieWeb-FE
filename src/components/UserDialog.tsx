import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Alert
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import { User, UserFormData } from '../types/user';
  
  interface UserDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: UserFormData) => void;
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
  }
  
  const genders = ['male', 'female', 'other'] as const;
  const roles = ['admin', 'user'] as const;
  
  const UserDialog = ({
    open,
    onClose,
    onSubmit,
    selectedUser,
    loading,
    error,
  }: UserDialogProps) => {
    const [formData, setFormData] = useState<UserFormData>({
      name: '',
      email: '',
      password: '',
      gender: 'male',
      age: 0,
      address: '',
      role: 'user',
    });
  
    useEffect(() => {
      if (selectedUser) {
        setFormData({
          name: selectedUser.name || '',
          email: selectedUser.email || '',
          gender: selectedUser.gender || 'male',
          age: selectedUser.age || 0,
          address: selectedUser.address || '',
          role: selectedUser.role || 'user',
          id: selectedUser.id
        });
      } else {
        setFormData({
          name: '',
          email: '',
          age: 0,
          address: '',
          gender: 'male',
          role: 'user',
          password: '',
        });
      }
    }, [selectedUser]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'age' ? (value === '' ? 0 : parseInt(value)) : value,
      }));
    };
  
    const handleSubmit = () => {
      onSubmit(formData);
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{selectedUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
  
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              disabled={loading}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              disabled={loading || !!selectedUser}
            />
            {!selectedUser && (
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password || ''}
                onChange={handleChange}
                fullWidth
                disabled={loading}
              />
            )}
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              disabled={loading}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              disabled={loading}
            />
            <TextField
              label="Gender"
              name="gender"
              select
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              disabled={loading}
            >
              {genders.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Role"
              name="role"
              select
              value={formData.role}
              onChange={handleChange}
              fullWidth
              disabled={loading}
            >
              {roles.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {selectedUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default UserDialog;
  