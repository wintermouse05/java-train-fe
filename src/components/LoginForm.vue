<template>
  <div class="login-card card">
    <h2 style="margin: 8px 0 16px; text-align: center">Sign in</h2>
    <div class="field">
      <div class="input-wrapper">
        <i class="pi pi-user input-icon"></i>
        <InputText
          v-model="form.userName"
          type="text"
          placeholder="E-mail address"
          :maxlength="20"
          autocomplete="username"
          @keydown.enter="onSubmit"
          @input="filterOneByte($event, 'userName')"
          class="input-with-icon"
        />
      </div>
    </div>
    <div class="field">
      <div class="input-wrapper">
        <i class="pi pi-lock input-icon"></i>
        <InputText
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          :maxlength="15"
          autocomplete="current-password"
          @keydown.enter="onSubmit"
          @input="filterOneByte($event, 'password')"
          class="input-with-icon"
        />
        <button
          type="button"
          class="password-toggle"
          @click="togglePassword"
          :aria-label="showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'"
        >
          <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
        </button>
      </div>
    </div>
    <Button label="Login" @click="onSubmit" class="login-button" />

    <Dialog
      v-model:visible="showMessage"
      modal
      header="Message"
      :style="{ width: '420px' }"
      :closable="true"
    >
      <p>{{ message }}</p>
      <template #footer>
        <Button
          label="Ok"
          icon="pi pi-check"
          @click="showMessage = false"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const emit = defineEmits(['login'])

const form = reactive({ userName: '', password: '' })
const showPassword = ref(false)
const message = ref('')
const showMessage = ref(false)

const isOneByte = (s) => s && s.length > 0 && /^[\x00-\x7F]+$/.test(s)

function filterOneByte(event, field) {
  const val = event.target.value
  // Remove non-ASCII characters (only allow 1-byte chars)
  const filtered = val.replace(/[^\x00-\x7F]/g, '')
  if (filtered !== val) {
    form[field] = filtered
    event.target.value = filtered
  }
}

function togglePassword() {
  showPassword.value = !showPassword.value
}

function validate() {
  if (!form.userName || !form.password) {
    message.value = 'Vui lòng nhập đầy đủ thông tin'
    showMessage.value = true
    return false
  }
  if (form.userName.length > 20) {
    message.value = 'Email không được quá 20 ký tự'
    showMessage.value = true
    return false
  }
  if (!isOneByte(form.userName)) {
    message.value =
      'Email không được chứa ký tự tiếng Việt có dấu, emoji hoặc ký tự đặc biệt Unicode'
    showMessage.value = true
    return false
  }
  if (form.password.length < 6) {
    message.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    showMessage.value = true
    return false
  }
  if (form.password.length > 15) {
    message.value = 'Mật khẩu không được quá 15 ký tự'
    showMessage.value = true
    return false
  }
  if (!isOneByte(form.password)) {
    message.value =
      'Mật khẩu không được chứa ký tự tiếng Việt có dấu, emoji hoặc ký tự đặc biệt Unicode'
    showMessage.value = true
    return false
  }
  return true
}

function onSubmit() {
  if (!validate()) return
  emit('login', { userName: form.userName, password: form.password })
}

defineExpose({ showError })

function showError(msg) {
  message.value = msg
  showMessage.value = true
}
</script>

<style scoped>
.login-card {
  padding: 32px 36px 24px;
  min-width: 380px;
  max-width: 420px;
}

.field {
  margin-bottom: 16px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #9ca3af;
  z-index: 1;
  font-size: 16px;
}

.input-with-icon {
  width: 100%;
  padding-left: 38px !important;
}

.password-toggle {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
  display: flex;
  align-items: center;
}

.password-toggle:hover {
  color: #6b7280;
}

.login-button {
  width: 100%;
  margin-top: 8px;
  background: linear-gradient(135deg, #5bbcb4, #4aa89f);
  border: none;
  font-weight: 600;
  font-size: 16px;
  padding: 10px;
}

.login-button:hover {
  background: linear-gradient(135deg, #4aa89f, #3d9a92);
}
</style>
