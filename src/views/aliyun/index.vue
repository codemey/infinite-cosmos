<template>
    <div class="container ic-card">
        <img :src="qrCodeUrl">
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import api from '@/api/aliyun'

const qrCodeUrl = ref('') //二维码地址
const sid = ref('')
const timer = ref(null)
const authCode = ref('') //认证码
const accessInfo = ref({ //用户认证后token等信息
    access_token: '',
    expires_in: '',
    refresh_token: '',
    token_type: '',
})

onMounted(() => {
    // 获取二维码
    api.getQrcode().then(res => {
        qrCodeUrl.value = res.qrCodeUrl
        sid.value = res.sid
    })

    // 定时器获取扫码状态
    timer.value = setInterval(() => {
        api.getQrcodeStatus(sid.value).then(res => {
            if (res.status === 'LoginSuccess') {
                clearInterval(timer.value)
                timer.value = null
                authCode.value = res.authCode
            }
        })
    }, 500)
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
    timer.value = null
})

watch(authCode, (val) => {
    if (val) {
        api.getAccessToken(val).then(res => {
            accessInfo.value = res
        })
    }
})

</script>

<style lang="scss" scoped>
.container {
    margin: 40px 150px 10px 10px;
    height: calc(100vh - 100px);
}
</style>