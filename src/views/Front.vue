<template>
    <div class="main-left">
            <div class="welcome-text">
              欢迎 xx
            </div>
            <div class="profile-img-container">
              <el-image class="profile-img" :src="backgroundImg" fit="contain" />
            </div>
          </div>
          <div class="main-right">
            <el-calendar v-model="date" />
          </div>
</template>

<script setup>
import backgroundImg from '@/assets/img/background.png'
import { ref } from 'vue'
const date = ref(new Date())
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