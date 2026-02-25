<template>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <i class="pi pi-building logo-icon"></i>
        <div class="school-info">
          <div class="school-name">Trường Đại Học Bách Khoa</div>
          <div class="school-subtitle">Hanoi University of Science and Technology</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="welcome">Welcome, {{ userName }}</div>
      <a class="logout" href="#" @click.prevent="onLogout">Logout</a>
    </div>

    <!-- Content -->
    <div class="content-section">
      <!-- Toolbar -->
      <div class="toolbar">
        <!-- Student count card -->
        <div class="student-card">
          <div class="card-header">Total Students</div>
          <div class="card-count">{{ originalRows.length }}</div>
        </div>

        <!-- Actions -->
        <div class="toolbar-actions">
          <Button
            label="Clear"
            icon="pi pi-filter-slash"
            class="p-button-outlined"
            @click="clearFilters"
          />
          <Button
            label="Add Student"
            icon="pi pi-plus"
            class="p-button-success"
            @click="onAdd"
          />
        </div>
      </div>

      <!-- Data table -->
      <div class="table-wrapper">
        <DataTable
          v-model:filters="filters"
          :value="originalRows"
          paginator
          :rows="rowsPerPage"
          stripedRows
          removableSort
          filterDisplay="row"
          :first="first"
          @page="onPage"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 20]"
          class="p-datatable-sm"
          :loading="loading"
          :globalFilterFields="['code', 'name', 'address']"
        >
          <template #header>
            <div class="flex justify-end">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </IconField>
            </div>
          </template>

          <Column field="no" header="No" style="width: 5%">
            <template #body="slotProps">
              {{ first + slotProps.index + 1 }}
            </template>
          </Column>
          <Column field="code" header="Code" sortable style="width: 15%">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by code" />
            </template>
          </Column>
          <Column field="name" header="Name" sortable style="width: 20%">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
            </template>
          </Column>
          <Column field="birthday" header="Birthday" sortable dataType="date" style="width: 15%">
            <template #body="{ data }">
              {{ formatDate(data.birthday) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" @date-select="filterCallback()" />
            </template>
          </Column>
          <Column field="address" header="Address" sortable style="width: 25%">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by address" />
            </template>
          </Column>
          <Column field="score" header="Score" sortable dataType="numeric" style="width: 10%">
            <template #filter="{ filterModel, filterCallback }">
              <InputNumber v-model="filterModel.value" @input="filterCallback()" placeholder="Score" :maxFractionDigits="2" />
            </template>
          </Column>
          <Column header="Edit" style="width: 10%; text-align: center">
            <template #body="slotProps">
              <div class="actions">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-info icon-button"
                  v-tooltip.top="'Edit Student'"
                  @click="onEdit(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger icon-button"
                  v-tooltip.top="'Delete Student'"
                  @click="onDelete(slotProps.data)"
                />
              </div>
            </template>
          </Column>
          <template #empty>No students found.</template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tooltip from 'primevue/tooltip'
import { getStudents, deleteStudent } from '@/service/student.js'
import { useAuth } from '@/stores/auth.js'
import '@/styles/list.css'

const vTooltip = Tooltip

const router = useRouter()
const confirm = useConfirm()
const toast = useToast()
const auth = useAuth()
const userName = computed(() => auth.user || 'NguyenVanA')

const loading = ref(false)
const originalRows = ref([])
const first = ref(0)
const rowsPerPage = ref(10)

const initFilters = () => ({
  global: { value: null, matchMode: 'contains' },
  code: { value: null, matchMode: 'contains' },
  name: { value: null, matchMode: 'contains' },
  birthday: { value: null, matchMode: 'dateIs' },
  address: { value: null, matchMode: 'contains' },
  score: { value: null, matchMode: 'equals' },
})

const filters = ref(initFilters())

const clearFilters = () => {
  filters.value = initFilters()
}

const transformStudentData = (apiData) => {
  return apiData.map((student) => ({
    id: student.studentId,
    code: student.studentCode,
    name: student.studentName,
    birthday: student.dateOfBirth ? new Date(student.dateOfBirth) : null,
    address: student.address,
    score: student.averageScore,
  }))
}

const formatDate = (date) => {
  if (!date) return ''
  if (!(date instanceof Date)) date = new Date(date)
  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`
}

const loadStudents = async () => {
  loading.value = true
  try {
    const response = await getStudents()
    if (response.status === 200) {
      originalRows.value = transformStudentData(response.data)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message || 'Failed to load students',
        life: 3000,
      })
    }
  } catch (error) {
    console.error('Error loading students:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load students',
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}

onMounted(loadStudents)

function onPage(event) {
  first.value = event.first
  rowsPerPage.value = event.rows
}

function onAdd() {
  router.push('/student')
}

function onEdit(row) {
  router.push(`/student/${row.id}`)
}

function onDelete(row) {
  confirm.require({
    message: `Are you sure you want to delete student "${row.name}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        const response = await deleteStudent(row.id)
        if (response.status === 200) {
          toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student deleted successfully',
            life: 3000,
          })
          await loadStudents()
        } else {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message || 'Failed to delete student',
            life: 3000,
          })
        }
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete student',
          life: 3000,
        })
      }
    },
  })
}

function onLogout() {
  auth.logout()
  router.push('/login')
}
</script>
