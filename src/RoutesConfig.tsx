import HomePage from './HomePage'
import LoginPage from './LoginPage'
import LunchOrder from './LunchOrder'
import MainLayout from './MainLayout'
import { RouteObject } from 'react-router-dom'
import UserManagement from './UserManagement'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/MainLayout',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'LunchOrder', element: <LunchOrder /> },
      { path: 'UserManagement', element: <UserManagement /> },
    ],
  },
]
