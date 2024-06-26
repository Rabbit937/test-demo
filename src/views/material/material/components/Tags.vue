<template>
  <!-- 新建标签 -->
  <Dialog :title="newLabelState.title" :visable="newLabelState.visable" :width="560" @handleClose="handleTagClose">
    <el-form label-width="100px" label-position="left">
      <el-form-item label="选择标签组">
        <el-select v-model="newLabelState.selectValue" placeholder="请选择">
          <el-option v-for="option in newLabelStateOptionsRef" :label="option.NAME" :value="option.ID" />
        </el-select>
        <el-text style="cursor: pointer" type="primary" @click="showNewLabelGroup">新建标签组</el-text>
      </el-form-item>
      <el-form-item label="标签名称">
        <el-input v-model="newLabelState.inputValue" placeholder="请输入10字内的标签名称" />
      </el-form-item>
    </el-form>
  </Dialog>

  <!-- 新建标签组 -->
  <Dialog :title="newlabelGroupState.title" :visable="newlabelGroupState.visable" :width="560"
    @handleClose="handleTagsGroupClose">
    <el-form>
      <el-form-item label="标签组名称">
        <el-input v-model="newlabelGroupState.inputValue" placeholder="请输入10字内的标签组名称" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";

import { addTag, addTagGroup, getTagsList } from "@/api/modules/material";
import Dialog from "@/components/DialogGG.vue";

interface Props {
	visable: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	visable: false,
});

const emits = defineEmits(["handleClose"]);

const newLabelStateOptionsRef = ref();

const newLabelState = reactive({
	selectValue: "",
	inputValue: "",
	visable: props.visable,
	title: "新建标签",
});

watch(
	() => props.visable,
	(newVisable, oldVisable) => {
		// // console.log(newVisable, oldVisable);
		newLabelState.visable = props.visable;
	},
);

const handleTagClose = async (type: string) => {
	// // console.log(type);

	if (type === "confirm") {
		await addTag({
			name: newLabelState.inputValue,
			pid: Number(newLabelState.selectValue),
		});
		newLabelState.visable = false;
		emits("handleClose");
	} else {
		newLabelState.visable = false;
	}
};

const newlabelGroupState = reactive({
	title: "新建标签组",
	visable: false,
	inputValue: "",
});

const showNewLabelGroup = () => {
	newlabelGroupState.visable = true;
};

const handleTagsGroupClose = async (type: string) => {
	// // console.log(type);

	if (type === "confirm") {
		await addTagGroup({
			name: newlabelGroupState.inputValue,
		});
		newlabelGroupState.visable = false;
		getTagsListFunc();
	} else {
		newlabelGroupState.visable = false;
	}
};

const getTagsListFunc = async () => {
	const res = await getTagsList({ type: 1 });
	// // console.log(res);

	if (Number(res.state) === 1) {
		newLabelStateOptionsRef.value = res.data;
	} else {
		// // console.log(res.msg);
	}
};

onMounted(() => {
	getTagsListFunc();
});
</script>
