<template>
    <Dialog :title="dialogState.title" :visible="dialogState.visible" @handleClose="handleDialogClose">
        <el-scrollbar height="500px">

            <!-- 选择抖音账户 -->
            <section>
                <div>
                    <el-text type="warning"><el-icon>
                            <WarningFilled />
                        </el-icon> 抖音号需要提前在<b>巨量引擎</b>进行绑定，绑定后，可以通过刷新获取已经绑定的抖音号。
                    </el-text>
                    <el-text type="primary" class="cursor-pointer">绑定抖音号</el-text>
                </div>
                <div>
                    <el-text type="warning"> 匹配方式为所有广告选择同一个抖音号时，所有账户均需授权同一个抖音号 </el-text>
                </div>
            </section>


            <section class="w-740px  border-[#e8eaec] bg-[#fafafa]">
                <div class="h-64px p-8px flex justify-between align-items-center align-content-center">
                    <div>
                        <el-text>选择抖音帐号</el-text>
                    </div>
                    <div>
                        <el-button type="primary" @click="syncAwemeFunc">多账户刷新</el-button>
                    </div>
                </div>
                <div class="border-top-[#e8eaec] p-16px">
                    <div class="flex w-498px">
                        <el-input placeholder="请输入抖音号或ID"></el-input><el-button class="ml-8px">查询</el-button>
                    </div>

                    <div class="flex h-500px mt-6px">
                        <div class="w-498px border-[#e8eaec] bg-[#fff]">
                            <div class=" p-16px border-bottom-[#e8eaec]">
                                <el-text class="!mr-8px">项目数：1</el-text>
                                <el-text>广告数：0</el-text>
                            </div>
                            <div class=" p-16px border-bottom-[#e8eaec]">
                                <el-text>抖音号</el-text>
                            </div>
                            <div class="px-16px py-2px">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox v-for="item in AwemeList"
                                        :label="`${item.aweme_name}(${item.aweme_id})`"
                                        :value="`${item.aweme_name}-${item.aweme_id}`" class="!w-100%" />
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="w-200px bg-[#fff] border-[#e8eaec] ml-8px">
                            <div
                                class="flex line-height-40px px-16px justify-between bg-[#f8f9fd] border-bottom-[#e8eaec]">
                                <div>
                                    <el-text>已选({{ checkList.length }})</el-text>
                                </div>
                                <div>
                                    <el-button link type="primary">清空<el-icon>
                                            <RefreshRight />
                                        </el-icon></el-button>
                                </div>
                            </div>

                            <div>

                                <div v-for="item in checkList" class="m-8px p-8px bg-[#f8f9fd]">{{ item }}</div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </el-scrollbar>

    </Dialog>
</template>


<script setup lang="ts">
import { ref, onMounted, reactive, watchEffect } from "vue";
import "element-plus/es/components/message/style/css";
import Dialog from "@/components/Dialog.vue";
import {
	type IQueryAwemeList,
	queryAwemeList,
	// type ISyncAweme,
	syncAweme,
} from "@/api/modules/promotion";

interface IProps {
	visible: boolean;
	title?: string;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleDialogClose"]);

const dialogState = reactive({
	title: props.title,
	visible: false,
});

watchEffect(() => {
	dialogState.visible = props.visible;
});

const handleDialogClose = (type: number) => {
	emtis("handleDialogClose", type);

	if (type === 1) {
		emtis("handleDialogClose", { type: 1, AwemeList: checkList.value });
	} else {
		emtis("handleDialogClose", { type: 0 });
	}
};

const AwemeList = ref();
const checkList = ref<string[]>([]);

const queryAwemeListFunc = async (params: IQueryAwemeList) => {
	const res: any = await queryAwemeList(params);

	if (res.state === 1) {
		AwemeList.value = res.data.list;
	}
};

onMounted(() => {
	queryAwemeListFunc({
		advertiser_id: ["1787695788195915"],
	});
});

// 同步抖音号
const syncAwemeFunc = async () => {
	try {
		const res = await syncAweme({
			advertiser_id: ["1787695788195915"],
		});
		if (res.state === 1) {
			queryAwemeListFunc({
				advertiser_id: ["1787695788195915"],
			});
		}
	} catch (error) {
		console.error("同步抖音号失败", error);
	}
};
</script>
