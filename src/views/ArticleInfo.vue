<template>
  <div class="background">
    <div class="up-part">
      <div class="left">
        <div class="profile-img-container">
          <el-image class="profile-img" :src="backgroundImg" fit="contain" />
        </div>
      </div>
      <div class="right">
        <h2>作者基本信息</h2>
        <el-descriptions class="margin-top" title="" :column="1" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">用户名</div>
            </template>
            {{ userInfo.username }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">邮箱</div>
            </template>
            {{ userInfo.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">余额</div>
            </template>
            {{ userInfo.balance }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">生日</div>
            </template>
            {{ userInfo.birthday }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="back-button-container">
          <router-link to="/home/article" style="all: unset; display: flex; align-items: center">
            <el-button type="primary" class="back-button">返回</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="bottom-part">
      <div class="operation-bar">
        <el-button type="primary" plain @click="appendDialogVisible = true">+ 新增</el-button>
        <div class="search-container">
          <el-input v-model="searchContent" style="width: 240px" placeholder="请输入昵称">
            <template #prefix>
              <el-icon>
                <Search />
              </el-icon>
            </template>
          </el-input>
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <el-table stripe border :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center">
          <template #default="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="文章标题" width="200" align="center" />
        <el-table-column prop="content" label="文章内容" width="400" align="center" />
        <el-table-column fixed="right" label="操作" min-width="120" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="showUpdateDialog(scope.row)">
              修改
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
  </div>
  <!-- 对话框 -->
  <!-- 新增文章对话框 -->
  <el-dialog v-model="appendDialogVisible" title="新增文章" width="500">
    <el-form :model="appendForm" label-width="auto" style="max-width: 600px">
      <el-form-item required label="标题">
        <el-input v-model="appendForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item required label="内容">
        <el-input type="textarea" v-model="appendForm.content" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="appendDialogConfirm">确定</el-button>
        <el-button @click="appendDialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 修改文章对话框 -->
  <el-dialog v-model="updateDialogVisible" title="修改文章" width="500">
    <el-form :model="updateForm" label-width="auto" style="max-width: 600px">
      <el-form-item required label="标题">
        <el-input v-model="updateForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item required label="内容">
        <el-input type="textarea" v-model="updateForm.content" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="updateDialogConfirm">确定</el-button>
        <el-button @click="updateDialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 删除对话框 -->
  <el-dialog v-model="deleteDialogVisible" title="提示" width="500">
    <span>此操作将永久删除该文章，是否继续？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="deleteDialogConfirm">确定</el-button>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import backgroundImg from '@/assets/img/background.png'
import { computed } from 'vue'
import { getUserInfoByUsername } from '@/utils/user'
import { getArticlesByAuthor, addArticle, updateArticle, deleteArticle } from '@/utils/article'

const route = useRoute()
const userInfo = ref({})
const articles = ref([])

const fetchFullData = async () => {
  const author = route.query.author
  articles.value = await getArticlesByAuthor(author)
  fullData.value = articles.value
}

onMounted(async () => {
  const author = route.query.author
  console.log(author)
  userInfo.value = await getUserInfoByUsername(author)
  console.log(userInfo.value)
  await fetchFullData()
})

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
const updateForm = ref({})
const deleteForm = ref({})

const appendDialogConfirm = async () => {
  appendForm.value.author = userInfo.value.username
  await addArticle(appendForm.value)
  appendDialogVisible.value = false
  appendForm.value = {}
  fetchFullData()
}

const showUpdateDialog = (row) => {
  updateForm.value = row
  updateDialogVisible.value = true
}

const updateDialogConfirm = async () => {
  await updateArticle(updateForm.value.articleId, updateForm.value)
  updateDialogVisible.value = false
  fetchFullData()
}

const showDeleteDialog = async (row) => {
  deleteDialogVisible.value = true
  deleteForm.value = row
  console.log(deleteForm.value)
}

const deleteDialogConfirm = async () => {
  await deleteArticle(deleteForm.value.articleId)
  fetchFullData()
  deleteDialogVisible.value = false
}
</script>

<style scoped>
.background {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.up-part {
  width: 100%;
  display: flex;
  gap: 20px;
}

.left {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: white;
}

.profile-img-container {
  padding: 10px;
}

.profile-img {
  width: 250px;
  height: 250px;
}

.right {
  flex: 2;
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
}

h2 {
  text-align: center;
}

.back-button-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.back-button {
  width: 100px;
}

.bottom-part {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  gap: 10px;
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
