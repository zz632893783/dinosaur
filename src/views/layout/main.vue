<template>
    <div class="root-container">
        <el-menu class="navigation" v-on:select="selectFunc" :default-active="defaultActive" unique-opened>
            <!-- <el-menu-item v-for="(item) in routes" :index="item.path">{{ item.cName }}</el-menu-item> -->
            <template v-for="(groupItem, groupIndex) in routes">
                <el-sub-menu v-if="groupItem.cName" :index="`${groupIndex}`">
                    <template #title>{{ groupItem.cName }}</template>
                    <el-menu-item v-for="(item, index) in groupItem.children" :index="`${groupItem.path}/${item.path}`">{{ item.cName }}</el-menu-item>
                </el-sub-menu>
            </template>
        </el-menu>
        <el-scrollbar class="main-container">
            <router-view></router-view>
        </el-scrollbar>
    </div>
</template>
<script setup>
import { routes } from '@/router/index.js'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
let defaultActive = ref('')
const router = useRouter()
const computeCurrentRouter = () => {
    const path = router.currentRoute.value.fullPath
    defaultActive.value = path
}
onMounted(() => {
    router.isReady().then(computeCurrentRouter)
})
const selectFunc = (path, match, routerItem) => {
    router.push({ path })
}
</script>
<style lang="scss" scoped>
.root-container {
    text-align: left;
    height: 100vh;
    display: grid;
    grid-template-columns: minmax(0, 160px) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    font-size: 14px;
    .navigation {
        background-color: rgba(238, 243, 254, 1);
       	:deep(.el-menu) {
        	background-color: transparent;
        }
        :deep(.el-sub-menu__title) {
            height: 40px;
            font-weight: 600;
        }
        .el-menu-item {
            height: 40px;
            // background-color: rgba(66, 99, 254, 0.05);
            &.is-active {
                background-color: rgba(66, 99, 254, 0.1);
            }
        }
    }
}
</style>
