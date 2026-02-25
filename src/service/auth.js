const API_BASE_URL = 'http://localhost:8080/api'

// Set to true to use mock data (no backend needed), false to call real API
const USE_MOCK = true

// Mock user database stored in memory
const mockUsers = [
  { userName: 'admin', password: '123456' },
  { userName: 'test@mail.com', password: '123456' },
]

export const login = async (userName, password) => {
  if (USE_MOCK) {
    console.log('Mock login with:', userName, password)
    await new Promise((r) => setTimeout(r, 500)) // simulate delay
    const user = mockUsers.find(
      (u) => u.userName === userName && u.password === password
    )
    if (user) {
      return {
        status: 200,
        message: 'Login successful',
        data: { userName: user.userName, token: 'mock-jwt-token-' + Date.now() },
      }
    }
    return { status: 401, message: 'Sai tài khoản hoặc mật khẩu' }
  }

  try {
    console.log('Calling login API with:', userName, password)
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi khi gọi API login:', error)
    throw error
  }
}

export const register = async (registerData) => {
  if (USE_MOCK) {
    console.log('Mock register with:', registerData)
    await new Promise((r) => setTimeout(r, 500))
    const exists = mockUsers.find((u) => u.userName === registerData.userName)
    if (exists) {
      return { status: 400, message: 'Tài khoản đã tồn tại' }
    }
    mockUsers.push({
      userName: registerData.userName,
      password: registerData.password,
    })
    return { status: 200, message: 'Đăng ký thành công' }
  }

  try {
    console.log('Calling register API with:', registerData)
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi khi gọi API register:', error)
    throw error
  }
}
