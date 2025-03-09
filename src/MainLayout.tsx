import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AssessmentIcon from '@mui/icons-material/Assessment'
import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/People'

// Icons

const drawerWidth = 260

const MainLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const isAdmin = userData?.role === 'admin' // Boolean for role check
  console.log(userData)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('token') // Remove token
    localStorage.removeItem('role') // Remove role
    navigate('/') // Redirect to login page
  }

  // Sidebar Navigation Options
  const menuItems = [
    { text: 'Dashboard', path: '/HomePage', icon: <HomeIcon />, visible: true },
    { text: 'Lunch Orders', path: '/LunchOrder', icon: <ListAltIcon />, visible: true },
    {
      text: 'User Management',
      path: 'UserManagement',
      icon: <PeopleIcon />,
      visible: isAdmin,
    }, // Admin Only
    { text: 'Reports', path: '/Reports', icon: <AssessmentIcon />, visible: isAdmin }, // Admin Only
  ]

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toolbar />
      <List>
        {menuItems.map(
          item =>
            item.visible && (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path)
                    setMobileOpen(false)
                  }}
                  selected={location.pathname === item.path}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.dark,
                    },
                    '&:hover': { backgroundColor: theme.palette.primary.light },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar
        position='fixed'
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
      >
        <Toolbar>
          {/* Menu Button for Mobile */}
          {isMobile && (
            <IconButton color='inherit' edge='start' onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo & Title */}
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <img src='/logo.png' alt='Logo' style={{ height: 40, marginRight: 10 }} />
            Lunch Orders System
          </Typography>

          <Typography variant='h6' sx={{ mr: 2 }}>
            Name: {userData.full_name}
          </Typography>

          {/* Admin Indicator */}
          {isAdmin ? (
            <Typography variant='h6' sx={{ ml: 2, color: 'yellow' }}>
              Admin Panel
            </Typography>
          ) : (
            <Typography variant='h6' sx={{ ml: 2, color: 'yellow' }}>
              User panel
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
