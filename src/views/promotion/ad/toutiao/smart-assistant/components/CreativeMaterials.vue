<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
import Drawer from "@/components/Drawer.vue";
import CreateMaterial from "./CreativeMaterial.vue";
import MaterialSelector from "./MaterialSelector.vue";

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
    console.log(type);
    emits("handleDrawerClose", type);
};

watchEffect(() => {
    drawerOptions.visible = props.visible;
});

const multiple_account_allocation_rules = ref(1);

// 素材选择器
const MaterialSelectorState = reactive({
    visible: false,
});

// 创意组
interface ComponentState {
    state: string;
}

const components = ref<ComponentState[]>([{ state: '初始状态' }]);

const addComponent = () => {
    components.value.push({ state: '初始状态' });
};

// 处理更新状态的函数
const handleUpdateState = (index: number, newState: string) => {
    console.log(index, newState)
    components.value[index].state = newState;
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
                        <el-radio-group v-model="multiple_account_allocation_rules">
                            <el-radio-button label="全账户服用" value="1" />
                            <el-radio-button label="平均分配" value="2" />
                            <el-radio-button label="分帐户选择" value="3" />
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="每个创意组配置">
                        <div class="flex">
                            <div class="flex w-160px">
                                <el-input style="width : 60px;margin-right: 8px;"></el-input><el-text>个视频</el-text>
                            </div>

                            <div class="flex w-160px">
                                <el-input style="width : 60px;margin-right: 8px;"></el-input><el-text>个图片</el-text>
                            </div>

                            <div class="flex w-160px">
                                <el-input style="width : 60px;margin-right: 8px;"></el-input><el-text>个图文</el-text>
                            </div>
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
                            <span>(创意组数量：0)</span>
                        </div>
                    </div>

                    <div>
                        <el-button link>清空</el-button>
                        <el-button type="primary" plain>一键测新</el-button>
                    </div>
                </div>

                <el-scrollbar height="500px" class="min-h-300px max-h-500px pr-16px">
                    <div v-for="(component, index) in components" :key="index">
                        <CreateMaterial :initialState="component.state"
                            @updateState="handleUpdateState(index, $event)" />
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


    <MaterialSelector :visible="MaterialSelectorState.visible" />
</template>
