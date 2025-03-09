import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Input,
  List,
  ListItem,
  ListItemText,
  MenuItem,
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

import { EmojiPeopleOutlined } from '@mui/icons-material'

const IpAddressBackEnd = 'localhost:1234'

const LunchOrder = () => {
  const [selectedTab, setSelectedTab] = useState<'list' | 'add' | 'meal'>('list') // Výchozí zobrazení

  return (
    <Box display='flex' height='100vh'>
      {/* 📌 Boční menu */}
      <Box
        sx={{
          width: 200,
          bgcolor: 'lightgray',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Button onClick={() => setSelectedTab('list')} variant='contained'>
          Get Employees
        </Button>
        <Button onClick={() => setSelectedTab('add')} variant='contained'>
          Add Employee
        </Button>
        <Button onClick={() => setSelectedTab('meal')} variant='contained'>
          Table meals
        </Button>
      </Box>

      {/* 📌 Hlavní obsah */}
      <Box display='flex' flex={1} justifyContent='center' alignItems='center'>
        <Card sx={{ p: 3 }}>
          {selectedTab === 'list' && <EmployeeList />}
          {selectedTab === 'add' && <EmployeeForm />}
          {selectedTab === 'meal' && <MealTable />}
        </Card>
      </Box>
    </Box>
  )
}

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [role, setRole] = useState('user')

  const generateEmail = () => {
    if (!firstName || !secondName) return ''
    return `${firstName[0].toLowerCase()}.${secondName.toLowerCase()}@email.com`
  }

  const handleCreateEmployee = async () => {
    const email = generateEmail()

    if (!firstName || !secondName) {
      alert('First Name and Second Name are required!')
      return
    }

    try {
      const response = await fetch(`http://${IpAddressBackEnd}/addEmployee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${firstName} ${secondName}`, role, email }),
      })

      const data = await response.json()
      console.log('Employee created:', data)

      // Reset fields after submission
      setFirstName('')
      setSecondName('')
      setRole('user')
    } catch (error) {
      console.error('Error creating employee:', error)
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: 320, p: 2, boxShadow: 3 }}>
      <TextField
        label='First Name'
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        margin='normal'
        fullWidth
      />

      <TextField
        label='Second Name'
        value={secondName}
        onChange={e => setSecondName(e.target.value)}
        margin='normal'
        fullWidth
      />

      <TextField label='Email' value={generateEmail()} margin='normal' fullWidth disabled />

      <TextField
        select
        label='Role'
        value={role}
        onChange={e => setRole(e.target.value)}
        margin='normal'
        fullWidth
      >
        <MenuItem value='user'>User</MenuItem>
        <MenuItem value='admin'>Admin</MenuItem>
      </TextField>

      <Button sx={{ color: 'black', bgcolor: 'lightgray', mt: 2 }} onClick={handleCreateEmployee}>
        Make Employee
      </Button>
    </Card>
  )
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<
    { id: number; name: string; role: string; email: string }[]
  >([])
  const [editingEmployee, setEditingEmployee] = useState<{
    id: number
    name: string
    role: string
    email: string
  } | null>(null)

  // 🔹 Funkce pro načtení zaměstnanců
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`http://${IpAddressBackEnd}/employees`)
      if (!response.ok) throw new Error('Failed to fetch employees')

      const data = await response.json()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
      setEmployees([])
    }
  }

  // 🔹 Automatické načtení zaměstnanců při načtení komponenty
  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: 320, p: 2, boxShadow: 3 }}>
      <Button sx={{ color: 'black', bgcolor: 'lightgray', mb: 2 }} onClick={fetchEmployees}>
        Update employees
      </Button>

      {/* Seznam zaměstnanců */}
      {!editingEmployee ? (
        <>
          <Typography variant='h6' textAlign='center'>
            Employees
          </Typography>
          <List>
            {employees.length > 0 ? (
              employees.map(emp => (
                <ListItem key={emp.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText
                    primary={emp.name}
                    secondary={`Role: ${emp.role}, Email: ${emp.email}`}
                  />
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => setEditingEmployee(emp)} // Nastaví uživatele do editu
                  >
                    Edit
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant='body2' textAlign='center'>
                No employees found.
              </Typography>
            )}
          </List>
        </>
      ) : (
        <EditEmployeeForm employee={editingEmployee} onClose={() => setEditingEmployee(null)} />
      )}
    </Card>
  )
}

