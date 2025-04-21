import { Route, Routes } from 'react-router'
import HomePage from './pages/Home/Home.page'

/**
 * AppRoutes handle the routing of our app.
 * We are using react router
 */
export default function AppRoutes () {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}
