<template>
    <Dialog :visible="visible" :title="'规则配置'" @handleClose="handleDialogClose">
        <section class="font-size-12px color-[#666]">
            <el-form label-width="144" label-position="left">
                <el-form-item label="广告生成规则">
                    <el-radio-group v-model="ruleConfiguration.generateRuleValue">
                        <el-radio-button :value="1">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>自动生成</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>先选素材和标题，基于素材数量自动生成广告</span>
                                </p>
                            </div>
                        </el-radio-button>
                        <el-radio-button :value="2">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>指定数量</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>先指定广告数，再选素材和标题自动填充</span>
                                </p>
                            </div>
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="每个项目下广告数" v-if="Number(ruleConfiguration.generateRuleValue) === 2">
                    <el-input-number v-model="ruleConfiguration.NumberOfAdvertisements" :min="1" :max="10000" />
                </el-form-item>
                <el-form-item label="标题分配规则">
                    <el-radio-group v-model="ruleConfiguration.allocationRuleValue">
                        <el-radio-button :value="1">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>程序化测试</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>参与动态叉乘，即每个创意组*标题包都将生成一条广告，标题包数量影响广告最终生成数量</span>
                                </p>
                            </div>
                        </el-radio-button>
                        <el-radio-button :value="2">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>自动匹配</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>不参与动态叉乘，根据创意组生成的广告数，自动匹配文案，所选文案数量不足时循环使用</span>
                                </p>
                            </div>
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </section>
    </Dialog>
</template>


<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";

interface IProps {
	visible: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleClose"]);
const visible = ref(props.visible);

watchEffect(() => {
	visible.value = props.visible;
});

const handleDialogClose = (done: string) => {
	visible.value = false;
	if (done === "confirm") {
		emtis("handleClose", 1);
	} else {
		emtis("handleClose", 0);
	}
};

const ruleConfiguration = reactive({
	generateRuleValue: 1,
	allocationRuleValue: 1,
	NumberOfAdvertisements: 100,
});
</script>