<template>
    <div class="background">
        <div class="content">
            <div class="head">
                <h2>登录</h2>
            </div>
            <div class="body">
                <div class="left">
                    <div class="button"><img src="@/assets/icon/qq.png">QQ登录</div>
                    <div class="button"><img src="@/assets/icon/wechat.png">微信登录</div>
                    <div class="button"><img src="@/assets/icon/alipay.png">支付宝登录</div>
                </div>
                <div class="right">
                    <input type="text" placeholder="用户名" v-model="formContent.username">
                    <input type="password" placeholder="密码" v-model="formContent.password">
                    <div class="button" @click="loginClick">登录</div>
                </div>
            </div>
            <div class="foot">
                <div class="button">
                    <router-link to="/register"
                        style="all: unset;display: flex; align-items: center; justify-content: center;">
                        注册用户
                    </router-link>
                </div>
                <div class="button">
                    <router-link to="/update-password"
                        style="all: unset;display: flex; align-items: center; justify-content: center;">
                        修改密码
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/utils/user';
import router from '@/router';
import { ElMessage } from 'element-plus';

const formContent = ref({ username: '', password: '' })

const loginClick = async () => {
    if (!formCheck()) {
        return
    }
    await loginRequest()
}

const formCheck = () => {
    if (formContent.value.username === '') {
        ElMessage.error('用户名不能为空')
        return false
    } else if (formContent.value.password === '') {
        ElMessage.error('密码不能为空')
        return false
    }
    return true
}

const loginRequest = async () => {
    try {
        const res = await login(formContent.value)
        if (res.token) {
            localStorage.setItem('token', res.token)
            console.log('登录成功')
            router.push('/home/front')
        } else {
            console.log('登录失败')
        }
    } catch (err) {
        console.log(err)
        console.log('请求错误，请检查网络')
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
        height: 100vh;
    }

    .content {
        width: 600px;
        margin-top: 100px;
        border: 1px solid #ccc;
        background-color: #f2f2f2;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
    }

    .head {
        justify-content: center;
        flex: 1
    }

    .head>h2 {
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

    .left>div {
        flex: 1;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 0px;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .left div:nth-child(1) {
        background-color: #5384c0;
        color: #f8faf5;
        font-size: 14px;
    }

    .left div:nth-child(2) {
        background-color: #8bb24f;
        color: #f8faf5;
        font-size: 14px;
    }

    .left div:nth-child(3) {
        background-color: #eaebea;
        color: black;
        font-size: 14px;
    }

    .left>div>img {
        height: 25px;
        margin-right: 5px;
    }

    .right>input {
        flex: 1;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 0px;
        border-radius: 5px;
        padding: 10px;
    }

    .right>div {
        flex: 1;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 0px;
        border-radius: 5px;
        padding: 10px;
        background-color: #8bb24f;
        color: #f8faf5;
        font-size: 14px;
        display: flex;
        align-items: center;
    }

    .foot {
        flex: 1;
        background-color: #505050;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        min-height: 40px;
    }

    .foot>div {
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
        flex: 1
    }

    .head>h2 {
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

    .left>div {
        flex: 1;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 0px;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .left div:nth-child(1) {
        background-color: #5384c0;
        color: #f8faf5;
        font-size: 14px;
    }

    .left div:nth-child(2) {
        background-color: #8bb24f;
        color: #f8faf5;
        font-size: 14px;
    }

    .left div:nth-child(3) {
        background-color: #eaebea;
        color: black;
        font-size: 14px;
    }

    .left>div>img {
        height: 25px;
        margin-right: 5px;
    }

    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #f2f2f2;
    }

    .right>div {
        flex: 1;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 0px;
        border-radius: 5px;
        padding: 10px;
        background-color: #8bb24f;
        color: #f8faf5;
        font-size: 14px;
        display: flex;
        align-items: center;
    }

    .left>input,
    .right>input {
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

    .foot>div {
        flex: 1;
        text-align: center;
        color: #dbdbdb;
        display: flex;
        align-items: center;
    }
}
</style>