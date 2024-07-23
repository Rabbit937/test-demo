<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
import Drawer from "@/components/Drawer.vue";
import CreateMaterial from "./CreativeMaterial.vue";
import { ICreativeMaterials } from "@/api/modules/promotion";
// import MaterialSelector from "./MaterialSelector.vue";

interface IProps {
    visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emits = defineEmits(["handleDrawerClose"]);

const drawerOptions = reactive({
    visible: props.visible ?? false,
    size: 1016,
});

const handleDrawerClose = (type: number) => {

    if (type === 1) {
        console.log()


        emits("handleDrawerClose", { type: 1, form: form });
    } else {
        emits("handleDrawerClose", { type: 0 });
    }

};

watchEffect(() => {
    drawerOptions.visible = props.visible;
});

const form = reactive<ICreativeMaterials>({
    material: "same",
    promotion_material_group: [{
        video_material_list: [],
        image_material_list: [],
        carousel_material_list: [],
    }]
})

// 每个创意组配置
const video = ref(5);
const image = ref(5);
const graphics = ref(5);

// 素材选择器
// const MaterialSelectorState = reactive({
//     visible: false,
// });

// 创意组
interface IVidoeInfo {
    id: number; // 索引id
    filename?: string; // 名称
    jy_mat_id?: number; // 头条素材id
    material_id?: number; // 素材ID
    mime?: number; // 1 视频 2 图片 3 图文
    post_url?: string; // 视频预览图片地址
    state?: number;
    video_id?: number; // 视频ID
    video_cover_id?: number;
}

interface ComponentState {
    id: number;
    video: number;
    image: number;
    graphics: number;
    videoInfo?: IVidoeInfo[];
}

const components = ref<ComponentState[]>([
    {
        id: 1,
        video: video.value,
        image: image.value,
        graphics: graphics.value,
        videoInfo: [],
    },
]);

const addComponent = () => {
    components.value.push({
        id: components.value.length + 1,
        video: video.value,
        image: image.value,
        graphics: graphics.value,
        videoInfo: [],
    });
};

// 处理更新状态的函数
const handleUpdateState = (component: {
    id: number;
    videoInfo: IVidoeInfo;
}) => {
    console.log(component)
    // components.value.forEach((item) => {
    //     if (item.id === component.id) {
    //         item.videoInfo = component.videoInfo;
    //     }
    // });
};
</script>

<template>
    <Drawer class="!p-0px" :visible="drawerOptions.visible" :size="drawerOptions.size"
        @handleDrawerClose="handleDrawerClose">
        <template v-slot:header>
            <div class="font-size-16px font-700 line-height-48px color-[#333]">选择素材</div>
        </template>
        <main class="m-16px bg-[#fff] p-16px" style="height: calc(100vh - 150px)">
            <el-scrollbar style="height: 100%">
                <el-form :label-position="'left'" :label-width="'160'">
                    <el-form-item label="多账户分配规则">
                        <el-radio-group v-model="form.material">
                            <el-radio-button label="全账户服用" :value="'same'" />
                            <el-radio-button label="平均分配" :value="'agv'" />
                            <el-radio-button label="分帐户选择" :value="'ad_same'" />
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="每个创意组配置">
                        <div class="flex">
                            <div class="flex w-160px">
                                <el-input v-model="video" style="width : 60px;margin-right: 8px;"
                                    :min="1"></el-input><el-text>个视频</el-text>
                            </div>

                            <!-- <div class="flex w-160px">
                                <el-input v-model="image" style="width : 60px;margin-right: 8px;"
                                    :min="1"></el-input><el-text>个图片</el-text>
                            </div>

                            <div class="flex w-160px">
                                <el-input v-model="graphics" style="width : 60px;margin-right: 8px;"
                                    :min="1"></el-input><el-text>个图文</el-text>
                            </div> -->
                        </div>
                    </el-form-item>
                </el-form>

                <div
                    class="w-916px h-56px border-[#e8eaec] flex px-16px mb-16px mr-16px align-items-center justify-between">
                    <div class="flex align-items-center align-content-center">
                        <div class="font-size-14px font-bold color-[#333]">
                            <span>创意制作</span>
                        </div>
                        <div class="font-size-12px color-[#666] ml-16px">
                            <span>(创意组数量：{{ components.length }})</span>
                        </div>
                    </div>

                    <!-- <div>
                        <el-button link>清空</el-button>
                        <el-button type="primary" plain>一键测新</el-button>
                    </div> -->
                </div>

                <el-scrollbar height="500px" class="min-h-300px max-h-500px pr-16px">
                    <div v-for="(component, index) in components" :key="index">
                        <CreateMaterial :initialState="component" @updateState="handleUpdateState" />
                    </div>
                </el-scrollbar>

                <div class="mt-16px">
                    <el-button type="primary" @click="addComponent">
                        <el-icon style="color: #fff;">
                            <Plus />
                        </el-icon>
                        <el-text style="color:#fff;">
                            添加创意组
                        </el-text>
                    </el-button>
                </div>
            </el-scrollbar>
        </main>
    </Drawer>
</template>
