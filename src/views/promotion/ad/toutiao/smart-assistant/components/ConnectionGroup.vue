<template>
    <Dialog :title="props.title" :visible="props.visible" @handleClose="handleDialogClose">

        <template v-if="props.type === 1">
            <section class="font-size-12px color-[#666]">
                <el-row class="mb-8px">
                    <el-col :span="12">
                        <el-table v-loading="loading" :data="tableData" :border="true" style="width: 100%; height: 100%"
                            fixed @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55" />
                            <el-table-column prop="track_url_group_name" label="组名称" />
                            <!-- <el-table-column prop="track_url" label="展示" />
                            <el-table-column prop="action_track_url" label="有效触点" />
                            <el-table-column prop="video_play_track_url" label="视频播放" />
                            <el-table-column prop="video_play_done_track_url" label="视频播完" />
                            <el-table-column prop="video_play_effective_track_url" label="视频有效播放" />
                            <el-table-column prop="active_track_url" label="激活链接" /> -->
                        </el-table>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col>
                                <el-text>已有链接</el-text>
                            </el-col>
                            <el-col>
                                <el-form>
                                    <el-form-item label="展示">

                                    </el-form-item>
                                    <el-form-item label="有效触点"></el-form-item>
                                    <el-form-item label="视频播放"></el-form-item>
                                    <el-form-item label="视频播完"></el-form-item>
                                    <el-form-item label="视频有效播放"></el-form-item>
                                    <el-form-item label="激活链接"></el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <!-- <Pagination :currentPage="paginationState.currentPage" :pageSize="paginationState.pageSize"
                            :total="paginationState.total" @handleClick="handlePaginationEvent"></Pagination> -->
                    </el-col>
                </el-row>
            </section>
        </template>


    </Dialog>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Dialog from "@/components/Dialog.vue";
import { queryMonitorGroupList } from '@/api/modules/promotion'

interface IProps {
    visible: boolean;
    type: number;
    title: string;
}

const props = withDefaults(defineProps<IProps>(), {});
const emtis = defineEmits(["handleClose"]);


const handleDialogClose = () => {

}

// 表格数据
const tableData = ref();
const loading = ref(false);

const handleSelectionChange = () => {

}


interface IQueryMonitorGroupList {
    advertiser_id: string
    download_url: string
}

const queryMonitorGroupListFunc = async (params: IQueryMonitorGroupList) => {
    const res = await queryMonitorGroupList(params)


    tableData.value = res.data.list;

    console.log(res);
}


onMounted(() => {
    queryMonitorGroupListFunc({
        advertiser_id: "1787695788195915",
        download_url: "https://apps.bytesfield.com/download/basic/cur/c1e4f76f2c6608cf2ce4f1d00684d6be37439fc5"
    })
})

</script>
