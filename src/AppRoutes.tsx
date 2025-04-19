import { Route, Routes } from 'react-router'
import HomePage from './pages/Home/Home.page'

export default function AppRoutes () {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}
