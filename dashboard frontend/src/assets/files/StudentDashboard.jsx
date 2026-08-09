import { useEffect, useMemo, useState } from 'react'

const API_BASE = 'http://localhost:8080/api'

function formatDate(value) {
  if (!value) return 'TBD'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function StudentDashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([])
  const [assignments, setAssignments] = useState([])
  const [grades, setGrades] = useState([])
  const [announcements, setAnnouncements] = useState([
    'No teacher announcement endpoint is available yet in the backend.',
    'Announcements will appear here once an /api/announcements endpoint is added.',
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        setLoading(true)
        setError('')

        const [coursesResponse, assignmentsResponse, gradesResponse] = await Promise.all([
          fetch(`${API_BASE}/courses`),
          fetch(`${API_BASE}/assignments`),
          fetch(`${API_BASE}/grades`),
        ])

        if (!coursesResponse.ok || !assignmentsResponse.ok || !gradesResponse.ok) {
          throw new Error('One or more data sources are unavailable.')
        }

        const [courseData, assignmentData, gradeData] = await Promise.all([
          coursesResponse.json(),
          assignmentsResponse.json(),
          gradesResponse.json(),
        ])

        setCourses(courseData)
        setAssignments(assignmentData)
        setGrades(gradeData)
      } catch (fetchError) {
        console.error(fetchError)
        setError('Unable to load your dashboard data right now. Please make sure the backend is running on localhost:8080.')
      } finally {
        setLoading(false)
      }
    }

    loadStudentData()
  }, [])

  const courseSummary = useMemo(() => {
    const totalCourses = courses.length
    const totalAssignments = assignments.length
    const currentGpa = grades.length
      ? (
          grades.reduce((total, grade) => {
            const score = Number(grade?.score ?? 0)
            const maxScore = Number(grade?.maxScore ?? 0)
            if (!maxScore) return total
            return total + (score / maxScore) * 100
          }, 0) / grades.length
        )
      : 0

    return {
      totalCourses,
      totalAssignments,
      gpa: currentGpa ? `${(currentGpa / 10).toFixed(1)}` : '0.0',
    }
  }, [courses, assignments, grades])

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Student dashboard</p>
          <h1>Welcome, {user?.email ? user.email.split('@')[0] : 'student'}</h1>
        </div>
        <button type="button" className="ghost-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      {error && <div className="dashboard-alert">{error}</div>}

      <section className="summary-grid">
        <div className="summary-card accent">
          <span>Current GPA</span>
          <strong>{courseSummary.gpa}</strong>
        </div>
        <div className="summary-card">
          <span>Assignments</span>
          <strong>{courseSummary.totalAssignments}</strong>
        </div>
        <div className="summary-card">
          <span>Courses Enrolled</span>
          <strong>{courseSummary.totalCourses}</strong>
        </div>
      </section>

      <div className="content-grid">
        <section className="panel">
          <h2>Courses</h2>
          {loading ? (
            <p>Loading courses...</p>
          ) : (
            <div className="list-stack">
              {courses.length === 0 ? (
                <p>No courses found.</p>
              ) : (
                courses.map((course) => (
                  <article key={course.id ?? course.name} className="info-card">
                    <h3>{course.name}</h3>
                    <p>{course.instructor}</p>
                    <span>Course ID: {course.id ?? 'N/A'}</span>
                  </article>
                ))
              )}
            </div>
          )}
        </section>

        <section className="panel">
          <h2>Assignments</h2>
          {loading ? (
            <p>Loading assignments...</p>
          ) : (
            <div className="list-stack">
              {assignments.length === 0 ? (
                <p>No assignments available.</p>
              ) : (
                assignments.map((assignment) => {
                  const courseName = assignment.course?.name ?? 'General Course'

                  return (
                    <article key={assignment.id ?? assignment.title} className="info-card">
                      <div className="card-header-row">
                        <h3>{assignment.title}</h3>
                        <span className="status-pill">{assignment.completed ? 'Completed' : 'Open'}</span>
                      </div>
                      <p>{courseName}</p>
                      <span>Due: {formatDate(assignment.dueDate)}</span>
                    </article>
                  )
                })
              )}
            </div>
          )}
        </section>

        <section className="panel">
          <h2>Grades</h2>
          {loading ? (
            <p>Loading grades...</p>
          ) : (
            <div className="grade-list">
              {grades.length === 0 ? (
                <p>No grades available.</p>
              ) : (
                grades.map((grade) => {
                  const assignmentTitle = grade.assignment?.title ?? 'Assignment'
                  const percentage = Number(grade?.maxScore)
                    ? `${Math.round((Number(grade.score) / Number(grade.maxScore)) * 100)}%`
                    : 'N/A'

                  return (
                    <div key={grade.id ?? assignmentTitle} className="grade-row">
                      <span>{assignmentTitle}</span>
                      <strong>{percentage}</strong>
                      <em>{grade.score}/{grade.maxScore}</em>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </section>

        <section className="panel">
          <h2>Announcements</h2>
          <ul className="announcement-list">
            {announcements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default StudentDashboard
