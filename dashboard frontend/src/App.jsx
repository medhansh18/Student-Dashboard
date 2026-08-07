import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/courses')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses')
        }
        return response.json()
      })
      .then((data) => {
        setCourses(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading courses...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name} — {course.instructor}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App