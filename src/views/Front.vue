<template>
  <div class="main-left">
    <div class="welcome-text">欢迎 {{ userInfo.username }}</div>
    <div class="profile-img-container" v-if="backgroundImg">
      <el-image class="profile-img" :src="backgroundImg" fit="contain" />
    </div>
  </div>
  <div class="main-right">
    <el-calendar v-model="date" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserInfo } from '@/utils/user'
import { baseURL } from '@/utils/request'
const date = ref(new Date())
const backgroundImg = ref('')
const userInfo = ref({})

onMounted(async () => {
  const userInfoResponse = await getUserInfo()
  userInfo.value = userInfoResponse
  backgroundImg.value = baseURL + '/images/' + userInfoResponse.avatarId
})
</script>

<style scoped>
.main-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 10px;
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
}
</style>
