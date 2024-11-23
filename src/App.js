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
import Repartidores from './views/Repartidores';
import Calificacion from './views/Calificacion';
import Cobertura from './views/cobertura';
import EstadoPedido from './views/estadoPedido';
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
    path: '/repartidores',
    element: (
      <Layout>
        <Repartidores />
      </Layout>
    ),
  },
  {
    path: '/calificacion',
    element: (
      <Layout>
        <Calificacion />
      </Layout>
    ),
  },  {
    path: '/cobertura',
    element: (
      <Layout>
        <Cobertura />
      </Layout>
    ),
  },  {
    path: '/estado/pedido',
    element: (
      <Layout>
        <EstadoPedido/>
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
