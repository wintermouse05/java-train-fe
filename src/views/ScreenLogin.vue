<template>
  <div class="auth-wrapper">
    <LoginForm ref="loginFormRef" @login="onLogin" />
    <div class="register-box card">
      <span class="hint">Don't have an account? </span>
      <RouterLink to="/register" class="link">Register</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import { login } from '@/service/auth'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const auth = useAuth()
const loginFormRef = ref(null)

async function onLogin(credentials) {
  try {
    const response = await login(credentials.userName, credentials.password)
    if (response.status == 200) {
      auth.loginSaved(response.data)
      router.push('/list')
    } else {
      loginFormRef.value.showError(
        response.message || 'Login failed. Please try again.'
      )
    }
  } catch (error) {
    loginFormRef.value.showError(
      'An error occurred during login. Please try again.'
    )
  }
}
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f6f7f9;
  gap: 16px;
}

.register-box {
  padding: 16px 36px;
  text-align: center;
  min-width: 380px;
  max-width: 420px;
}

.hint {
  color: #6b7280;
}

.link {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
