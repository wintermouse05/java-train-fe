const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Set to true to use mock data (no backend needed), false to call real API
const USE_MOCK = false

import { refreshToken } from '@/service/auth.js'

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

/**
 * Fetch wrapper: khi gặp 401, tự gọi refresh token rồi retry 1 lần.
 * Nếu refresh thất bại, trả về status 401 để UI xử lý redirect.
 */
const authFetch = async (url, options = {}) => {
  let response = await fetch(url, { ...options, headers: getAuthHeaders() })

  if (response.status === 401) {
    const refreshed = await refreshToken()
    if (refreshed) {
      response = await fetch(url, { ...options, headers: getAuthHeaders() })
    }
    if (response.status === 401) {
      return { status: 401, message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại' }
    }
  }

  const data = await response.json()
  return data
}

export const getStudents = async () => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300))
    return { status: 200, data: [...mockStudents] }
  }

  try {
    return await authFetch(`${API_BASE_URL}/students`, { method: 'GET' })
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
    return await authFetch(`${API_BASE_URL}/students/${studentId}`, { method: 'GET' })
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
    return await authFetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      body: JSON.stringify(studentData),
    })
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
    return await authFetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    })
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
    return await authFetch(`${API_BASE_URL}/students/${studentId}`, { method: 'DELETE' })
  } catch (error) {
    console.error('Lỗi khi gọi API deleteStudent:', error)
    throw error
  }
}
