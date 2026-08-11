import { useState } from 'react'

function LoginPage({ selectedRole = 'student', onLogin, onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const roleLabel = selectedRole === 'teacher' ? 'Teacher' : 'Student'

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email address and password.')
      return
    }

    setError('')
    onLogin({ email: email.trim(), password: password.trim(), role: selectedRole })
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back to home
        </button>

        <p className="eyebrow">{roleLabel} portal</p>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">
          Sign in to access your {roleLabel.toLowerCase()} dashboard.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="student@example.edu"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className="field-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-btn auth-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
