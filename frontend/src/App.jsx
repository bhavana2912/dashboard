
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import Home from './pages/Home.jsx'
import TablePage from './pages/TablePage.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import { TABLES } from './utils/tableConfig.js'

function HomeWithBackGuard() {
  useEffect(() => {
    const keepHomePage = (event) => {
      // Prevent React Router from navigating away on browser Back
      event.stopImmediatePropagation()

      // Keep the browser on the Home page
      window.history.pushState(
        { homeGuard: true },
        '',
        window.location.pathname + window.location.search
      )
    }

    // Add a Home history entry
    window.history.pushState(
      { homeGuard: true },
      '',
      window.location.pathname + window.location.search
    )

    // Handle browser Back only while Home is active
    window.addEventListener('popstate', keepHomePage, true)

    return () => {
      window.removeEventListener('popstate', keepHomePage, true)
    }
  }, [])

  return <Home />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomeWithBackGuard />} />

        {Object.keys(TABLES).map((k) => (
          <Route
            key={k}
            path={`/${k}`}
            element={<TablePage configKey={k} />}
          />
        ))}

        <Route
          path="/dashboard/:name"
          element={<DashboardPage />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  )
}
