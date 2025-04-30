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
                <el-table-column prop="name" label="作者姓名" width="150" align="center" />
                <el-table-column prop="articleCount" label="文章数量" width="120" align="center" />
                <el-table-column fixed="right" label="操作" min-width="120" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="goToArticleInfo(scope.row)">
                            进入文章管理
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
                    layout="total, sizes, prev, pager, next" :total="fullData.length" />
            </div>
        </div>
        <div class="right">
            <h2>作者发布文章统计图表</h2>
            <div id="chart"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const fullData = [
    { name: '张三', articleCount: 10 },
    { name: '王五', articleCount: 30 },
    { name: '赵六', articleCount: 40 },
    { name: '田七', articleCount: 50 },
    { name: '周八', articleCount: 60 },
    { name: '吴九', articleCount: 70 },
    { name: '郑十', articleCount: 80 },
    { name: '冯十一', articleCount: 90 },
    { name: '陈十二', articleCount: 100 },
    { name: '褚十三', articleCount: 110 },
    { name: '卫十四', articleCount: 120 },
    { name: '蒋十五', articleCount: 130 },
    { name: '沈十六', articleCount: 140 },
    { name: '韩十七', articleCount: 150 },
];

const currentPage = ref(1)
const pageSize = ref(5)

const tableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return fullData.slice(start, end)
})

import * as echarts from 'echarts';

onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart'));
    // 绘制图表
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
})

const goToArticleInfo = (row) => {
    // 将对象序列化为 JSON 字符串
    const serializedData = JSON.stringify(row);
    router.push({
        name: 'articleinfo',
        query: {
            data: serializedData
        }
    });
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