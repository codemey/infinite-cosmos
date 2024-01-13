<template>
    <el-upload action="#" list-type="picture-card" :auto-upload="false">
        <iconAdd></iconAdd>
        <template #file="{ file }">
            <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <iconZoomin style="fill:red"></iconZoomin>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                        <iconDownload style="fill:red"></iconDownload>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <iconDelete style="fill:red"></iconDelete>
                    </span>
                </span>
            </div>
        </template>
    </el-upload>
</template>

<script setup>

</script>

<style lang="scss" scoped>
</style>