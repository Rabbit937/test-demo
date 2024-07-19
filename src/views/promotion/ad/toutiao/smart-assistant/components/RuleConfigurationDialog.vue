<template>
    <Dialog :visible="visible" :title="'规则配置'" @handleClose="handleDialogClose">
        <section class="font-size-12px color-[#666]">
            <el-form label-width="144" label-position="left">
                <el-form-item label="项目生成规则" v-if="infoOrNew === 'new'">
                    <el-radio-group v-model="ruleConfiguration.project.rule">
                        <el-radio-button :value="'manual'">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>指定数量</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px h-40px">
                                    <span>手动指定每个账户的项目数量</span>
                                </p>
                            </div>
                        </el-radio-button>
                        <el-radio-button :value="'creative'">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>根据创意组生成</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px h-40px">
                                    <span>项目数量与创意组数量相等，项目中的广告都使用相同的素材</span>
                                </p>
                            </div>
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="每个账户下项目数" v-if="ruleConfiguration.project.rule === 'manual'">
                    <el-input-number v-model="ruleConfiguration.project.num" :min="1" :max="200" />
                </el-form-item>

                <el-form-item label="每个项目下广告数" v-if="ruleConfiguration.project.rule === 'creative'">
                    <el-input-number v-model="ruleConfiguration.promotion.num" :min="1" :max="100" />
                </el-form-item>

                <el-form-item label="广告生成规则" v-if="ruleConfiguration.project.rule !== 'creative'">
                    <el-radio-group v-model="aGenerationRules">
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
                        <!-- <el-radio-button :value="'creative'">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>指定数量</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>先指定广告数，再选素材和标题自动填充</span>
                                </p>
                            </div>
                        </el-radio-button> -->
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="标题分配规则">
                    <el-radio-group v-model="allocationRuleValue">
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
                        <!-- <el-radio-button :value="2">
                            <div>
                                <p class="text-left font-size-16px w-200px whitespace-normal line-height-18px">
                                    <span>自动匹配</span>
                                </p>
                                <p class="text-left font-size-12px w-200px whitespace-normal line-height-18px">
                                    <span>不参与动态叉乘，根据创意组生成的广告数，自动匹配文案，所选文案数量不足时循环使用</span>
                                </p>
                            </div>
                        </el-radio-button> -->
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </section>
    </Dialog>
</template>


<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
import { IRuleConfiguration } from '@/api/modules/promotion'

interface IProps {
    visible: boolean;
    infoOrNew: string;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleClose"]);
const visible = ref(props.visible);
const infoOrNew = ref(props.infoOrNew);

watchEffect(() => {
    visible.value = props.visible;
    infoOrNew.value = props.infoOrNew;
});

const handleDialogClose = (type: 1 | 0) => {
    if (type === 1) {
        emtis("handleClose", { type: 1, ruleConfiguration });
    } else {
        emtis("handleClose", { type: 0 });
    }
};

const aGenerationRules = ref(1);
const allocationRuleValue = ref(1);

const ruleConfiguration: IRuleConfiguration = reactive({
    project: {
        rule: "manual",
        num: 1
    },
    promotion: {
        rule: "auto",
        num: 50,
    }

});
</script>