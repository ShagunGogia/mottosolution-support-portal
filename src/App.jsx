import { Navigate, Route, Routes } from 'react-router-dom'
import { PortalProvider } from './context/PortalContext.jsx'
import { usePortal } from './context/usePortal.js'
import PortalLayout from './components/PortalLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import RaiseTicket from './pages/RaiseTicket'
import MyTickets from './pages/MyTickets'
import TicketDetails from './pages/TicketDetails'
import AdminDashboard from './pages/AdminDashboard'
import AdminTickets from './pages/AdminTickets'
import AdminCustomers from './pages/AdminCustomers'
import CustomerProfile from './pages/CustomerProfile'
import { isAdminUser } from './data/mockUsers'
import './styles/components.css'
import './styles/pages.css'

function ProtectedLayout({ roles }) {
  const { user } = usePortal()
  if (!user) return <Navigate to="/login" replace />
  const isAdmin = isAdminUser(user)
  if (roles && !roles.includes(isAdmin ? 'Admin' : 'Customer')) {
    return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />
  }
  return <PortalLayout />
}

function AppRoutes() {
  const { user } = usePortal()
  const home = isAdminUser(user) ? '/admin/dashboard' : '/dashboard'
  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? home : '/login'} replace />} />
      <Route path="/login" element={user ? <Navigate to={home} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={home} replace /> : <Register />} />
      <Route element={<ProtectedLayout roles={['Customer']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/raise-ticket" element={<RaiseTicket />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/profile" element={<CustomerProfile />} />
      </Route>
      <Route element={<ProtectedLayout roles={['Admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tickets" element={<AdminTickets />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
      </Route>
      <Route element={<ProtectedLayout roles={['Customer', 'Admin']} />}>
        <Route path="/ticket/:ticketId" element={<TicketDetails />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? home : '/login'} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <PortalProvider>
      <AppRoutes />
    </PortalProvider>
  )
}

export default App
