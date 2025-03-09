import { Add, Delete, Edit } from '@mui/icons-material'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import axios from 'axios'

interface User {
  id: number
  full_name: string
  username: string
  email: string
  role: string
}

const API_URL = 'http://localhost:1234/api/users' // Uprav podle backendu

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL)
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users', error)
    }
  }

  const removeDiacritics = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const generateUsername = (firstName: string, lastName: string) => {
    const cleanLastName = removeDiacritics(lastName).toLowerCase()
    return `${firstName[0].toLowerCase()}${cleanLastName}`
  }

  const generateEmail = (username: string) => {
    return `${username}@email.com`
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setUsers(users.filter(user => user.id !== id))
      showSnackbar('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user', error)
    }
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setOpenEditDialog(true)
  }

  const handleSave = async () => {
    if (!selectedUser) return
    try {
      const newUsername = generateUsername(
        selectedUser.full_name.split(' ')[0],
        selectedUser.full_name.split(' ')[1]
      )
      const newEmail = generateEmail(newUsername)

      const updatedUser = { ...selectedUser, username: newUsername, email: newEmail }

      await axios.put(`${API_URL}/${selectedUser.id}`, updatedUser)
      setUsers(users.map(u => (u.id === selectedUser.id ? updatedUser : u)))
      setOpenEditDialog(false)
      showSnackbar('User updated successfully')
    } catch (error) {
      console.error('Error updating user', error)
    }
  }

  const handleCreate = async () => {
    if (!newUser.firstName || !newUser.lastName) return

    try {
      const fullName = `${newUser.firstName} ${newUser.lastName}`
      const username = generateUsername(newUser.firstName, newUser.lastName)
      const email = generateEmail(username)

      const response = await axios.post(API_URL, {
        full_name: fullName,
        username,
        email,
        password: 'default123',
        role: 'user',
      })
      setUsers([...users, response.data])
      setNewUser({ firstName: '', lastName: '' })
      showSnackbar('User added successfully')
    } catch (error) {
      console.error('Error creating user', error)
    }
  }

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true)
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant='h4' gutterBottom>
        User Management
      </Typography>

      {/* Formulář pro přidání uživatele */}
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant='h6' gutterBottom>
          Add New User
        </Typography>
        <TextField
          label='First Name'
          value={newUser.firstName}
          onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
          fullWidth
          margin='dense'
        />
        <TextField
          label='Last Name'
          value={newUser.lastName}
          onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
          fullWidth
          margin='dense'
        />
        <Button
          onClick={handleCreate}
          variant='contained'
          color='primary'
          startIcon={<Add />}
          style={{ marginTop: '10px' }}
        >
          Add User
        </Button>
      </Paper>

      {/* Tabulka uživatelů */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Full Name</strong>
              </TableCell>
              <TableCell>
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)} startIcon={<Edit />} color='primary'>
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    startIcon={<Delete />}
                    color='error'
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog pro editaci uživatele */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label='Full Name'
            fullWidth
            value={selectedUser?.full_name || ''}
            onChange={e =>
              setSelectedUser(prev => (prev ? { ...prev, full_name: e.target.value } : null))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar pro notifikace */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity='success'>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default UserManagement
