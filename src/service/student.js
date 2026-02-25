const API_BASE_URL = 'http://localhost:8080/api'

// Set to true to use mock data (no backend needed), false to call real API
const USE_MOCK = true

let mockNextId = 4
const mockStudents = [
  {
    studentId: 1,
    studentCode: 'STU001',
    studentName: 'Nguyễn Văn B',
    dateOfBirth: '1989-11-10',
    address: '192 Trường Sơn-Q1',
    averageScore: 5.6,
  },
  {
    studentId: 2,
    studentCode: 'STU002',
    studentName: 'Nguyễn Văn C',
    dateOfBirth: '1989-11-10',
    address: '192 Trường Sơn-Q1',
    averageScore: 5.6,
  },
  {
    studentId: 3,
    studentCode: 'STU003',
    studentName: 'Nguyễn Văn D',
    dateOfBirth: '1989-11-10',
    address: '192 Trường Sơn-Q1',
    averageScore: 5.6,
  },
]

const getAuthHeaders = () => {
  const USER = localStorage.getItem('user') || ''
  const TOKEN = USER ? JSON.parse(USER).token : ''
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  }
}

export const getStudents = async () => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300))
    return { status: 200, data: [...mockStudents] }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi khi gọi API getStudents:', error)
    throw error
  }
}

export const getStudentById = async (studentId) => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 200))
    const student = mockStudents.find((s) => s.studentId === Number(studentId))
    if (student) return { status: 200, data: { ...student } }
    return { status: 404, message: 'Student not found' }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi khi gọi API getStudentById:', error)
    throw error
  }
}

export const createStudent = async (studentData) => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300))
    const newStudent = { studentId: mockNextId++, ...studentData }
    mockStudents.push(newStudent)
    return { status: 200, data: newStudent }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi khi gọi API createStudent:', error)
    throw error
  }
}

export const updateStudent = async (studentId, studentData) => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300))
    const idx = mockStudents.findIndex((s) => s.studentId === Number(studentId))
    if (idx !== -1) {
      mockStudents[idx] = { ...mockStudents[idx], ...studentData }
      return { status: 200, data: mockStudents[idx] }
    }
    return { status: 404, message: 'Student not found' }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi khi gọi API updateStudent:', error)
    throw error
  }
}

export const deleteStudent = async (studentId) => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300))
    const idx = mockStudents.findIndex((s) => s.studentId === Number(studentId))
    if (idx !== -1) {
      mockStudents.splice(idx, 1)
      return { status: 200, message: 'Deleted successfully' }
    }
    return { status: 404, message: 'Student not found' }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi khi gọi API deleteStudent:', error)
    throw error
  }
}
