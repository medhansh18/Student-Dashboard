import { useState } from 'react'
import './App.css'
import HomePage from './assets/files/HomePage.jsx'
import LoginPage from './assets/files/LoginPage.jsx'
import StudentDashboard from './assets/files/StudentDashboard.jsx'
import TeacherDashboard from './assets/files/TeacherDashboard.jsx'

function App() {
  const [view, setView] = useState('home')
  const [selectedRole, setSelectedRole] = useState('student')
  const [user, setUser] = useState(null)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setView('login')
  }

  const handleLogin = ({ email, role }) => {
    setUser({ email, role })
    setView(role === 'teacher' ? 'teacher' : 'student')
  }

  const handleLogout = () => {
    setUser(null)
    setSelectedRole('student')
    setView('home')
  }

  if (view === 'home') {
    return <HomePage onSelectRole={handleRoleSelect} />
  }

  if (view === 'login') {
    return (
      <LoginPage
        selectedRole={selectedRole}
        onLogin={handleLogin}
        onBack={() => setView('home')}
      />
    )
  }

  if (view === 'student') {
    return <StudentDashboard user={user} onLogout={handleLogout} />
  }

  return <TeacherDashboard user={user} onLogout={handleLogout} />
}

export default App