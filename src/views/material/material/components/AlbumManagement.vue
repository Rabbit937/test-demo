<template>
	<el-row class="pl-16px pt-12px pb-28px" style="background-color: #fff">
		<AlbumManagementSearch @handleClick="handleSearchFunc" />
	</el-row>
	<el-row class="m-16px" style="border: 1px solid #e8eaec; ">
		<AlbumManagementTree :treeState="treeState" @handleClick="handleTreeFunc" />
		<AlbumManagementContent :materialState="materialState" :treeClickNode="treeClickNode" :treeState="treeState"
			:breadList="breadList" :searchParams="searchParams" @handleClick="handleContentFunc" />
	</el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import {
	getAlbumTree,
	getAlbumList,
	deleteAlbumOrFolder,
	deleteMaterial,
} from "@/api/modules/material";

import AlbumManagementSearch from "./AlbumManagementSearch.vue";
import AlbumManagementTree from "./AlbumManagementTree.vue";
import AlbumManagementContent from "./AlbumManagementContent.vue";
import { ElMessage } from "element-plus";

const materialState = reactive({
	materialItemList: [],
	currentPage: 1,
	pageSize: 0,
	total: 0,
	loading: false,
});

const treeClickNode = reactive({
	AL_ID: "",
	ANAME: "",
	ID: "",
	LEVEL: "",
	PID: "",
});

interface IAlbumListParams {
	album_id?: string;
	dir_id?: string;
	keyword?: string;
	level?: string;
	search_type?: string;
	page_no?: string;
	page_limit?: string;
}

const getAlbumListFunc = async (params?: IAlbumListParams) => {
	materialState.loading = true;

	const { data } = (await getAlbumList({
		album_id: params?.album_id,
		dir_id: params?.dir_id,
		keyword: params?.keyword,
		level: params?.level,
		search_type: params?.search_type,
		page_no: params?.page_no,
		page_limit: params?.page_limit,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	})) as any;

	materialState.materialItemList = data.list;
	materialState.currentPage = Number(data.page_info.cur_page);
	materialState.pageSize = Number(data.page_info.page_limit);
	materialState.total = Number(data.page_info.total);
	materialState.loading = false;
};

// 获取专辑目录树
const treeState = reactive({
	treeData: [],
	loading: false,
});

const getAlbumTreeFunc = async () => {
	treeState.loading = true;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { data } = (await getAlbumTree()) as any;
	treeState.treeData = data;
	treeState.loading = false;
};

onMounted(() => {
	getAlbumListFunc();
	getAlbumTreeFunc();
});

const searchParams = ref();

