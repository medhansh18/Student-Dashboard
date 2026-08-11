import { useEffect, useState } from 'react'

const roleDetails = {
  student: {
    title: 'Student Portal',
    description:
      'Track lessons, check assignments, and stay on top of your academic progress.',
    highlights: ['View your timetable', 'Monitor upcoming deadlines', 'See course updates at a glance'],
  },
  teacher: {
    title: 'Teacher Workspace',
    description:
      'Manage classes, review student progress, and share updates with your class.',
    highlights: ['Organize lessons quickly', 'Track student performance', 'Share announcements effortlessly'],
  },
}

function HomePage({ onSelectRole }) {
  const [selectedRole, setSelectedRole] = useState(() => {
    if (typeof window === 'undefined') return ''

    const hash = window.location.hash.replace('#', '')
    return hash === 'student' || hash === 'teacher' ? hash : ''
  })

  useEffect(() => {
    if (selectedRole) {
      window.history.replaceState(null, '', `#${selectedRole}`)
    } else {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [selectedRole])

  const handleRoleChoice = (role) => {
    setSelectedRole(role)
    if (onSelectRole) {
      onSelectRole(role)
    }
  }

  const currentRole = selectedRole ? roleDetails[selectedRole] : null

  return (
    <div className="home-shell">
      <div className="home-card">
        {currentRole ? (
          <>
            <p className="eyebrow">Welcome to your dashboard</p>
            <h1>{currentRole.title}</h1>
            <p className="home-subtitle">{currentRole.description}</p>

            <ul className="feature-list">
              {currentRole.highlights.map((item) => (
                <li key={item} className="feature-item">
                  {item}
                </li>
              ))}
            </ul>

            <div className="home-actions">
              <button type="button" className="primary-btn" onClick={() => setSelectedRole('')}>
                Choose another role
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">Student dashboard</p>
            <h1>Are you a student or a teacher?</h1>
            <p className="home-subtitle">
              Choose your role to access a dashboard designed for your day-to-day needs.
            </p>

            <div className="role-grid">
              <button type="button" className="role-card" onClick={() => handleRoleChoice('student')}>
                <span className="role-icon">🎓</span>
                <h2>I’m a student</h2>
                <p>View classes, assignments, and progress in one place.</p>
              </button>

              <button type="button" className="role-card" onClick={() => handleRoleChoice('teacher')}>
                <span className="role-icon">🧑‍🏫</span>
                <h2>I’m a teacher</h2>
                <p>Manage lessons, students, and classroom updates quickly.</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
