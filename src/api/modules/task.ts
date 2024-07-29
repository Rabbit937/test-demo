import http from "@/api";

/**
 * @name 查询广告创建任务进度
 */
export interface IQueryTaskProgress {
    advertiesr_id?: string;
    user_id?: string;

    page_no?: number;
    page_limit?: number;
}

export interface IQueryTaskProgressResultData {
    list: Record<string, string>[],
    page_info: {
        cur_page: number;
        page_limit: number;
        total: number;
        total_page: number;
    }
}



export const queryTaskProgress = (params: IQueryTaskProgress) => {
    return http.get<IQueryTaskProgressResultData>(`/api/Mk_Tt_Program/_queryTaskProgress`, params)
}


/**
 * @name 删除更新任务接口
 */

export interface IDeteleTask {
    /**
     * 任务id
     */
    id: number;
}

export const deleteTask = (params: IDeteleTask) => {
    return http.post(`/api/Mk_Tt_Program/_deleteTask`, params);
}