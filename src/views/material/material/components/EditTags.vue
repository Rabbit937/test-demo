<template>
  <!-- 新建标签 -->
  <Dialog :title="updateLabelState.title" :visable="updateLabelState.visable" :width="560"
    @handleClose="handleNewLabelClose">
    <el-form label-width="100px" label-position="left">
      <el-form-item label="选择标签">
        <el-cascader placeholder="最多添加10个标签" v-model="updateLabelState.cascaderValue" :options="labelStateOptionsRef"
          clearable :props="{
            value: 'ID',
            label: 'NAME',
            children: 'CHILD',
            // checkStrictly: true,
            multiple: true
          }" collapse-tags collapse-tags-tooltip style="width: 220px">
        </el-cascader>
        <el-text style="cursor: pointer" type="primary" @click="showNewLabel" class="!pl-10px">
          <el-icon>
            <Plus />
          </el-icon>
          添加标签</el-text>
      </el-form-item>
      <el-form-item label="修改规则">
        <el-radio-group v-model="updateLabelState.radioValue">
          <el-radio-button label="替换标签" value="1" />
          <el-radio-button label="新增标签" value="2" />
          <el-radio-button label="移除标签" value="3" />
        </el-radio-group>
        <div style="width: 100%">
          <el-text v-if="Number(updateLabelState.radioValue) === 1">
            所选标签将会直接覆盖素材已有的标签内容，请谨慎操作
          </el-text>
          <el-text v-else-if="Number(updateLabelState.radioValue) === 2">
            为素材添加所选标签，素材已存在的标签不会受到影响
          </el-text>
          <el-text v-else-if="Number(updateLabelState.radioValue) === 3">
            为素材移除所选标签，若素材不包含所选标签则不受影响
          </el-text>
          <el-text type="danger" v-else> 请选择修改规则 </el-text>
        </div>
      </el-form-item>
    </el-form>
  </Dialog>
  <Tags :visable="newLabelVisable" @handleClose="handleTagClose"></Tags>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";

import { getTagsList, operateTag } from "@/api/modules/material";
import Dialog from "@/components/DialogGG.vue";
import Tags from "./Tags.vue";
import { ElMessage } from "element-plus";

interface Props {
	visable?: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	materialItem?: any;
}

const props = withDefaults(defineProps<Props>(), {
	visable: false,
});

const emits = defineEmits(["handleClose"]);

const updateLabelState = reactive({
	cascaderValue: [],
	radioValue: "",
	visable: props.visable,
	title: "修改标签",
});

const labelStateOptionsRef = ref();

// 获取标签列表
const getTagsListFunc = async () => {
	const res = await getTagsList({ type: 2 });
	console.log(res);

	if (Number(res.state) === 1) {
		labelStateOptionsRef.value = res.data;
	} else {
		console.log(res.msg);
	}
};

watch(
	() => props.visable,
	() => {
		updateLabelState.visable = props.visable;
	},
);

onMounted(() => {
	getTagsListFunc();
});

const newLabelVisable = ref(false);

const showNewLabel = () => {
	newLabelVisable.value = true;
};

const handleTagClose = async () => {
	getTagsListFunc();
	newLabelVisable.value = false;
};

const handleNewLabelClose = async (type: string) => {
	if (type === "confirm") {
		console.log(updateLabelState.radioValue);
		console.log(updateLabelState.cascaderValue);

		if (updateLabelState.radioValue === "") {
			ElMessage.warning("请选择修改规则");
			return;
		}

		if (updateLabelState.cascaderValue.length === 0) {
			ElMessage.warning("请选择标签");
			return;
		}

		const res = await operateTag({
			tag_id: updateLabelState.cascaderValue.map((item) => item[1]),
			type: updateLabelState.radioValue,
			mat_id: props.materialItem.material_id,
		});

		updateLabelState.visable = false;
		emits("handleClose", { status: "success", tagsList: res.data });
	} else {
		emits("handleClose", { status: "fail" });
		updateLabelState.visable = false;
	}
};
</script>
