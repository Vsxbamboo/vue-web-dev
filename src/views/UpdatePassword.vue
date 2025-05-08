<template>
  <div class="background">
    <div class="content">
      <div class="head">
        <h2>修改密码</h2>
      </div>
      <div class="body">
        <div class="left">
          <input type="text" placeholder="用户名" v-model="form.username" />
          <input type="password" placeholder="旧密码" v-model="form.password" />
        </div>
        <div class="right">
          <input type="password" placeholder="新密码" v-model="form.newPassword" />
          <input type="password" placeholder="确认新密码" v-model="form.newPasswordRepeat" />
        </div>
      </div>
      <div class="foot">
        <div class="button" @click="updatePassword">修改密码</div>
        <div class="button">
          <router-link
            to="/login"
            style="all: unset; display: flex; align-items: center; justify-content: center"
          >
            返回登录
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { updatePassword as updatePasswordRequest } from '@/utils/user'
import { ref } from 'vue'

const form = ref({})

const updatePassword = () => {
  if (form.value.newPassword !== form.value.newPasswordRepeat) {
    ElMessage.error('两次输入的新密码不一致')
  }
  try {
    delete form.value.newPasswordRepeat
    console.log(form.value)
    updatePasswordRequest(form.value)
    ElMessage({
      message: '修改成功',
      duration: 1000,
    })
  } catch (error) {
    ElMessage.error('修改失败')
  }
}
</script>

<style scoped>
.button {
  cursor: pointer;
  user-select: none;
}

.button:hover {
  filter: brightness(1.1);
  /* 悬停时亮度增加 10% */
}

.button:active {
  filter: brightness(0.9);
  /* 点击时亮度降低 10% */
}

@media (min-width: 801px) {
  .background {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* background-image: url('/src/assets/img/background.png'); */
    background-size: 100%;
    height: 100dvh;
  }

  .content {
    width: 600px;
    height: 300px;
    margin-top: 100px;
    border: 1px solid #ccc;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
  }

  .head {
    justify-content: center;
    flex: 1;
  }

  .head > h2 {
    text-align: center;
    margin-bottom: 0px;
  }

  .body {
    flex: 3;
    display: flex;
    background-color: #f2f2f2;
    margin: 20px;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid black;
    background-color: #f2f2f2;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f2f2f2;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .left > input,
  .right > input {
    flex: 1;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 0px;
    border-radius: 5px;
    padding: 10px;
  }

  .foot {
    flex: 1;
    background-color: #505050;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .foot > div {
    flex: 1;
    text-align: center;
    color: #dbdbdb;
  }
}

@media (max-width: 800px) {
  .background {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* background-image: url('/src/assets/img/background.png'); */
    background-size: 100%;
    height: 100vh;
  }

  .content {
    width: 400px;
    margin-top: 50px;
    border: 1px solid #ccc;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
  }

  .head {
    justify-content: center;
    flex: 1;
  }

  .head > h2 {
    text-align: center;
    margin-bottom: 0px;
  }

  .body {
    flex: 3;
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    margin: 20px;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f2f2f2;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f2f2f2;
  }

  .left > input,
  .right > input {
    flex: 1;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 0px;
    border-radius: 5px;
    padding: 10px;
  }

  .foot {
    flex: 2;
    background-color: #505050;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    min-height: 80px;
  }

  .foot > div {
    flex: 1;
    text-align: center;
    color: #dbdbdb;
    display: flex;
    align-items: center;
  }
}
</style>
