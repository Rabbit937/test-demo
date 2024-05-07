<template>
    <el-form class="w-520px max-w-100%   overflow-hidden m-0-a p-160px-35px-0 " ref="loginFormRef" :model="loginForm"
        :rules="loginRules">
        <div>
            <h3 class="font-size-26px  text-center font-bold  m-0px-auto-40px-auto light_gray">登录系统</h3>
        </div>

        <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入帐号" name="username" type="text" tabindex="1"
                autocomplete="on">
                <template #prefix>
                    <el-icon>
                        <User />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-tooltip :visible="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码" name="password" type="password" tabindex="2"
                    autocomplete="on" @blur="capsTooltip = false" @keyup="checkCapslock" show-password
                    @keyup.enter="submitForm(loginFormRef)">
                    <template #prefix>
                        <el-icon>
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-tooltip>

        <el-button class="w-100% m-b-30px" :loading="loading" type="primary"
            @click="submitForm(loginFormRef)">登录</el-button>
    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { loginApi } from '@/api/modules/login';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';

const router = useRouter();
const userStore = useUserStore();

const loginForm = reactive({
    username: '',
    password: ''
})

const loginFormRef = ref<FormInstance>();

const capsTooltip = ref(false);

const loading = ref(false);

// 验证username函数
function validateUsername(rules: any, value: string, callback: any) {
    if (value === '') {
        callback(new Error("帐号不能为空！"));
    } else {
        callback();
    }
}

// 验证password函数
function validatePassword(rules: any, value: string, callback: any) {
    if (value === '') {
        return callback(new Error("密码不能为空！"));
    }

    setTimeout(() => {
        if (value.length < 6) {
            callback(new Error("请输入不小于6位的密码！"));
        } else {
            if (value.length > 18) {
                callback(new Error("请输入不大于18位的密码！"));
            } else {
                callback();
            }
        }
    }, 1000);
}

// 表单校验规则
const loginRules = reactive<FormRules<typeof loginForm>>({
    username: [{ validator: validateUsername, trigger: "blur" }],
    password: [{ validator: validatePassword, trigger: "blur" }],
});

// 检查大小写函数
const checkCapslock = (e: KeyboardEvent) => {
    const { key } = e;
    capsTooltip.value = Boolean(
        key && key.length === 1 && key >= "A" && key <= "Z",
    );
};

// 提交表单函数
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
        if (!valid) return;
        loading.value = true;

        try {
            const { data } = await loginApi({ ...loginForm });
            userStore.setToken(data.access_token);
            userStore.setUserInfo({
                id: data.id,
                frid: data.frid,
                rname: data.rname,
                uname: data.uname,
            });
            router.push("/");
        } finally {
            loading.value = false;
        }
    });
};
</script>