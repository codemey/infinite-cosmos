<template>
    <div class="container ic-card">
        <div class="scan-qrcode" v-if="qrCodeUrl">
            <img :src="qrCodeUrl" />
            <span v-if="scanQrcodeStatus">{{ scanQrcodeStatus }}</span>
            <span v-else>请用阿里云盘App扫码</span>
        </div>

        <div v-else>
            <div style="display:flex;justify-content:space-between">
                <div>
                    <el-button @click="getDataList('backup_drive_id')">备份盘</el-button>
                    <el-button @click="getDataList('resource_drive_id')">资源库</el-button>
                </div>
                <el-popover placement="left" :width="200" trigger="click">
                    <template #reference>
                        <img style="height:40px;width:40px;cursor: pointer;" :src="driveInfo.avatar" />
                    </template>
                    <div class="user-info">
                        <img :src="driveInfo.avatar" />
                        <span>{{ driveInfo.name }}</span>
                        <el-button @click="quit">退出登录</el-button>
                    </div>
                </el-popover>

            </div>

            <el-divider></el-divider>

            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="item.drive_id">
                    <span class="hover-pointer" :style="item.active?'font-weight:700':''" @click="breadcrumbClick(item.drive_id,item.file_id,index)">{{ item.name }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>

            <el-row class="row-header">
                <el-col :span="16" style="font-size:14px">名称</el-col>
                <el-col :span="4" style="font-size:14px">修改时间</el-col>
                <el-col :span="4" style="font-size:14px">大小</el-col>
            </el-row>
            <el-scrollbar height="calc(100vh - 270px)">
                <div v-for="item in dataList.items" :key="item.file_id">
                    <el-row class="row-body" @click="itemClick(item)">
                        <el-col :span="16">
                            <img style="height:28px;width:28px;" :src="handleThumbnail(item)">
                            <span style="margin-left:5px">{{ item.name }}</span>
                        </el-col>
                        <el-col :span="4">{{ dateFormat(new Date(item.updated_at)) }}</el-col>
                        <el-col :span="4" v-if="item.size">{{ formatBytes(item.size) }}</el-col>
                    </el-row>

                    <el-divider style="opacity: 0.5;margin:0"></el-divider>
                </div>
            </el-scrollbar>
        </div>
    </div>
    <!-- 视频播放 -->
    <videoPlayer ref="videoPlayerRef"></videoPlayer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { cache, formatBytes, message, dateFormat } from '@/utils/tool'
import apiAuth from '@/api/aliyun/auth'
import apiUser from '@/api/aliyun/user'
import apiOpenFile from '@/api/aliyun/openFile'
import videoPlayer from './videoPlayer'
import { ArrowRight } from '@element-plus/icons-vue'

const qrCodeUrl = ref('') //二维码地址
const sid = ref('')
const videoPlayerRef = ref(null)
let getQrcodeStatusing = false //是否正在扫码
const scanQrcodeStatus = ref('') //扫码返回状态

const handleAuthorization = () => {
    const aliyun_token = cache.get('aliyun_token')
    if (aliyun_token) { // 已有缓存的登录token
        if (aliyun_token.expiresTime < new Date().getTime()) { // token过期，刷新
            apiAuth.refreshAccessToken(aliyun_token.refresh_token).then(res => {
                const expiresTime = new Date().getTime() + res.expires_in * 1000
                cache.set('aliyun_token', { ...res, expiresTime })
                getDriveInfo()
            })
        } else {
            getDriveInfo()
        }
    } else {  // 扫码登录
        // 获取二维码
        apiAuth.getQrcode().then(res => {
            qrCodeUrl.value = res.qrCodeUrl
            sid.value = res.sid
            getQrcodeStatusing = true
            getQrcodeStatus()
        })

        // 递归获取扫码状态
        async function getQrcodeStatus() {
            if (!getQrcodeStatusing) {
                return
            }
            const res = await apiAuth.getQrcodeStatus(sid.value)
            if (res.status === 'WaitLogin') {
                setTimeout(() => {
                    getQrcodeStatus()
                }, 1);
            }
            // 扫描成功
            if (res.status === 'ScanSuccess') {
                scanQrcodeStatus.value = '扫描成功！'
                setTimeout(() => {
                    getQrcodeStatus()
                }, 1);
            }
            // 授权成功
            if (res.status === 'LoginSuccess') {
                qrCodeUrl.value = ''
                message.success('授权成功！')
                scanQrcodeStatus.value = ''

                //根据授权code获取access_token
                apiAuth.getAccessToken(res.authCode).then(res => {
                    // 缓存TOKEN
                    const expiresTime = new Date().getTime() + res.expires_in * 1000
                    cache.set('aliyun_token', { ...res, expiresTime })

                    //获取登录信息
                    // apiAuth.getUserInfo().then(userInfo => {
                    //     console.log(userInfo)
                    // })
                    // 获取网盘drive_id
                    getDriveInfo()
                })
            }
        }
    }
}
onMounted(() => {
    // 处理用户授权
    handleAuthorization()
})

onBeforeUnmount(() => {
    getQrcodeStatusing = false
})

const driveInfo = ref({})
// 获取网盘id
const getDriveInfo = () => {
    apiUser.getDriveInfo().then(res => {
        driveInfo.value = res
        getDataList('backup_drive_id')
    }).catch(() => {
        //token过期,处理用户授权
        handleAuthorization()
    })
}
// 获取子文件列表通用方法
const getFileList = async (drive_id, parent_file_id) => {
    const data = {
        drive_id,
        parent_file_id,
        order_by: 'name'
    }
    return await apiOpenFile.list(data)
}
// 获取备份盘列表
const dataList = ref([])
const getDataList = (type) => {
    getFileList(driveInfo.value[type], 'root').then(res => {
        dataList.value = res
        //重置导航
        breadcrumbList.value = [
            {
                drive_id: driveInfo.value[type],
                parent_file_id: 'root',
                name: type === 'backup_drive_id' ? '备份盘' : '资源库',
                active: true
            }
        ]
    })
}

// 面包屑点击
const breadcrumbList = ref([]) //导航
const breadcrumbClick = (drive_id, parent_file_id, index) => {
    getFileList(drive_id, parent_file_id || 'root').then(res => {
        dataList.value = res
        breadcrumbList.value = breadcrumbList.value.filter((e, i) => i <= index)
        breadcrumbList.value[index].active = true
    })
}
// 内容点击
const itemClick = (item) => {
    //文件夹、视频、音频等格式处理
    if (item.type === 'folder') { //文件夹
        getFileList(item.drive_id, item.file_id).then(res => {
            dataList.value = res
            breadcrumbList.value.forEach(e => {
                e.active = false
            })
            item.active = true
            breadcrumbList.value.push(item)
        })
    } else { //文件
        const data = {
            drive_id: item.drive_id,
            file_id: item.file_id,
        }
        switch (item.category) {
            case 'video': //视频
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
                break;
            case 'audio': //音频
                apiOpenFile.get(data).then(res => {
                    console.log(res.url)
                })
                break;
            case 'doc': //文档
                apiOpenFile.getDownloadUrl(data).then(res => {
                    window.open(res.url)
                })
                break;

            default:
                break;
        }
    }
}

// 处理缩略图
const handleThumbnail = (item) => {
    if (item.thumbnail) {
        return item.thumbnail
    } else if (item.type === 'folder') {
        return '/img/folder.png'
    } else if (item.category === 'audio') {
        return '/img/audio.png'
    }
}
const quit = () => {
    cache.set('aliyun_token', '')
    handleAuthorization()
}
</script>

<style lang="scss" scoped>
.container {
    margin: 40px 150px 10px 10px;
    height: calc(100vh - 100px);
    .scan-qrcode {
        margin: 100px auto;
        height: 250px;
        width: 250px;
        padding: 50px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--el-color-primary);
        border-radius: 10px;
        & > img {
            height: 70%;
            width: 70%;
        }
        & > span {
            margin-top: 20px;
            color: var(--el-text-color-primary);
        }
    }
}
.hover-pointer {
    font-size: 20px;
}
.el-row {
    padding: 10px;
    border-radius: 5px;
    .el-col {
        display: flex;
        align-items: center;
    }
}
.row-header {
    color: var(--el-text-color-primary);
    opacity: 0.5;
}
.row-body:hover {
    background-color: var(--el-color-primary);
    cursor: pointer;
}
.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > img {
        height: 60px;
        width: 60px;
    }
    & > span {
        font-weight: 700;
        margin-top: 10px;
        margin-bottom: 30px;
    }
    & > .el-button {
        width: 100%;
    }
}
</style>
