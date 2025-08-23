import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import LoginPage from './admin/LoginPage';
import DashboardPage from './admin/DashboardPage';
import ProductPage from './admin/ProductPage';
import OrdersPage from './admin/OrdersPage';
import MessagesPage from './admin/MessagesPage';
import SettingsPage from './admin/SettingsPage';
import CustomOrdersPage from './admin/CustomOrdersPage';
import TestimonialsPage from './admin/TestimonialsPage';
import SocialMediaPage from './admin/SocialMediaPage';
import CountriesPage from './admin/CountriesPage';
import CitiesPage from './admin/CitiesPage';

const AdminPanel = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="bulk-orders" element={<CustomOrdersPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="social-media" element={<SocialMediaPage />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="cities" element={<CitiesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AdminPanel;
