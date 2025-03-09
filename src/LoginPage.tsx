import { Alert, Box, Button, Container, Paper, TextField, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SERVER_IP = 'localhost:1234'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    try {
      const response = await fetch(`http://${SERVER_IP}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid credentials. Please try again.')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem(
        'user',
        JSON.stringify({ id: data.user.id, full_name: data.user.full_name, role: data.user.role })
      )

      navigate('/MainLayout')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant='h5' gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity='error' sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label='Email (without @ part)'
          variant='outlined'
          fullWidth
          margin='normal'
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <TextField
          label='Password'
          type='password'
          variant='outlined'
          fullWidth
          margin='normal'
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button variant='contained' color='primary' fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </Button>
      </Paper>
    </Container>
  )
}

export default LoginPage
