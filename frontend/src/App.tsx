import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { VerificationPage } from '@/pages/VerificationPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { CenterDetailPage } from '@/pages/CenterDetailPage'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/centres/:id" element={<CenterDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
