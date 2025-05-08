<template>
  <div class="background">
    <h2 class="title">联系人管理</h2>
    <div class="operation-bar">
      <el-button type="primary" plain @click="appendDialogVisible = true">+ 新增</el-button>
      <div class="search-container">
        <el-input v-model="searchContent" style="width: 240px" placeholder="请输入姓名">
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </div>
    </div>
    <el-table stripe border :data="tableData" style="width: 100%">
      <el-table-column label="序号">
        <template #default="scope">
          {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="150" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="province" label="省份" width="120" />
      <el-table-column prop="city" label="市区" width="120" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column prop="postalCode" label="邮编" width="120" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="showUpdateDialog(scope.row)">
            编辑
          </el-button>
          <el-button link type="primary" size="small" @click="showDeleteDialog(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next"
        :total="fullData.length"
      />
    </div>
  </div>

  <!-- 对话框 -->
  <!-- 新增联系人对话框 -->
  <el-dialog v-model="appendDialogVisible" title="新增联系人" width="500">
    <el-form :model="appendForm" label-width="auto" style="max-width: 600px">
      <el-form-item required label="日期">
        <el-date-picker
          v-model="appendForm.date"
          type="datetime"
          placeholder="Select date and time"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item required label="姓名">
        <el-input v-model="appendForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item required label="省份">
        <el-select v-model="appendForm.province" placeholder="请选择">
          <el-option
            v-for="(item, index) in provinceAndCityList"
            :key="index"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="城市">
        <el-select v-model="appendForm.city" placeholder="请选择">
          <el-option
            v-for="(item, index) in appendForm.province
              ? provinceAndCityList.find((item) => item.name === appendForm.province).city
              : []"
            :key="index"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="appendForm.address" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item required label="邮编">
        <el-input v-model="appendForm.postalCode" placeholder="请输入邮编" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="appendDialogConfirm"> 确定 </el-button>
        <el-button @click="appendDialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 修改联系人对话框 -->
  <el-dialog v-model="updateDialogVisible" title="修改联系人" width="500">
    <el-form :model="updateForm" label-width="auto" style="max-width: 600px">
      <el-form-item required label="日期">
        <el-date-picker
          v-model="updateForm.date"
          type="datetime"
          placeholder="Select date and time"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item required label="姓名">
        <el-input v-model="updateForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item required label="省份">
        <el-select v-model="updateForm.province" placeholder="请选择">
          <el-option
            v-for="(item, index) in provinceAndCityList"
            :key="index"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="城市">
        <el-select v-model="updateForm.city" placeholder="请选择">
          <el-option
            v-for="(item, index) in updateForm.province
              ? provinceAndCityList.find((item) => item.name === updateForm.province).city
              : []"
            :key="index"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="updateForm.address" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item required label="邮编">
        <el-input v-model="updateForm.postalCode" placeholder="请输入邮编" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="updateDialogConfirm"> 确定 </el-button>
        <el-button @click="updateDialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 删除对话框 -->
  <el-dialog v-model="deleteDialogVisible" title="提示" width="500">
    <span>此操作将永久删除该联系人，是否继续？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="deleteDialogConfirm"> 确定 </el-button>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getContacts, addContact, deleteContact, updateContact } from '@/utils/contact'
import provinceAndCityList from '@/utils/district'

const fullData = ref([])
const currentPage = ref(1)
const pageSize = ref(5)

const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return fullData.value.slice(start, end)
})

const searchContent = ref('')

const appendDialogVisible = ref(false)
const updateDialogVisible = ref(false)
const deleteDialogVisible = ref(false)

const appendForm = ref({})
const deleteForm = ref({})
const originForm = ref({})
const updateForm = ref({})

const defaultTime = new Date()

onMounted(async () => {
  fetchFullData()
})

const fetchFullData = async () => {
  const contacts = await getContacts()
  fullData.value = contacts
}

const appendDialogConfirm = async () => {
  await addContact(appendForm.value)
  appendForm.value = {}
  fetchFullData()
  appendDialogVisible.value = false
}

const showDeleteDialog = (row) => {
  deleteForm.value = row
  deleteDialogVisible.value = true
}

const deleteDialogConfirm = async () => {
  await deleteContact(deleteForm.value.name)
  deleteDialogVisible.value = false
  fetchFullData()
}

const showUpdateDialog = (row) => {
  originForm.value = { ...row }
  updateForm.value = row
  updateDialogVisible.value = true
}

const updateDialogConfirm = async () => {
  await updateContact(originForm.value.name, updateForm.value)
  fetchFullData()
  updateDialogVisible.value = false
}

const onSearch = () => {
  const keyword = searchContent.value.trim().toLowerCase()
  if (!keyword) {
    // 如果搜索框为空，显示全部数据
    fetchFullData()
    return
  }

  // 基于姓名字段进行模糊匹配
  fullData.value = fullData.value.filter((item) => item.name.toLowerCase().includes(keyword))

  // 重置到第一页
  currentPage.value = 1
}
</script>

<style scoped>
.background {
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.operation-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination {
  margin-top: auto;
  margin-bottom: 20px;
}
</style>
