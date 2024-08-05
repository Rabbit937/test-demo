<template>
    <div class="creative-content min-h-400px max-h-600px overflow-auto mb-16px">
        <div class="creative-material position-relative max-w-916px">
            <div class="creative-group">
                <div class="creative-group-header flex">
                    <span class="creative-group-name">
                        创意组 <i class="el-icon-edit-outline"></i>
                    </span><i class="el-icon-caret el-icon-caret-bottom"></i>

                </div>
                <div class="creative-group-body">
                    <!-- <div class="button-wrap btn-batch-add">
                        <el-button>
                            <el-icon>
                                <Plus />
                            </el-icon>添加素材
                        </el-button>
                    </div> -->
                    <el-tabs class="mt-16px" type="card">
                        <el-tab-pane :label="`视频(0/${props.initialState.video})`" class="p-16px w-914px min-h-256px">
                            <el-scrollbar height="256px">
                                <div class="w-100% flex flex-wrap py-8px">
                                    <div class="group w-424px h-150px mr-16px mb-16px border-[#e8eaec] p-8px position-relative hover:border-blue-500"
                                        style="box-sizing: border-box" v-for="(n) in component"
                                        :style="(n.id % 2 === 0) ? { marginRight: '0px' } : ''">
                                        <div class="flex  justify-between">
                                            <div
                                                class="w-200px border-[#e8eaec] flex align-items-center justify-center">

                                                <template v-if="!n.post_url">
                                                    <div @click="showMaterialSelector(n)"
                                                        class="flex flex-col justify-center align-items-center h-110px">
                                                        <img class="w-60px h-60px cursor-pointer"
                                                            src="data:image/png;base64,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"
                                                            alt="上传视频">
                                                        <div
                                                            class="font-size-12px font-400 line-height-17px color-[#515a6e] cursor-pointer">
                                                            <span>上传视频</span>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div
                                                        class="h-110px bg-[#fafafa] w-100% text-center position-relative">
                                                        <img class="h-100%" style="vertical-align: middle;"
                                                            :src="n.post_url" alt="图片预览">
                                                        <div class="position-absolute top-0 right-0 bottom-0 left-0 pr-20px pl-20px bg-[#00000080] flex align-items-center justify-center opacity-0 hover:opacity-100"
                                                            style="transition: opacity .3s;">
                                                            <el-button style="width: 120px" type="primary"
                                                                @click="showMaterialSelector"> 重新上传
                                                            </el-button>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>

                                            <div
                                                class="w-200px border-[#e8eaec] flex align-items-center justify-center">
                                                <template v-if="!n.post_url">
                                                    <div
                                                        class="flex flex-col justify-center align-items-center h-110px cursor-pointer">
                                                        <img src="data:image/png;base64,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"
                                                            alt="上传封面">
                                                        <div
                                                            class="font-size-12px font-400 line-height-17px color-[#515a6e] cursor-pointer">
                                                            <span>上传封面</span>
                                                            <span class="mr-12px ml-12px">|</span>
                                                            <span>智能封面</span>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div
                                                        class="h-110px bg-[#fafafa] w-100% text-center position-relative">
                                                        <img class=" h-100%" style="vertical-align: middle;"
                                                            :src="n.post_url" alt="图片预览">
                                                        <div class="position-absolute top-0 right-0 bottom-0 left-0 pr-20px pl-20px bg-[#00000080] flex align-items-center justify-center opacity-0 hover:opacity-100"
                                                            style="transition: opacity .3s;">
                                                            <el-button style="width: 70px;" type="primary"> 重新上传
                                                            </el-button>
                                                            <el-button style="width: 70px;" type="primary"
                                                                :disabled="false"> 智能封面
                                                            </el-button>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>

                                        <div class="mt-4px font-size-12px line-height-normal color-[#999] ellipsis">
                                            {{ n.filename }}
                                        </div>

                                        <el-button link
                                            class="position-absolute top-[-8px] right-[-8px] z-100 opacity-0 group-hover:opacity-100"
                                            style="transition: opacity .3s;" @click="deleteComponent(n)">
                                            <el-icon color="#2e71ea" class="font-size-16px bg-[#fff]">
                                                <CircleCloseFilled />
                                            </el-icon>
                                        </el-button>
                                    </div>
                                    <div class="upload-container upload-video" id="pane-video" @click="addComponent"
                                        v-if="showAddComponent"
                                        :style="(component.values.length % 2 !== 0) ? { marginRight: '0px' } : ''">
                                        <div class="upload-block upload-flex upload-add" style="margin-right: 0px;">
                                            <div class="upload-flex">
                                                <el-icon class="el-icon-plus" size="32" color="#d4d5d7">
                                                    <Plus />
                                                </el-icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                        <!-- <el-tab-pane :label="`图片(0/${props.initialState.image})`" class="p-16px min-h-256px">
                            <el-scrollbar height="256px">
                                <div class="flex flex-wrap">
                                    <div class="min-h-140px mr-23px flex align-items-center justify-center position-relative w-200px hover:border-"
                                        style="border:1px solid #dcdee2; border-style: dashed;">
                                        <el-icon class="el-icon-plus" size="32" color="#d4d5d7">
                                            <Plus />
                                        </el-icon>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane :label="`图文(0/${props.initialState.graphics})`" class="p-16px min-h-256px">
                            <el-scrollbar height="256px">
                                <h1>图文</h1>
                            </el-scrollbar>
                        </el-tab-pane> -->
                    </el-tabs>
                </div>
            </div>
            <div class="position-absolute" style="top:0;right: -34px;">
                <el-button title="删除创意组" style="width: 28px;height: 28px;" :icon="Delete" @click="handleDeleteClick" />
            </div>
        </div>
    </div>

    <MaterialSelector :visible="MaterialSelectorState.visible" :category="MaterialSelectorState.category"
        @handleDialogClose="handleMaterialSelectorDialog">
    </MaterialSelector>
