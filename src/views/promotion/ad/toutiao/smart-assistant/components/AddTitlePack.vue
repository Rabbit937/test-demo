<template>
    <Dialog :title="dialogState.title" :visible="dialogState.visible" :width="dialogState.width"
        @handleClose="handleDialogClose">
        <el-scrollbar height="500px">

            <div>
                <el-input class="mr-16px" placeholder="请输入标题包名称" style="width: 360px" v-model="title_package_name">
                    <template #prepend>
                        <div>
                            <el-text>标题包名称</el-text>
                        </div>
                    </template>
                </el-input>

                <el-input placeholder="请输入分类" style="width: 360px" v-model="category">
                    <template #prepend>
                        <div>
                            <el-text>分类</el-text>
                        </div>
                    </template>
                </el-input>
            </div>

            <div class="mt-8px">
                <div class="bg-[#fafafa] border-[#e8eaec] p-8px " style="border-bottom: none;">
                    <el-text>标题</el-text>
                </div>

                <div class="bg-[#d8e8ff] p-8px color-[#bfaf99] font-size-12px border-[#e8eaec]"
                    style="border-bottom: none;">
                    <el-text>标题长度范围5~55个字,添加多个标题请换行</el-text>
                </div>

                <el-input v-model="textarea" style="width: 100%;" :rows="16" type="textarea" />
            </div>

        </el-scrollbar>
    </Dialog>
</template>


<script setup lang="ts">
import { ref, reactive, watchEffect, watch } from "vue";
import "element-plus/es/components/message/style/css";
import Dialog from "@/components/Dialog.vue";
import { type ICreateTitleBag, createTitleBag } from "@/api/modules/promotion";
import { ElMessage } from "element-plus";

interface IProps {
    visible: boolean;
    title?: string;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleDialogClose"]);

const dialogState = reactive({
    title: props.title,
    visible: false,
    width: 800,
});

watchEffect(() => {
    dialogState.visible = props.visible;
});

watch(
    () => props.visible,
    () => {
        if (!props.visible) {
            textarea.value = ''
            title_package_name.value = ''
            category.value = ''
        }
    },
);


const textarea = ref<string>('');
const title_package_name = ref<string>('');
const category = ref<string>('');

const handleDialogClose = (type: number) => {
    if (type === 1) {
        createTitleBagFunc({
            advertiser_id: "1787695788195915",
            tag_name: title_package_name.value,
            type: "1",
            name: textarea.value,
            category: category.value,
        });
    } else {
        emtis("handleDialogClose", { type: 0 });
    }
};

const createTitleBagFunc = async (params: ICreateTitleBag) => {
    const res: any = await createTitleBag(params);
    if (res.state === 1) {
        emtis("handleDialogClose", { type: 1, form: res.data });
    } else {
        ElMessage({
            type: "error",
            message: JSON.parse(res.msg),
        })
    }
};
</script>