const handleSearchFunc = (state: { keyword: string; search_type: number }) => {
	// 需要改变面包屑导航
	searchParams.value = {
		keyword: state.keyword,
		search_type: state.search_type,
	};

	getAlbumListFunc({
		keyword: state.keyword,
		search_type: String(state.search_type),
	});
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleTreeFunc = (options: any) => {
	// 获取导航栏数据
	searchParams.value = "";

	// 如果存在options是传的专辑或者文件夹
	if (options) {
		// 通过AL_ID等于0来判断是专辑

		if (Number(options.AL_ID) === 0) {
			getAlbumListFunc({
				album_id: options.ID,
				level: options.LEVEL,
			});
		} else {
			getAlbumListFunc({
				album_id: options.AL_ID,
				dir_id: options.ID,
				level: options.LEVEL,
			});
		}

		treeClickNode.AL_ID = options.AL_ID;
		treeClickNode.ANAME = options.ANAME;
		treeClickNode.ID = options.ID;
		treeClickNode.LEVEL = options.LEVEL;
		treeClickNode.PID = options.PID;

		getBreadcrumb(options.ID);
	} else {
		treeClickNode.AL_ID = "";
		treeClickNode.ANAME = "";
		treeClickNode.ID = "";
		treeClickNode.LEVEL = "";
		treeClickNode.PID = "";
		// 如果不存在，则传的是全部专辑
		getAlbumListFunc();
		getBreadcrumb();
	}
};

const handleContentFunc = (content: {
	type: string;
	action: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	item?: any;
}) => {
	// // console.log(content)

	const { type, action, item } = content;

	if (type === "header") {
		if (action === "createNewAlbum") {
			getAlbumTreeFunc();
			getAlbumListFunc();
		} else if (action === "createNewFolder") {
			// console.log(item);

			if (Number(item.AL_ID) === 0) {
				getAlbumTreeFunc();
				getAlbumListFunc({
					album_id: item.ID,
				});
			} else {
				getAlbumTreeFunc();
				getAlbumListFunc({
					album_id: item.AL_ID,
					dir_id: item.ID,
				});
			}
		}
	} else if (type === "breadcrumb") {
		// 面包屑
		handleBreadcrumbItem(item);
	} else if (type === "materialItem") {
		if (action === "click") {
			handleItemClick(item);
		} else if (action === "delete") {
			handleItemDelete(item);
		} else if (action === "edit") {
			handleEditClick(item);
		} else if (action === "move") {
			handleItemMove();
		} else if (action === "editTags") {
			getAlbumListFunc({
				album_id: item.album_id,
				dir_id: item.dir_id,
			});
		}
	} else if (type === "pagination") {
		handlePaginationFunc(item);
	}
};

// 分页
const handlePaginationFunc = (options: {
	currentPage: number;
	limit: number;
}) => {
	getAlbumListFunc({
		page_limit: String(options.limit),
		page_no: String(options.currentPage),
	});
};

// 面包屑导航
const BreadcrumbAllAlbum = { ID: "", ANAME: "全部专辑" };

const breadList = ref([BreadcrumbAllAlbum]);

const getBreadcrumb = (ID?: string) => {
	if (ID) {
		breadList.value = [
			BreadcrumbAllAlbum,
			...findParentNodes(treeState.treeData, String(ID)),
		];
	} else {
		breadList.value = [BreadcrumbAllAlbum];
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const findParentNodes = (tree: any, ID: string, parents: any[] = []): any => {
	// console.log(ID);
	for (const node of tree) {
		if (Number(node.ID) === Number(ID)) {
			// 找到匹配的节点，将其父级节点推入数组
			return [...parents, node];
		}
		if (node.CHILD) {
			// 递归查找子节点
			const result = findParentNodes(node.CHILD, ID, [...parents, node]);
			if (result) {
				return result;
			}
		}
	}
	return null; // 未找到匹配的节点
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleBreadcrumbItem = (item: any) => {
	// console.log(item);

	if (item.ID === "" && item.ANAME === "全部专辑") {
		getAlbumListFunc();
	} else {
		// 根据AL_ID 判断是文件夹还是专辑
		if (Number(item.AL_ID) === 0) {
			// 专辑
			getAlbumListFunc({
				album_id: item.ID,
				level: item.LEVEL,
			});
		} else {
			// 文件夹
			getAlbumListFunc({
				album_id: item.AL_ID,
				dir_id: item.ID,
				level: item.LEVEL,
			});
		}
	}
};

// 删除专辑或文件夹
interface IDeleteAlbumOrFolderParams {
	al_dir_id: number;
	type: number;
}

const deleteAlbumOrFolderFunc = async (params: IDeleteAlbumOrFolderParams) => {
	return await deleteAlbumOrFolder(params);
};

interface IDeleteMaterial {
	mat_id: string;
}

// 删除素材
const deleteMaterialFunc = async (params: IDeleteMaterial) => {
	const res = await deleteMaterial(params);
	console.log(res);
};

// item删除
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleItemDelete = async (item: any) => {
	// console.log(item);

	if (Number(item.type) === 1) {
		const res = (await deleteAlbumOrFolderFunc({
			al_dir_id: item.album.album_id,
			type: item.type,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		})) as any;

		getAlbumListFunc();
		getAlbumTreeFunc();

		// console.log(res);

		if (Number(res.state) === 1) {
			ElMessage({
				type: "success",
				message: res.msg,
			});
		} else {
			ElMessage({
				type: "error",
				message: res.msg,
			});
		}
	} else if (Number(item.type) === 2) {
		// console.log(item);
		const res = await deleteAlbumOrFolderFunc({
			al_dir_id: item.dir.dir_id,
			type: item.type,
		});

		getAlbumListFunc({
			album_id: item.dir.album_id,
		});
		getAlbumTreeFunc();

		if (Number(res.state) === 1) {
			ElMessage({
				type: "success",
				message: res.msg,
			});
		} else {
			ElMessage({
				type: "error",
				message: res.msg,
			});
		}
	} else if (Number(item.type) === 3) {
		// console.log(item);

		deleteMaterialFunc({
			mat_id: item.material.material_id,
		});

		getAlbumListFunc();
		getAlbumTreeFunc();
	}
};

// item点击
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleItemClick = (item: any) => {
	if (Number(item.type) === 1) {
		getAlbumListFunc({
			album_id: item.album.album_id,
			level: item.album.level,
		});

		getBreadcrumb(item.album.album_id);
	} else if (Number(item.type) === 2) {
		getAlbumListFunc({
			album_id: item.dir.album_id,
			dir_id: item.dir.dir_id,
			level: item.dir.level,
		});

		getBreadcrumb(item.dir.dir_id);
	}
};

// 编辑之后查询表格
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleEditClick = (item: any) => {
	if (Number(item.type) === 1) {
		getAlbumListFunc();
		getAlbumTreeFunc();
	} else if (Number(item.type) === 2) {
		getAlbumListFunc({
			album_id: item.dir.album_id,
		});
		getAlbumTreeFunc();
	}
};

// 移动之后查询
const handleItemMove = () => {
	getAlbumListFunc();
	getAlbumTreeFunc();
};
</script>

<style scoped>
.dark {
	color: #333;
}

.active {
	color: #197afb;
}

.input-with-select :deep(.el-input-group__prepend) {
	background-color: var(--el-fill-color-blank);
}

.input-with-select :deep(.el-input-group__append) {
	background-color: var(--el-fill-color-blank);
}
</style>
