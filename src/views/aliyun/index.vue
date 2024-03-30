<template>
    <div class="container ic-card">
        <img :src="qrCodeUrl" />

        <el-button @click="getBackupList">备份盘</el-button>
        <el-button @click="getResourceList">资源库</el-button>

        <el-divider></el-divider>

        <div v-for="item in backupList.items" :key="item.file_id" @click="itemClick(item)">{{ item.name + (item.size? ' (' +
            formatBytes(item.size) + ')':'') }}</div>

        <el-divider></el-divider>
        <div style="max-height: 200px;overflow: auto;">
            <div v-for="item in itemList.items" :key="item.file_id" @click="itemClick(item)">{{ item.name + (item.size? ' (' +
            formatBytes(item.size) + ')':'') }}</div>
        </div>
    </div>

    <!-- 视频播放 -->
    <videoPlayer ref="videoPlayerRef"></videoPlayer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { cache, formatBytes } from '@/utils/tool'
import apiAuth from '@/api/aliyun/auth'
import apiUser from '@/api/aliyun/user'
import apiOpenFile from '@/api/aliyun/openFile'
import videoPlayer from './videoPlayer'

const qrCodeUrl = ref('') //二维码地址
const sid = ref('')
const timer = ref(null)
const authCode = ref('') //认证码
const videoPlayerRef = ref(null)

onMounted(() => {
    const aliyun_token = cache.get('aliyun_token')
    // 已有缓存的登录token
    if (aliyun_token) {
        getDriveInfo()
    } else {
        //扫码登录
        scanQrcode()
    }
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
    timer.value = null
})

watch(authCode, (val) => {
    if (val) {
        apiAuth.getAccessToken(val).then(res => {
            // 缓存TOKEN
            cache.set('aliyun_token', res)
            //获取登录信息
            apiAuth.getUserInfo().then(userInfo => {
                console.log(userInfo)
            })
            // 获取网盘drive_id
            getDriveInfo()
        })
    }
})
//扫码登录
const scanQrcode = () => {
    // 获取二维码
    apiAuth.getQrcode().then(res => {
        qrCodeUrl.value = res.qrCodeUrl
        sid.value = res.sid
    })

    // 定时器获取扫码状态
    timer.value = setInterval(() => {
        apiAuth.getQrcodeStatus(sid.value).then(res => {
            if (res.status === 'LoginSuccess') {
                clearInterval(timer.value)
                timer.value = null
                authCode.value = res.authCode
            }
        })
    }, 500)
}

const driveInfo = ref({})
// 获取网盘id
const getDriveInfo = () => {
    apiUser.getDriveInfo().then(res => {
        driveInfo.value = res
    }).catch(() => {
        //token过期,扫码登录
        cache.set('aliyun_token', '')
        scanQrcode()
    })
}
// 获取子文件列表通用方法
const getFileList = async (drive_id, parent_file_id) => {
    const data = {
        drive_id,
        parent_file_id
    }
    return await apiOpenFile.list(data)
}
// 获取备份盘列表
const backupList = ref([])
const getBackupList = () => {
    getFileList(driveInfo.value.backup_drive_id, 'root').then(res => {
        backupList.value = res
    })
}

// 获取资源库列表
const resourceList = ref([])
const getResourceList = () => {

}

const itemList = ref([])
const itemClick = (item) => {
    //文件夹、视频、音频等格式处理
    if (item.type === 'folder') { //文件夹
        getFileList(item.drive_id, item.file_id).then(res => {
            itemList.value = res
            console.log(res);
        })
    } else { //文件
        const data = {
            drive_id: item.drive_id,
            file_id: item.file_id,
            // category: item.category,
        }
        apiOpenFile.get(data).then(res => {
            const data1 = {
                drive_id: res.drive_id,
                file_id: res.file_id,
                category: 'live_transcoding',
            }
            apiOpenFile.getVideoPreviewPlayInfo(data1).then(res => {
                videoPlayerRef.value.open(res, item.name)
            })
        })
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin: 40px 150px 10px 10px;
    height: calc(100vh - 100px);
}
</style>
