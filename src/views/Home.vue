<template>
  <div class="body" :class="useThemeStore().theme">
    <el-container class="layout">
      <el-aside width="200px" class="aside">
        <el-scrollbar>
          <el-menu :default-openeds="['2', '3']" default-active="1-1">
            <el-menu-item index="1-1" class="main-page">
              <router-link to="/home/selfinfo" style="all: unset;display: flex; align-items: center;">
                <el-icon>
                  <Document />
                </el-icon>
                首页
              </router-link>
            </el-menu-item>
            <el-sub-menu index="2" class="sub-menu">
              <template #title>
                <el-icon>
                  <Location />
                </el-icon>功能菜单
              </template>
              <el-menu-item index="2-1" class="menu-item">
                <router-link to="/home/user" style="all: unset;display: flex; align-items: center;">
                  用户管理
                </router-link>
              </el-menu-item>
              <el-menu-item index="2-2" class="menu-item">
                <router-link to="/home/article" style="all: unset;display: flex; align-items: center;">
                  文章管理
                </router-link>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3" class="sub-menu">
              <template #title>
                <el-icon>
                  <Document />
                </el-icon>主题切换
              </template>
              <el-menu-item index="3-1" class="menu-item" @click="changeTheme('blue-theme')">蓝色风格</el-menu-item>
              <el-menu-item index="3-2" class="menu-item" @click="changeTheme('yellow-theme')">黄色风格</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="4" class="first-layer-menu-item">
              <el-icon>
                <Document />
              </el-icon>导航三
            </el-menu-item>
            <el-menu-item index="5" class="first-layer-menu-item">
              <el-icon>
                <Document />
              </el-icon>导航四
            </el-menu-item>
          </el-menu>
        </el-scrollbar>

      </el-aside>
      <el-container>
        <el-header class="header">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }} 用户
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/home/front" style="all: unset;display: flex; align-items: center;">
                    日历
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/login" style="all: unset;display: flex; align-items: center;">
                    退出
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main class="main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const date = ref(new Date())
import { useThemeStore } from '@/stores/theme'
const changeTheme = useThemeStore().changeTheme
const username = ref('admin')
</script>

<style scoped>
.body {
  height: 100vh;
}

.layout {
  height: 100vh;
}

@media (min-width: 1000px) {
  .aside {
    height: 100%;
  }
}

@media (max-width: 999px) {
  .aside {
    display: none;
  }
}

.main-page {
  background-color: var(--main-page-color);
  justify-content: center;
  padding: 0 !important;
}

.first-layer-menu-item {
  background-color: var(--first-layer-menu-item-color);
  justify-content: center;
  padding: 0 !important;
}

.sub-menu {
  background-color: var(--sub-menu-color);
}

:deep(.el-sub-menu__title) {
  justify-content: center !important;
  padding: 0 !important;
}

.menu-item {
  justify-content: center;
  padding: 0px !important;
}

.header {
  background-color: var(--header-color);
  text-align: right;
}

.main {
  background-color: var(--main-color);
  display: flex;
}

.el-dropdown-link {
  font-size: 18px;
  color: black;
  padding-top: 10px;
}
</style>