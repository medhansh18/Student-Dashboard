import { useState } from 'react'

const starterCourses = [
  { title: 'Data Structures', students: 32 },
  { title: 'Operating Systems', students: 24 },
]

const starterAssignments = [
  { title: 'Project Checkpoint 1', due: 'Friday, 4:00 PM' },
  { title: 'Quiz 4 Review', due: 'Monday, 9:30 AM' },
]

const starterGrades = [
  { student: 'Alicia Gomez', course: 'Data Structures', score: '92%' },
  { student: 'Noah Patel', course: 'Operating Systems', score: '89%' },
]

const starterAnnouncements = [
  'Office hours are available every Tuesday and Thursday from 2:00 PM to 4:00 PM.',
  'The class project rubric has been updated in the course portal.',
]

function TeacherDashboard({ user, onLogout }) {
  const [courses, setCourses] = useState(starterCourses)
  const [assignments, setAssignments] = useState(starterAssignments)
  const [grades, setGrades] = useState(starterGrades)
  const [announcements, setAnnouncements] = useState(starterAnnouncements)

  const [courseName, setCourseName] = useState('')
  const [courseStudents, setCourseStudents] = useState('')
  const [assignmentTitle, setAssignmentTitle] = useState('')
  const [assignmentDue, setAssignmentDue] = useState('')
  const [gradeStudent, setGradeStudent] = useState('')
  const [gradeCourse, setGradeCourse] = useState('')
  const [gradeScore, setGradeScore] = useState('')
  const [announcementText, setAnnouncementText] = useState('')

  const handleAddCourse = (event) => {
    event.preventDefault()
    if (!courseName.trim()) return

    setCourses((current) => [
      ...current,
      { title: courseName.trim(), students: Number(courseStudents) || 0 },
    ])
    setCourseName('')
    setCourseStudents('')
  }

  const handleAddAssignment = (event) => {
    event.preventDefault()
    if (!assignmentTitle.trim()) return

    setAssignments((current) => [
      ...current,
      { title: assignmentTitle.trim(), due: assignmentDue || 'TBD' },
    ])
    setAssignmentTitle('')
    setAssignmentDue('')
  }

  const handleAddGrade = (event) => {
    event.preventDefault()
    if (!gradeStudent.trim() || !gradeCourse.trim() || !gradeScore.trim()) return

    setGrades((current) => [
      ...current,
      { student: gradeStudent.trim(), course: gradeCourse.trim(), score: gradeScore.trim() },
    ])
    setGradeStudent('')
    setGradeCourse('')
    setGradeScore('')
  }

  const handleAddAnnouncement = (event) => {
    event.preventDefault()
    if (!announcementText.trim()) return

    setAnnouncements((current) => [announcementText.trim(), ...current])
    setAnnouncementText('')
  }

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Teacher dashboard</p>
          <h1>Classroom overview</h1>
        </div>
        <button type="button" className="ghost-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <div className="content-grid teacher-grid">
        <section className="panel">
          <h2>Upload course</h2>
          <form className="inline-form" onSubmit={handleAddCourse}>
            <input
              type="text"
              placeholder="Course title"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />
            <input
              type="number"
              min="0"
              placeholder="Students"
              value={courseStudents}
              onChange={(event) => setCourseStudents(event.target.value)}
            />
            <button type="submit" className="primary-btn small-btn">
              Add course
            </button>
          </form>
          <div className="list-stack compact-list">
            {courses.map((course) => (
              <article key={course.title} className="info-card">
                <h3>{course.title}</h3>
                <p>{course.students} students</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Upload assignment</h2>
          <form className="inline-form" onSubmit={handleAddAssignment}>
            <input
              type="text"
              placeholder="Assignment title"
              value={assignmentTitle}
              onChange={(event) => setAssignmentTitle(event.target.value)}
            />
            <input
              type="text"
              placeholder="Due date"
              value={assignmentDue}
              onChange={(event) => setAssignmentDue(event.target.value)}
            />
            <button type="submit" className="primary-btn small-btn">
              Add assignment
            </button>
          </form>
          <div className="list-stack compact-list">
            {assignments.map((assignment) => (
              <article key={assignment.title} className="info-card">
                <h3>{assignment.title}</h3>
                <p>Due: {assignment.due}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Upload grade</h2>
          <form className="inline-form" onSubmit={handleAddGrade}>
            <input
              type="text"
              placeholder="Student name"
              value={gradeStudent}
              onChange={(event) => setGradeStudent(event.target.value)}
            />
            <input
              type="text"
              placeholder="Course"
              value={gradeCourse}
              onChange={(event) => setGradeCourse(event.target.value)}
            />
            <input
              type="text"
              placeholder="Score"
              value={gradeScore}
              onChange={(event) => setGradeScore(event.target.value)}
            />
            <button type="submit" className="primary-btn small-btn">
              Save grade
            </button>
          </form>
          <div className="grade-list">
            {grades.map((item) => (
              <div key={`${item.student}-${item.course}`} className="grade-row">
                <span>{item.student}</span>
                <strong>{item.course}</strong>
                <em>{item.score}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Announcements</h2>
          <form className="inline-form" onSubmit={handleAddAnnouncement}>
            <input
              type="text"
              placeholder="Write an announcement"
              value={announcementText}
              onChange={(event) => setAnnouncementText(event.target.value)}
            />
            <button type="submit" className="primary-btn small-btn">
              Post
            </button>
          </form>
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

export default TeacherDashboard
