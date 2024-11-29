// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './views/homepage';
import Register from './views/Register';
import Login from './views/Login';
import PasswordRecovery from './views/PasswordRecovery';
import UserProfile from './views/UserProfile';
import PrivateRoute from './components/private/PrivateRoute';
import ChangePasswordRecover from './views/chancePasswordRecoverAccount';
import Layout from './components/layout/Layout';
import Repartidores from './views/Repartidores';
import PedidoDetalle from './views/PedidoDetalle';
import Cobertura from './views/Cobertura';
import Pedido from './views/Pedido';
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
    path: '/pedidoDetalle',
    element: (
      <Layout>
        <PedidoDetalle />
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
    path: '/pedido',
    element: (
      <Layout>
        <Pedido/>
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
        <ChangePasswordRecover />
      </Layout>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
