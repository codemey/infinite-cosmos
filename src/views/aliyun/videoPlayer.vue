<template>
    <el-dialog :title="title" v-model="dialogVisible" draggable>
        <video controls id="videoPlayer" preload="metadata">
            <source>
            Your browser does not support the video tag.
        </video>
    </el-dialog>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'

const emit = defineEmits(['reload'])
const dialogVisible = ref(false)
const title = ref('')
let hls = null

const open = (res, fileName) => {
    title.value = fileName
    nextTick(() => {
        hls = new Hls()
        const video = document.getElementById('videoPlayer');
        hls.loadSource(res.video_preview_play_info.live_transcoding_task_list.at(-1).url)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play()
        })
    })

    dialogVisible.value = true
}
watch(dialogVisible, val => {
    if (!val) {
        hls.destroy()
    }
})
defineExpose({ open })
</script>

<style lang="scss" scoped>
video {
    width: 100%;
    height: 100%;
}
</style>