const EditEmployeeForm = ({
  employee,
  onClose,
}: {
  employee: { name: string; role: string; email: string }
  onClose: () => void
}) => {
  const [formData, setFormData] = useState(employee)

  useEffect(() => {
    setFormData(employee) // Aktualizujeme formulář při změně zaměstnance
  }, [employee])

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://${IpAddressBackEnd}/employee/${employee.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Employee updated:', data)
      onClose()
    } catch (error) {
      console.error('Error updating employee:', error)
    }
    EmployeeList()
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: 320, p: 2, boxShadow: 3 }}>
      <Typography variant='h6' textAlign='center'>
        Edit Employee
      </Typography>

      <TextField
        label='Name'
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        margin='normal'
        fullWidth
      />

      <TextField
        select
        label='Role'
        value={formData.role}
        onChange={e => setFormData({ ...formData, role: e.target.value })}
        margin='normal'
        fullWidth
      >
        <MenuItem value='admin'>Admin</MenuItem>
        <MenuItem value='user'>User</MenuItem>
      </TextField>

      <TextField label='Email' value={formData.email} margin='normal' fullWidth disabled />

      <Button sx={{ bgcolor: 'lightgray', mt: 1 }} onClick={handleUpdate}>
        Update Employee
      </Button>
      <Button sx={{ bgcolor: 'red', color: 'white', mt: 1 }} onClick={onClose}>
        Cancel
      </Button>
    </Card>
  )
}

const MealTable = () => {
  const [weekOffset, setWeekOffset] = useState(0) // 0 = Tento týden, -1 = Minulý týden, 1 = Příští týden
  const [meals, setMeals] = useState<{ id?: number; meal_date: string; meal_name: string }[]>([])

  // 🔹 Načtení jídel pro aktuální týden
  const fetchMeals = async () => {
    try {
      const response = await fetch(`http://${IpAddressBackEnd}/meals/week/${weekOffset}`)
      if (!response.ok) throw new Error('Failed to fetch meals')

      const data = await response.json()
      setMeals(data)
    } catch (error) {
      console.error('Error fetching meals:', error)
      setMeals([])
    }
  }

  // 🔹 Automatické načtení jídel při změně týdne
  useEffect(() => {
    fetchMeals()
  }, [weekOffset])

  // 🔹 Funkce pro aktualizaci/přidání jídla
  const handleMealChange = (index: number, newMealName: string) => {
    const updatedMeals = [...meals]
    updatedMeals[index].meal_name = newMealName
    setMeals(updatedMeals)
  }

  // 🔹 Uložení změn na backend
  const saveMeals = async () => {
    try {
      for (const meal of meals) {
        if (meal.id) {
          // ✅ Aktualizace existujícího jídla
          await fetch(`http://${IpAddressBackEnd}/update_meal/${meal.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ meal_name: meal.meal_name }),
          })
        } else {
          // ✅ Přidání nového jídla
          await fetch(`http://${IpAddressBackEnd}/add_meal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meal),
          })
        }
      }
      fetchMeals() // Znovu načteme data po uložení
    } catch (error) {
      console.error('Error saving meals:', error)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={2}>
              <Button onClick={() => setWeekOffset(-1)}>← Minulý týden</Button>
              <Button onClick={() => setWeekOffset(0)}>Tento týden</Button>
              <Button onClick={() => setWeekOffset(1)}>Příští týden →</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Datum</TableCell>
            <TableCell>Jídlo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal, index) => (
            <TableRow key={meal.meal_date}>
              <TableCell>{meal.meal_date}</TableCell>
              <TableCell>
                <TextField
                  value={meal.meal_name}
                  onChange={e => handleMealChange(index, e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={saveMeals} variant='contained' sx={{ m: 2 }}>
        Uložit změny
      </Button>
    </TableContainer>
  )
}

export default LunchOrder
