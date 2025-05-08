<template>
  <div class="background">
    <div class="avoid-height">
      <div class="main-left">
        <div class="profile-img-container" v-if="backgroundImg">
          <el-image class="profile-img" :src="backgroundImg" fit="contain" alt="头像" />
        </div>
      </div>
      <div class="main-right">
        <h2>用户基本信息</h2>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { baseURL } from '@/utils/request'
import { getUserInfo } from '@/utils/user'
import { onMounted, ref } from 'vue'
const backgroundImg = ref('')

const userInfo = ref({})

onMounted(async () => {
  const userInfoResponse = await getUserInfo()
  userInfo.value = userInfoResponse
  backgroundImg.value = baseURL + '/images/' + userInfoResponse.avatarId
})
</script>

<style scoped>
.background {
  width: 100%;
}
.avoid-height {
  display: flex;
  width: 100%;
  gap: 20px;
}
.main-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.profile-img-container {
  padding: 10px;
  background-color: white;
}

.profile-img {
  width: 250px;
  height: 250px;
}

.main-right {
  flex: 2;
  padding: 10px;
  background-color: white;
}

h2 {
  text-align: center;
}
</style>