</template>


<script lang="ts" setup>
import { ref, watchEffect, reactive } from "vue";
import { Delete } from '@element-plus/icons-vue'
import MaterialSelector from "./MaterialSelector.vue";

// 创意组
interface IVidoeInfo {
    id: number; // 索引id
    filename?: string; // 名称
    jy_mat_id?: string; // 头条素材id
    material_id?: string; // 素材ID
    mime?: number; // 1 视频 2 图片 3 图文
    post_url?: string; // 视频预览图片地址
    state?: number;
    video_id?: string; // 视频ID
    video_cover_id?: string;
    image_mode?: string;
}


const props = defineProps<{
    initialState: {
        id: number;
        video: number;
        image: number;
        graphics: number;
        videoInfo?: IVidoeInfo[];
    };
}>();
const emit = defineEmits(["updateState"]);

const component = ref<IVidoeInfo[]>([]);
const showAddComponent = ref(true);

const addComponent = () => {
    if (component.value.length < props.initialState.video) {
        component.value.push({ id: component.value.length + 1 });
    }
};

watchEffect(() => {
    if (component.value.length < props.initialState.video) {
        showAddComponent.value = true;
    } else {
        showAddComponent.value = false;
    }
});

// 素材选择状态
const MaterialSelectorState = reactive({
    visible: false,
    category: 1
});

// 调用素材选择的component
const targetComponent = ref();

const showMaterialSelector = (n: IVidoeInfo) => {
    targetComponent.value = n;
    MaterialSelectorState.visible = true;
};

const handleMaterialSelectorDialog = (options: { type: number, form: any }) => {
    const { type, form } = options;
    if (type === 1) {
        const video = form[0];
        if (video) {
            component.value[targetComponent.value.id - 1] = {
                id: targetComponent.value.id,
                ...video,
            };
            emit("updateState", {
                id: props.initialState.id,
                videoInfo: component.value,
            });
        }
        MaterialSelectorState.visible = false;
    } else {
        MaterialSelectorState.visible = false;
    }
};


// 删除组件
const deleteComponent = (video: IVidoeInfo) => {
    console.log(video)
    component.value.splice(component.value.length - 1, 1);
    emit("updateState", {
        id: props.initialState.id,
        videoInfo: component.value,
    });
}


