<template>
  <div class="register-card card">
    <h2 class="title">REGISTER</h2>
    <div class="field">
      <InputText
        v-model="form.userName"
        type="text"
        placeholder="Email"
        :maxlength="20"
        autocomplete="username"
        @input="filterOneByte($event, 'userName')"
        class="w-full"
      />
    </div>
    <div class="field">
      <div class="input-wrapper">
        <InputText
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          :maxlength="15"
          autocomplete="new-password"
          @input="filterOneByte($event, 'password')"
          class="w-full"
        />
        <button
          type="button"
          class="password-toggle"
          @click="showPassword = !showPassword"
        >
          <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
        </button>
      </div>
    </div>
    <div class="field">
      <div class="input-wrapper">
        <InputText
          v-model="form.password2"
          :type="showPassword2 ? 'text' : 'password'"
          placeholder="Confirm Password"
          :maxlength="15"
          autocomplete="new-password"
          @input="filterOneByte($event, 'password2')"
          class="w-full"
        />
        <button
          type="button"
          class="password-toggle"
          @click="showPassword2 = !showPassword2"
        >
          <i :class="showPassword2 ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
        </button>
      </div>
    </div>
    <div class="actions-right">
      <Button label="Back" class="back-button" @click="$emit('back')" />
      <Button label="REGISTER" class="register-button" @click="onSubmit" />
    </div>

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

const emit = defineEmits(['register', 'back'])

const form = reactive({ userName: '', password: '', password2: '' })
const showPassword = ref(false)
const showPassword2 = ref(false)
const message = ref('')
const showMessage = ref(false)

const isOneByte = (s) => /^[\x00-\x7F]*$/.test(s)

function filterOneByte(event, field) {
  const val = event.target.value
  const filtered = val.replace(/[^\x00-\x7F]/g, '')
  if (filtered !== val) {
    form[field] = filtered
    event.target.value = filtered
  }
}

function validate() {
  if (!form.userName || !form.password || !form.password2) {
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
  // Item (3) - Confirm Password validation
  if (form.password2.length < 6) {
    message.value = 'Mật khẩu xác nhận phải có ít nhất 6 ký tự'
    showMessage.value = true
    return false
  }
  if (form.password2.length > 15) {
    message.value = 'Mật khẩu xác nhận không được quá 15 ký tự'
    showMessage.value = true
    return false
  }
  if (!isOneByte(form.password2)) {
    message.value =
      'Mật khẩu xác nhận không được chứa ký tự tiếng Việt có dấu, emoji hoặc ký tự đặc biệt Unicode'
    showMessage.value = true
    return false
  }
  if (form.password !== form.password2) {
    message.value = 'Mật khẩu xác nhận không khớp'
    showMessage.value = true
    return false
  }
  return true
}

function onSubmit() {
  if (!validate()) return
  emit('register', {
    userName: form.userName,
    password: form.password,
    confirmPassword: form.password2,
  })
}

defineExpose({ showError, showSuccess })

function showError(msg) {
  message.value = msg
  showMessage.value = true
}

function showSuccess(msg) {
  message.value = msg
  showMessage.value = true
}
</script>

<style scoped>
.register-card {
  padding: 40px 48px;
  min-width: 400px;
  max-width: 480px;
  border: 2px solid #4a5e3e;
}

.title {
  font-size: 26px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
}

.field {
  margin-bottom: 20px;
}

.w-full {
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
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

.actions-right {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.back-button {
  background: #6b7280;
  border: none;
  color: white;
  font-weight: 600;
  padding: 8px 24px;
}

.back-button:hover {
  background: #4b5563;
}

.register-button {
  background: #4b5563;
  border: none;
  color: white;
  font-weight: 600;
  padding: 8px 24px;
  letter-spacing: 0.5px;
}

.register-button:hover {
  background: #374151;
}
</style>
