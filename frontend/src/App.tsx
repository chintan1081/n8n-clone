import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignInPage from './components/sign-in'
import { ThemeProvider } from "@/components/theme-provider"
import SignUpPage from './components/sign-up'
import ProtectedRoutes from './components/ProtectedRoutes'
import Dashboard from './components/Dashboard'
import FlowChat from './components/FlowChat'
import Credentials from './components/Credentials'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} >
              <Route path='flowchat' element={<FlowChat />} />
              <Route path='credentials' element={<Credentials />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
