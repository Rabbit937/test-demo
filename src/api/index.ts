import axios from "axios";
import type {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

import { LOGIN_URL } from "@/config";
import { ElMessage } from "element-plus";
import type { ResultData } from "@/api/interface/index.type";
import { ResultEnum } from "@/enums/httpEnum";
import { useUserStore } from "@/stores/modules/user";
import router from "@/router";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	loading?: boolean;
	cancel?: boolean;
}

const config = {
	// 默认地址请求地址，可在 .env.** 文件中修改
	// baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true,
	headers: { "Content-Type": "application/x-www-form-urlencoded" },
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		this.service = axios.create(config);

		this.service.interceptors.request.use(
			(config: CustomAxiosRequestConfig) => {
				const userStore = useUserStore();

				config.cancel ??= true;
				// config.cancel && axiosCanceler.addPending(config);

				config.loading ??= true;
				// config.loading && showFullScreenLoading();
				if (config.headers && typeof config.headers.set === "function") {
					config.headers.Authorization = userStore.token;
					// config.headers.set('x-access-token', userStore.token)
				}

				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			},
		);
		this.service.interceptors.response.use(
			(response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
				const { data } = response;

				const userStore = useUserStore();
				// axiosCanceler.removePending(config);
				// config.loading && tryHideFullScreenLoading();

				// 登录失效
				if (Number(data.state) === 3) {
					userStore.setToken("");
					router.replace(LOGIN_URL);
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				// 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
				if (data.state !== ResultEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				// 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data;
			},
			async (error: AxiosError) => {
				// const { response } = error;
				// tryHideFullScreenLoading();
				// 请求超时 && 网络错误单独判断，没有 response
				if (error.message.indexOf("timeout") !== -1)
					ElMessage.error("请求超时！请您稍后重试");
				if (error.message.indexOf("Network Error") !== -1)
					ElMessage.error("网络错误！请您稍后重试");
				// 根据服务器响应的错误状态码，做不同的处理
				// if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace("/500");
				return Promise.reject(error);
			},
		);
	}

	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(
		url: string,
		params?: object | string,
		_object = {},
	): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
	download(url: string, params?: object, _object = {}): Promise<BlobPart> {
		return this.service.post(url, params, { ..._object, responseType: "blob" });
	}
}

export default new RequestHttp(config);
