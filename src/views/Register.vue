<template>
    <div class="background">
        <div class="content">
            <div class="head">
                <h2>注册新用户</h2>
            </div>
            <div class="body">
                <div class="left">
                    <input type="text" id="username" v-model="username" placeholder="用户名">
                    <input type="password" id="password" v-model="password" placeholder="密码">
                    <input type="email" id="email" v-model="email" placeholder="邮箱">
                    <input type="date" value="1970-01-01" v-model="birthday">
                </div>
                <div class="right">
                    <div class="upload">
                        <div>请上传头像</div>
                        <el-upload class="avatar-uploader" action="http://localhost:8080/upload-avatar" :show-file-list="false"
                            :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-error="handleError"
                            :with-credentials="true">
                            <img v-if="imageUrl" :src="imageUrl" class="uploaded-image" />
                            <div v-else class="uploaded-placeholder button">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="foot">
                <div class="button" @click="register">
                    注册用户
                </div>
                <div class="button">
                    <router-link to="/login"
                        style="all: unset;display: flex; align-items: center; justify-content: center;">
                        返回登录
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

let isImageUploaded = false
const username = ref('')
const password = ref('')
const email = ref('')
const birthday = ref(new Date().toISOString().slice(0, 10))
const imageUrl = ref('') // 本地预览地址或已上传头像 URL

const register = async () => {
    const emailInput = document.getElementById('email')

    if (username.value === '') {
        ElMessage.error({ message: '用户名不能为空', duration: 1000 })
        return
    } else if (password.value === '') {
        ElMessage.error({ message: '密码不能为空', duration: 1000 })
        return
    } else if (email.value === '') {
        ElMessage.error({ message: '邮箱不能为空', duration: 1000 })
        return
    } else if (emailInput.validity.typeMismatch) {
        ElMessage.error({ message: '邮箱格式不正确', duration: 1000 })
        return
    } else if (!isImageUploaded || !imageUrl.value.startsWith('http')) {
        ElMessage.error({ message: '请上传头像', duration: 1000 })
        return
    }

    const payload = {
        username: username.value,
        password: password.value,
        email: email.value,
        birthday: birthday.value,
        avatar: imageUrl.value, // 使用上传成功返回的 URL
    }

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })

        const result = await res.json()
        if (res.ok && result.code === 200) {
            ElMessage.success({ message: '注册成功', duration: 1000 })
            // 跳转或重置
        } else {
            ElMessage.error({ message: result.msg || '注册失败', duration: 1000 })
        }
    } catch (err) {
        ElMessage.error({ message: '请求出错', duration: 1000 })
    }
}


// 上传前验证并生成本地预览 URL
const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isImage) {
        ElMessage.error({
            message: '只能上传图片格式!',
            duration: 1000,
        })
        return false
    }

    if (!isLt2M) {
        ElMessage.error({
            message: '上传图片大小不能超过 2MB!',
            duration: 1000,
        })
        return false
    }

    // 生成本地预览地址
    imageUrl.value = URL.createObjectURL(file)
    return true
}

// 上传成功回调
const handleSuccess = (response) => {
    if (response.code === 200 && response.url) {
        imageUrl.value = response.url
        isImageUploaded = true
        ElMessage.success({ message: '上传成功', duration: 1000 })
    } else {
        ElMessage.error({ message: response.msg || '上传失败', duration: 1000 })
    }
}

const handleError = (error) => {
    ElMessage.error({
        message: '上传失败',
        duration: 1000,
    })
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

    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #f2f2f2;
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

.upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 80%;
}

.uploaded-image {
    height: 150px;
    width: 150px;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
}

.uploaded-placeholder {
    height: 150px;
    width: 150px;
    border: 1px dashed black;
    font-size: 40px;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>