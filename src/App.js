// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './views/homepage';
import Register from './views/Register';
import Login from './views/Login';
import PasswordRecovery from './views/PasswordRecovery';
import UserProfile from './views/UserProfile';
import PrivateRoute from './components/private/PrivateRoute';
import ChangePassword from './views/chancePassword';
import Layout from './components/layout/Layout';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: '/password/recovery',
    element: (
      <Layout>
        <PasswordRecovery />
      </Layout>
    ),
  },
  {
    path: '/user/profile',
    element: (
      <Layout>
        <PrivateRoute>
          <UserProfile />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <Layout>
        <ChangePassword />
      </Layout>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
