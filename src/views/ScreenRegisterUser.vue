<template>
  <div class="auth-wrapper">
    <RegisterForm ref="registerFormRef" @register="onRegister" @back="onBack" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RegisterForm from '@/components/RegisterForm.vue'
import { register } from '@/service/auth'

const router = useRouter()
const registerFormRef = ref(null)

function onBack() {
  router.push('/login')
}

async function onRegister(registerData) {
  try {
    const response = await register(registerData)
    if (response.status === 200) {
      registerFormRef.value.showSuccess('Đăng ký thành công!')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      registerFormRef.value.showError(
        response.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      )
    }
  } catch (error) {
    registerFormRef.value.showError('Đăng ký thất bại. Vui lòng thử lại.')
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
</style>
