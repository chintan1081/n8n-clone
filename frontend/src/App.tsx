import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignInPage from './components/sign-in'
import { ThemeProvider } from "@/components/theme-provider"
import SignUpPage from './components/sign-up'
import ProtectedRoutes from './components/ProtectedRoutes'
import Dashboard from './components/Dashboard'
import Credentials from './components/Credentials'
import WorkflowList from './components/WorkflowList'
import FlowChart from './components/FlowChat'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} >
              <Route path='workflow' element={<FlowChart />} />
              <Route path='workflow/:id' element={<FlowChart />} />
              <Route path='workflows' element={<WorkflowList />} />
              <Route path='credentials' element={<Credentials />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
