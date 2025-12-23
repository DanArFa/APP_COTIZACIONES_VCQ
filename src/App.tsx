import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LoginPage } from './pages/LoginPage';

import { ClienteHome } from './pages/cliente/ClienteHome';
import { ClienteNuevoPedido } from './pages/cliente/ClienteNuevoPedido';
import { ClienteDocumentos } from './pages/cliente/ClienteDocumentos';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCotizaciones } from './pages/admin/AdminCotizaciones';
import { AdminFiguras } from './pages/admin/AdminFiguras';
import { AdminPedidos } from './pages/admin/AdminPedidos';
import { AdminProduccion } from './pages/admin/AdminProduccion';
import { AdminEntregas } from './pages/admin/AdminEntregas';
import { AdminStock } from './pages/admin/AdminStock';
import { AdminFacturacion } from './pages/admin/AdminFacturacion';
import { AdminCatalogo } from './pages/admin/AdminCatalogo';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes - Cliente */}
          <Route path="/app/cliente" element={<ProtectedRoute requiredRole="cliente"><ClienteHome /></ProtectedRoute>} />
          <Route path="/app/cliente/nuevo-pedido" element={<ProtectedRoute requiredRole="cliente"><ClienteNuevoPedido /></ProtectedRoute>} />
          <Route path="/app/cliente/documentos" element={<ProtectedRoute requiredRole="cliente"><ClienteDocumentos /></ProtectedRoute>} />

          {/* Protected Routes - Admin */}
          <Route path="/app/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/app/admin/cotizaciones" element={<ProtectedRoute requiredRole="admin"><AdminCotizaciones /></ProtectedRoute>} />
          <Route path="/app/admin/figuras" element={<ProtectedRoute requiredRole="admin"><AdminFiguras /></ProtectedRoute>} />
          <Route path="/app/admin/pedidos" element={<ProtectedRoute requiredRole="admin"><AdminPedidos /></ProtectedRoute>} />
          <Route path="/app/admin/produccion" element={<ProtectedRoute requiredRole="admin"><AdminProduccion /></ProtectedRoute>} />
          <Route path="/app/admin/entregas" element={<ProtectedRoute requiredRole="admin"><AdminEntregas /></ProtectedRoute>} />
          <Route path="/app/admin/stock" element={<ProtectedRoute requiredRole="admin"><AdminStock /></ProtectedRoute>} />
          <Route path="/app/admin/facturacion" element={<ProtectedRoute requiredRole="admin"><AdminFacturacion /></ProtectedRoute>} />
          <Route path="/app/admin/catalogo" element={<ProtectedRoute requiredRole="admin"><AdminCatalogo /></ProtectedRoute>} />

          {/* Catch all - redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