// 删除创意组
const handleDeleteClick = () => {
    console.log('delete')
}


</script>

<style lang="scss" scoped>
.el-tabs :deep(.is-top) {
    padding-left: 8px;
}

.creative-material {
    position: relative;
    max-width: 916px;
}

.creative-material:not(:last-child) {
    margin-bottom: 16px
}

.creative-material .creative-group {
    position: relative;
    /* line-height:32px; */
    border: 1px solid #d0d0d0;
    border-radius: 3px
}

.creative-material .creative-group--error {
    border-color: red
}

.creative-material .creative-group:not(:last-child) {
    margin-bottom: 8px
}

.creative-material .creative-group-body {
    position: relative;
    border-top: 1px solid #dcdee2
}

.creative-material .creative-group-header {
    padding: 8px 16px;
    background-color: #fafafa
}

.creative-material .creative-group-name {
    color: #666
}

.creative-material .creative-group .btn-batch-add {
    position: absolute;
    top: 12px;
    right: 16px;
    z-index: 1;
    width: 120px
}

.upload-container {
    display: flex;
    flex-wrap: wrap
}

.upload-container .btn-delete {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 16px;
    color: #2e71ea;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0
}

.upload-action-wrapper {
    line-height: 17px
}

.upload-action-wrapper .btn-action {
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    color: #515a6e;
    cursor: pointer
}

.upload-action-wrapper .divider {
    margin-right: 12px;
    margin-left: 12px;
    color: #bfc4d0
}

.upload-block {
    position: relative;
    padding: 8px;
    border: 1px solid #dcdee2
}

.upload-wrapper {
    position: relative;
    box-sizing: border-box;
    width: 200px;
    border: 1px solid #dcdee2
}

.upload-wrapper .img-wrapper {
    position: relative;
    width: 100%;
    height: 110px;
    text-align: center;
    background-color: #fafafa
}

.upload-wrapper .img-wrapper:hover .img-mask {
    opacity: 1
}

.upload-wrapper .img-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-right: 20px;
    padding-left: 20px;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
    transition: opacity .3s
}

.upload-wrapper .img-mask .btn-action {
    width: 120px;
    padding: 0;
    line-height: 22px;
    color: #fff
}

.upload-wrapper img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle
}

.upload-add {
    cursor: pointer;
    border-style: dashed
}

.upload-add .el-icon-plus {
    font-size: 32px;
    font-weight: 500;
    color: #d4d5d7
}

.upload-image .upload-wrapper {
    min-height: 140px;
    margin-right: 23px;
    margin-bottom: 16px
}

.upload-image .upload-wrapper:hover {
    border-color: #2e71ea
}

.upload-image .upload-wrapper:hover .el-icon-plus {
    color: #2e71ea
}

.upload-image .upload-wrapper:hover .btn-delete {
    opacity: 1
}

.upload-image .upload-wrapper:nth-child(4n) {
    margin-right: 0
}

.upload-image .upload-wrapper:nth-last-child(-n+4) {
    margin-bottom: 0
}

.upload-image .material-name {
    margin: 4px 8px 8px
}

.upload-video .upload-add {
    height: 150px
}

.upload-video .upload-block {
    box-sizing: border-box;
    width: 424px;
    margin-right: 20px;
    margin-bottom: 16px
}

.upload-video .upload-block:hover {
    border-color: #2e71ea
}

.upload-video .upload-block:hover .el-icon-plus {
    color: #2e71ea
}

.upload-video .upload-block:hover .btn-delete {
    opacity: 1
}

.upload-video .upload-block:nth-child(2n) {
    margin-right: 0
}

.upload-blank,
.upload-flex {
    display: flex;
    align-items: center;
    justify-content: center
}

.upload-blank {
    flex-direction: column;
    height: 110px
}

.material-name {
    margin-top: 4px;
    font-size: 12px;
    line-height: normal;
    color: #999
}

.el-icon-caret-bottom,
.el-icon-caret-top {
    font-size: 16px;
    color: #999;
    cursor: pointer
}
</style>
