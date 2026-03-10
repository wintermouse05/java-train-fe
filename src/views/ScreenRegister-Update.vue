<template>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <i class="pi pi-building logo-icon"></i>
        <div class="school-info">
          <div class="school-name">Trường Đại Học Khoa Học Tự Nhiên</div>
          <div class="school-subtitle">University of Science</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="welcome" v-if="isEdit">Welcome, {{ userName }}</div>
      <a class="logout" href="#" @click.prevent="logout">Logout</a>
    </div>

    <!-- Form -->
    <div class="content-section form p-fluid">
      <h2>STUDENT</h2>

      <!-- Student Id (only in edit mode) -->
      <div class="row" v-if="isEdit">
        <label>Student Id :</label>
        <InputText v-model="model.id" :disabled="true" class="half-input" />
      </div>

      <!-- Student Code -->
      <div class="row">
        <label>Student Code :</label>
        <InputText
          v-model.trim="model.code"
          :maxlength="10"
          disabled
          @keydown.space.prevent
        />
        <div class="generate-code">
          <Button
            label="Generate Code"
            :disabled="isEdit"
            @click="generateCode"
            class="p-button-success"
          />
        </div>
      </div>

      <!-- Student Name -->
      <div class="row">
        <label>Student Name :</label>
        <InputText v-model.trim="model.name" :maxlength="20" />
      </div>

      <!-- Birthday -->
      <div class="row">
        <label>Birthday :</label>
        <Calendar
          v-model="model.birthday"
          dateFormat="mm/dd/yy"
          :maxDate="today"
          showIcon
          :manualInput="false"
          :readonlyInput="true"
        />
      </div>

      <!-- Address -->
      <div class="row">
        <label>Address :</label>
        <InputText v-model.trim="model.address" :maxlength="255" class="address-input" />
      </div>

      <!-- Average Score -->
      <div class="row">
        <label>Average Score :</label>
        <InputNumber
          v-model="model.score"
          mode="decimal"
          :minFractionDigits="1"
          :maxFractionDigits="1"
          :min="0"
          :step="0.1"
          class="half-input"
        />
      </div>

      <!-- Buttons -->
      <div class="actions">
        <Button label="Back" class="p-button-info" @click="goList" />
        <Button label="Save" class="p-button-success" @click="onSave" />
      </div>
    </div>

    <!-- Message Dialog -->
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
import { reactive, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import {
  getStudentById,
  createStudent,
  updateStudent,
} from '@/service/student'
import { useAuth } from '@/stores/auth.js'
import '@/styles/list.css'

const auth = useAuth()
const userName = computed(() => auth.user || 'NguyenVanA')
const router = useRouter()
const route = useRoute()
const toast = useToast()
const isEdit = computed(() => !!route.params.id)
const message = ref('')
const showMessage = ref(false)

const model = reactive({
  id: '',
  code: '',
  name: '',
  birthday: null,
  address: '',
  score: null,
})

const today = new Date()
today.setHours(0, 0, 0, 0)

onMounted(() => {
  if (route.params.id) {
    fetchStudent()
  }
})

const fetchStudent = async () => {
  try {
    const response = await getStudentById(route.params.id)
    if (response.status === 401) {
      auth.logout()
      router.push('/login')
      return
    }
    if (response.status === 200) {
      const s = response.data
      model.id = s.studentId
      model.code = s.studentCode
      model.name = s.studentName
      model.birthday = s.dateOfBirth ? new Date(s.dateOfBirth) : null
      model.address = s.address
      model.score = s.averageScore
    } else {
      message.value = response.message || 'Failed to load student'
      showMessage.value = true
    }
  } catch (error) {
    message.value = 'Failed to load student data'
    showMessage.value = true
  }
}

const doCreate = async () => {
  try {
    const studentData = {
      studentCode: model.code,
      studentName: model.name,
      dateOfBirth: model.birthday
        ? model.birthday.toISOString().split('T')[0]
        : null,
      address: model.address,
      averageScore: model.score,
    }
    const response = await createStudent(studentData)
    if (response.status === 401) {
      auth.logout()
      router.push('/login')
      return
    }
    if (response.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Student created successfully',
        life: 3000,
      })
      router.push('/list')
    } else {
      message.value = response.message || 'Failed to create student'
      showMessage.value = true
    }
  } catch (error) {
    message.value = 'Failed to create student'
    showMessage.value = true
  }
}

const doUpdate = async () => {
  try {
    const studentData = {
      studentCode: model.code,
      studentName: model.name,
      dateOfBirth: model.birthday
        ? model.birthday.toISOString().split('T')[0]
        : null,
      address: model.address,
      averageScore: model.score,
    }
    const response = await updateStudent(route.params.id, studentData)
    if (response.status === 401) {
      auth.logout()
      router.push('/login')
      return
    }
    if (response.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Student updated successfully',
        life: 3000,
      })
      router.push('/list')
    } else {
      message.value = response.message || 'Failed to update student'
      showMessage.value = true
    }
  } catch (error) {
    message.value = 'Failed to update student'
    showMessage.value = true
  }
}

function generateCode() {
  model.code = `STU${Math.floor(100 + Math.random() * 900)}`
}

function onValidate() {
  if (!model.code) {
    message.value = 'Vui lòng tạo mã sinh viên (Generate Code)'
    showMessage.value = true
    return false
  }
  if (!model.name) {
    message.value = 'Vui lòng nhập tên sinh viên'
    showMessage.value = true
    return false
  }
  if (model.name.length > 20) {
    message.value = 'Tên sinh viên không được quá 20 ký tự'
    showMessage.value = true
    return false
  }
  if (!model.birthday) {
    message.value = 'Vui lòng chọn ngày sinh'
    showMessage.value = true
    return false
  }
  if (!model.address) {
    message.value = 'Vui lòng nhập địa chỉ'
    showMessage.value = true
    return false
  }
  if (model.address.length > 255) {
    message.value = 'Địa chỉ không được quá 255 ký tự'
    showMessage.value = true
    return false
  }
  if (model.score === null || model.score === undefined) {
    message.value = 'Vui lòng nhập điểm trung bình'
    showMessage.value = true
    return false
  }
  if (model.score < 0 || model.score > 10) {
    message.value = 'Điểm trung bình phải từ 0 đến 10'
    showMessage.value = true
    return false
  }
  return true
}

function onSave() {
  if (!onValidate()) return
  if (isEdit.value) {
    doUpdate()
  } else {
    doCreate()
  }
}

function goList() {
  router.push('/list')
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
