<template>
  <div class="background">
    <div class="left">
      <h2>作者列表</h2>
      <el-table stripe border :data="tableData" style="width: 100%" class="table">
        <el-table-column label="序号" width="60" align="center">
          <template #default="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者姓名" width="150" align="center" />
        <el-table-column prop="count" label="文章数量" width="120" align="center" />
        <el-table-column fixed="right" label="操作" min-width="120" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="goToArticleInfo(scope.row)">
              进入文章管理
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
    <div class="right">
      <h2>作者发布文章统计图表</h2>
      <div id="chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import router from '@/router'
import { getArticleCounts } from '@/utils/article'
import * as echarts from 'echarts'

const fullData = ref([])
const authors = computed(() => {
  return fullData.value.map((item) => item.author)
})
const counts = computed(() => {
  return fullData.value.map((item) => item.count)
})

const currentPage = ref(1)
const pageSize = ref(5)

const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return fullData.value.slice(start, end)
})

const fetchFullData = async () => {
  const res = await getArticleCounts()
  console.log(res)
  fullData.value = res
}

let myChart

onMounted(async () => {
  myChart = echarts.init(document.getElementById('chart'))
  fetchFullData()
})

watch(fullData, () => {
  if (myChart) {
    myChart.setOption({
      xAxis: { data: authors.value },
      yAxis: {},
      series: [
        {
          name: '文章数量',
          type: 'bar',
          data: counts.value,
        },
      ],
    })
  }
})

const goToArticleInfo = (row) => {
  // 将对象序列化为 JSON 字符串
  router.push({
    name: 'articleinfo',
    query: {
      author: row.author,
    },
  })
}
</script>

<style scoped>
.background {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
}

.left {
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
}

.right {
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 20px;
}

#chart {
  width: 100%;
  height: 100%;
}
</style>
