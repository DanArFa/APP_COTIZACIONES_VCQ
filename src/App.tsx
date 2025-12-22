import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/app/cliente" element={<ProtectedRoute><ClienteHome /></ProtectedRoute>} />
          <Route path="/app/cliente/nuevo-pedido" element={<ProtectedRoute><ClienteNuevoPedido /></ProtectedRoute>} />
          <Route path="/app/cliente/documentos" element={<ProtectedRoute><ClienteDocumentos /></ProtectedRoute>} />

          <Route path="/app/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/app/admin/cotizaciones" element={<ProtectedRoute><AdminCotizaciones /></ProtectedRoute>} />
          <Route path="/app/admin/figuras" element={<ProtectedRoute><AdminFiguras /></ProtectedRoute>} />
          <Route path="/app/admin/pedidos" element={<ProtectedRoute><AdminPedidos /></ProtectedRoute>} />
          <Route path="/app/admin/produccion" element={<ProtectedRoute><AdminProduccion /></ProtectedRoute>} />
          <Route path="/app/admin/entregas" element={<ProtectedRoute><AdminEntregas /></ProtectedRoute>} />
          <Route path="/app/admin/stock" element={<ProtectedRoute><AdminStock /></ProtectedRoute>} />
          <Route path="/app/admin/facturacion" element={<ProtectedRoute><AdminFacturacion /></ProtectedRoute>} />
          <Route path="/app/admin/catalogo" element={<ProtectedRoute><AdminCatalogo /></ProtectedRoute>} />

          {/* Catch all - redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
